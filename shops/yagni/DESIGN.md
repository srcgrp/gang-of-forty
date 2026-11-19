# Mina Store — Technical Design

## 1. Goal and Scope

Mina Store is a Persian grocery storefront built with React, TypeScript, and Vite. It loads shop and catalog data from the API layer, displays products and category/carousel listings, and lets users manage a shopping cart, choose a theme, and proceed to checkout.

The application uses TanStack Router for page navigation and Zustand for shared cart and theme state. The checkout page includes controlled customer fields, validation, first-invalid-field focus, cart clearing, and navigation back to the home page after a valid submission.

## 2. Routes

| Address | Page | Where it's used |
|---|---|---|
| `/` | `HomePage` | Main storefront; uses `useCatalog` to load catalog data and `Storefront` to render the shop sections. |
| `/plp/$carouselId` | `PLP` | Product listing for a carousel or category; reads `carouselId` with `useParams`, then uses `useCatalog` and `carouselProducts` to select products. |
| `/cart` | `CartPage` | Displays cart lines and supports quantity updates and item removal through `useCartStore`. |
| `/product/$productId` | `ProductPage` | Finds a product by its numeric route parameter and displays its details and add-to-cart action. |
| `/checkout` | `CheckoutPage` | Controlled delivery form, calculated validation, invalid-field focus, order summary, and successful cart clearing. |
| Unknown address | `NotFound` | Shown by TanStack Router's `defaultNotFoundComponent` for an unmatched route. |

The router is configured in `src/App.tsx` with `createHashHistory`, `createRootRoute`, `createRoute`, `createRouter`, and `RouterProvider`. Navigation links use TanStack Router's `Link`. Product titles and category cards navigate to `/plp/$carouselId`; liking a product does not have a separate route.

## 3. Component Trees

### Home page — `/`

```text
App (RouterProvider)
└── RootLayout
    └── Outlet
        └── HomePage
            ├── Header
            │   └── SearchBox
            └── Storefront
                ├── CategoryNav
                ├── Banner
                ├── SaleCountdownArea
                │   └── SaleCountdown
                ├── main
                │   ├── CategoryGrid
                │   └── CatalogView
                │       ├── CatalogLoading / CatalogError
                │       └── ProductGrid
                │           └── ProductCard
                ├── PromoSections
                ├── StoreSupport
                └── StoreFooter
```

`RootLayout` owns the shared search context and renders the Header for every route. `HomePage` owns selected category, countdown visibility, and retry attempt. A small `CartDocumentTitle` subscriber updates the document title without making the storefront subscribe to cart changes. `useCatalog` supplies the catalog load state.

### Product listing page — `/plp/$carouselId`

```text
App (RouterProvider)
└── RootLayout
    └── Outlet
        └── PLP
            ├── PageNavigation
            ├── CatalogLoading / CatalogError
            └── ProductGrid
                └── ProductCard
```

`PLP` reads the route parameter, loads catalog data with `useCatalog`, and gets the relevant product cards from `carouselProducts`. An unknown carousel/category identifier renders the specific “این فهرست پیدا نشد” message. The page offers default and price sorting; the pure `sortProducts` function lives in `src/catalog/`.

### Product page — `/product/$productId`

```text
RootLayout
└── Header
└── Outlet
    └── ProductPage
        ├── Product details and pricing
        └── Add-to-cart action (or product-not-found message)
```

`ProductPage` converts `productId` with `Number()` and displays a dedicated product-not-found message when the identifier is invalid or absent from the catalog.

### Cart page — `/cart`

```text
App (RouterProvider)
└── RootLayout
    └── Outlet
        └── CartPage
            ├── PageNavigation
            ├── Empty-cart message (when cart is empty)
            └── Cart items
                ├── Item name and price
                ├── Quantity controls
                └── Remove action
            └── Cart total and checkout Link
```

### Checkout page — `/checkout`

```text
App (RouterProvider)
└── RootLayout
    └── Outlet
        └── CheckoutPage
            ├── PageNavigation
            ├── Controlled name, mobile, and address fields
            ├── Validation errors after first submit
            ├── Focus first invalid field with useRef
            └── Order summary and total
```

