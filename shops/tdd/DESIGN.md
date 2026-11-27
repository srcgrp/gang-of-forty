# Sam Market — design

## 1. What must it do? (requirements)

Sam Market is a supermarket website with a home page, product listing pages (PLPs), and individual product pages. Customers can browse categories, search for products, check prices and stock, switch between light and dark themes, and add available products to the cart.

The home page shows up to six products per carousel from `home.json`. Each "View all" link opens a PLP with all products in that carousel. Category links also open a PLP. Both pages use the same `ProductCard`.

The theme and cart survive a refresh. The cart shows quantities, item count, and a total including discounts. Clearing it manually requires confirmation. A checkout form validates customer details, then clears the cart and returns home. This is a frontend exercise; payment, server-side order creation, and user accounts are not included.

## 2. Routes and screens

Routes are defined in `src/App.tsx` using TanStack Router. `createHashHistory()` keeps the route after `#`, so a URL such as `/shops/tdd/#/plp/dairy` works on static hosting without server route rewrites.

| Address | Page | Where the data comes from |
| --- | --- | --- |
| `/` (browser: `/#/`) | `HomePage` → `Storefront` | `useCatalogData()` reads the shared catalog; `ProductGrid` uses `carouselProducts()` and shows the first six products per carousel |
| `/plp/$carouselId` (browser: `/#/plp/dairy?sort=price`) | `PlpPage` | `useParams()` reads the ID; `useSearch()` reads the validated sort; `useCatalogData()` reads the shared catalog; `carouselProducts()` selects the list and `sortProducts()` orders it |
| `/plp/<unknown-id>` | `PlpPage` with a "list not found" message | `carouselProducts()` returns `null` when neither a carousel ID nor a category slug matches |
| `/product/$productId` (browser: `/#/product/201`) | `ProductPage` | `useParams({ from: '/product/$productId' })` reads the ID; `useCatalogData()` reads the shared catalog; `Number(productId)` is used to find the product, or show "product not found" |
| `/checkout` (browser: `/#/checkout`) | `CheckoutPage` | Local controlled form state; `validateCheckout()` derives errors; the cart store provides `clear()` |
| Any unmatched path | `NotFound` | Static message and a link home; no page-specific fetch |

`carouselProducts()` first checks the carousel configurations. It selects offer products or products in the configured category. If there is no carousel with that ID, it tries a category slug. A valid list without products shows an empty-list message.

The PLP accepts `sort=default` or `sort=price`. `validateSearch` returns `default` for missing or invalid values. The "Default" and "Cheapest" links update the URL; `sortProducts()` preserves API order for default and sorts a copy by the final discounted unit price for cheapest. There is no extra sorting state in React or localStorage.

`App` registers the route tree and router type through `Register`, then renders `RouterProvider`. This lets TypeScript check route links and parameter names. `PlpPage` and `ProductPage` read their parameters using `useParams({ from })`; `Layout` uses `useParams({ strict: false })` because it also renders on routes without `carouselId`.

### Shared layout and component trees

`src/main.tsx` mounts `App` inside Strict Mode. After the layout's catalog loads, the tree below contains the matched page in `Outlet`; the page branches are alternatives.

```text
App → RouterProvider
└── Layout
    ├── Header
    │   ├── SearchBox
    │   ├── ThemeToggle
    │   ├── CartPanel
    │   └── CategoryNav
    ├── main
    │   ├── SearchResults → ProductCard
    │   └── Outlet
    │       ├── HomePage → Storefront
    │       │   ├── Hero
    │       │   ├── SaleCountdown
    │       │   ├── PromoGrid
    │       │   ├── CategoryGrid
    │       │   ├── ProductGrid → ProductCard
    │       │   ├── SideBanner
    │       │   ├── StoreStory
    │       │   └── About
    │       ├── PlpPage → ProductCard
    │       ├── ProductPage → Price / OfferBadge / AddToCartButton
    │       ├── CheckoutPage → form (name / mobile / address)
    │       └── NotFound
    └── Footer
```

