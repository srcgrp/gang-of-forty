# Shayan Supermarket — Design on one page

## 1. What must it do? (requirements)

- A customer can browse product categories and products.
- A customer can view product prices and add products to the cart.
- A customer can see the cart item count and total price.
- A customer can remove products from the cart.
- The cart is saved in `localStorage` and persists across page reloads.
- The application displays loading, empty, and error states while loading shop data.

## 2. Screens and parts

- **App:** Owns application state and coordinates data loading, cart updates, and category selection.
- **AppContent:** Renders the appropriate loading, error, empty, or success content.
- **Header:** Displays the shop header and cart item count.
- **CategoryNav:** Displays categories and allows the customer to select a category.
- **ProductGrid:** Displays the products in the selected category.
- **ProductCard:** Displays product information and an add-to-cart button.
- **CartPanel:** Displays cart items, total price, and remove buttons.

## 3. Data (types.ts)

- `Shop`: shop information and details.
- `Category`: category information.
- `Home`: homepage configuration.
- `Product`: product information, including its ID, category, name, and price.
- `Stock`: product stock information.
- `Offer`: product discount information.
- `CartLine`: a product ID and its quantity in the cart.
- `AppData`: combined API data used to render the application.
- `LoadState`: loading, success, empty, and error states for API data.

## 4. Where does each piece live?

- **Server:** Shop information, categories, homepage configuration, products, stock, and offers are provided by API JSON files.
- **App state:** The `App` component owns the loaded data state, selected category ID, and cart.
- **localStorage:** Cart data is stored under the `cart` key.
- **Derived values:** Filtered products, cart item count, and cart total are calculated during rendering instead of being stored as state.

Product prices and stock are loaded from the API. Cart quantities are stored locally. The server must validate prices, stock, and quantities and calculate the final order total before checkout.

## 5. API (what we fetch, and when)

All six JSON files are fetched in parallel when the application starts:

- `GET /api/shop.json` → shop information.
- `GET /api/categories.json` → product categories.
- `GET /api/home.json` → homepage configuration.
- `GET /api/products.json` → product catalog.
- `GET /api/stock.json` → product stock quantities.
- `GET /api/offers.json` → product discounts.

The API layer handles fetching and response checks. The application uses TypeScript types and guards to validate the expected data shapes.

## 6. States of each screen

- **Loading:** A loading message is displayed while API data is being fetched.
- **Success:** The header, categories, product grid, and cart are rendered.
- **Empty:** A message is displayed when there are no products.
- **Error:** An error message is displayed if loading API data fails.
- **Cart:** The cart is initialized from `localStorage`. If stored data is invalid or unavailable, the application falls back to an empty cart.

## 7. Component tree

```text
App
└── AppContent
    ├── Header
    ├── CategoryNav
    ├── ProductGrid
    │   └── ProductCard × n
    └── CartPanel
```

## 8. Where does each state live?

| State | Owning component | Who changes it? | Where is it stored? |
|---|---|---|---|
| `cart` | App | ProductCard through `onAdd`; CartPanel through `onRemove` | React state and `localStorage` |
| `selectedCategoryId` | App | CategoryNav through `onPick` | React state |
| `loadState` | App | API loading Effect | React state |

**Derived values (not state):**

- `itemCount`: Calculated from cart quantities during rendering. It does not need separate state because it can be derived from `cart`.
- `total`: Calculated from cart items and product prices during rendering. It does not need separate state because it can be derived from `cart` and `products`.
- `visibleProducts`: Calculated by filtering products using `selectedCategoryId`. It does not need separate state because it can be derived from the products and selected category.

## 9. Folders

The current structure after the React refactoring:

- `src/App.tsx` — application state, Effects, and event handlers.
- `src/main.tsx` — React application entry point.
- `src/components/` — React components, including `AppContent`, `Header`, `CategoryNav`, `ProductGrid`, `ProductCard`, and `CartPanel`.
- `src/api/` — fetching API data and validating external responses.
- `src/storage/` — reading and writing `localStorage`.
- `src/cart/` — pure cart operations and pricing calculations.
- `src/types.ts` — shared TypeScript types.

`index.html` and `style.css` remain in the shop root. The application UI is implemented with React components.
