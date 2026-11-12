# DESIGN: Tracer Bullet supermarket

## 1. Needs

**A visitor can:**
- read the shop notice and slogan, the hero and promo banners, and the menu, all taken from the API
- filter the products by category, and click the selected category again to clear it
- see which products are sold out and which have a discount
- add products to the cart, see the lines, quantity and total in the cart panel, and remove a line
- keep the cart after a refresh, and see the item count in the header and the tab title
- read the shop's about text, address and working hours in the footer, and call the phone number
- click the logo, or "back to top", to go back to the top
- use the skip link to jump to the main content

**A visitor cannot (yet):**
- search for products (the search box is only markup)
- see a confirmation message after adding to the cart
- slide carousels: `home.json` still describes them, but the page does not build them
- jump to a category or banner section: the menu, dropdown, category, banner and footer links point to sections that the page does not build, so they do not scroll anywhere

## 2. Page sections

This describes the React page. It uses all six API files. What is loaded and checked but not shown: the `carousels` list in `home.json`, and the `shop.json` fields that `types.ts` does not describe (see section 4). The shop name "پرتقال" is fixed text in the components.

| Section | What it shows | Data comes from |
|---|---|---|
| Skip link | A link at the top that jumps to the main content | Static markup |
| Header notice | The shop notice | `shop.json` |
| Logo and shop name | The decorative logo and the fixed name "پرتقال", with the slogan under it | Name: static markup. Slogan: `shop.json` |
| Search box | An input and a button; typing does nothing yet | Static markup |
| Cart button | The number of items in the cart, in Persian digits | The cart (`localStorage`, key `tracer-bullet:cart`) |
| Main menu | The menu links, and a "همه دسته‌ها" dropdown with one link per category | Links: `shop.json`. Dropdown: `categories.json` |
| Hero and side promo | Two banners, each with a title, an emoji, a text and a button | `home.json` |
| Category navigation | One button per category; the selected one is highlighted, and clicking it again clears the filter | `categories.json` |
| Product grid | One card per product: emoji, name, unit, price, a discount or sold-out badge, and an add button | `products.json`, `offers.json`, `stock.json` |
| Promo links | Two links, each with a text and an emoji | `home.json` |
| Cart panel | The cart lines with quantity, line price and a remove button, the total, and a message when the cart is empty | The cart (`localStorage`) |
| Footer texts | The about text, the address, the phone as a `tel:` link, and the working hours rows | `shop.json` |
| Footer lists | The category links and the help links | Categories: `categories.json`. Help: `shop.json` |
| Status message | One message instead of the whole page while loading, when empty, or on error | Built by `App` |

## 3. Data and owners

| Information | Where it lives | Owner |
|---|---|---|
| Products, categories, offers, shop texts, home banners (5 JSON files) | Files in `/api` on the server. A temporary copy sits in `App`'s `state` and is refetched on every load. Shown: `hero`, `side` and `promos` from `home.json`, and all the described `shop.json` fields. Loaded and checked but not shown: `carousels` | The server |
| Stock numbers (`stock.json`) | A file on the server. Copied into `state` with the other data, once, when the page loads | The server |
| The cart lines | `localStorage`, key `tracer-bullet:cart`, a JSON list of lines. Survives a refresh | The visitor's browser |
| The selected category | `selectedId` in `App`. Lost on refresh | The visitor |
| Section the visitor jumped to | The `#hash` in the URL. Only `#top` and `#main` lead anywhere, because the page builds no category or banner sections. Survives a refresh and can be shared as a link | The URL, i.e. the visitor's navigation |
| API address | `VITE_API_URL` in `.env.development` and `.env.production`, read by `getJSON`. It is public, so it is not a secret | The developer (set at build time) |

The server never learns what is in the cart: the page stores only the lines in the browser.

## 4. API contract

All 6 files are requested once, when the page loads, in parallel with `Promise.all`. Each response comes in through `getJSON` as `unknown` and is checked by a Type Guard before the page uses it. If any request fails, the whole load fails and the page shows the `error` state.

**What happens to invalid data:** an invalid product is dropped and logged with `console.warn`, and the rest of the page still loads. Invalid offers, categories, stock, shop or home data fail the whole load, because the page can't work without them, and the visitor sees the `error` state.

