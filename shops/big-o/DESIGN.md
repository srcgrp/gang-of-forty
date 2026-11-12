# <big-o> — design on one page

## 1. What must it do? (requirements)
- A customer can see products which are separated by their category.
- A customer can see offered products that have a discount.
- A customer can see different categories and click to see its products.
- A customer can see which category is selected in the menu.
- A customer can see out-of-stock label on products which are out of stock.
- A customer can add a product to the cart and see the cart badge count.
- A customer can open the cart panel, change the number of each item, remove an item and see the total.
- The cart stays after a reload.
- A customer can see the shop's information in the footer.
- A customer can see how much time is left for the special offers sale, and hide or show the countdown.
- Not now: payments, login, signup.

## 2. Screens and parts
Announcement · Header (logo, search (static), cart count) · Navbar (mega-menu, navbar) · Banner (static) · Category list · Product card · Offered carousel (with sale countdown) · Advertise (static) · Product carousel · Cart panel (drawer) · Cart item row · Footer · Loading / empty / error messages.

## 3. Component tree
```
App
├─ Header
│   ├─ Announcement
│   └─ CategoryNav
├─ main
│   └─ ShopMain
│       ├─ Hero
│       ├─ CategoryList
│       ├─ ProductGrid (special products)
│       │   ├─ SaleBox (in the header, next to the title)
│       │   │   └─ SaleCountdown
│       │   └─ ProductCard (Badge, Price)
│       ├─ Ads
│       └─ ProductGrid (selected category)
├─ CartPanel
│   └─ CartItemRow
└─ Footer
```
Data goes down with props. Events go up with callback props (`onAdd`, `onRemove`, `onSelect`, `onPick`, `onCartClick`, `onClose`).

## 4. State
| State | Owner | Who changes it | Where it is stored |
|---|---|---|---|
| `cart` | `App` | `handleAdd` (from `ProductCard`), `handleRemove` (from `CartPanel`) | localStorage (`storage/`) |
| `state` (LoadState) | `App` | the fetch effect | memory |
| `categoryId` | `App` | `CategoryNav`, `CategoryList`, `Footer` | memory |
| `cartOpen` | `App` | `Header` opens it, `CartPanel` closes it | memory |
| `open` (countdown shown) | `SaleBox` | the show/hide button in `SaleBox` | memory |
| `left` (seconds left) | `SaleCountdown` | the interval in its effect, one less every second | memory (starts again from 10 minutes on every mount) |

`open` and `left` are local State: only `SaleBox` and `SaleCountdown` use them, so they do not go up to `App`.
The countdown effect has `[]` deps: it starts a `setInterval` on mount and stops it with `clearInterval` in the cleanup, so after the countdown is hidden (unmount) the interval does not run anymore.

These values are **not** State, we calculate them in every render:
- `count` (number of items in the cart) and the cart total: calculated from `cart`.
- `categories` and `shopName`: calculated from `state`.
- the selected category and its products: calculated from `categoryId` and `state`.

Why: if we keep a second copy in State, it can go out of sync with the original (for example `cart` changes but `total` does not). One source of truth, everything else is calculated.

## 5. Data (types.ts)
Product, Category, Stock, Offer, Shop, CartItem (id, name, price, qty).
Also two types for the page: CardInfo (offer label, percent, final price and inStock of one card) and LoadState (loading, success, empty or error).

## 6. Where does each piece live?
- Server: Product, Category, Stock, Offer, Shop
- Client state: copies of Product, Category, Stock, Offer, Shop and the load status (in `state`), the cart items (in `cart`), the selected category and the cart panel open flag. `App` owns all of them.
- localStorage: cart items (id, name, price, qty) only (key `big-o-cart`)
- URL: only the anchors (`#slug`) to jump to a section

## 7. API (what we fetch, and when)
All files are fetched together with `Promise.all` when the page loads (the effect in `App` calls `loadShopState`). The app only reads, it never writes.
The base address comes from `VITE_API_URL` (`/api` in dev, `../../api` in production).
- `categories.json` → `Category[]`
- `products.json` → `Product[]`
- `offers.json` → `Offer[]`
- `shop.json` → `Shop`
- `stock.json` → `Stock`

Every file is checked by a guard (`isProduct`, `isShop`, ...) before we use it. Bad items in a list are removed, and a bad `shop.json` or `stock.json` is an error.
The effect has a cleanup (`ignore` flag), so an old response never changes the State after the effect is stopped.

## 8. States of each screen
`ShopMain` decides what to show from `state.status`:
- loading: a "در حال بارگذاری…" message
- success: hero, categories, carousels, product cards
- empty: a message "محصولی پیدا نشد"
- error: a "بارگذاری اطلاعات ممکن نشد." message with the reason

The cart panel shows a message when the cart is empty. Every product card has a `key`.
If a carousel has only one product, that card gets only `first-<id>`, not `last-<id>` (the first one wins).

## 9. Folders
Imports only go down: main → App → components → logic / data → types.
- `src/types.ts` — types: the models, imports nothing
- `src/api/` — data: reads the JSON files (`getData`), turns the result into a LoadState (`loadShopState`) and checks the data with guards (`guards`, `shopGuards`)
- `src/storage/` — data: saves and reads the cart items in localStorage
- `src/cart/` — logic: pure functions that return a new cart (`addToCart`, `decreaseItem`)
- `src/catalog/` — logic: filters products, final price and card info
- `src/components/` — ui: React components, they get everything with props
- `src/App.tsx` — owns the State, the Effects and the event functions
- `src/main.tsx` — mounts `App`

## 10. Security
- Everything that reaches the browser is public (the code, the JSON files and the `VITE_` variables). We do not put secrets in `VITE_` variables.
- We keep the cart items in localStorage. The user can change them, so we check every item with `isCartItem` when we read it, and the final price of the cart must be calculated by the server.
- JSON data is checked with guards before we use it.
- React escapes the texts by default. We never use `dangerouslySetInnerHTML`.