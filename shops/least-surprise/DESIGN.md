
# Least Surprise Supermarket — Design Document

## 1. Requirements & Scope

### Must Do
- Browse grocery products.
- View product stock, prices, and discount offers.
- Add products to cart with stock validation.
- Remove products from cart.
- Persist cart and theme settings.
- Search products by title.
- Browse product categories and offers.
- Navigate between Home and PLP pages.
- Handle loading, success, empty, and error states.
- Retry failed product requests.
- Display a sale countdown with timer cleanup.
- Support light and dark themes.

### Out of Scope
- User authentication.
- Online payment.
- Order history.
- Delivery tracking.

## 2. Routing

| Route | Page | Description |
|---|---|---|
| `/` | HomePage | Home page with product carousels |
| `/plp/$carouselId` | PlpPage | Products for a selected carousel |
| Unknown route | NotFound | Invalid route handling |

Routing is implemented using TanStack Router and hash history.

## 3. Component Architecture

### Root
- App
  - Layout
    - Header
    - Outlet
      - HomePage
      - PlpPage
      - NotFound
    - CartPanel
    - Footer

### HomePage
- SearchBox
- SaleCountdown
- ProductGrid
  - ProductCard

### PlpPage
- SearchBox
- ProductGrid
  - ProductCard

## 4. State Ownership

| State | Owner | Persistence |
|---|---|---|
| Theme | useThemeStore | localStorage |
| Cart items | useCartStore | localStorage |
| Product loading state | useCatalog | React state |
| Retry attempt | useCatalog | React state |
| Search query | HomePage / PlpPage | React state |
| Home configuration | HomePage / PlpPage | React state |
| Countdown seconds | SaleCountdown | React state |

### Derived Values
- Cart total count.
- Cart total price.
- Filtered products.
- Carousel product lists.

Derived values are calculated from existing state and are not stored separately.

## 5. Zustand Stores

### useThemeStore
- Stores the current theme.
- Toggles between light and dark.
- Persists theme in localStorage.

### useCartStore
- Stores cart items.
- Adds products with stock validation.
- Removes cart items.
- Calculates total quantity and total price.
- Persists cart in localStorage.

## 6. Data & API

### API Files
- `GET /products.json`
- `GET /stock.json`
- `GET /offers.json`
- `GET /home.json`

Products, stock, and offers are loaded by `loadShopData`.
Requests are performed using Promise.all.

Runtime type guards validate API data.

### Data Structure
- Products: id, title, price, category, image.
- Stock: id, stock.
- Offers: id, discount.
- Home configuration: carousels.

## 7. Custom Hook

### useCatalog
- Loads product data.
- Manages loading, success, empty, and error states.
- Provides retry functionality.
- Prevents state updates after unmount.

## 8. Catalog Logic

### carouselProducts
- Category carousel: filters products by categoryId.
- Offers carousel: filters products with discounts.
- Returns the products belonging to the selected carousel.

### filterProducts
- Filters products by selected category.
- Filters products by search query.

## 9. Directory Structure

- `src/api/`: API requests and data validation.
- `src/cart/`: Cart business logic.
- `src/catalog/`: Product filtering and carousel logic.
- `src/components/`: Shared UI components and Layout.
- `src/hooks/`: Custom hooks and Zustand stores.
- `src/pages/`: HomePage, PlpPage, NotFound.
- `src/storage/`: Cart storage utilities.
- `src/types.ts`: TypeScript domain types.
- `src/App.tsx`: Router configuration.
- `src/main.tsx`: React entry point.
- `src/style.css`: Application styles.
- `public/`: JSON data and public assets.

## 10. Performance

React Profiler was used to record component rendering during cart and theme updates.

Profiler recording was captured as evidence for the assignment.

## 11. Security & Price Integrity

Client-side prices and cart totals are not trusted for real transactions.

A production backend must validate prices, discounts, stock, and order totals before processing payments.

The current project does not include a payment backend.
