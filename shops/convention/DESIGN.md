# Convention Store - Design Documentation

## 1. Component Tree

The application uses a component-based architecture with React.

```text
App
├── Header
├── CategoryNav
├── ProductGrid
│   └── ProductCard
└── CartPanel
```

### Component Responsibilities

- **App:** Main component that manages application state, side effects, and connects other components.
- **Header:** Displays the website header and cart item count.
- **CategoryNav:** Displays product categories.
- **ProductGrid:** Displays products and handles loading, success, empty, and error states.
- **ProductCard:** Displays an individual product and provides an add-to-cart action.
- **CartPanel:** Displays cart items, quantities, prices, and the total amount. It also provides the remove action.

## 2. State Table

| State | Type | Location | Purpose |
|---|---|---|---|
| cart | CartItem[] | App | Stores cart items and quantities |
| productsState | LoadState<Product[]> | App | Manages product loading and API results |

### State Details

- The `cart` state is initialized using `loadCart()` from localStorage.
- Cart changes are saved using `saveCart()`.
- The `productsState` state manages four possible statuses:
  - loading
  - success
  - empty
  - error

## 3. Derived Values

The following values are calculated from the application state:

| Value | Calculation | Purpose |
|---|---|---|
| products | Products from successful productsState | Provides available products |
| cartLines | Matches cart items with product data | Provides complete cart item information |
| total | Sum of price × quantity | Calculates the cart total |
| cartCount | getCartCount(cart) | Calculates the total number of items in the cart |

Derived values are calculated during rendering and are not stored as separate state.

## 4. Side Effects

The application uses React `useEffect` for the following operations:

- Fetch products from the API.
- Cancel pending API requests using `AbortController` during cleanup.
- Save cart changes to localStorage using `saveCart`.
- Update `document.title` whenever the cart changes.

## 5. Folder Structure

```text
src/
├── api/
│   ├── catalog-data.ts
│   ├── get-json.ts
│   └── products.ts
├── cart/
│   └── cart.ts
├── catalog/
│   └── products.ts
├── components/
│   ├── CartPanel.tsx
│   ├── CategoryNav.tsx
│   ├── Header.tsx
│   ├── ProductCard.tsx
│   └── ProductGrid.tsx
├── data/
│   └── sample-products.ts
├── storage/
│   └── cart-storage.ts
├── App.tsx
├── main.tsx
└── types.ts
```

### Folder Responsibilities

- **api:** Handles API requests, product retrieval, and additional catalog data.
- **cart:** Contains pure functions for cart operations.
- **catalog:** Contains catalog-related utility functions.
- **components:** Contains reusable React UI components.
- **data:** Contains sample product data.
- **storage:** Handles cart persistence in localStorage.
- **App.tsx:** Manages application state and connects components.
- **main.tsx:** React application entry point.
- **types.ts:** Contains shared TypeScript types and interfaces.

### Additional Notes

Some modules are not currently connected to the main React application flow:

- `data/sample-products.ts` contains sample product data.
- `catalog/products.ts` contains the `formatPrice` utility.
- `api/catalog-data.ts` provides functions for fetching categories, offers, and stock information.

These modules are retained in the project but are not currently used by the active React components.