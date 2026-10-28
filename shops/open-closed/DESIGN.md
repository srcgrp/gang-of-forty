# Open-Closed Shop — Design on One Page

## 1. What must it do? (Requirements)

- A customer can view the list of products.
- A customer can browse products by category.
- A customer can search for products by name.
- A customer can see product prices, offers, and available stock.
- A customer can add products to the cart.
- A customer can increase or decrease product quantities in the cart.
- A customer can remove products from the cart.
- A customer can see the cart subtotal and total quantity.
- The cart is saved in localStorage and restored after refreshing the page.

Not now:
- User registration and login.
- Online payment and order submission.
- Server-side inventory updates.
- Product management for administrators.
- Advanced sorting and filtering.

## 2. Screens and Parts

- **Header:** Shop name, search input, cart count.
- **Category list:** Available product categories.
- **Product grid:** Products matching the selected category and search query.
- **Product card:** Product name, image, price, offer, stock status, and add-to-cart button.
- **Cart:** Cart items, quantities, remove buttons, subtotal, and total quantity.
- **Status messages:** Loading indicators, empty-state messages, and readable error messages.

## 3. Data (types.ts)

- **Product:** Product identity, name, category, price, and other product details.
- **Category:** Category identity and display information.
- **Stock:** Product stock and availability information.
- **Offer:** Discount or promotional information.
- **Cart:** The products and quantities selected by the customer.
- **CartItem:** A product identifier and its selected quantity.

The exact fields and relationships will follow the existing API JSON files.

## 4. Where Does Each Piece Live?

- **Server:** Product information, categories, stock, offers, and authoritative prices.
- **Client state:** Loaded data, loading status, selected category, search query, and current cart.
- **localStorage:** Persisted cart items and quantities.
- **URL:** No persistent filter or search state in the basic version.
- **Environment variables:** API base URL, configured separately for development and production in a later step.

## 5. API (What We Fetch, and When)

- `GET /api/products.json` → On application start; fetch and validate product data.
- `GET /api/stock.json` → On application start; fetch and validate stock data.
- Offers and categories will be read from the existing API data according to their actual JSON structure.

API responses are treated as untrusted data and validated before being used by the application.

## 6. States of Each Screen

- **Loading:** Show a loading message while the required API data is being fetched.
- **Success:** Display the available products and their information.
- **Empty:** Explain when no products are available or no products match the search or selected category.
- **Error:** Display a readable error message when data cannot be loaded or validated.

The cart also has an empty state when no items have been added.

## 7. Folders

- `src/types.ts` → Shared data types.
- `src/api/` → Fetching API data and validating external responses.
- `src/storage/` → Reading and writing localStorage.
- `src/cart/` → Cart rules and calculations.
- `src/ui/` → Creating and updating DOM elements.
- `src/main.ts` → Application state, event wiring, and startup.

Dependencies flow downward: `main.ts` coordinates the application; UI, logic, storage, and API modules depend on the types they need. The types module imports nothing.

## 8. Security

- Everything delivered to the browser is public and can be inspected or modified.
- Client-side TypeScript types do not validate API responses at runtime.
- Product prices and stock information must not be trusted solely because they were displayed in the browser.
- In a real checkout, the server must verify product prices, stock availability, and quantities and calculate the final order total.
- No secrets or private API keys belong in frontend code or `VITE_` environment variables.