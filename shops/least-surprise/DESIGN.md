# Least Surprise Supermarket — Design Document

## 1. Requirements & Scope

### Must Do
- Browse available grocery products.
- View product stock, prices, and discount offers.
- Add products to cart with stock validation.
- Increment, decrement, and remove cart items.
- Persist cart data across page reloads.
- Search products by title.
- Filter products by category.
- Handle loading, success, empty, and error states.
- Retry failed API requests.
- Display a sale countdown with proper timer cleanup.

### Out of Scope
- User authentication and profiles.
- Online payment integration.
- Order history and delivery tracking.

## 2. Components

- **App:** Main application component and state owner.
- **Header:** Displays the brand and cart item count.
- **SearchBox:** Receives and updates the search query.
- **CategoryNav:** Displays category filters.
- **ProductGrid:** Renders the filtered product list.
- **ProductCard:** Displays product details and add-to-cart action.
- **CartPanel:** Displays cart items and total price.
- **SaleCountdown:** Displays the countdown timer.
- **Footer:** Displays footer information.

## 3. Data & State Ownership

- **API:** Provides products, stock, and discount offers.
- **App State:** Manages LoadState, search query, selected category, cart, retry attempt, and countdown visibility.
- **SaleCountdown State:** Manages the remaining countdown seconds.
- **localStorage:** Stores cart items for persistence.
- **Computed Values:** Total count, total price, and filtered products are calculated during rendering and are not stored as separate state.

## 4. API Contract

- `GET /products.json`: Retrieves product information.
- `GET /stock.json`: Retrieves stock information.
- `GET /offers.json`: Retrieves discount offers.

API responses are validated using runtime type guards.

Stock records use `id` and `stock`.
Offer records use `productId` and `discountPercent`.

The API requests run together using `Promise.all`.

## 5. Application States

The application uses a discriminated union named `LoadState`.

- **loading:** Product data is being fetched.
- **success:** Valid products are available.
- **empty:** No valid products are available.
- **error:** An API request or data loading operation failed.

Filtered results are calculated separately. If no products match the search or selected category, an empty-results message is displayed.

## 6. Directory Structure

- `src/types.ts`: Domain types and LoadState.
- `src/api/`: API requests and runtime validation.
- `src/catalog/`: Product filtering functions.
- `src/storage/`: Cart persistence using localStorage.
- `src/cart/`: Pure cart business logic.
- `src/components/`: React UI components.
- `src/App.tsx`: Application state and component coordination.
- `src/main.tsx`: React application entry point.

## 7. Security and Price Integrity

Client-side prices and totals must not be trusted for real transactions.

For a production payment system, the server should validate product prices, discount rules, stock availability, and final order totals before accepting an order.

The current project calculates cart totals on the client and does not implement a payment backend.