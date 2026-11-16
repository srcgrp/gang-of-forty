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
    └── Layout
        ├── IconSprite → SpriteShop, SpriteUi, SpriteContact
        ├── Header
        │   ├── Brand → Logo → LogoFrame, LogoBody
        │   ├── ThemeToggle
        │   ├── SearchBox
        │   ├── CartMenu → CartPanel → QuantityControl, Amount
        │   └── MainNav → CategoryNav → CategoryLink
        ├── LoadStatus
        │   ├── LoadingSkeleton (loading)
        │   ├── NotFound (success, unknown category)
        │   ├── Catalog (success, category, offers or search)
        │   │   └── ProductGrid → ProductCard × n → ProductPurchase → QuantityControl
        │   └── Home (success, home route)
        │       ├── Hero
        │       ├── CategoryNav → CategoryLink
        │       ├── OffersShelf → (optional SaleCountdown), ProductGrid → ProductCard × n → ProductPurchase → QuantityControl
        │       ├── Promos
        │       └── CategoryShelf × n → ProductGrid → ProductCard × n → ProductPurchase → QuantityControl
        └── Footer → FooterAbout, CategoryLink
```

`main.tsx` mounts `App` inside `StrictMode`. The tree shows where components render. `Header` owns its cart menu and renders `CartPanel` directly. No cart state or callbacks pass through App, ShopPage, Home, shelves or ProductGrid. Shelf order follows the API configuration. A product card shows its quantity control once that product is in the cart.

## Where state lives

| State | Owner | Who changes it | Where it is stored |
|---|---|---|---|
| `load` | App | The loading effect sets success, empty or error after the request settles. Retry sets it to loading before incrementing `attempt`. Cleanup ignores an obsolete response. | React memory, initially loading |
| `attempt` | App | The Retry button increments it; the API-loading effect depends on it and runs again. | React memory, initially `0` |
| `model` | App | The same effect calls `buildModel` on the validated API data. | React memory, initially `emptyModel` |
| `categoryId` | App | `applyRoute` resolves the selected category after loading, navigation or browser Back/Forward. | React memory. The URL stores the slug. |
| `query` | App | SearchBox updates it on every input change; App also writes the query to the URL. Browser Back/Forward restores it through `applyRoute`. | React memory and the URL |
| `missing` | App | `applyRoute` checks whether the catalog slug exists in the loaded model. | React memory, reconstructed from the URL and model |
| `lines` | useCartStore | `add` / `remove` call the existing pure `changeCart`; `setCatalog` reconciles lines against loaded stock. | Zustand memory; `loadCart` / `saveCart` in storage/ use the existing `armin-market:cart` key. A subscription saves line changes. |
| `catalogStatus` | useCartStore | App reports loading, ready or error for the catalog request. | Memory only; preserves saved lines on errors |
| `theme` | useThemeStore | ThemeToggle calls `toggle`. Layout selects the current theme. | Zustand persist, `strategic-theme` |
| `mode` | CartMenu | CartMenu requests closed, hover or pinned mode. A category/search/home key change remounts this menu with closed mode. | React memory |
| `edges` | Each OffersShelf or CategoryShelf via `useShelfScroll` | The hook measures the scroll position and available width on resize and scroll. | Local React memory for that shelf |
| `countdownVisible` | OffersShelf | The toggle button mounts or unmounts SaleCountdown. | Local React memory for the offers shelf |
| `secondsLeft` | SaleCountdown | Its interval decreases the remaining seconds; cleanup clears the interval on unmount. | Local React memory; a newly mounted countdown starts at five minutes |


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

LoadStatus switches on the load state. It renders a skeleton while loading, the selected view on success, a no-products message for an empty catalog, and a readable message with a Retry button on failure. Retry increments `attempt`, which reruns the API-loading effect. An unknown category and a valid category with no matches each have their own view. Refreshing also starts a new request. In development, StrictMode can start two requests; the effect cleanup ignores the obsolete response.

Search results are derived during rendering from the model, category and query; no second products State is maintained. The optional sale countdown is a local demonstration timer rather than an API-provided sale deadline. Hiding it unmounts the component and clears its interval; showing it again starts a fresh five-minute countdown. Development-only `console.debug` ticks make it possible to verify that logging stops after the component is hidden; production builds do not emit these timer logs.

## Folders and boundaries

```text
src/
  main.tsx             React entry point and stylesheet import
  App.tsx              Application state, effects and event handlers
  types.ts             Shared domain and API types
  vite-env.d.ts        Vite environment types
  hooks/               Zustand theme and shared cart stores
  components/          JSX views, presentation helpers and useShelfScroll
  api/                 Fetching, response validation and parallel loading
  storage/             Cart persistence and URL/history access
  features/cart/       Quantity rules, stock reconciliation and totals
  features/products/   Product model, pricing, search and selection
  shared/              Numeric range helper
```

## Security

Everything bundled for the browser is public, including Vite environment variables. API responses and stored cart entries are validated. React renders API labels as text, and links from shop content pass through a protocol check. An ordering server would need to check stock and calculate prices and totals again before accepting an order.

## Week 6: completed through step 2

Steps 0 and 1 retain week 6 metadata, both required dependencies, strict lint,
and the existing persisted theme on the Layout wrapper.

Step 2 uses Zustand rather than Context + reducer: the project already uses it
for theme, and selectors let each consumer subscribe only to the data it needs.
Header selects only the derived count; ProductCard selects only the add action.
ProductPurchase selects whether its product is in the cart and switches between
the add-button child and QuantityControl; no cart lines or callbacks pass through
the intermediate page, shelf or grid components.
QuantityControl selects its quantity and actions; CartPanel derives rows and
totals from lines and catalog items. Count, total and discount are never stored.

The store reuses the pure cart functions and the existing storage module/key,
so saved carts remain compatible. The validated catalog is supplied once loading
succeeds to enforce stock limits, reconcile obsolete products and compute prices.
Catalog metadata stays in memory; only lines are saved. Unknown IDs cannot be added.
The subscription is disposed on Vite hot replacement. App keeps the original
data-loading and URL logic: useCatalog and TanStack routes belong to steps 3/4
and are outside this delivery.
### Cart catalog readiness

The cart store tracks `catalogStatus` as loading, ready or error. App reports
request start, validated success and failure while retaining its step-2 loading
effect. A failed request or retry never erases saved cart lines. Only a successful
response reconciles quantities against the current catalog.

CartPanel displays the saved count with a loading/error message until prices
and stock are ready. It renders neither a monetary total nor checkout controls
in those states, so unavailable prices cannot appear as zero. Retry remains the
existing page action. Add/remove actions are ignored while catalog data is not ready.
The old `cart-controls.ts` prop-drilling type has been removed.