| File | Shape | Type in `types.ts` | Fields |
|---|---|---|---|
| `/api/products.json` | list of objects | `Product[]` | `id`, `categoryId`, `name`, `emoji`, `unit`, `price`, `tags` |
| `/api/categories.json` | list of objects | `Category[]` | `id`, `slug`, `name`, `emoji`, `color` |
| `/api/offers.json` | list of objects | `Offer[]` | `productId`, `percent`, `label` |
| `/api/stock.json` | one object | `Stock` | `updatedAt`; `items`: an object that maps each product id to the number in stock |
| `/api/home.json` | one object that contains objects and lists | `Home` | `hero` and `side`: banners with `title`, `text`, `emoji`, `cta: { label, href }`; `promos`: a list of two objects with `text`, `emoji`, `color`, `href`; `carousels`: a list of two objects (see below) |
| `/api/shop.json` | one object | `Shop` | see the breakdown below |

**`products.json` notes**
- There are 43 products in 7 categories. `id`, `categoryId` and `price` are numbers.
- `tags` is a list of text values and can be empty (`[]`).

**`stock.json` notes**
- The keys of `items` are product ids written as text (`"101"`), not numbers, so the type is `Record<string, number>`.
- A value of `0` means the product is sold out (currently products 102, 203, 404 and 604).
- Every product has an entry here, and there are no extra entries.

**`offers.json` notes**
- Each offer points to a product by `productId`. A product can be sold out and have an offer at the same time (102 today).

**`shop.json` breakdown**
- Plain top-level fields: `name`, `slogan`, `owner`, `city`, `phone`, `copyright`, `notice`, `about`, `address`, `currency` (text), `deliveryFee` and `freeDeliveryOver` (numbers).
- One nested object: `hours: { open, close }`, with times as text such as `"08:00"`.
- Lists: `schedule`, a list of two objects with `days` and `time` (display text); `menu`, a list of 5 objects with `label` and `href`; `help`, a list of 3 objects with `label` and `href`.
- `owner` is currently an empty string, so the page must not assume it is filled.

**Carousels in `home.json`** come in two kinds, and each object is exactly one of them:
- an offers carousel, with `id`, `title`, `emoji` and `source` (the value is `"offers"`)
- a category carousel, with `id`, `title`, `emoji` and `categoryId` (a number)

**Decision:** the table above lists everything the server sends, but `types.ts` will describe only the fields the page actually uses. Extra fields (for example `owner`, `city`, `name`, `copyright`, `hours`, `deliveryFee`, `freeDeliveryOver` and `currency`) are ignored for now. If a later feature needs one of them, such as a delivery fee in the cart, it moves into the type.

## 5. States

`App` keeps one `LoadState` with four values. While the state is not `success`, `App` returns the `Status` component instead of the page, so the message replaces **everything**, including the header and the footer.

| State | When | What the visitor sees |
|---|---|---|
| `loading` | From the first render until all 6 requests finish | The message "درحال بارگذاری" (`role="status"`) |
| `success` | All 6 files loaded and valid, and there is at least one product | The whole page (`ShopPage`) |
| `empty` | Everything loaded and valid, but the products list is empty | The message "محصولی بارگذاری نشده است" |
| `error` | Any request fails, or any file fails its Type Guard | The message "خطا: لطفا دوباره تلاش کنید" (`role="alert"`) |

All 6 requests share one load (`Promise.all`), so any failure counts as one error. A product that fails its guard is dropped with `console.warn` and does not cause an error.

**Inside the success page:**

| Part | Normal | Special case |
|---|---|---|
| Cart panel | Lines with quantity and price, and the total | Empty cart: the message "سبد خالی است" and a total of ۰ |
| Product grid | One card per product in the selected category | A category with no products shows an empty list with no message (read from the code) |
| Product card | Name, unit and price | Discount: the old price crossed out, the new price and a percent badge. Sold out: a "ناموجود" badge and a disabled button |
| Category navigation | All categories, none selected | The selected one is marked with `aria-current`; clicking it again shows all products |

**Observations:**
- A broken file (`/broken.json`) and a missing file (`/missing.json`) show the same error message. This was tested. The visitor is not told which kind of failure it was.
- The `empty` state is read from the code (`getDataLoadState`) and was not tested.
- The loading, empty and error messages hide the header and the footer. For now this is acceptable, but a failed page looks very different from a working one.
- The page title shows the item count even while loading or after an error, because the title effect runs in `App` above the early return. Read from the code, not tested.
- A sold-out product that also has an offer (102) gets the sold-out badge and a disabled button, but the card still shows the old and new price. Read from the code, not tested.
- A product missing from `stock.json` would get `undefined` stock and be shown as available. Not tested.
- The cart is read from `localStorage` when `App` first renders, before the data loads, so the saved cart is never lost during loading. Tested by adding items and reloading.

