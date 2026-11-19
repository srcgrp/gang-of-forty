# <big-o> — design on one page

## 1. What must it do? (requirements)
- A customer can see products which are separated by their category.
- A customer can see offered products that have a discount.
- A customer can see different categories and click to see its products.
- A customer can see which category is selected in the menu.
- A customer can open a page with all the products of one carousel or category (PLP), and the page stays the same after a reload.
- A customer can see out-of-stock label on products which are out of stock.
- A customer can add a product to the cart and see the cart badge count.
- A customer can open the cart panel, change the number of each item, remove an item and see the total.
- The cart stays after a reload.
- A customer can switch between the light and the dark theme, and the theme stays after a reload.
- A customer can use the browser Back and Forward buttons to move between pages.
- A customer can see a "not found" page for a wrong address.
- A customer can see the shop's information in the footer.
- A customer can see how much time is left for the special offers sale, and hide or show the countdown.
- Not now: payments, login, signup, product page, checkout form.

## 2. Screens and parts
Announcement · Header (logo, search (static), theme toggle, cart count) · Navbar (mega-menu, navbar) · Banner (static) · Category list · Product card · Offered carousel (with sale countdown) · Advertise (static) · Product carousel · Product list page (PLP) · Not found page · Cart panel (drawer) · Cart item row · Footer · Loading / empty / error messages.

## 3. Routes
All routes are in `src/App.tsx`. We use TanStack Router with hash history, so the app works on a static host without server settings.
- `#/` → `HomePage`
- `#/plp/$carouselId?sort=default|price` → `PlpPage` (`carouselId` is a carousel id, or a category slug like `dairy`; `sort` is optional)
- any other address → `NotFound` (`notFoundComponent` of the root route)

Why the routes are in `App.tsx`: the routes are the map of the whole app, so one file shows all pages at one glance. The pages do not import `App.tsx` (that would be a circular import), so a page reads its param with `useParams({ from: "/plp/$carouselId" })`.
The route table is registered with a `Register` declaration, so TypeScript checks every `Link` (`to` and `params`). A wrong path is a type error, not a broken link in the browser.
The active `Link` gets `aria-current="page"` by itself, we use it to style the selected category.
The old `#slug` anchors do not work with hash routing, so we use `Link` or scroll buttons instead.
The PLP route has `validateSearch`: it turns `?sort` into `"default"` or `"price"` with `toSortOption` (any other value becomes `"default"`), and `PlpPage` reads it with `useSearch` and orders the cards with the pure function `sortProducts` (cheapest final price first). The sort lives in the URL, so Refresh and Back keep it.

## 4. Component tree
`App` only has the routes. `Layout` is the shell of every page.
```
App (routes only)
└─ Layout
    ├─ Header
    │   ├─ Announcement
    │   ├─ ThemeToggle (between the search bar and the cart button)
    │   └─ CategoryNav
    ├─ main
    │   └─ Outlet (the current page, see below)
    ├─ CartPanel
    │   └─ CartItemRow
    └─ Footer
```
Pages (each one is a file in `src/components/pages/`):
```
HomePage (#/)
├─ Hero
├─ CategoryList
├─ ProductGrid (one for each carousel in home.json, at most 6 cards, with a "مشاهده همه" link)
│   ├─ SaleBox (only on the offers carousel, next to the title)
│   │   └─ SaleCountdown
│   └─ ProductCard (Badge, Price)
└─ Ads

PlpPage (#/plp/$carouselId)
├─ title and a "بازگشت" link
├─ SortLinks ("پیش‌فرض" and "ارزان‌ترین")
├─ ProductCard (many, in a grid)
├─ "not found" message (the carousel does not exist)
└─ "empty" message (the carousel has no products)

NotFound (any other address)
└─ message and a link to home
```
`HomePage` and `PlpPage` show `CatalogMessage` (loading, empty or error) when the data is not ready.
Data goes down with props. Events go up with callback props (`onClose`, `onCartClick`, `onRetry`...).
`Layout`, `Header`, `ProductCard`, `CartPanel` and `ThemeToggle` read the stores directly. `CartPanel` reads `add` and `remove` and passes them to `CartItemRow` as `onAdd` and `onRemove` props.

