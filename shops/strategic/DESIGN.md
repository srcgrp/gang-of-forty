# Strategic Supermarket — design on one page

## Needs
- Browse products, select a category or offers, search, add/remove packaged sale units and inspect the cart.
- Preserve category and search together in a shareable URL; preserve the cart across refreshes.
- Limit quantities to the current stock. Checkout validates the delivery details locally, clears the cart and returns home.

## Parts of the page
Header, category filters, home hero, product shelves, promotional banners, category/search grids, quantity controls, cart summary and footer.
The home-return button always navigates home; browser Back/Forward retains its history behavior. “See all” links open the carousel PLP. Category links open a matching carousel or select the category on Home. Store links can also scroll to sections such as the footer.
The existing Armin brand/contact details stay in the presentation layer; the API's sample shop identity is still fully typed and validated.

## Routes

[App.tsx](src/App.tsx) defines the routes and registers the router type. With `createHashHistory`, the part after `#` selects the page. `Layout` calls `useCatalog` to load the six API files and shares the result through `CatalogContext`. Pages read the same catalog through the hook.

| Address | Page | Where the data comes from |
| --- | --- | --- |
| `/` (browser `#/`) | `HomePage` | `useCatalog` supplies the model. `Home` uses `homeShelves` and `carouselProducts` for the carousels in `home.json`, in configuration order. Each shelf previews up to four items and links to its full list. Category navigation uses `categories.json`. A selected category or a search term switches the same page to `Catalog` using `selectionView`. |
| `/plp/$carouselId` (e.g. `#/plp/dairy`) | `PlpPage` | `useParams({ from: '/plp/$carouselId' })` supplies the ID. The page finds that shelf in `homeShelves` using the catalog from `useCatalog`. Inside `homeShelves`, `carouselProducts` selects discounted offer items or the items for the configured category ID. The shelf supplies the title and complete list. An optional `q` filters that list before `Catalog` displays its count and cards. The PLP validates `sort` as `default` or `price`. `sortProducts` preserves the original order or sorts a copy by the discounted unit price. |
| `/plp/$carouselId` with an unknown ID (e.g. `#/plp/nothing`) | `PlpPage` | After loading, the shelf lookup yields no match. The page displays «این فهرست پیدا نشد» and a link home. |
| `/product/$productId` | `ProductPage` | Converts the route parameter with `Number(productId)` and looks up the item in the loaded model. Missing IDs show «محصول پیدا نشد». |
| `/checkout` | `CheckoutPage` | Controlled name, mobile and address inputs use local state. A valid submission calls the cart’s `clear` action and replaces the checkout history entry with Home. |
| Any unmatched path (e.g. `#/nowhere`) | `NotFound` | The root route selects its `notFoundComponent`. Its message and home link are static. |

## Stores

| Store | Defined in | What it holds | Who changes it | Where it is stored |
| --- | --- | --- | --- | --- |
| Theme | [useThemeStore.ts](src/hooks/useThemeStore.ts) | `theme` starts as `light` and can be `light` or `dark`. | `ThemeToggle` calls `toggle()`. `Layout` reads the result and applies `data-theme`. | Zustand’s `persist` middleware saves the theme in browser `localStorage` under `strategic-theme`. |
| Cart | [useCartStore.ts](src/hooks/useCartStore.ts) | `lines` holds product IDs and quantities. `items` holds the catalog lookup. `catalogStatus` tracks loading, ready or error. | The add buttons in `ProductCard` and `ProductPage` call `add`. Checkout calls `clear` after validation. `QuantityControl` calls `add` or `remove`. Both actions use the pure `changeCart` function. `useCatalog` calls `startCatalogLoad`, `setCatalog` or `failCatalogLoad`. On success, `setCatalog` reconciles the saved quantities with stock. | [cart-storage.ts](src/storage/cart-storage.ts) restores `lines` with `loadCart`. A store subscription calls `saveCart` when the lines change. The `localStorage` key is `armin-market:cart`. Catalog items and readiness stay in memory. |

I chose Zustand for the cart because the theme already uses it. The header subscribes to the item count, each quantity control reads its own product’s quantity, and the cart panel derives totals from the lines and current prices. The pages and product grids can pass product data down without passing cart actions through every level.

## Component trees by page

All pages share this layout. The router mounts the selected page at `Outlet`.

```text
StrictMode → App → RouterProvider → Layout → CatalogContext.Provider
  ├── IconSprite → SpriteShop, SpriteContact, SpriteUi
  ├── Header
  │   ├── CardQuantityControls → QuantityControl (portals into mounted cards)
  │   ├── Brand → Logo → LogoBody, LogoFrame
  │   ├── SearchBox
  │   ├── CartMenu → CartPanel → QuantityControl, Amount (populated cart)
  │   ├── ThemeToggle
  │   └── MainNav
  │       ├── CategoryNav → CategoryLink
  │       └── StoreLink
  ├── main → Outlet
  └── Footer → FooterAbout, CategoryLink, StoreLink
```

The branches below start at the same outlet. In each product grid, `ProductGrid → ProductCard → ProductPurchase` displays the add button and registers a target for the header’s quantity control. Each title links to the corresponding product page.