`Layout` uses `LoadStatus` for loading, empty, or error states. `ProductCard` renders `Price`, an optional `OfferBadge`, and `AddToCartButton`. Product titles and a "View product" link above the add button open the product page, which shows the name, unit, and price and uses the same add button. The add button is disabled when stock is zero; viewing the product remains available. Not-found messages link back home.

`StoreStory` and `About` contain project-specific content. Banners, promotions, categories, shop details, and footer links come from the API.

## 3. Data (types.ts)

Shared models live in `src/shared/types.ts` and are imported with `import type` where needed.

| Type | Main fields |
| --- | --- |
| `Product` | `id`, `categoryId`, `name`, `emoji`, `unit`, `price`, `tags` |
| `CartLine` | `productId`, `quantity` |
| `Category` | `id`, `slug`, `name`, `emoji`, `color` |
| `Stock` | `updatedAt`, `items: Record<number, number>` |
| `Offer` | `productId`, `percent`, `label` |
| `Shop` / `ShopDetails` | Shop content, contact details, opening hours, delivery settings, and links; `ShopDetails` is `Readonly<Shop>` |
| `Home` | Hero, side banner, promotions, and carousel configurations |
| `Catalog` | `products`, `stock`, `offers`, `categories`, `shop`, `home` |
| `LoadState<T>` | `loading`, `success` with `data: T`, `empty`, or `error` with a message |

The cart only stores product IDs and quantities. Product names, prices, and offers come from the current catalog.

## 4. Stores and state ownership

| Store / definition | What it holds | Who changes it | Who reads it | Persistence |
| --- | --- | --- | --- | --- |
| Theme: `src/hooks/useThemeStore.ts` | `theme: 'light' \| 'dark'`, `toggle()` | `ThemeToggle` calls `toggle()` | `Layout` applies `data-theme`; `ThemeToggle` reads the theme and action | Zustand `persist`, localStorage key `tdd-theme` |
| Cart: `src/hooks/useCartStore.ts` | `lines: CartLine[]`, `add()`, `remove()`, `clear()` | `AddToCartButton` adds; `CartPanel` removes or clears after confirmation; `CheckoutPage` clears after a valid submit | `AddToCartButton` selects `add`; `CartPanel` selects lines, count, remove, and clear; `CheckoutPage` selects `clear` | Initialized with `loadCart()`; a store subscription calls `saveCart()`, using key `tdd:w5:cart` |

### Why Zustand for the cart?

I chose Zustand because it is already used for the theme and lets each component select the cart state or actions it needs without a Provider or passing cart props through other components. `useCartStore` reuses the existing pure cart functions, while loading and saving still go through the storage module. This keeps the change small and follows the same store pattern for both theme and cart.

`useThemeStore()` subscribes to the whole store. `useThemeStore(s => s.theme)` selects only the theme, so changes to other fields would not cause that subscriber to render. The cart uses the same selector pattern; `AddToCartButton` subscribes to the stable `add` action rather than the cart lines.

### Rendering

`ProductCard` is wrapped in React `memo`, using the default shallow comparison. When a parent renders with the same product reference, stock, offer percentage, and card ID, the card can skip rendering. Changed props still update the card normally.

All store reads in components use selectors. Only `CartPanel`, inside `Header`, reads the cart lines and count; the add button selects the stable `add` action. Adding a product therefore updates the cart panel without subscribing the page or product cards to the cart contents. `memo` handles unchanged props from parent renders, while selectors limit updates caused by store changes.

### Other state and derived values

- `useCatalog()` owns `LoadState<Catalog>` and the retry counter in `Layout`. Pages read the loaded catalog through `useCatalogData()`.
- `Layout` owns the search `query`. Fuse.js results update as the user types. The query stays while navigating inside the mounted layout, but resets after a refresh and is not stored in the URL.
- `CheckoutPage` owns the name, mobile, address, and `submitted` flag. Errors are calculated from the field values on each render and only displayed after the first submit. Name and address must not be blank; mobile must have 11 digits and start with 09 (English or Persian digits). The form values are not persisted.
- The router owns the active route and `carouselId`. `Layout` derives the selected category from the carousel or category slug and uses it to filter search results.
- `cartCount(lines)` derives the number of items. `cartTotal(lines, products, offers)` derives the total using `discountedPrice()` for each unit before multiplying by quantity. Neither value is stored separately.
- `CartPanel` updates the document title when the count changes. Cart persistence is handled by the store subscription, not a component effect.
- Theme CSS variables are selected by `.app[data-theme]`. The theme wrapper covers the header, main content, and footer.

