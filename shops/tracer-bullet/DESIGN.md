# DESIGN: Tracer Bullet supermarket

## 1. Needs

**A visitor can:**
- search for products by name, even with a typo
- add products to the cart and see a short confirmation message
- see which products are sold out and which have a discount
- click a category name and jump to its section (not every category does this)
- open a specific section by using its link in the URL
- slide the carousels
- click the logo to go back to the top
- click banners and promos to move to a section

**A visitor cannot (yet):**
- select a search result: only the product names are shown
- use every category link on the banners and menu: the page builds sections only for the special offers and the dairy carousel (the two carousels in `home.json`), so links such as `#fruits` and `#bakery` have no section to jump to
- see what is in the cart: it is only a counter
- remove anything from the cart

## 2. Page sections

| Section | What it shows | Data comes from |
|---|---|---|
| Header notice | A short notice text | `shop.json` |
| Logo slogan | The slogan under the shop name in the header | `shop.json` |
| Main menu | The navigation links | `shop.json` |
| Search with results list | A search bar with a text input and a button; it searches product names only | `products.json` |
| Cart counter | A button with the number of items | `localStorage`, key `cartCount` (not an API file) |
| Cart toast | A short message "product added to the cart" | Built by the page, after a click |
| Hero | One big banner with a title, text and button | `home.json` |
| Side promo | A smaller banner next to the hero with a title, text and button | `home.json` |
| Promo links | Two banners with titles | `home.json` |
| Category list | The category links | `categories.json` |
| Category dropdown | The category links in the navigation | `categories.json` |
| Carousels (special offers and per-category) | Product cards with prices, offers and stock | `home.json`, `offers.json`, `products.json`, `stock.json` |
| Working hours | The shop schedule, shown in the footer | `shop.json` |
| Footer | Categories, help links, about text, address, phone | categories: `categories.json`; the rest: `shop.json` |

## 3. Data and owners

| Information | Where it lives | Owner |
|---|---|---|
| Products, categories, offers, shop texts, home banners (5 JSON files) | Files in `/api` on the server. A temporary copy sits in the `data` variable and is refetched on every load | The server |
| Stock numbers (`stock.json`) | A file on the server. Copied into `data` once, when the page loads | The server |
| Cart count | `localStorage`, key `cartCount` (to be renamed with a shop prefix, e.g. `tracer-bullet:cartCount`). Survives a refresh | The visitor's browser |
| Search text | The search input on the page. Lost on refresh | The visitor |
| Search index (Fuse) | Memory only. Built from the products after loading, gone on refresh | Nobody: it is derived from the products |
| Section the visitor jumped to | The `#hash` in the URL. Survives a refresh and can be shared as a link | The URL, i.e. the visitor's navigation |
| API address | Written directly in the code today (`../../api/`). In Step 5 it moves to `VITE_API_URL` in `.env.development` and `.env.production`. It is public, so it is not a secret | The developer (set at build time) |

The server never learns what is in the cart: the page stores only a number in the browser.

## 4. API contract

All 6 files are requested once, when the page loads, in parallel with `Promise.all`. Today the responses are trusted as they arrive; from Step 3 each one comes in through `getJSON` as `unknown` and is checked by a Type Guard before the page uses it. If any request fails, the whole load fails and the page shows the `error` state.

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

Placeholders (static) come from `index.html`. Loading and error messages are written by `init` in the code. All 6 requests share one `try`, so any failure counts as one error. The Empty column is read from the code and was not tested.

| Section | Loading | Success | Empty | Error |
|---|---|---|---|---|
| Header notice | empty purple bar | notice text | blank | stays empty |
| Main menu | only "همه دسته‌ها" (static), no links | menu links | blank | stays the same as loading |
| Category dropdown | empty | category links | blank | stays empty |
| Category list | message "در حال بارگذاری" | category links | blank (nothing is shown) | message "check your internet and reload" |
| Hero, side promo | placeholder text from HTML | real banners | nothing | stay as placeholders |
| Promo links | nothing is shown | two promo links | blank | nothing is shown |
| Carousels | message "در حال بارگذاری" | product cards | heading and arrows with an empty list | message "check your internet and reload" |
| Working hours | heading only | schedule lines | blank | heading only |
| Footer | headings, empty lists, phone shows "-"; copyright and "back to top" (static) are visible | categories, help links, about text, address, phone | blank | same as loading |
| Cart counter | `0` from HTML, even when items are saved | number from `localStorage` | not applicable | `0`, even when items are saved, because the saved number is drawn only after loading succeeds |
| Search | placeholder "جستجو"; typing does nothing | placeholder shows the product count; matching names appear | "محصول یافت نشد" (not found) | same as loading: typing does nothing |

**Observations:**
- Any failure, even a wrong address, shows the same message: "check your internet and reload". The visitor is told the wrong cause for anything that isn't a connection problem.
- Only two sections show a message on error. Everything else stays empty or keeps its placeholder, so a failed page can look like a working one (the hero and side promo are the clearest case).
- The cart counter shows `0` until loading finishes, even when the visitor has saved items. This was tested with items saved.
- Search does nothing in the loading and error states, because its listener is attached only after loading succeeds. This was tested.
- Nothing checks that the data has the right shape. This is addressed in Step 3.
- All 43 products are listed in `stock.json` (checked against the files). A product missing from it would get `undefined` stock and be shown as available (not tested).
- A sold-out product that also has an offer (102) gets the sold-out badge and a disabled button, but the card still shows the old and new price. This is read from the code and was not tested.

