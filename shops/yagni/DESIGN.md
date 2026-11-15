# Mina Store --- Technical Design

## 1. Goal and Scope

Describe the goal of the Mina Store application and the scope of the implementation.

## 2. Component Tree

```text
App (TanStack Router)
└── RootLayout
    └── HomePage
        └── Storefront
            ├── Header
            ├── CategoryNav
            ├── Banner
            ├── CatalogView
            │   └── ProductGrid
            │       └── ProductCard
            └── CartPanel
```

## 3. State Ownership

- Cart lines are owned by the Zustand `useCartStore` and persisted through `storage/`.
- Theme is owned by the Zustand `useThemeStore`.
- Catalog data and its loading state are owned by the `useCatalog` hook.
- Search query, selected category, cart-panel visibility, countdown visibility, and retry attempt are owned by `HomePage`.
- `App.tsx` defines the TanStack Router route tree and renders `RouterProvider`.

## 4. Derived Values

Values that can be calculated from existing state are derived rather than stored:

- Cart item count and total are calculated from cart lines.
- Carousel product cards are calculated by the pure `carouselProducts` function.
- Search results are calculated from each carousel's products and the current search query.

## 5. API and Validation

- API requests and response validation stay in `api/`.
- `useCatalog` loads products, offers, stock, shop/categories, and home/carousel data with `Promise.all`.
- `LoadState<Catalog>` represents loading, success, empty, and error states.
- The hook uses an `ignore` flag in its effect cleanup to prevent stale requests from updating state.
- Catalog components handle each loading state explicitly with a `switch` statement.

## 6. UI Behavior and Effects

- Selecting a category and searching update `HomePage` state.
- Adding or removing products updates the Zustand cart store.
- Cart persistence remains in the storage layer.
- `HomePage` updates the browser document title with the shop name and cart item count.
- Timers and other effects are cleaned up by the components that create them.

## 7. Folder Structure

```text
src/
├── api/          # API requests and response validation
├── cart/         # Pure cart-related logic
├── catalog/      # Pure catalog and carousel calculations
├── components/   # Reusable UI and layout components
├── hooks/        # useCatalog and Zustand stores
├── pages/        # Route-level pages
├── storage/      # Persistent browser storage
├── types/        # Shared TypeScript types
├── App.tsx       # TanStack Router configuration
└── main.tsx      # React application entry point
```
