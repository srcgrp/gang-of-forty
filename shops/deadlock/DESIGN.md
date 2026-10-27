# Herman Shop (deadlock) — design on one page
 
## 1. What must it do? (requirements)
- A customer can see products and discounted items.
- A customer can interact with the search box visually.
- A customer can click + on an available product, which shows a message and confetti.
- A customer cannot add out-of-stock products (the button is disabled).
- A customer can see how many product they got  in their cart by clicking on +(header will be 0 again  after refresh).
- The search box does not filter real results.
- Banners and categories do not navigate to other pages (single-page layout).
## 2. Screens and parts
- **Header:** SVG logo, search box, shopping cart icon, hamburger menu.
- **Promo nav:** "Buy 2 get 1 free" message.
- **Entry banners:** two decorative banners.
- **Categories:** static icons.
- **Special offers carousel:** products that have an offer (`#special-offers .carousel`).
- **Groceries carousel:** products with `categoryId` 4 (`#tents .carousel`).
- **Ad banners:** two promotional banners.
- **Footer.**
## 3. Data and owners
| Data | Owner | Notes |
|---|---|---|
| Products, offers, stock | Server (`/api/*.json`) | read-only for the page |
| Shop info (`shop.json`) | Server | only the type is defined for now, the page does not fetch it |
| Page state (`LoadState`) | `main.ts`, in memory | lost on refresh, that is fine |
| Cart counter | `main.ts`, in memory | a number, resets on refresh, nothing in `localStorage` |
| API address | `.env.development` / `.env.production` | public, no secrets |

## 4. API (what we fetch, and when)
All three are fetched together on start and each response is checked by a Type Guard before use. Bad items are dropped and their count is logged.
 
| Request | Shape | When |
|---|---|---|
| GET `/api/products.json` | `Product[]` | on start |
| GET `/api/offers.json` | `Offer[]` | on start |
| GET `/api/stock.json` | `Stock` (`updatedAt`, `items` by product id) | on start |
 
In dev, `/api` is proxied to the real site. In production the page reads the address from `VITE_API_URL`.
 
## 5. States of each screen
Both carousels (special offers and groceries) have four states:
- **loading:** a "loading" message inside the carousel.
- **success:** product cards. Out-of-stock cards are dimmed with a disabled button. Offer cards show a discount badge.
- **empty:** a message that there is nothing to show right now.
- **error:** a readable error message. The details go to the Console.
Header, categories, banners and footer are static and have no states.
 
## 6. Folders
- `src/types.ts`: `Product`, `Category`, `Offer`, `Stock`, `Shop`, `LoadState`. Imports nothing.
- `src/api/`: `getJSON` (returns `unknown`), the three fetches and their Type Guards.
- `src/logic/`: pure rules: price after discount, in-stock check, grocery filter, finding the offer of a product.
- `src/ui/`: builds and updates the page: product cards, carousels, messages, the cart counter text, the Notyf toast and confetti.
- `src/main.ts`: click listener (event delegation), the cart counter number, `LoadState`, and starting the app.
- Not created: `storage/` and `cart/`, because the cart is only a counter in memory and nothing is stored.

## 7. Security
- Everything in the browser (prices, page state, `localStorage`) can be changed with DevTools. So the final cart total and any checkout must be calculated and verified by the server, never trusted from the client.
- Every `VITE_` variable ends up in the public bundle. Only public values (like the API address) go in `.env` files, never keys or passwords.