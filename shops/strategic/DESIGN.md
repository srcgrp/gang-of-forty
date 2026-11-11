# Strategic Supermarket — design on one page

## Needs
- Browse products, select a category or offers, search, add/remove packaged sale units and inspect the cart.
- Preserve category and search together in a shareable URL; preserve the cart across refreshes.
- Limit quantities to the current stock. Checkout is a display-only placeholder; accounts, payment and orders are out of scope.

## Parts of the page
Header, category filters, home hero, product shelves, promotional banners, category/search grids, quantity controls, cart summary and footer.
The home-return button always navigates home; browser Back/Forward retains its history behavior. Category tiles, category menu entries, footer categories and “see all” links select a filter. API hero/menu fragment links deliberately scroll to home shelves.
The existing Armin brand/contact details stay in the presentation layer; the API's sample shop identity is still fully typed and validated.

## Component tree

```text
App
└── ShopPage
    ├── IconSprite → SpriteShop, SpriteUi, SpriteContact
    ├── Header
    │   ├── Brand → Logo → LogoFrame, LogoBody
    │   ├── SearchForm
    │   ├── CartMenu → CartPanel → QuantityControl, Amount
    │   └── MainNav → CategoryNav → CategoryLink
    ├── LoadStatus
    │   ├── LoadingSkeleton (loading)
    │   ├── NotFound (success, unknown category)
    │   ├── Catalog (success, category, offers or search)
    │   │   └── ProductGrid → ProductCard × n → QuantityControl
    │   └── Home (success, home route)
    │       ├── Hero
    │       ├── CategoryNav → CategoryLink
    │       ├── OffersShelf → ProductGrid → ProductCard × n → QuantityControl
    │       ├── Promos
    │       └── CategoryShelf × n → ProductGrid → ProductCard × n → QuantityControl
    └── Footer → FooterAbout, CategoryLink
```

`main.tsx` mounts `App` inside `StrictMode`. The tree shows where components render. For example, `ShopPage` passes the cart panel to `Header`, and `CartMenu` renders it as a child. Shelf order follows the API configuration. A product card shows its quantity control once that product is in the cart.

## Where state lives

| State | Owner | Who changes it | Where it is stored |
|---|---|---|---|
| `load` | App | The loading effect sets success, empty or error after the request settles. Cleanup ignores an obsolete response. | React memory, initially loading |
| `model` | App | The same effect calls `buildModel` on the validated API data. | React memory, initially `emptyModel` |
| `categoryId` | App | `applyRoute` resolves the selected category after loading, navigation or browser Back/Forward. | React memory. The URL stores the slug. |
| `query` | App | Submitting SearchForm updates the URL. App reads the submitted query on navigation and history changes. | React memory and the URL. Unsubmitted text stays in the input. |
| `missing` | App | `applyRoute` checks whether the catalog slug exists in the loaded model. | React memory, reconstructed from the URL and model |
| `cart` | App | Add/remove callbacks call `changeCart`. After loading, `reconcileCart` applies current stock limits. | React memory and localStorage under `armin-market:cart`. The initializer reads it and a cart effect saves changes. |
| `open` | App | CartMenu requests closed, hover or pinned mode. Navigation closes the panel. | React memory |
| `edges` | Each OffersShelf or CategoryShelf via `useShelfScroll` | The hook measures the scroll position and available width on resize and scroll. | Local React memory for that shelf |


### Values calculated from state

- **Visible products and catalog heading** are derived from the model, selected category and query using `selectionView`. They are calculated during rendering, so a separate State would duplicate existing data.

- **Product count and sorted categories** are derived from the loaded model. They do not need independent State because they change whenever the model changes.

- **Product quantity on each card** is derived by looking up the product ID in the cart lines. It should not be stored separately because the cart already contains the source data.

- **Cart count** is calculated by summing the quantities of all cart lines. A separate State would duplicate the cart data and could become inconsistent.

- **Cart rows and line subtotals** are calculated from the stored quantities and current product prices. They are derived values, not independent State.

- **Cart total, original total and discount** are calculated through `cartView`. Storing them separately would require keeping multiple values synchronized after every quantity or price change.

- **Shelf contents and the hero offer** are derived from the loaded model, carousel definitions, categories, offers and stock. They do not require separate State because they are determined by the existing API data.


## API contract
All six JSON files load in parallel, with a 30-second timeout.
| File | Contract | Invalid data |
|---|---|---|
| `products.json` | `Product[]` | Skip invalid records and log their count; reject a non-array |
| `categories.json` | `Category[]` | Show error |
| `offers.json` | `Offer[]` | Show error |
| `stock.json` | `StockData` | Show error |
| `shop.json` | `ShopData` | Show error |
| `home.json` | `HomeData` | Show error |
`getJSON` returns `Promise<unknown>`, rejects non-OK responses and reports malformed JSON. Guards validate every modeled field before building the model.
IDs are positive safe integers; prices are finite and nonnegative; discounts include 0–100%. Stock and cart quantities are nonnegative safe integers: one quantity is one API sale unit, e.g. one 1-kg package, not a fraction of that package.
Prices round once to the nearest whole toman after applying the discount. They are never rounded to thousands. Totals and discount percentages are computed in the cart feature.

## States and recovery

LoadStatus switches on the load state. It renders a skeleton while loading, the selected view on success, a no-products message for an empty catalog, and a readable message on failure. An unknown category and a valid category with no matches each have their own view. Refreshing starts a new request.

## Folders and boundaries

```text
src/
  main.tsx             React entry point and stylesheet import
  App.tsx              Application state, effects and event handlers
  types.ts             Shared domain and API types
  cart-controls.ts     Cart lines and callbacks passed to components
  vite-env.d.ts        Vite environment types
  components/          JSX views, presentation helpers and useShelfScroll
  api/                 Fetching, response validation and parallel loading
  storage/             Cart persistence and URL/history access
  features/cart/       Quantity rules, stock reconciliation and totals
  features/products/   Product model, pricing, search and selection
  shared/              Numeric range helper
```

## Security

Everything bundled for the browser is public, including Vite environment variables. API responses and stored cart entries are validated. React renders API labels as text, and links from shop content pass through a protocol check. An ordering server would need to check stock and calculate prices and totals again before accepting an order.