# Open-Closed Shop — Design on One Page

## 1. What must it do? (Requirements)

- A customer can view the products available in the shop.
- A customer can browse products by category.
- A customer can search for products by name.
- A customer can see product names, prices, units, tags, and available stock.
- A customer can see product offers and discount percentages.
- A customer can add products to the cart.
- A customer can increase or decrease product quantities.
- A customer can remove products from the cart.
- A customer can see the cart subtotal and total quantity.
- A customer can see the shop's delivery fee and free-delivery threshold.
- The cart is saved in `localStorage` and restored after refreshing the page.

Not now:
- User registration and login.
- Online payment and order submission.
- Server-side inventory updates.
- Product management for administrators.
- Advanced sorting and filtering.

## 2. Screens and Parts

- **Header:** Shop name, search input, and cart count.
- **Category list:** Available categories with their names and emojis.
- **Product grid:** Products matching the selected category and search query.
- **Product card:** Product name, emoji, unit, price, tags, offer, stock status, and add-to-cart button.
- **Cart:** Cart items, quantities, remove buttons, subtotal, and total quantity.
- **Delivery information:** Delivery fee and free-delivery threshold.
- **Status messages:** Loading indicators, empty-state messages, and readable error messages.

## 3. Data (`types.ts`)

- **Product:** `id`, `categoryId`, `name`, `emoji`, `unit`, `price`, and `tags`.
- **Category:** `id`, `slug`, `name`, `emoji`, and `color`.
- **Stock:** `updatedAt` and `items`, mapping product IDs to stock quantities.
- **Offer:** `productId`, `percent`, and `label`.
- **Shop:** Shop name, slogan, delivery fee, free-delivery threshold, currency, and other shop information.
- **CartItem:** A product ID and the quantity selected by the customer.
- **Cart:** The collection of cart items and the information needed to calculate its totals.

The TypeScript types will describe the expected JSON structures. API responses must also be checked at runtime because TypeScript types alone cannot validate incoming JSON.

## 4. Where Does Each Piece Live?

- **Server/API data:** Products, categories, offers, stock information, and shop settings are provided by the existing JSON files.
- **Client state:** Loaded data, loading and error status, selected category, search query, and current cart.
- **`localStorage`:** Cart items and quantities, so the cart can be restored after a page refresh.
- **URL:** No persistent search or category-filter state in the basic version.
- **Environment variables:** An optional API base URL can be configured for development and production later. No secrets should be stored in frontend environment variables.

## 5. API (What We Fetch, and When)

Fetch the required JSON files when the application starts:

- `GET /api/products.json` → Product data.
- `GET /api/categories.json` → Category data.
- `GET /api/offers.json` → Product offers and discount percentages.
- `GET /api/stock.json` → Stock quantities and last-update timestamp.
- `GET /api/shop.json` → Shop information and delivery settings.

The application combines related data using product IDs and category IDs. For example, an offer's `productId` identifies the product to which the offer applies, and a product's `categoryId` identifies its category.

API responses must be checked for valid structure and reasonable values before they are used.

## 6. States of Each Screen

- **Loading:** Show a loading message while the required API data is being fetched.
- **Success:** Display the available products and their information.
- **Empty:** Explain when no products are available or no products match the selected category or search query.
- **Error:** Display a readable error message when required data cannot be fetched or validated.
- **Empty cart:** Explain that the cart has no items and invite the customer to add products.

## 7. Folders

- `src/types.ts` → Shared data types.
- `src/api/` → Fetching API data and validating external responses.
- `src/storage/` → Reading and writing `localStorage`.
- `src/cart/` → Cart rules, quantity updates, and calculations.
- `src/ui/` → Creating and updating DOM elements.
- `src/main.ts` → Application startup, state coordination, and event wiring.

`main.ts` coordinates the application. API access, storage, cart logic, and UI rendering should be separated into their own modules. Shared types should not depend on those modules.

## 8. Security

- Everything delivered to the browser is public and can be inspected or modified.
- TypeScript types do not validate API responses at runtime.
- Client-side prices and stock information must not be treated as authoritative during a real purchase.
- In a real checkout, the server must verify product prices, stock availability, and quantities, then calculate the final order total.
- No secrets or private API keys belong in frontend code or `VITE_` environment variables.