# Least Surprise Supermarket — design on one page

## 1. Requirements & Scope
- **Must do:**
  - Browse available grocery products.
  - View product stock, prices, and active discount offers.
  - Add items to cart with stock validation (cannot exceed available stock).
  - Increment/decrement quantities and remove items from cart.
  - Persistent cart state across page reloads.
  - Resilient UI handling network failure, malformed JSON, and empty states.
- **Out of scope (Not now):**
  - User authentication and user profile management.
  - Online payment gateway integration.
  - Order history and delivery tracking.

## 2. Screens and Components
- **Header:** Brand logo, search input, and cart badge with item counter.
- **Category Navigation:** Category list and filter buttons.
- **Product Section:** Product grid containing dynamic product cards (image, title, price, discount badge, stock state, and "Add to Cart" button).
- **Cart Section:** Cart drawer/modal displaying selected items, quantities, total count, and total amount.
- **Feedback & States:** Skeleton/loading spinner, empty state illustration, error banners, and celebratory confetti/toast notifications.

## 3. Data & State Ownership
- **Server:** Canonical product list, real-time stock levels, active discount offers.
- **Client In-Memory State:** Current `LoadState`, search term, active filter, UI drawer toggle.
- **localStorage:** Cart items (`CartItem[]`) for persistence across page refreshes.
- **URL:** Category and search query parameters (if active).
- **Environment (`.env`):** `VITE_API_URL` pointing to local or production API endpoints.

## 4. API Contract
- `GET ${VITE_API_URL}/products.json` → Fetched on application startup; validated via `isProduct` guard.
- `GET ${VITE_API_URL}/stock.json` → Fetched on application startup; validated via `isStock` guard.
- `GET ${VITE_API_URL}/offers.json` → Fetched on application startup; validated via `isOffer` guard.

## 5. Screen States (LoadState)
- **`loading`:** Data fetching in progress; display loading indicator/skeleton.
- **`success`:** Valid data retrieved; dynamically render product cards and interactive UI.
- **`empty`:** Response is empty array or filtered query has zero matches; display friendly empty state.
- **`error`:** Network failure, HTTP 4xx/5xx, or invalid schema structure; display user-friendly error message.

## 6. Directory Structure & Layers
- `src/types.ts`: Domain models, utility types, and discriminated unions (`LoadState`).
- `src/api/`: Network calls (`getJSON`) and runtime Type Guards (`isProduct`, `isStock`, etc.).
- `src/storage/`: Dedicated `localStorage` access for cart persistence.
- `src/cart/`: Pure business logic for cart operations (add, remove, total calculation).
- `src/ui/`: DOM manipulation, rendering functions, and badge updates.
- `src/main.ts`: Application orchestrator, state management, and event listeners.

## 7. Security (Why calculate totals on the server?)
- **Price Manipulation:** Client-side JavaScript code and DOM are fully accessible and editable by the end user via DevTools. A malicious user could tamper with prices or discount percentages before checkout.
- **Single Source of Truth:** Inventory levels and prices change dynamically on the server; calculating totals on the backend guarantees financial integrity and prevents fraudulent orders.