## 6. Folders

**Rule:** imports only point down. `main.tsx` mounts React and renders `App`. `App.tsx` owns the state and the effects. The layers below never import each other:

`main.tsx` → `App.tsx` → `components/` → `cart/`, `catalog/`, `format/` → `types.ts`
`App.tsx` also imports `api/` and `storage/` → `types.ts`

- `types.ts` imports nothing. All the types live in this one file.
- `components/` are React components. They draw the page from props and report events up through callback props. They never use `fetch` or `localStorage`.
- `format/` formats numbers and prices for display.
- `cart/` and `catalog/` hold the rules: pure functions that touch no page, network or storage.
- `api/` and `storage/` talk to the outside (the server and the browser) and never touch the page.
- The old `ui/` folder and `main.ts` are deleted: React replaced them.
- No file is longer than 70 lines.

**Structure of `src/`:**

```
src/
  types.ts       all types, imports nothing
  api/           fetch and Type Guards
  storage/       localStorage (cart-storage.ts saves the cart lines)
  cart/          pure cart rules: add, remove, count, total
  catalog/       prices, offers, stock, search
  format/        number and price formatting for display
  components/    React components: the page
  App.tsx        state, effects, event handlers
  main.tsx       mounts <App /> in #root
```

| Folder / file | Layer | What goes in it | Where the old `app.ts` code went |
|---|---|---|---|
| `types.ts` | types | The shape of all data: API data, cart and page types | `Product`, `Category`, `Offer`, `Stock`, `Link`, `ScheduleRow`, `Promo`, `Banner`, `Shop`, the carousel types, `Home`, `Data`, `CardProduct`, plus `CartLine` and `Sort` / `SORTS` |
| `api/` | data (network) | Fetching the JSON files and checking their shape | `loadData`; `getJSON` and the Type Guards (created in Step 3) |
| `storage/` | data (browser) | Reading and writing `localStorage` | `cart-storage.ts`: `loadCart` (with a guard for every line) and `saveCart`. `cart-count-storage.ts` is the old counter and is no longer used by the page |
| `cart/` | rules | How the cart changes | `cart-lines.ts`: `addToCart`, `removeFromCart`, `cartCount`, `cartTotal`, all pure. `cart-count.ts` is the old counter and is no longer used by the page |
| `catalog/` | rules | Prices, offers, stock and search | `withOfferAndStock`; the special-offers price calculation (from `renderSpecialOffers`); filtering products by category (from `renderCategoryCarousel`); the Fuse setup and search |
| `components/` | page (React) | One component per file. They draw data from props and report events through callback props: `ShopPage` (the layout, and the calculation of the visible cards, the count and the total), `Status`, `Header` with `Logo` and `MainNav`, `Hero`, `CategoryNav`, `ProductGrid` with `ProductCard` and `OfferBadge`, `Promos`, `CartPanel`, and `Footer` with `FooterLists` | `ui/` is gone and its job moved here: `createCard` and `createProductBadge` → `ProductCard`, `OfferBadge`; `renderBanner` → `Hero`; `renderPromos` → `Promos`; `renderCategories` → `CategoryNav`; `renderLinks` and `createCategoryLink` for the menu and the dropdown → `MainNav`; for the footer lists → `FooterLists`; `renderShopTexts` → `Header` (notice, slogan) and `Footer` (about, address, phone); `renderSchedule` → `Footer`; `load-state-view` → `Status`; the cart panel is new |
| `format/` | display | `formatNumber`, `formatPrice` | Moved from `ui/formatting.ts` |
| `App.tsx` | wiring | The state, the load effect, the save-cart effect, the page-title effect, the add and remove handlers | `init` and the click handler from `main.ts` |
| `main.tsx` | start | Mounts `<App />` in `#root` | The start of `main.ts` |

**Consequences of these rules:**
1. Components never fetch or read storage. `App` loads the data and the saved cart, and passes them down as props.
2. `ShopPage` calculates the visible cards with `catalog/`, and the count and total with `cart/`. Every other component only draws what it receives.
3. Adding to the cart is one handler in `App`: the pure `addToCart` returns a new cart, `setCart` stores it, and an effect saves it. Nothing is changed in place.
4. Buttons report clicks through callback props (`onAdd`, `onRemove`, `onPick`), so no `data-` attributes or container click listeners are needed.
5. Formatting is in `format/`, because several components use it and it must not depend on a deleted folder.
6. Long components are split into small ones to stay under 70 lines per file: `Logo` and `MainNav` come out of `Header`, and `FooterLists` comes out of `Footer`.

