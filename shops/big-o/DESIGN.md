# <big-o> — design on one page

## 1. What must it do? (requirements)
- A customer can see products which are separated by their category.
- A customer can see offered products that have a discount.
- A customer can see different categories and click to see its products.
- A customer can see out-of-stock label on products which are out of stock.
- A customer can add a product to the cart and see the cart badge count, which stays after a reload.
- A customer can see the shop's information in the footer.
- Not now: payments, login, signup, see the cart details, deleting from the cart, changing the number of items.

## 2. Screens and parts
Announcement · Header (logo, search (static), cart count) · Navbar (mega-menu, navbar) · Banner (static) · Category list · Product card · Offered carousel · Advertise (static) · Product carousel · Footer · Loading / empty / error messages.

## 3. Data (types.ts)
Product, Category, Stock, Offer, Shop.
Also two types for the page: CardInfo (offer label, percent, final price and inStock of one card) and LoadState (loading, success, empty or error).

## 4. Where does each piece live?
- Server: Product, Category, Stock, Offer, Shop
- Client state: copies of Product, Category, Stock, Offer, Shop, load status (loading / success / error) and the cart count. `main.ts` owns the cart count.
- localStorage: cart count only (key `big-o-cart`)
- URL: nothing for now

## 5. API (what we fetch, and when)
All files are fetched together with `Promise.all` when the page loads. The app only reads, it never writes.
The base address comes from `VITE_API_URL` (`/api` in dev, `../../api` in production).
- `categories.json` → `Category[]`
- `products.json` → `Product[]`
- `offers.json` → `Offer[]`
- `shop.json` → `Shop`
- `stock.json` → `Stock`

Every file is checked by a guard (`isProduct`, `isShop`, ...) before we use it. Bad items in a list are removed, and a bad `shop.json` or `stock.json` is an error.

## 6. States of each screen
- loading: a "در حال بارگذاری…" message inside each section (dairy, special products, categories)
- success: announcement, carousels, product cards, footer information
- empty: a message "محصولی پیدا نشد" inside the carousel that has no products
- error: a "بارگذاری اطلاعات ممکن نشد." message with the reason, inside each section (dairy, special products, categories)

If a carousel has only one product, that card gets only `first-<id>`, not `last-<id>` (the first one wins).

## 7. Folders
Imports only go down: main → ui / logic / data → types.
- `src/types.ts` — types: the models, imports nothing
- `src/api/` — data: reads the JSON files (`getData`) and checks them with guards (`guards`)
- `src/storage/` — data: saves and reads the cart count in localStorage
- `src/cart/` — logic: calculates the new cart count (`nextCartCount`)
- `src/catalog/` — logic: filters products, final price and card info
- `src/ui/` — ui: builds and shows the page parts, messages and the cart counter
- `src/main.ts` — main: keeps the state and connects all the layers

## 8. Security
- Everything that reaches the browser is public (the code, the JSON files and the `VITE_` variables). We do not put secrets in `VITE_` variables.
- We only keep the cart count in localStorage. The user can change it, so the final price of the cart must be calculated by the server.
- JSON data is checked with guards before we use it.
- Texts are added to the page with `textContent`, not `innerHTML`.