### Not-found page

```text
App (RouterProvider)
└── NotFound
    ├── 404 message
    └── Link to HomePage (/)
```

## 4. State Ownership and Store Tables

| Store / state | What it stores | What it replaces / why it is used | Where it is stored |
|---|---|---|---|
| Cart — `useCartStore` (Zustand) | Cart `lines` and actions: `add`, `updateQuantity`, and `remove`. | Replaces cart state that would otherwise need to be passed through multiple components or held in a page-level component. Zustand is the selected approach (not Context + Reducer) because the cart is shared by the header, cart page, and checkout page. | In-memory Zustand store; cart lines are loaded from and saved to browser `localStorage` through `src/storage/cart-storage.ts` using the key `yagni-cart`. |
| Theme — `useThemeStore` (Zustand + `persist`) | Current `theme` (`light` or `dark`) and `toggle` action. | Replaces local theme state and prop drilling; the theme is needed by the root layout and header. | Zustand store persisted to browser `localStorage` using the key `yagni-theme`. |
| Catalog — `useCatalog` hook | `LoadState<Catalog>`: loading, success, empty, or error; catalog data includes products, offers, stock, categories, shop, home, and carousels. | Replaces duplicated fetching and loading state in individual pages. This is a hook-local React state, not a Zustand store. | In-memory React state inside `useCatalog`; data is fetched through `src/api/` and is not persisted by this hook. |
| Search — `SearchContext` | Shared search query and setter. | Lets the global Header drive home catalog filtering without prop drilling. | React context created in `src/hooks/SearchContext.tsx`. |
| Home page UI state — `HomePage` | Selected category ID, countdown visibility, and retry attempt. | Values only needed by the home page. | Local React `useState` in `src/pages/HomePage.tsx`. |
| PLP retry state — `PLP` | Retry attempt counter. | Keeps retry behavior local to the product listing page. | Local React `useState` in `src/pages/PLP.tsx`. |

Derived values are not stored separately: cart item count and total are calculated from cart lines; product cards for a carousel/category are calculated by `carouselProducts`; filtered products are calculated from the current search query.

## 5. Derived Values

- Cart item count and total are calculated from cart lines using functions in `src/cart/cart-logic.ts`.
- Carousel/category product cards are calculated by `carouselProducts` in `src/catalog/`.
- Search results are calculated from the current carousel products and search query.
- The checkout summary is calculated from the same cart lines; it does not maintain a separate copy of the cart.

## 6. API and Validation

- API requests and response validation stay in `src/api/`.
- `useCatalog` loads suggestions/products, shop/categories, and home/carousel data with `Promise.all`.
- `LoadState<Catalog>` represents loading, success, empty, and error states.
- The hook uses an `ignore` flag in its effect cleanup to prevent stale requests from updating state.
- Catalog components handle each loading state explicitly with a `switch` statement.
- `carouselProducts` is pure catalog logic and does not perform network requests or access the DOM.

## 7. UI Behavior and Effects

- Selecting a category and searching update `HomePage` local state.
- Adding, removing, or changing product quantities updates the Zustand cart store.
- Cart persistence is handled by `src/storage/cart-storage.ts`.
- The theme toggle updates `useThemeStore`; `RootLayout` reads the theme and applies it through the app's `data-theme` attribute.
- `CartDocumentTitle` updates the browser document title with the shop name and cart item count, isolated from the storefront component tree.
- The shared Header is rendered by `RootLayout` on all routes and includes search, theme toggle, cart, and checkout navigation.
- Each home carousel includes a “مشاهده همه” link to its corresponding PLP.
- Timers and other effects are cleaned up by the components that create them.

## 8. Folder Structure

```text
src/
├── api/          # API requests and response validation
├── cart/         # Pure cart-related logic
├── catalog/      # Pure catalog and carousel calculations
├── components/   # Reusable UI, storefront, and layout components
├── hooks/        # useCatalog and Zustand stores
├── pages/        # Route-level pages
├── storage/      # Persistent browser storage
├── types/        # Shared TypeScript types
├── App.tsx       # TanStack Router configuration
└── main.tsx      # React application entry point
```