## 5. State
Zustand is used for what many components need. The Router keeps the current page. Everything else is local State.
| State | Owner | Who changes it | Where it is stored |
|---|---|---|---|
| `items` (cart) | `useCartStore` | `add` (from `ProductCard`, and from `CartItemRow` through `CartPanel` props), `remove` (from `CartItemRow` through `CartPanel` props) | localStorage (`storage/`), saved with `subscribe` |
| `theme` | `useThemeStore` | `toggle` (from `ThemeToggle`) | localStorage (`big-o-theme`), saved by the `persist` middleware |
| `state` (LoadState) | `useCatalog` hook | the fetch effect, and `retry` (sets `loading`) | memory |
| `attempt` (load tries) | `useCatalog` hook | `retry`, from the Retry button in `CatalogMessage` | memory |
| current page | the Router | `Link`, Back / Forward buttons | URL (hash) |
| `sort` (PLP order) | the Router (search param) | the links in `SortLinks`, Back / Forward buttons | URL (`?sort=price`) |
| `cartOpen` | `Layout` | `Header` opens it, `CartPanel` closes it | memory |
| `open` (countdown shown) | `SaleBox` | the show/hide button in `SaleBox` | memory |
| `left` (seconds left) | `SaleCountdown` | the interval in its effect, one less every second | memory (starts again from 10 minutes on every mount) |

Why Zustand and not Context + reducer: the cart and the theme are used in places far from each other (`Header`, `CartPanel`, `ProductCard`, `Layout`). With a Context, every component that reads it renders again when any value in it changes. With Zustand a component uses a selector (`useCartStore((s) => s.items)`) and renders again only when that value changes. Also there is no Provider to write, and the actions (`add`, `remove`, `toggle`) are the same function in every render.
Why selectors: `useThemeStore()` gives the whole store, so the component renders again for any change in it. `useThemeStore((s) => s.theme)` gives one primitive value, so it renders again only when the theme changes.

`open` and `left` are local State: only `SaleBox` and `SaleCountdown` use them, so they do not go up. `cartOpen` is local State in `Layout`, because only `Layout`, `Header` and `CartPanel` need it, so it does not need a store.
The countdown effect has `[]` deps: it starts a `setInterval` on mount and stops it with `clearInterval` in the cleanup, so after the countdown is hidden (unmount) the interval does not run anymore.

These values are **not** State, we calculate them in every render:
- `count` (number of items in the cart, `cartCount`) and the cart total: calculated from `items`.
- `categories` and `shopName`: calculated from `state`.
- the products of a carousel or category (`carouselProducts`): calculated from the route param and `state`.
- the sorted list of the PLP (`sortProducts`): calculated from these products and `sort`.

Why: if we keep a second copy in State, it can go out of sync with the original (for example `items` changes but `total` does not). One source of truth, everything else is calculated.

## 6. Data (types.ts)
Product, Category, Stock, Offer, Shop, Carousel, CartItem (id, name, price, qty).
Also types for the page: CardInfo (offer label, percent, final price and inStock of one card), CartProduct (the fields of a product that the cart needs, so both a Product and a CartItem can be added), Catalog (the data of all files together), Theme, SortOption (`"default"` or `"price"`) and LoadState<T> (loading, success with `data`, empty or error).
`Carousel` is a Union: a carousel has either `source: "offers"` or a `categoryId`, never both.

## 7. Where does each piece live?
- Server: Product, Category, Stock, Offer, Shop, Carousel
- Client state: the `Catalog` and the load status (in `state` of `useCatalog`), the cart items (in `useCartStore`), the theme (in `useThemeStore`) and the cart panel open flag (in `Layout`).
- localStorage: cart items (id, name, price, qty) only (key `big-o-cart`), and the theme (key `big-o-theme`)
- URL: the current page (`#/` or `#/plp/<id>`) and the PLP sort (`?sort=price`), so Refresh and Back / Forward work.