## 6. Folders

**Rule:** imports only point down. `main.ts` may import from every layer, and the layers below it never import each other:

`main.ts` → `ui/`, `cart/`, `catalog/`, `api/`, `storage/` → `types.ts`

- `types.ts` imports nothing. All the types live in this one file, written compactly to stay within 70 lines.
- `ui/` touches the page only. It never uses `fetch` or `localStorage`.
- `cart/` and `catalog/` hold the rules: pure functions that touch no page, network or storage.
- `api/` and `storage/` talk to the outside (the server and the browser) and never touch the page.
- No file is longer than 70 lines, and no file is called `utils` or `helpers`. `app.ts` has 586 lines, so it will split into many small files.

**Structure of `src/`:**

```
src/
  types.ts     all types, imports nothing
  api/         fetch and Type Guards
  storage/     localStorage
  cart/        cart rules
  catalog/     prices, offers, stock, search
  ui/          building and changing the page
  main.ts      state, events, start
```

| Folder / file | Layer | What goes in it | Functions from `app.ts` |
|---|---|---|---|
| `types.ts` | types | The shape of all data: API data, cart and page types | `Product`, `Category`, `Offer`, `Stock`, `Link`, `ScheduleRow`, `Promo`, `Banner`, `Shop`, the carousel types, `Home`, `Data`, `CardProduct`, plus `CartLine` and `Sort` / `SORTS` |
| `api/` | data (network) | Fetching the JSON files and checking their shape | `loadData`; `getJSON` and the Type Guards (created in Step 3) |
| `storage/` | data (browser) | Reading and writing `localStorage`, with the prefixed key | the `cartCount` read and write lines |
| `cart/` | rules | How the cart count changes | the "add one" rule; checking that a saved count is a sensible number |
| `catalog/` | rules | Prices, offers, stock and search | `withOfferAndStock`; the special-offers price calculation (from `renderSpecialOffers`); filtering products by category (from `renderCategoryCarousel`); the Fuse setup and search |
| `ui/` | page | Building and changing page elements, and formatting for display | `formatNumber`, `formatPrice`, `createCard`, `showMessage`, `showBlockMessage`, `renderBanner`, `renderPromos`, `createLinkItem`, `renderLinks`, `createCategoryItem`, `renderCategories`, `createCategoryLink`, `renderCategoryLinks`, `renderShopTexts`, `renderSchedule`, `renderCartCount`, `createArrowLink`, `createCarouselSection`, `renderCarousels` (drawing only), `renderSearchPlaceholder`, `scrollToHash`, the toast (`Notyf`), drawing the search results |
| `main.ts` | wiring | Holds the state (the cart count), loads, connects events, starts the page | `init`, `addToCart` (as a click handler), and the search handler (reads the input, asks `catalog` to search, hands the result to `ui`) |

**Consequences of these rules:**
1. `ui` may not call `catalog`, so `main` prepares ready-made card data and `ui` only draws it.
2. `formatNumber` and `formatPrice` are display formatting, so they live in `ui/`, where the cards that use them are.
3. `addToCart` does four jobs today (change the number, save it, redraw, show a toast). It becomes four calls from `main`: `cart` changes it, `storage` saves it, `ui` redraws and shows the toast.
4. `createCard` stops attaching the click handler. The button carries a `data-` attribute, and `main` listens for clicks on the container.
5. `init` is split: finding the page elements moves into `ui/`, and `main` keeps only the wiring.
6. The search is split three ways: `catalog` finds the matches, `ui` draws the results list, and `main` connects the input to both.
7. `renderCarousels` and the two carousel functions are split: `main` asks `catalog` for the cards of each carousel (offers or category), and `ui` only builds the sections and draws the cards.

## 7. Security

**What anyone can see:** everything the browser receives. That means the whole page code (HTML, CSS and the built JavaScript), the 6 JSON files in `/api`, and the contents of `localStorage`. Anyone can read these in DevTools, so nothing the shop sends to the browser can be private.

**What a visitor can change on their own computer:** the cart counter. It is a plain number saved in `localStorage` under the key `cartCount`, and the page believes whatever is stored there. Tested by editing the value and reloading:
- `999` is shown as 999
- `-5` is shown as -5
- `abc` is shown as 0 (the text is not a number, so the code falls back to 0)

The page does not check the value, so a visitor can make the counter show any number. For now this is harmless, because the counter is cosmetic: nothing is sent to the server and nothing is bought with it.

**Why the server must compute the final cart total:** the shop has no checkout today, so this is a design rule for the future, not something the current code does. Everything in the browser can be edited by the visitor, including prices, quantities and totals, so a total calculated in the browser can't be trusted. The server holds the real prices and stock, so when an order is placed it must recalculate the sum itself from the product ids and quantities, and ignore any total sent by the page.

**Secrets:** none found. A search of `src/app.ts` for `token`, `password`, `secret` and `Bearer` returned nothing. The one hit for `key` is the `keys: ["name"]` option of the search library, which is not a secret. `vite.config.ts` contains only a public address (`https://gof.zzb.cx`) for the development proxy. A search of `src/app.ts` found no `innerHTML`, `POST` or `method`.

**Rule for the deploy step:** any variable starting with `VITE_` is copied into the built files and is visible to everyone, so no password or key may ever go into an `.env` file.
