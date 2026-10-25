# <Shop name> — design on one page

## 1. What must it do? (requirements)
- A customer can see products and discounted items.
- A customer can interact with the search box visually.
- A customer can click to add an available product, which triggers a UI message.
- A customer cannot add out-of-stock products (the button is completely disabled).

- Not now: There is no functional shopping cart (it is purely decorative) and no ability to remove items. The search box does not filter real results, and banners/categories do not navigate to other pages (single-page layout).

## 2. Screens and parts
- **Header:** SVG Logo, Search box, Shopping cart icon, Hamburger menu
- **Promo Nav:** "Buy 2 get 1 free" message span
- **Entry Banners:** Two decorative banners with buy items
- **Main Sections:** Categories, "Today's Special Offer", Groceries (Product grid)
- **Ad Banners:** Two promotional banners pointing to categories
- **Footer**

## 3. Data and Owners
- **Products, Offers, Shop info:** Server (API `.json` files).
- **Cart data:** None (UI only, no `localStorage` or database used).

## 4. API (what we fetch, and when)
- GET `/api/shop.json` -> on start.
- GET `/api/products.json` -> on start.
- GET `/api/offer.json` -> on start.

## 5. States of each screen
- loading · success · empty · error.

## 6. Folders
- `src/types.ts` (Type definitions, no imports).
- `src/api/` (Network requests).
- `src/ui/` (DOM manipulation and rendering).
- `src/logic/` (Pure functions and rules).
- `src/main.ts` (Event listeners and initialization).

## 7. Security
- Any data in the browser (like product prices or UI state) can be altered using DevTools. Therefore, the final cart total and checkout process must always be calculated and verified by the server, not the client.