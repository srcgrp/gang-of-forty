# Sharding Design

## 1. Requirements

The user can browse the shop, categories, offers and products; view prices and availability; search by name; and select a category. They can add products to the cart, change quantities, remove items and see an estimated total. The cart and theme remain in localStorage, while category and search text are kept in the URL. The page also has a mobile menu and carousel controls.

Accounts, payment, checkout and changes to the shared API are outside this version.

## 2. Routes

`main.tsx` mounts `App` in `StrictMode`. `App.tsx` defines the typed routes and configures `createHashHistory`. `Layout` owns catalog loading and shares the result with the page rendered by `Outlet`.

| Address | Page | Data source |
|---|---|---|
| `/` (`#/`) | `HomePage` | `useCatalog` supplies the `home.json` carousels and category shelves. `useUrlFilters` reads category and search from the route. Each visible shelf previews up to six products. |
| `/plp/$carouselId` (e.g. `#/plp/dairy`) | `PlpPage` | `useParams` reads `carouselId`. `useCatalog` supplies the title, and `carouselProducts` selects the full list and determines the count. An unknown carousel ID shows «این فهرست پیدا نشد». |
| Unmatched paths (e.g. `#/nowhere`) | `NotFound` | The page renders a static message and a home link. The shared layout still provides the header and cart panel. |

## 3. Stores

| Store | Defined in | State and actions | Writers | Persistence |
|---|---|---|---|---|
| Theme (Zustand) | `src/hooks/useThemeStore.ts` | `theme` (`auto`, `light`, or `dark`) and `setTheme` | `ThemeToggle` in the header and mobile menu | Zustand `persist` writes `theme` to localStorage under `sharding-theme`. |
| Cart (Zustand) | `src/hooks/useCartStore.ts` | `lines` maps product IDs to quantities. Actions are `add`, `remove`, `removeLine` and `reconcile`. | `ProductCard` and `SearchResult` add or decrement items. `CartItem` can also remove a full line. `useLoadCatalog` reconciles stock after a complete product load. | `loadCart` reads localStorage on initialization. A store subscription calls `saveCart` when `lines` changes. Both live in `src/shared/storage/cart-storage.ts` and use the existing `sharding:v1:cart` key. |

The cart uses option A, Zustand. Route components can share the cart without forwarding its data and actions through props. Selectors let the header read the total quantity and each product card read its own quantity and actions. The store reuses the pure cart rules and the existing storage format. The header derives the item count, and the cart panel derives the total from quantities, product prices and offers.

## 4. Component trees

### Shared layout

- `App` → `RouterProvider` → `Layout`
    - `Header`
        - `Topbar`, `ShopIdentity`, `ThemeToggle`
        - `SearchBox` → `SearchResults` → `SearchResult`
        - `HeaderNav` → `MegaMenu` → `MegaMenuItem`
    - `Outlet` renders the active page in the catalog context
    - `Footer`, `SlowNotice`
    - `CartPanel` → `CartItem` → `Price`
    - `MobileMenu` → `ThemeToggle`

### Home

- `Layout`
    - `Header`
    - `Outlet` → `HomePage`
        - `Hero` → `BannerCarousel` → `BasketSlide`, `CarouselNav`
        - `CategoryNav` → `CategoryItems`, `CarouselNav`
        - `ProductsSection`
            - `ProductSkeleton` or `ProductStatus`, depending on the load state and search results
            - `ProductGrid` for each visible shelf → `CarouselNav`, `ProductCard`
                - `ProductCard` → `Price`, plus `OfferBadge` for eligible offers
                - The offers grid also renders `SalePromotion` → `SaleCountdown` while open

### Product listing

- `Layout`
    - `Header`
    - `Outlet` → `PlpPage`
        - `ProductSkeleton` while loading or `ProductStatus` on a load error
        - Title, count and home link for a known carousel
        - `ProductCard` for every product → `Price` and any `OfferBadge`
        - A list-specific message and home link for an unknown carousel

### Not found

- `Layout`
    - `Header`
    - `Outlet` → `NotFound` → page message and home link

## 5. Data and ownership

| Data | Source / persistence | Owner |
|---|---|---|
| Products and prices | `products.json` | Server |
| Categories | `categories.json` | Server |
| Discounts | `offers.json` | Server |
| Stock | `stock.json` | Server |
| Shop information and links | API `shop.json` | Server |
| Hero content | `home.json` | Server |
| Product, category, banner and promo image paths | `shared/content.ts` | Application |
| Cart item IDs and quantities | Zustand + localStorage via `cart-storage.ts` | Browser |
| Category and search text | TanStack Router search parameters | Browser |
| Theme | Zustand + localStorage via `persist` | Browser |
| API base URL | Environment at build time | Build configuration |

