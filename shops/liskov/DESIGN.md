# Liskov Shop — Design Document (Week 6)

## 1. Application Overview

The application is a React-based supermarket storefront.

Customers can:
- Browse products and categories.
- Search for products.
- View product details.
- Browse carousel-based product listing pages (PLP).
- Sort products by price.
- Add, decrease, and remove cart items.
- View cart totals and item counts.
- Change the application theme.
- Complete the checkout form.

The application uses TanStack Router for navigation and Zustand for shared cart and theme state.

## 2. Routes

| Route | Page | Description |
|---|---|---|
| `/` | `HomePage` | Home banners, carousels, categories, and products |
| `/plp/$carouselId` | `PlpPage` | Products belonging to a selected carousel |
| `/product/$productId` | `ProductPage` | Product details and add-to-cart action |
| `/checkout` | `CheckoutPage` | Checkout form and order summary |
| Not found | `NotFound` | Fallback page for unknown routes |

The router is configured in `src/App.tsx` using TanStack Router and `createHashHistory`.

The PLP route validates its search parameters using `validateSearch`. The supported sort values are `default` and `price`.

Pages read route parameters using `useParams({ from: ... })` and search parameters using `useSearch({ from: ... })`.

## 3. State Management

### Cart Store

File: `src/hooks/useCartStore.ts`

The cart is managed with Zustand.

State:
- `lines`: Cart items and quantities.

Actions:
- `add(productId)`
- `decrease(productId)`
- `remove(productId)`
- `clear()`

Pure cart operations are implemented in `src/cart/cart.ts`.

Cart persistence is handled through `src/storage/cart.ts`, using `loadCart` and `saveCart`.

Components select only the state and actions they need instead of receiving cart state through intermediate component props.

### Theme Store

File: `src/hooks/useThemeStore.ts`

The theme is managed with Zustand and the `persist` middleware.

State:
- `theme`: Current light or dark theme.

Action:
- `toggle()`

Persistence key: `liskov-theme`.

The selected theme is applied to the application wrapper through the `data-theme` attribute in `Layout.tsx`.

### Application Context

Files:
- `src/context/app-context.ts`
- `src/context/AppContext.tsx`
- `src/context/useAppContext.ts`

The application context provides:
- Catalog loading state.
- Retry function.
- Search query.
- Selected category ID.
- Search and category update callbacks.

The context is provided by `AppProvider` in `App.tsx`.

## 4. Data Loading and Catalog

File: `src/hooks/useCatalog.ts`

The `useCatalog` hook loads application data through the API layer.

The API layer is located in `src/api/` and handles data fetching and response validation.

Catalog-related operations are implemented in `src/catalog/`:

| File | Responsibility |
|---|---|
| `context.ts` | Builds lookup maps for catalog data |
| `filter-products.ts` | Filters products |
| `carousel-products.ts` | Selects products for a carousel |
| `sort-products.ts` | Sorts products |
| `pricing.ts` | Calculates product pricing |

The application handles loading, success, empty, and error states.

## 5. Component Structure

### Application Layout

```text
App
└── AppProvider
    └── RouterProvider
        └── Layout
            ├── ThemeToggle (loading state)
            ├── Header
            │   ├── ThemeToggle
            │   ├── SearchBox / ProductGrid
            │   └── CartPanel
            ├── Outlet
            │   └── Active Page
            └── Footer
```

### Home Page

```text
HomePage
├── HomeBanners
├── SaleCountdown
├── HomeCarousels
│   └── CarouselSection
│       └── ProductCard (multiple)
├── CategoryNav
└── ProductGrid
    └── ProductCard (multiple)
```

### Product Listing Page

```text
PlpPage
└── ProductGrid
    └── ProductCard (multiple)
```

The PLP displays products from the selected carousel and supports URL-based sorting.

### Product Details Page

```text
ProductPage
└── ProductDetail
    └── Add to Cart Button
```

### Checkout Page

```text
CheckoutPage
├── CheckoutForm
│   ├── Name Field
│   ├── Mobile Field
│   ├── Address Field
│   └── Submit Button
└── CheckoutSummary
    └── Cart Items and Quantity Controls
```

### Not Found Page

```text
NotFound
└── Link to Home
```

## 6. Component Responsibilities

| Component | Responsibility |
|---|---|
| `Layout` | Shared application layout, theme wrapper, header, outlet, and footer |
| `Header` | Shop information, navigation, search, cart dropdown, and theme toggle |
| `CartPanel` | Cart items, quantity controls, and total |
| `Footer` | Shop information, categories, help links, and schedule |
| `ThemeToggle` | Changes the application theme |
| `HomeBanners` | Displays homepage banners |
| `HomeCarousels` | Displays product carousels and PLP links |
| `ProductCard` | Displays product information and cart actions |
| `ProductGrid` | Displays a collection of products |
| `CategoryNav` | Displays category navigation |
| `SaleCountdown` | Displays the sale countdown |
| `LoadStateView` | Displays loading, empty, and error states |
| `CheckoutPage` | Handles checkout form validation and order submission |
| `ProductPage` | Displays product details and handles add-to-cart |
| `PlpPage` | Displays and sorts products for a carousel |
| `HomePage` | Composes the homepage sections |
| `NotFound` | Displays the fallback page |

## 7. Project Structure

```text
src/
├── api/
│   ├── guards.ts
│   └── index.ts
├── cart/
│   └── cart.ts
├── catalog/
│   ├── carousel-products.ts
│   ├── context.ts
│   ├── filter-products.ts
│   ├── pricing.ts
│   └── sort-products.ts
├── components/
│   ├── pages/
│   │   ├── CheckoutPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── NotFound.tsx
│   │   ├── PlpPage.tsx
│   │   └── ProductPage.tsx
│   ├── AppContent.tsx
│   ├── CartPanel.tsx
│   ├── CategoryNav.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── HomeBanners.tsx
│   ├── HomeCarousels.tsx
│   ├── Layout.tsx
│   ├── LoadStateView.tsx
│   ├── ProductCard.tsx
│   ├── ProductGrid.tsx
│   ├── SaleCountdown.tsx
│   ├── SearchBox.tsx
│   └── ThemeToggle.tsx
├── context/
│   ├── app-context.ts
│   ├── AppContext.tsx
│   └── useAppContext.ts
├── hooks/
│   ├── useAddToCart.ts
│   ├── useCartStore.ts
│   ├── useCatalog.ts
│   └── useThemeStore.ts
├── storage/
│   └── cart.ts
├── App.tsx
├── main.tsx
└── types.ts
```

## 8. Important Implementation Details

- Cart state is shared through Zustand.
- Theme state is shared through Zustand with persistence.
- Cart persistence is isolated in the storage layer.
- Cart calculations and operations are implemented in pure functions.
- The application uses `Layout` and `Outlet` for shared page structure.
- Product cards are reused across the homepage and PLP.
- Product details are available through `/product/$productId`.
- Checkout uses controlled form fields, validation, and input refs for focusing invalid fields.
- Successful checkout clears the cart and navigates back to the home page.
- PLP sorting is stored in the URL search parameters, so it survives refreshes.