## 7. Component tree

```
main.tsx
└─ App                 state, effects, handlers
   ├─ Status           loading, empty or error message
   └─ ShopPage         the page, once the data has loaded
      ├─ Header
      │  ├─ Logo
      │  └─ MainNav
      ├─ Hero
      ├─ CategoryNav
      ├─ ProductGrid
      │  └─ ProductCard × n
      │     └─ OfferBadge   only for sold-out or discounted products
      ├─ Promos
      ├─ CartPanel
      └─ Footer
         └─ FooterLists
```

**Data goes down, events go up:**
- `App` → `ShopPage`: `data`, `selectedId`, `cart`, and the callbacks `onPick`, `onAdd`, `onRemove`.
- `ShopPage` → `Header`: `count`, `shop`, `categories`. → `Hero`: `hero`, `side`. → `CategoryNav`: `categories`, `selectedId`, `onPick`. → `ProductGrid`: `products`, `onAdd`. → `Promos`: `promos`. → `CartPanel`: `lines`, `total`, `onRemove`. → `Footer`: `shop`, `categories`.
- `Header` → `MainNav`: `menu`, `categories`. `Footer` → `FooterLists`: `categories`, `help`.
- Components never change their props. A click calls a callback prop, and the owner of the state changes it.

## 8. Where state lives

| State | Owner | Who changes it | Where it is saved |
|---|---|---|---|
| `state` (loading, empty, error or success with the data) | `App` | The load effect, in `.then` and `.catch` | Nowhere: it is fetched again on every load |
| `selectedId` (the selected category, or `null` for all) | `App` | `CategoryNav`, through the `onPick` callback | Memory only: lost on refresh |
| `cart` (the list of cart lines) | `App` | `handleAdd` and `handleRemove`, which call the pure `addToCart` and `removeFromCart` | `localStorage`, key `tracer-bullet:cart`, through `storage/cart-storage.ts`. It is read when `App` first renders and written by an effect on `[cart]` |

**Not state** (calculated on every render, so they can never go out of sync):
- The item count and the cart total: `cartCount(cart)` and `cartTotal(cart)`. A separate `useState` for them could disagree with the cart.
- The visible products: `data.products` filtered by `selectedId`, then converted to cards by `withOfferAndStock`.
- `isActive` in `CategoryNav` and `outOfStock` in `ProductCard`: a comparison made while drawing.
- The page title: an effect copies the cart count into `document.title` after each change. The title itself is not stored anywhere.

## 9. Security

**What anyone can see:** everything the browser receives. That means the whole page code (HTML, CSS and the built JavaScript), the 6 JSON files in `/api`, and the contents of `localStorage`. Anyone can read these in DevTools, so nothing the shop sends to the browser can be private.

**What a visitor can change on their own computer:** the cart. It is a JSON list of lines (`id`, `name`, `price`, `quantity`) saved in `localStorage` under the key `tracer-bullet:cart`. `loadCart` is defensive in two ways:
- If the stored text is not valid JSON, or is not a list, the cart starts empty.
- Lines that do not have the right *types* (a number for `id`, `price` and `quantity`, text for `name`) are dropped.

It does **not** check the values. A visitor can edit a line's `price` or `quantity` (for example `-5` or `0`) and the page will show and total them. The stored price can also be out of date if the shop changes its prices later. This is read from the code and was not tested. For now it is harmless, because nothing is sent to the server and nothing is bought with the cart.

**Why the server must compute the final cart total:** the shop has no checkout today, so this is a design rule for the future, not something the current code does. Everything in the browser can be edited by the visitor, including prices, quantities and totals, so a total calculated in the browser can't be trusted. The server holds the real prices and stock, so when an order is placed it must recalculate the sum itself from the product ids and quantities, and ignore any price or total sent by the page.

**Text from the data is not trusted as HTML:** React escapes every value it shows, and the code uses no `innerHTML` or `dangerouslySetInnerHTML`, so a product name that contains tags is displayed as text.

**Secrets:** none found. A search of `src/` for `token`, `password`, `secret`, `Bearer`, `innerHTML`, `dangerouslySetInnerHTML`, `POST` and `method` returned nothing. The API address comes from `VITE_API_URL` in the `.env` files, and `vite.config.ts` contains only a public address (`https://gof.zzb.cx`) for the development proxy. Both are public, so they are not secrets.

**Rule for the deploy step:** any variable starting with `VITE_` is copied into the built files and is visible to everyone, so no password or key may ever go into an `.env` file.
