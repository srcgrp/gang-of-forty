# big-o — design on one page

## 1. What must it do? (requirements)
- A customer can see products which are separated by their category.
- A customer can see offered products that have a discount.
- A customer can see different categories and click to see its products.
- A customer can see out-of-stock label on products which are out of stock.
- A customer can add a product to the cart and see the cart badge count, which stays after a reload.
- A customer can see the shop's information in the footer.
- Not now: payments, login, signup, see the cart details, deleting from the cart, changing the number of items.

## 2. Screens and parts
Announcement · Header (logo, search(static), cart count) · Navbar(mega-menu, navbar) · Banner(static) · Category list · Product card · Offered carousel · Advertise(static) · Product carousel · Footer · Show Loading / error messages.

## 3. Data (types.ts)
Product, Category, Stock, Offer, Shop, Cart

## 4. Where does each piece live?
Server: Product, Category, Stock, Offer, Shop  
Client state: Copies of Product, Category, Stock, Offer, Shop, load status (loading / success / error), cart count
localStorage: cart count (key big-o-cart)
URL: nothing for now

## 5. API (what we fetch, and when)
All files are fetched together with `Promise.all` when the page loads. The app only reads, it never writes.
- `categories.json` → `Category[]`
- `products.json` → `Product[]`
- `offers.json` → `Offer[]`
- `shop.json` → `Shop`
- `stock.json` → `Stock`

## 6. States of each screen
loading:‌ a "در حال بارگذاری…" message inside each section (dairy, special products, categories)
success : announcement, carousels, productCards, footer informations
empty: not handled yet
error: a "بارگذاری اطلاعات ممکن نشد. اینترنت را بررسی کنید." message inside each section (dairy, special products, categories)

## 7. Folders
src/types.ts · src/api/ · src/storage/ · src/cart/ · src/ui/ · src/main.ts