```text
Outlet → HomePage
  ├── Loading or error → LoadStatus (LoadingSkeleton while loading)
  ├── Selected category or search → Catalog → ProductGrid when there are matches
  └── Home feed → Home
      ├── Hero → StoreLink
      ├── CategoryNav → CategoryLink
      ├── OffersShelf or CategoryShelf → ProductGrid (first configured shelf)
      ├── Promos → StoreLink
      └── Remaining configured shelves → ProductGrid

Outlet → PlpPage
  ├── Loading or error → LoadStatus (LoadingSkeleton while loading)
  ├── Known carousel → Catalog → ProductGrid when there are matches
  └── Unknown carousel → Missing-list message and Link to home

Outlet → ProductPage → LoadStatus, product details with add button, or missing-product message
Outlet → CheckoutPage → Controlled delivery form
Outlet → NotFound
  └── Page-not-found message and Link to home
```

An offers shelf can also mount `SaleCountdown`. On the unfiltered home page, an empty catalog also displays the empty-state message from `LoadStatus`. A known PLP with zero matching products keeps its title and shows the empty-list message in `Catalog`.

## Where state lives

| State | Owner | Who changes it | Where it is stored |
|---|---|---|---|
| Catalog load state and retry attempt | `useCatalog` in `Layout` | The effect builds the model on success and reports failures. Retry increments the attempt counter. | React memory shared through `CatalogContext` |
| Category, carousel and search | TanStack Router | Category and shelf links navigate. `SearchBox` calls the navigation hook when the text changes. Back and Forward restore the previous location. | The URL hash holds the path, optional `category` on Home, and optional `q`. |
| `mode` | CartMenu | CartMenu requests closed, hover or pinned mode. A category/search/home key change remounts this menu with closed mode. | React memory |
| `edges` | Each OffersShelf or CategoryShelf via `useShelfScroll` | The hook measures the scroll position and available width on resize and scroll. | Local React memory for that shelf |
| `countdownVisible` | OffersShelf | The toggle button mounts or unmounts SaleCountdown. | Local React memory for the offers shelf |
| `secondsLeft` | SaleCountdown | Its interval decreases the remaining seconds; cleanup clears the interval on unmount. | Local React memory; a newly mounted countdown starts at five minutes |


### Values calculated from state

- **Visible products and catalog heading** are derived from the loaded model. Home uses `selectionView` for a selected category or query. The PLP uses the matched shelf and any active search term. They are calculated during rendering, so a separate State would duplicate existing data.

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

The pages render their content from the loaded model. They use `LoadStatus` for the loading skeleton and for failures with a Retry button. Retry increments `attempt`, which reruns the API-loading effect. An unknown carousel shows the missing-list message. A known list with no matching products shows its title and an empty state. Refreshing also starts a new request. In development, StrictMode can start two requests; the effect cleanup ignores the obsolete response.

Search results are derived during rendering from the model, category and query; no second products State is maintained. The optional sale countdown is a local demonstration timer rather than an API-provided sale deadline. Hiding it unmounts the component and clears its interval; showing it again starts a fresh five-minute countdown. Development-only `console.debug` ticks make it possible to verify that logging stops after the component is hidden; production builds do not emit these timer logs.

## Folders and boundaries

```text
src/
  main.tsx             React entry point and stylesheet import
  App.tsx              Typed route definitions, hash history and RouterProvider
  types.ts             Shared domain and API types
  vite-env.d.ts        Vite environment types
  hooks/               Catalog loading, navigation, theme and cart stores
  catalog/             Carousel configuration and product selection
  components/          Layout, JSX views, presentation helpers and useShelfScroll
  components/pages/    HomePage, PlpPage, ProductPage, CheckoutPage and NotFound
  api/                 Fetching, response validation and parallel loading
  storage/             Cart persistence and URL/history access
  features/cart/       Quantity rules, stock reconciliation and totals
  features/products/   Product model, pricing, search and selection
  shared/              Numeric range helper
```

## Security

Everything bundled for the browser is public, including Vite environment variables. API responses and stored cart entries are validated. React renders API labels as text, and links from shop content pass through a protocol check. An ordering server would need to check stock and calculate prices and totals again before accepting an order.

## Implementation notes from steps 0–2

Steps 0 and 1 retain week 6 metadata, both required dependencies, strict lint,
and the existing persisted theme on the Layout wrapper.

Step 2 uses Zustand rather than Context + reducer: the project already uses it
for theme, and selectors let each consumer subscribe only to the data it needs.
Header selects only the derived count; ProductCard selects only the add action.
In step 2, ProductPurchase selected whether its product was in the cart and switched between
the add-button child and QuantityControl; no cart lines or callbacks pass through
the intermediate page, shelf or grid components.
QuantityControl selects its quantity and actions; CartPanel derives rows and
totals from lines and catalog items. Count, total and discount are never stored.

The store reuses the pure cart functions and the existing storage module/key,
so saved carts remain compatible. The validated catalog is supplied once loading
succeeds to enforce stock limits, reconcile obsolete products and compute prices.
Catalog metadata stays in memory; only lines are saved. Unknown IDs cannot be added.
The subscription is disposed on Vite hot replacement. The loading effect now lives in `useCatalog`, and TanStack Router manages navigation.

### Cart catalog readiness

The cart store tracks `catalogStatus` as loading, ready or error. `useCatalog` reports
request start, validated success and failure. A failed request or retry never erases saved cart lines. Only a successful
response reconciles quantities against the current catalog.

CartPanel displays the saved count with a loading/error message until prices
and stock are ready. It renders neither a monetary total nor checkout controls
in those states, so unavailable prices cannot appear as zero. Retry remains the
existing page action. Add/remove actions are ignored while catalog data is not ready.
The old `cart-controls.ts` prop-drilling type has been removed.