## 8. API (what we fetch, and when)
All files are fetched together with `Promise.all` when a page loads (the effect in `useCatalog` calls `loadShopState`). The app only reads, it never writes.
The base address comes from `VITE_API_URL` (`/api` in dev, `../../api` in production).
- `categories.json` → `Category[]`
- `products.json` → `Product[]`
- `offers.json` → `Offer[]`
- `shop.json` → `Shop`
- `stock.json` → `Stock`
- `home.json` → the carousels of the home page (`Carousel[]`)

Every file is checked by a guard (`isProduct`, `isShop`, `isCarousel`, ...) before we use it. Bad items in a list are removed (`keepValidData`), and a bad `shop.json`, `stock.json` or `home.json` is an error.
The effect has a cleanup (`ignore` flag), so an old response never changes the State after the effect is stopped.
The effect's deps are `[attempt]`. The Retry button calls `retry`, which sets `loading` (in the event, not inside the effect) and adds one to `attempt`, so the effect runs again.

## 9. States of each screen
Every page checks `state.status` first, and shows `CatalogMessage` if the status is not `success`:
- loading: a "در حال بارگذاری..." message
- success: the page (hero, categories, carousels, product cards, or the PLP grid)
- empty: a message "محصولی یافت نشد."
- error: a "بارگذاری اطلاعات ممکن نشد." message with the reason, and a "تلاش دوباره" (Retry) button

`PlpPage` has one more case. `carouselProducts` returns `null` when the carousel id and the category slug do not exist (`#/plp/nothing`), and an empty list `[]` when it exists but has no products. `null` shows "این فهرست پیدا نشد." with a link to home, `[]` shows "محصولی در این فهرست نیست.". On `HomePage`, `null` becomes `[]` (an empty grid), not a crash.
A wrong address (`#/nowhere`) shows `NotFound`.

The cart panel shows a message when the cart is empty. Every product card has a `key`.
If a carousel has only one product, that card gets only `first-<id>`, not `last-<id>` (the first one wins).

## 10. Folders
Imports only go down: main → App → pages → components → hooks → logic / data → types.
- `src/types.ts` — types: the models, imports nothing
- `src/api/` — data: reads the JSON files (`getData`), turns the result into a LoadState (`loadShopState`) and checks the data with guards (`guards`, `shopGuards`)
- `src/storage/` — data: saves and reads the cart items in localStorage
- `src/cart/` — logic: pure functions that return a new cart (`addToCart`, `decreaseItem`) and `cartCount`
- `src/catalog/` — logic: filters products, final price, card info, `carouselProducts` and `sortProducts` / `toSortOption`
- `src/hooks/` — `useCatalog` (load state and retry), `useCartStore` and `useThemeStore` (Zustand stores). The stores use `storage`, `cart`, and `useCatalog` uses `api`
- `src/components/` — ui: React components, `Layout` and the small parts
- `src/components/pages/` — one file for each route: `HomePage`, `PlpPage`, `NotFound` (each at most 70 lines)
- `src/App.tsx` — only the routes
- `src/main.tsx` — mounts `App`

## 11. Security
- Everything that reaches the browser is public (the code, the JSON files and the `VITE_` variables). We do not put secrets in `VITE_` variables.
- We keep the cart items in localStorage. The user can change them, so we check every item with `isCartItem` when we read it, and the final price of the cart must be calculated by the server.
- JSON data is checked with guards before we use it.
- React escapes the texts by default. We never use `dangerouslySetInnerHTML`.

## 12. Known limits
- `Layout` and the page both call `useCatalog`, so the catalog is fetched two times. A later fix: share the data in one place.
- Retry reloads only the page's copy of the data. If the first load failed, the copy in `Layout` stays in error, so the categories in the menu and the footer stay empty until a full refresh.
- A few placeholder links (`href="#"`: "تماس با ما" in the menu and the help links in the footer) go to the home page, because of the hash routing.