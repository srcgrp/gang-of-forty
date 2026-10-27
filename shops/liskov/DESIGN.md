# سوپرمارکت شایان — Design on one page

## 1. What must it do? (requirements)

- A customer can browse the shop information, banners, promotions, and product categories.
- A customer can browse product carousels, view prices and discounts, and see whether products are in stock.
- A customer can add available products to the cart and see the cart item count.
- The cart is saved in `localStorage` so it can persist across page reloads.
- A customer can navigate to category sections using links and URL fragments.
- Not now: working product search, a full cart page, removing items from the cart, changing quantities, and checkout.

## 2. Screens and parts

- Header: shop notice, navigation menu, search field, and cart count.
- Banners: main and secondary banners.
- Categories: category cards and category navigation.
- Promotions: promotional banners.
- Product carousels: discounted products and products grouped by category.
- Product card: emoji, name, unit, price, discount, stock status, and add-to-cart button.
- Footer: shop information, address, phone, help links, opening hours, and copyright.
- Loading and error states: skeleton content while loading and an error message if loading fails.

## 3. Data (types.ts)

- `Shop`: shop information, navigation links, contact details, and schedule.
- `Category`: category ID, slug, name, emoji, and color.
- `Home`: banners, promotions, and carousel configuration.
- `Product`: product ID, category ID, name, emoji, unit, price, and tags.
- `Stock`: product IDs mapped to available quantities.
- `Offer`: product ID and discount percentage.
- `Cart`: product IDs mapped to quantities in `localStorage`.
- `AppData`: combined API data used to render the page.

## 4. Where does each piece live?

- Server: shop information, categories, homepage configuration, products, stock, and offers in the API JSON files.
- Client state: loaded application data and derived lookup maps used to render the page.
- `localStorage`: cart quantities under the `cart` key.
- URL: the current hash identifies a section to scroll to, for example `#dairy`.
- `.env`: the API base URL will be configured separately for development and production.

Product prices and stock are loaded from the API. Cart quantities are stored locally. The server must validate prices, stock, and quantities and calculate the final order total before checkout.

## 5. API (what we fetch, and when)

All six JSON files are fetched in parallel when the application starts:

- `GET /api/shop.json` → shop information.
- `GET /api/categories.json` → product categories.
- `GET /api/home.json` → banners, promotions, and carousels.
- `GET /api/products.json` → product catalog.
- `GET /api/stock.json` → product stock quantities.
- `GET /api/offers.json` → product discounts.

The current implementation uses TypeScript types for the expected response shapes and checks HTTP errors. Runtime validation of external JSON data is not implemented yet.

## 6. States of each screen

- Loading: skeleton banners, category tiles, and product cards.
- Success: shop information, categories, banners, promotions, and product carousels are rendered.
- Empty: a carousel displays a message when it has no products to show.
- Error: an error message is displayed if loading the API data fails.
- Cart: the saved cart count is rendered on startup. If stored data is invalid or unavailable, the application falls back to an empty cart.

## 7. Folders

The target structure after refactoring is:

- `src/types.ts` — shared TypeScript types.
- `src/api/` — fetching API data and validating external responses.
- `src/storage/` — reading and writing `localStorage`.
- `src/cart/` — pure cart and pricing rules.
- `src/catalog/` — product filtering and catalog logic.
- `src/ui/` — creating and updating DOM elements.
- `src/main.ts` — application state, event listeners, and startup.

`index.html` and `style.css` remain in the shop root. The existing `script.ts` will be split into these layers during the refactoring step.
