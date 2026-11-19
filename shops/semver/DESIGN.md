# Nardone Grocery Storefront — Design Notes

## Routes

| Address | Page | Data source |
|---|---|---|
| `/` (`#/`) | `HomePage` | `useCatalog()` supplies categories, product views, and home configuration. `HomeCategoryContext` supplies the selected category for the latest-products filter. |
| `/plp/$carouselId` (e.g. `#/plp/dairy?sort=price`) | `PlpPage` | `useParams` reads the ID, and `useSearch` reads the validated sort. From `useCatalog()`, `findCarousel` resolves the heading and `carouselProducts` selects the full list. |
| `/product/$productId` (e.g. `#/product/201`) | `ProductPage` | `useParams` supplies the ID string; the page converts it with `Number` and finds the matching product view in `useCatalog()`. |
| `/checkout` | `CheckoutPage` | Controlled form values are local to the page. Successful validation calls the cart store's `clear` action and replaces the current history entry with home. |
| Any unmatched path | `NotFound` | The root route's `notFoundComponent`; the page itself does not need catalog data. An unknown carousel ID on a matched PLP route is handled by `PlpPage` instead. |

`src/App.tsx` defines and registers the TanStack Router tree with `createHashHistory()` and scroll restoration. Keeping the route definitions together makes paths and parameters available to typed links and hooks. `Layout` shares the loaded catalog between the header, footer, and routed pages, then renders the active page through `Outlet`.

## Zustand stores

| Store | Defined in | State and actions | Who updates it | Persistence |
|---|---|---|---|---|
| Theme | `src/hooks/useThemeStore.ts` | `theme` is `light` or `dark` (defaults to light); `toggle()` switches between them. | `ThemeToggle` calls `toggle()`; the layout selects `theme` and applies it to the wrapper's `data-theme`. | Zustand `persist` uses `localStorage` with the key `semver-theme`. |
| Cart | `src/hooks/useCartStore.ts` | `lines: CartLine[]` (product ID and quantity); `add(productId)`, `remove(productId)`, and `clear()`. | `AddToCartButton` and `SearchBox` call `add`; `CartPanel` calls `remove`; a valid checkout calls `clear`. Add and remove use pure functions from `src/cart/cart.ts`. | `src/storage/cart-storage.ts` loads the `cart` key from `localStorage` at store creation. A store subscription saves the lines on updates. |

The cart uses Zustand rather than context plus a reducer. The header, cart panel, product cards, and search results live in different branches, so each can select the value or action it needs without passing cart props through the layout. The header derives the item count; the cart panel derives the total from the lines and catalog prices. Neither value is stored.

Product cards use `memo` and are not subscribed to cart lines. Their add buttons select the stable `add` action. Cart updates therefore reach the header and its cart panel without updating the catalog pages or cards.

## Component trees

All routes share this frame:

```text
index.html → src/main.tsx → StrictMode → App → RouterProvider
└── Layout
    └── CatalogContext → StorefrontLayout
        ├── Header
        │   ├── SearchBox → Suggestions popup (portal)
        │   ├── ThemeToggle
        │   ├── CartPanel → Checkout link
        │   └── CategoryNav
        ├── HeroBanner (home only)
        ├── main → HomeCategoryContext → Outlet → Active page
        └── Footer
```

### Home (`/`)

```text
Outlet → HomePage
├── CategoryList
└── ProductCollections
    ├── Error message + Retry button (instead of the collections on error)
    ├── HomeCarousels (offers) → SaleCountdown, CarouselLink, ProductGrid
    ├── LatestProducts → CarouselLink, ProductGrid
    ├── CategoryShelves → CarouselLink, ProductGrid per shelf
    ├── HomeCarousels (other) → CarouselLink, ProductGrid per carousel
    └── PromoBanners
```

### Product listing (`/plp/$carouselId`)

```text
Outlet → PlpPage
├── Home link
└── Listing
    ├── ProductGrid (loading)
    ├── Error message + Retry button (error)
    ├── Listing-not-found heading (unknown carousel ID)
    └── Carousel heading + product count + sort links + ProductGrid (known carousel)
```

Both pages use the same `ProductGrid`, which renders `ProductCard` for each item on success or the appropriate status message otherwise. Each card links its title to the product page and uses `AddToCartButton`. The PLP lists all matching products rather than applying the home carousel's preview limit.

### Product (`/product/$productId`)

```text
Outlet → ProductPage
├── Home link
└── ProductDetails
    ├── Loading status, error + Retry, or product-not-found message
    └── Product name + unit + price + AddToCartButton (known product)
```

### Checkout (`/checkout`)

```text
Outlet → CheckoutPage
├── Home link
└── Controlled form
    ├── Name, mobile, and address fields with labels and inline errors
    └── Submit button
```

### Unmatched path

```text
Outlet → NotFound
├── Page-not-found heading
└── Home link
```

## State ownership