## 5. API and loading

The layout's `useCatalog()` hook runs `loadShopData()` on mount and when retrying. The six requests below run together with `Promise.all`.

| GET relative to `VITE_API_URL` | Type | Used for |
| --- | --- | --- |
| `/products.json` | `Product[]` | Product cards, search, and cart totals |
| `/stock.json` | `Stock` | Product availability |
| `/offers.json` | `Offer[]` | Discounts, cart totals, and the offers carousel |
| `/categories.json` | `Category[]` | Navigation, category links, and category PLPs |
| `/shop.json` | `ShopDetails` | Shop content and navigation |
| `/home.json` | `Home` | Banners, promotions, and carousel configurations |

`Layout` loads one catalog for the header, search, cart, footer and active page. Route changes reuse that catalog through context.

`getJSON()` checks `response.ok` and returns `Promise<unknown>`. Type Guards validate external data. Invalid products are skipped individually and their count is logged; other invalid required data or a failed request produces an error state.

`useCatalog()` starts in `loading`, then sets `success`, `empty` when there are no products, or `error`. Cleanup ignores results from an old effect after unmount or retry. `LoadStatus` renders the message and a retry button for errors. A valid PLP can also have zero products even when the catalog itself is not empty.

The API base is `/api` in `.env.development` and `../../api` in `.env.production`. Vite proxies `/api` to `https://gof.zzb.cx` in both dev and preview. `VITE_*` values are public frontend configuration.

## 6. Navigation and persistence

Navigation uses TanStack `Link`: carousel "View all" links and category links go to PLPs, while section links use router hashes. `Storefront` scrolls to the requested home section after its content mounts.

Refreshing a PLP restores the route and sorting from the URL, theme from `tdd-theme`, and cart lines from `tdd:w5:cart`; catalog data is fetched again. Back and Forward restore the chosen sorting. Category and carousel links start with default sorting; same-page section links preserve the current search parameters.

Only cart IDs and quantities are persisted, so totals are recalculated with the loaded products and offers. The storage module validates saved cart lines and handles unreadable storage by returning an empty cart.

The header links to checkout. Each field has a label, controlled value, and ref. `noValidate` disables native validation popups so the submit handler can focus the first invalid field using `useRef`. Errors update as the user edits after submitting. A valid submit calls `clear()` and `navigate({ to: '/', replace: true })`, replacing the checkout history entry with home. It does not send an order request.

For deployment, Vite uses `base: './'`. `npm run build` generates relative asset paths in `dist/`, which can be served under `/shops/tdd/`. `dist/` and `node_modules/` are not committed.

## 7. Where does each piece live?

- `src/main.tsx`: React entry point and Strict Mode.
- `src/App.tsx`: route tree, router registration, and `RouterProvider`.
- `src/components/Layout.tsx`: shared theme wrapper, header, search, outlet, and footer.
- `src/components/pages/`: `HomePage`, `PlpPage`, `ProductPage`, `CheckoutPage`, and `NotFound`.
- `src/components/`: page sections, cards, and controls.
- `src/hooks/`: theme and cart stores, plus the catalog loading hook.
- `src/shared/types.ts`: shared models and the load-state union.
- `src/shared/data/api/`: API requests and Type Guards; the only place that uses `fetch`.
- `src/features/cart/`: pure cart operations and persistence in `data/storage.ts`.
- `src/features/products/`: product selection, discount calculation, and Fuse.js search.
- `src/features/checkout/`: form values type and pure validation rules.
- `style.css`: layout, responsive styles, and theme variables.

The older `src/shared/data/url.ts`, `src/features/cart/controller.ts`, and `src/features/cart/count.ts` remain in the project but are not used by the React app. Current navigation goes through the router.

Pages and stores remain small; the TypeScript configuration includes `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes`. `npm run check`, `npm run lint`, and `npm run build` verify the application. The required root command `node scripts/check-shop.mjs tdd` is currently unavailable because that script is missing from this repository version.