The separate `shop.json` at the project root records the exercise week; it is not the shop data returned by the API. Cart totals are calculated from the currently loaded products and offers, not stored as prices in the cart.

## 6. API contract

`useLoadCatalog` calls `loadAllData` in an Effect. It loads `shop.json`, `home.json`, `categories.json`, `products.json`, `offers.json` and `stock.json` concurrently with `Promise.all`. If any request or validation fails, the Effect sets an error state. The retry button sets loading and increments `attempt`, triggering the same Effect again. `StrictMode` can start the Effect twice in development, and its cleanup marks the first result as ignored so it cannot update state after cleanup.

`getJSON` returns `Promise<unknown>`, requires the configured API URL, checks the HTTP response and times out with an abort. Each loader validates its data. Invalid products, categories and offers are filtered and counted in the console; when products are skipped, the saved cart is not pruned against incomplete data. Invalid shop links and the invalid home CTA are removed before validation. A malformed response or other invalid data can reject its loader.

`Product.categoryId` refers to `Category.id`, `Offer.productId` refers to `Product.id`, and `Stock.items` is keyed by product ID. The catalog merges carousel definitions from `home.json` with the existing category and offers shelves. `carouselProducts` uses the offer map or category ID to select products and returns `null` for an unknown carousel ID.

## 7. Loading states

`LoadState` has `loading`, `success`, `empty` and `error` variants. `ProductsSection` switches on the status and checks the remaining value with `never` in its default branch.

| State | Current display |
|---|---|
| Loading | Product and category skeletons; a slow-connection notice appears after a delay. |
| Success | Product shelves and the loaded shop, hero and category information. |
| Empty | The products area says there are no products. |
| Error | The products area shows an error message and a retry button. Other shop data is not populated when the combined request fails. |

`broken.json`, `missing.json` and retry should be checked manually before delivery. The cleanup prevents stale responses from updating React state; it does not cancel the underlying requests.

## 8. Folders

```text
src/
  main.tsx              Mounts React and App.
  App.tsx               Defines the route tree and renders RouterProvider.
  catalog/              Carousel definitions and product selection.
  components/           React page, UI components and component-specific props.
    pages/              Home, product listing and not-found pages.
  hooks/                Catalog loading, stores, URL, carousel and menu behavior.
  lib/                  Toast and confetti integrations.
  shared/
    types.ts            Shared types import entry point.
    types/              Catalog, cart and shop type definitions.
    content.ts          Local image paths.
    api/                JSON requests and validation.
    storage/            Cart persistence and URL search helpers.
    state/              Initial shop data and the loading error state.
    logic/              Shared pricing, stock and content functions.
  features/
    cart/               Cart rules and calculated cart rows.
    products/logic/     Shelf, filter and product-card data functions.
```

The cart and products features do not import each other. Components combine catalog data with the cart state they select from the store.

## 9. Local and route state

| State | Owner | Changed by | Stored in |
|---|---|---|---|
| Shop data and `LoadState<Catalog>` | `Layout` via `useLoadCatalog` | API Effect | React state |
| Retry attempt | `useLoadCatalog` | Retry button | React state only |
| Category and search query | TanStack Router | Category selection, search input and browser history | Route search parameters |
| Cart panel open/closed | `Layout` | Header and cart panel | React state only |
| Mobile menu open/closed | `Layout` | Header and mobile menu | React state only |
| Search dropdown open/closed | `SearchBox` | Input, focus and dismissal events | React state only |
| Mega menu open/active category | `MegaMenu` | Menu events | React state only |
| Carousel edge positions | Each `useCarousel` caller | Scroll, resize and item-count changes | React state only |
| Video ready, slow notice and card pulse | `Hero`, `SlowNotice` and each `ProductCard` | Video, timer and interaction events | React state only |
| Countdown visibility and seconds | `SalePromotion` and `SaleCountdown` | Open/close button and interval | React state only |

Cart count, cart rows and total, active category, visible shelves, search results and card prices are calculated from existing state and data during rendering. Category and search are applied together to the shelves and search dropdown. Choosing a category or following an offers link keeps the current search; if there are no matches, the page shows the empty-results message. These calculated values are not separate persistent state. The sample countdown stops at zero or when closed and starts again from ten minutes when reopened; it does not represent a server-side sale deadline.

## 10. Security and deployment

- Browser state and all `VITE_*` values are public. Do not put secrets in the frontend.
- The displayed total is an estimate. A future checkout must calculate the final amount and validate prices, discounts and stock on the server.
- API text is rendered through React; API links pass through the link guard before use.
- Vite uses `base: './'`. Development uses `VITE_API_URL=/api`; production uses `VITE_API_URL=../../api` for a page under `/shops/<slug>/`.
- Before delivery, check TypeScript, lint, build, preview and the repository's week-five shop checker. Check the deployed subpath, Network and Console as required by the exercise.