| State or value | Owner | Updated by | Storage or reason it is derived |
|---|---|---|---|
| `cartOpen` | `Header` | Cart button click handler | Local React state; controls the visibility of `CartPanel`. |
| `categoryId` | `StorefrontLayout` | Category navigation callback | React state in memory; drives active-category selection and reaches the `LatestProducts` filter through `HomeCategoryContext` and `HomePage`. |
| `query` | `StorefrontLayout` | `SearchBox` change callback | React state in memory; the controlled input value used to derive search results. |
| `sort` | PLP route search | Default and cheapest-first links | Stored in the hash URL; missing or invalid values resolve to the default order. |
| Form values and `submitted` | `CheckoutPage` | Input changes and submit handler | React state in memory; validation messages are derived during render and shown only after the first submit. |
| `attempt` | `useLoadCatalog` | Retry handler | React state in memory; changing the counter reruns the loading effect. |
| Catalog load state | `useLoadCatalog` | API loading effect and Retry handler | `LoadState<Catalog>` represents `loading`, `success`, `empty`, or `error`. Both `success` and `empty` carry shop and home data so banners and categories remain visible when there are no products. |
| `secondsLeft` | `SaleCountdown` | Its one-second interval callback | React state in the mounted component; initialized to 3,600 seconds and reset when that instance mounts again. |
| `products` | `StorefrontLayout` | Extracted from the catalog's product views | Derived during render; storing another copy would duplicate API state. |
| `categories` | `StorefrontLayout` | Read from the catalog or defaults to an empty list | Derived during render; it mirrors the loaded catalog. |
| `searchState` | `StorefrontLayout` | Filtered from the product load state, `query`, and `categories` | Derived during render; this keeps search results synchronized with the current query and catalog. |

## Data flow and effects

- `Layout` calls `useLoadCatalog`, which loads products, offers, stock, categories, shop information, and home-page configuration together with `Promise.all` through `src/api/shop-api.ts`. The layout provides the result through `CatalogContext`; `useCatalog()` reads it without starting another request.
- Network access is kept in `src/api/client.ts`. API guards validate responses; malformed list entries are discarded with a warning, while an invalid response or failed request produces the error state.
- The loading effect depends on `[attempt]`. Its cleanup sets an `ignore` flag so a completed request from a cleaned-up effect cannot update the page.
- The Retry button calls the shared `retry` action, which switches the state to `loading` and increments `attempt`, starting the requests again.
- `carouselProducts` in `src/catalog/carousel-products.ts` resolves a configured carousel, the `latest` ID, or a category slug. It selects the corresponding products and returns `null` for an unknown ID.
- `sortProducts` in `src/catalog/product-price.ts` keeps the existing order by default and sorts a copy by the displayed price when requested. Cards and product details share the same discount calculation.
- `StorefrontLayout` sends `query` and `onQueryChange` through `Header` to the controlled `SearchBox`. `filterProductsByQuery` derives results from the catalog without mutating it. It searches product names, units, category names, and tags, and normalizes Persian character variants, diacritics, and half-spaces.
- Matching results and loading, empty, or error feedback appear in a popup aligned below the search input. The popup is rendered through a portal so the input keeps its original position in the header layout; its position follows the input on scroll and resize. Clicking outside or pressing Escape closes it. The regular home collections remain visible while searching.
- Cart changes go through the pure functions in `src/cart/cart.ts` inside `src/hooks/useCartStore.ts`; its subscription persists updates through `src/storage/cart-storage.ts`.
- Store consumers select only the state or action they need. Cart data and actions are not passed from `App` through intermediate components.
- Each mounted `SaleCountdown` starts one one-second interval in an effect with an empty dependency array and clears that interval in cleanup. The current API does not provide an offer end time, so the display starts from one hour locally.

## Source layout

```text
src/
  main.tsx                  React entry point and existing stylesheet import
  App.tsx                   Typed route tree and router provider
  hooks/                    Catalog loading hook and Zustand stores for theme and cart state
  types.ts                  Shared data types and LoadState
  api/                      HTTP client, endpoints, response guards, product views
  catalog/                  Product-state helpers, carousel selection, and search filtering
  cart/                     Cart operations
  storage/                  Cart localStorage read/write
  components/               Shared layout, navigation, cart, products, and sections
  components/pages/         Home, listing, product, checkout, and not-found pages
  utils/                    Formatting and notifications
```

`src/api/client.ts` is the only source module that calls `fetch`; `src/storage/cart-storage.ts` owns cart `localStorage` access. Cart consumers select their needed state and actions from Zustand; other page data and handlers continue through props. Product lists use stable product or category identifiers for React keys.

## Bonus Profiler evidence

With **Record why each component rendered while profiling** enabled, adding one product from `#/plp/dairy` produced one commit. The Profiler attributed the update to `Header` and `CartPanel`: the cart quantity and lines changed. The ranked chart includes header descendants but no `PlpPage`, `ProductGrid`, or `ProductCard`. The store's `add` action stays stable, so the add buttons do not re-render from that subscription either.

The bonus recording used React DevTools Inline in an isolated local preview. The temporary inspector skipped unsupported fibers and tolerated missing hook stack frames; no application code or dependencies were modified for the recording. Attach the screenshot to the [bonus slot in the PR description](PR-WEEK-6.md#screenshot-2-bonus-profiler).

## Scope and current limitations

- Search runs in the browser over the catalog returned by the API.
- The countdown is a one-hour client-side timer because the API has no sale deadline.
- The cart is stored locally. Checkout validates locally, clears the cart, and returns home; it does not submit an order or take payment.
- The existing `style.css` continues to define the storefront appearance. `SearchBox.css` contains only the requested search-popup styles.
