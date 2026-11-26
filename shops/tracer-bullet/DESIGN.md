# DESIGN: Tracer Bullet supermarket

## 1. Needs

**A visitor can:**

- read the shop notice and slogan, the hero and promo banners, and the menu, all taken from the API

- see the home page with one row per carousel from `home.json` (today: special offers and dairy), each with its first four products and a "مشاهده همه" link that shows the number of products

- open a full product list on its own page (`#/plp/offers`, `#/plp/dairy`), and also a list for each category (`#/plp/fruits`, `#/plp/bakery` and the other category slugs) from the menu, the dropdown, the hero, the promos and the footer

- reload a list page, or go Back and Forward, and stay on the same page

- see a clear message for an unknown list (`#/plp/nothing`) and a "page not found" page for any other address

- see which products are sold out and which have a discount

- add products to the cart from any list, see the lines, quantity and total in the cart panel, and remove a line

- keep the cart after a refresh, and see the item count in the header and the tab title

- switch between a light and a dark theme with a button, and keep the choice after a refresh

- read the shop's about text, address and working hours in the footer, and call the phone number

- click the logo to go to the home page, click "تماس با ما" to scroll to the contact section, and click "back to top" in the footer

- use the skip link to jump to the main content

- open a page for one product (`#/product/<id>`) from its name on any card, see its name, unit and price, and add it to the cart; an unknown id shows a message

- sort a list by price with the "ارزان‌ترین" link, or go back to the default order; the choice is in the address (`?sort=price`), so it survives a refresh and Back

- fill in the checkout form (name, mobile, address) and place an order, which empties the cart and returns to the home page

**A visitor cannot (yet):**

- search for products (the search box is only markup)

- see a confirmation message after adding to the cart

- slide the home rows with arrow buttons: the rows are plain lists and the old arrow controls are not built

- filter the products by category on the home page: the Week 5 category buttons are no longer on the page

- use the three help links in the footer: their addresses in `shop.json` are only `#`, so they do nothing

- send an order anywhere: the checkout form only empties the cart in the browser, and nothing is sent to a server

## 2. Page sections

This describes the React page. It uses all six API files. What is loaded and checked but not shown: the `shop.json` fields that `types.ts` does not describe (see section 4). The shop name "پرتقال" is fixed text in the components.

The page has one shell, `Layout`, that is the same on every address. Inside its `<main>`, the router shows one of five pages: `HomePage`, `PlpPage`, `ProductPage`, `CheckoutPage` or `NotFound`. The cart panel sits under the page content on every address.

**Routes** (hash addresses, so a reload works on any static server):

| Address | Page | Data from |

|---|---|---|

| `#/` | `HomePage` | `useCatalog()` and `carouselProducts` |

| `#/plp/$carouselId?sort=default\|price` (for example `#/plp/dairy?sort=price`) | `PlpPage` | `useCatalog()` and `plpList`, then `sortCards`. `sort` is checked by `validateSearch`: anything other than `price` becomes `default` |

| `#/product/$productId` | `ProductPage` | `useCatalog()` and `findCard` |

| `#/checkout` | `CheckoutPage` | the cart store; the form values are local state |

| any other address (for example `#/nowhere`) | `NotFound` | none |

The routes are defined in `App.tsx` only. A list address with an unknown id (`#/plp/nothing`) is still a valid route: `PlpPage` shows "این فهرست پیدا نشد" and a link home.

**The shell (every address):**

| Section | What it shows | Data comes from |

|---|---|---|

| Skip link | A link at the top that moves focus to the main content (it does not change the address) | Static markup |

| Header notice | The shop notice | `shop.json` |

| Logo and shop name | The decorative logo as a link to the home page, the fixed name "پرتقال", and the slogan under it | Name: static markup. Slogan: `shop.json` |

| Search box | An input and a button; typing does nothing yet | Static markup |

| Cart button | The number of items in the cart, in Persian digits | The cart store (`localStorage`, key `tracer-bullet:cart`) |

| Theme button | The current theme; clicking switches between light and dark | The theme store (`localStorage`, key `tracer-bullet:theme`) |

| Main menu | The menu links, and a "همه دسته‌ها" dropdown with one link per category. Each link opens a list page; "تماس با ما" scrolls to the footer instead, and a link "تسویه حساب" to the checkout page | Links: `shop.json`. Dropdown: `categories.json` |

| Cart panel | The cart lines with quantity, line price and a remove button, the total, and a message when the cart is empty | The cart store (`localStorage`) |

| Footer texts | The about text, the address, the phone as a `tel:` link, and the working hours rows | `shop.json` |

| Footer lists | The category links (they open list pages) and the help links (placeholders that do nothing) | Categories: `categories.json`. Help: `shop.json` |

| Back to top | A footer link that scrolls to the top without changing the address | Static markup |

| Status message | One message instead of the whole shell while the data loads, when it is empty, or on error | Built by `Layout` |

**Home page (`#/`):**

| Section | What it shows | Data comes from |

|---|---|---|

| Hero and side promo | Two banners, each with a title, an emoji, a text and a button that opens a list page | `home.json` |

| Carousel rows | For each carousel: its title and emoji, its first four products as cards, and a "مشاهده همه (N)" link to the full list | Carousels: `home.json`. Products: `products.json`, `offers.json`, `stock.json` |

| Promo links | Two links, each with a text and an emoji, that open list pages | `home.json` |

**List page (`#/plp/<id>`):**

| Section | What it shows | Data comes from |

|---|---|---|

| Back link | A link to the home page | Static markup |

| Title and count | The name of the carousel or category and the number of products | `home.json` carousels or `categories.json` |

| Sort links | "پیش‌فرض" and "ارزان‌ترین"; the current one is marked with `aria-current`. The order is stored in the address (`?sort=`) | The address |

| Product grid | One card per product: emoji, name, unit, price, a discount or sold-out badge, and an add button. The product name is a link to the product page | `products.json`, `offers.json`, `stock.json` |

| Not-found message | "این فهرست پیدا نشد" and a link home, when the id is neither a carousel nor a category slug | Built by `PlpPage` |

**Product page (`#/product/<id>`):**

| Section | What it shows | Data comes from |

|---|---|---|

| Back link | A link to the home page | Static markup |

| Product | Name, emoji, unit, and the price (the discounted price when there is an offer) | `products.json`, `offers.json`, `stock.json` |

| Add button | Adds the product to the cart; disabled and labelled "ناموجود" when it is sold out | The cart store |

| Not-found message | "محصول پیدا نشد" and a link home, for an id that matches no product | Built by `ProductPage` |

**Checkout page (`#/checkout`):**

| Section | What it shows | Data comes from |

|---|---|---|

| Form | Three labelled fields (name, mobile, address) and an order button. Errors appear only after the first submit, and focus moves to the first wrong field | Local state in `CheckoutPage` |

| Empty cart | The message "سبد خالی است" and a link home instead of the form | The cart store |

**Not-found page (any other address):** a short message and a link to the home page.

**Page loading messages:** `Layout` loads the data and shows the status message until it is ready. Each page also loads the data itself, so a page can show the same message briefly inside the shell (see section 5).

## 3. Data and owners

| Information | Where it lives | Owner |

|---|---|---|

| Products, categories, offers, shop texts, home banners and carousels (5 JSON files) | Files in `/api` on the server. `useCatalog` loads them and keeps the result in its own state, one copy per component that calls it. The pages and components read the data through the hook. | The server |

| Stock numbers (`stock.json`) | A file on the server. Loaded with the other five files by `useCatalog` when the data is needed. | The server |

| The cart lines | `localStorage`, key `tracer-bullet:cart`, a JSON list of lines. `useCartStore` owns the cart in memory and saves changes through a `subscribe`. Survives a refresh. | The visitor's browser |

| The selected theme | `localStorage`, key `tracer-bullet:theme`. `useThemeStore` owns the current theme and saves it so the choice survives a refresh. | The visitor's browser |

| The current page or list | The URL, using hash routing: `#/` for home and `#/plp/<id>` for a carousel or category list. `PlpPage` reads the id using `useParams({ from })`. Survives refresh and supports Back and Forward. | The URL, i.e. the visitor's navigation |

| Section the visitor jumped to | A page anchor handled without replacing the router's hash route. The skip link, contact link and back-to-top link scroll to their targets without changing the current page. | The current page in the browser |

| API address | `VITE_API_URL` in `.env.development` and `.env.production`, read by `getJSON`. It is public, so it is not a secret. | The developer (set at build time) |

| The list order | The address, as `?sort=price` after the route. Survives a refresh and Back | The URL, i.e. the visitor's navigation |

| The checkout form values | `useState` in `CheckoutPage`. Lost on refresh or when the visitor leaves the page. They are never saved or sent anywhere | The visitor |

The server never learns what is in the cart: the page stores only the lines in the browser.

The hooks own shared state instead of `App.tsx`. `useCatalog` handles the API data, `useCartStore` handles the cart, `useThemeStore` handles the theme, and `useCartTitle` updates the browser tab title from the cart count. `App.tsx` only defines the routes.

## 4. API contract

All 6 files are requested together, in parallel with Promise.all, every time useCatalog runs (see section 5). Each response comes in through `getJSON` as `unknown` and is checked by a Type Guard before the page uses it. If any request fails, the whole load fails and the page shows the `error` state.

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

`useCatalog` keeps one `LoadState` with four values. It loads all six API files and makes the result available to the React components. `Layout` reads this state through the hook. While the state is not `success`, `Layout` shows `Status` instead of the full page, so the message replaces the header, page content and footer.

| State | When | What the visitor sees |

|---|---|---|

| `loading` | From the first render until all 6 requests finish | The message "درحال بارگذاری" (`role="status"`) |

| `success` | All 6 files loaded and valid, and there is at least one product | The full layout with the header, routed page, cart panel and footer |

| `empty` | Everything loaded and valid, but the products list is empty | The message "محصولی بارگذاری نشده است" |

| `error` | Any request fails, or any required file fails its Type Guard | The message "خطا: لطفا دوباره تلاش کنید" (`role="alert"`) |

All 6 requests share one load (`Promise.all`), so any failure counts as one error. A product that fails its guard is dropped with `console.warn` and does not cause an error.

**Inside the success page:**

| Part | Normal | Special case |

|---|---|---|

| Cart panel | Lines with quantity and price, and the total, read from `useCartStore` | Empty cart: the message "سبد خالی است" and a total of ۰ |

| Home carousel | One row per carousel from `home.json`, with its first four products and a link to the full list | A carousel with no matching products shows an empty row |

| List page (`PlpPage`) | One card per product in the requested carousel or category | An unknown id shows "این فهرست پیدا نشد" and a link home |

| Product card | Name, unit and price | Discount: the old price crossed out, the new price and a percent badge. Sold out: a "ناموجود" badge and a disabled button |

| Theme toggle | Switches between light and dark themes through `useThemeStore` | The saved theme is restored after a refresh |

| Router | `HomePage`, `PlpPage`, `ProductPage` or `CheckoutPage` for their addresses | `NotFound` for any other route |

| Product page | The product with its price and an add button | An unknown id shows "محصول پیدا نشد" and a link home. A sold-out product has a disabled button |

| Checkout page | The form | Empty cart: the message and a link home. Wrong values: errors after the first submit, with focus on the first wrong field |

| Sort | `?sort=price` orders by the price the customer pays | Any other value (for example `?sort=junk`) is treated as the default order |

**Observations:**

- A broken file (`/broken.json`) and a missing file (`/missing.json`) show the same error message. The visitor is not told which kind of failure it was.

- The `empty` state is determined by the data-loading logic and is not caused by an empty cart or an empty carousel.

- The loading, empty and error messages hide the header and footer. For now this is acceptable, but a failed page looks very different from a working one.

- `CartTitle`, a small component inside `Layout`, reads the cart count and updates `document.title`. It exists only while `Layout` shows the shell, so during loading or after an error the title is not updated.

- A sold-out product that also has an offer (102) gets the sold-out badge and a disabled button, but the card can still show the old and discounted prices.

- A product missing from `stock.json` would get `undefined` stock and could be shown as available. This case has not been tested.

- `useCartStore` restores the cart from `localStorage` independently of the API data. The saved cart is not cleared during loading.

- The selected theme is restored from `localStorage` through `useThemeStore`, so it is independent of the catalog load state.

- `PlpPage` reads its list id from the route rather than a selected-category state in `App`. Reloading, Back and Forward keep the correct list page.

- Components read only the store values they need through selectors. The cart count, cart lines and cart actions are not passed down from `App` through callback props.

- Every component that calls `useCatalog` fetches all 6 files itself, so the data is loaded twice at start (`Layout` and the page) and again each time a page mounts. A shared cache would avoid this. It is a known trade-off, read from the code.

## 6. Folders

**Rule:** imports only point down. `main.tsx` mounts React and renders `App`. `App.tsx` only defines the routes. Components read shared state through the hooks, and the hooks use the rule layers below them:

`main.tsx` → `App.tsx` → `components/` (and `components/pages/`) → `hooks/` → `api/`, `storage/`, `cart/`, `catalog/`, `format/` → `types.ts`

- `types.ts` imports nothing. All the types live in this one file.

- `components/` and `components/pages/` are React components. They draw the page and call the hooks. They never use `fetch` or `localStorage`, and no component imports `App.tsx`.

- `hooks/` holds the shared state: the two stores and the data hook. A hook never imports a component.

- `format/` formats numbers and prices for display.

- `cart/` and `catalog/` hold the rules: pure functions that touch no page, network or storage.

- `api/` and `storage/` talk to the outside (the server and the browser) and never touch the page.

- The old `ui/` folder and `main.ts` are deleted: React replaced them.

- No file is longer than 70 lines, and each page file in `components/pages/` stays under that too.

**Structure of `src/`:**

```text

src/

  types.ts       all types, imports nothing

  api/           fetch and Type Guards

  storage/       localStorage (cart-storage.ts saves the cart lines)

  cart/          pure cart rules: add, remove, count, total, checkout validation

  catalog/       prices, offers, stock, search, carousel and list products, one product, sorting

  format/        number and price formatting for display

  hooks/         useThemeStore, useCartStore, useCartTitle, useCatalog

  components/    shared components: Layout, Header, Footer, cards...

  components/pages/   HomePage, PlpPage, ProductPage, CheckoutPage, NotFound

  App.tsx        the routes only

  main.tsx       mounts <App /> in #root

```

| Folder / file | Layer | What goes in it | Where the old `app.ts` code went |

|---|---|---|---|

| `types.ts` | types | The shape of all data: API data, cart and page types | `Product`, `Category`, `Offer`, `Stock`, `Link`, `ScheduleRow`, `Promo`, `Banner`, `Shop`, the carousel types, `Home`, `Data`, `CardProduct`, plus `CartLine` and `Sort` / `SORTS`, `PlpSort`, `CheckoutValues`, `CheckoutErrors` |

| `api/` | data (network) | Fetching the JSON files and checking their shape | `loadData`; `getJSON` and the Type Guards (created in Step 3) |

| `storage/` | data (browser) | Reading and writing `localStorage` | `cart-storage.ts`: `loadCart` (with a guard for every line) and `saveCart`. `cart-count-storage.ts` is the old counter and is no longer used by the page |

| `hooks/` | shared state | `useThemeStore`, `useCartStore`, `useCartTitle`, `useCatalog` | The `useState` and the load and save effects from `App` |

| `cart/` | rules | How the cart changes | `cart-lines.ts`: `addToCart`, `removeFromCart`, `cartCount`, `cartTotal`, all pure. `cart-count.ts` is the old counter and is no longer used by the page; `checkout.ts`: `validateCheckout` |

| `catalog/` | rules | Prices, offers, stock and search | `withOfferAndStock`; the special-offers price calculation (from `renderSpecialOffers`); filtering products by category (from `renderCategoryCarousel`); the Fuse setup and search; `findCard` (in `product-catalog.ts`), `sortCards` (in `sort-cards.ts`), `carouselProducts` and `plpList` |

| `components/` | page (React) | One component per file: `Layout`, `Status`, `Header` with `Logo`, `ThemeToggle` and `MainNav`, `Hero`, `ProductGrid` with `ProductCard` and `OfferBadge`, `Promos`, `CartPanel`, `CartTitle`, `FormField`, `Footer` with `FooterLists`, `AppLink`, and the pages `HomePage`, `PlpPage`, `ProductPage`, `CheckoutPage` and `NotFound` in `components/pages/` | `ui/` is gone and its job moved here: `createCard` and `createProductBadge` → `ProductCard`, `OfferBadge`; `renderBanner` → `Hero`; `renderPromos` → `Promos`; `renderCategories` → removed in Week 6; `renderLinks` and `createCategoryLink` for the menu and the dropdown → `MainNav`; for the footer lists → `FooterLists`; `renderShopTexts` → `Header` (notice, slogan) and `Footer` (about, address, phone); `renderSchedule` → `Footer`; `load-state-view` → `Status`; the cart panel is new |

| `format/` | display | `formatNumber`, `formatPrice` | Moved from `ui/formatting.ts` |

| `App.tsx` | wiring | The router and the five routes, nothing else | `init` and the click handler from `main.ts` |

| `main.tsx` | start | Mounts `<App />` in `#root` | The start of `main.ts` |

**Consequences of these rules:**

1. Components never fetch or read storage. The hooks do it, and the components call the hooks.

2. A component reads only the part of a store that it needs, with a selector: `Header` the count, `CartPanel` the lines and `remove`, `ProductCard` only `add`.

3. Adding to the cart is one store action: the pure `addToCart` returns a new list, the store keeps it, and a `subscribe` saves it. Nothing is changed in place.

4. Pages are chosen by the router. They read the address with `useParams({ from })` and never import `App.tsx`, which avoids a circular import.

5. Formatting is in `format/`, because several components use it.

6. Links that come from the API (`#fruits`, `#dairy`...) go through `AppLink`, because with hash routing a plain `#slug` would be read as a route.

7. Forms: the field values and a `submitted` flag are the only state. The errors are calculated from the values while rendering (`validateCheckout`), so they can never disagree with the inputs.


## 7. Component tree

```text
main.tsx
└─ App                    the router (RouterProvider)
   └─ Layout              the shell: loads the data, shows Status until ready
      ├─ Status           loading, empty or error message
      ├─ CartTitle        sets the tab title from the cart count, renders nothing
      ├─ Header
      │  ├─ Logo
      │  ├─ ThemeToggle
      │  └─ MainNav       uses AppLink, and a link to the checkout
      ├─ main
      │  ├─ Outlet        one of the five pages below
      │  └─ CartPanel
      └─ Footer
         └─ FooterLists   uses AppLink
```

**Each page (inside `Outlet`):**

```text
HomePage                  #/
├─ Hero                   uses AppLink
├─ one section per carousel
│  └─ ProductGrid
│     └─ ProductCard × up to 4   (memo; its name links to ProductPage)
│        └─ OfferBadge
└─ Promos                 uses AppLink

PlpPage                   #/plp/$carouselId
├─ back link and two sort links
└─ ProductGrid
   └─ ProductCard × n
      └─ OfferBadge

ProductPage               #/product/$productId
└─ back link, product details, add button

CheckoutPage              #/checkout
└─ FormField × 3 (name, mobile, address), order button

NotFound                  any other address
└─ link home
```

**Data goes down, events go through store actions:**

- `Layout` → `Header`: `shop`, `categories`. → `Footer`: `shop`, `categories`.

- `HomePage` → `Hero`: `hero`, `side`. → `ProductGrid`: `products`. → `Promos`: `promos`.

- `PlpPage` → `ProductGrid`: `products`.

- `CheckoutPage` → `FormField`: `id`, `label`, `value`, `error`, `inputRef`, `onChange`.

- `Header` → `MainNav`: `menu`, `categories`. `Footer` → `FooterLists`: `categories`, `help`.

- `Layout`, `HomePage`, `PlpPage` and `ProductPage` use `useCatalog` to read the API data. Components receive the display data they need through props.

- The cart is not passed down through the component tree: `ProductCard` selects `add`, `CartPanel` selects `lines` and `remove`, and `Header` selects the count, each directly from `useCartStore`.

- `ThemeToggle` reads the theme and calls `toggle` through `useThemeStore`.

- Components never change their props. Shared state changes go through store actions, while navigation goes through the router.

- No page or component imports `App.tsx`, so the router does not create a circular import.

## 8. Where state lives

| State | Defined in | Who changes it | Where it is saved |

|---|---|---|---|

| `theme` (`light` or `dark`) | `hooks/useThemeStore.ts` (Zustand) | `toggle`, called by `ThemeToggle` | `localStorage` through `persist`, key `tracer-bullet:theme` |

| `lines` (the cart lines) | `hooks/useCartStore.ts` (Zustand) | `add` (called by `ProductCard`) and `remove` (called by `CartPanel`), which use the pure `addToCart` and `removeFromCart`, and `clear` (called by `CheckoutPage` after a valid order) | `localStorage`, key `tracer-bullet:cart`, through `storage/cart-storage.ts`. It is read when the store is created and written by a `subscribe` after every change |

| `state` (loading, empty, error or success with the data) | `hooks/useCatalog.ts` (`useState` inside the hook) | The load effect, in `.then` and `.catch` | Nowhere: it is fetched again |

| The current page | The router, in `App.tsx` | The visitor (links, Back and Forward) | The address after `#` |

| The list order (`sort`) | The router: `validateSearch` on the list route in `App.tsx` | The sort links in `PlpPage` | The address, after `?` |

| The checkout values and `submitted` | `useState` in `CheckoutPage` | The form fields and the submit handler | Nowhere: lost on refresh |

**Why Zustand for the cart:** The cart is used by several components that are in different parts of the component tree. `ProductCard` adds products, `CartPanel` shows and removes lines, and `Header` displays the item count. Zustand gives them access to the same cart state without passing it through multiple levels of props. Selectors let each component subscribe only to the part it needs, and a `subscribe` saves changes to `localStorage`. The pure cart functions stay separate from the store.

**Not state** (calculated from existing values, so they cannot go out of sync):

- The item count and the cart total: `cartCount(lines)` and `cartTotal(lines)`. A separate stored value could disagree with the lines.

- The products of a list: `carouselProducts` and `plpList` build them from the API data and the requested list id.

- The checkout errors: `validateCheckout(values)` is called on every render, and they are shown only after the first submit.

- The sorted list: `sortCards` builds a sorted copy from the list and `sort`.

- `outOfStock` in `ProductCard`: a comparison made while drawing.

- The page title: `useCartTitle` copies the cart count into `document.title` after each change. The title itself is not stored anywhere.

**Removed in Week 6:** the category filter (`selectedId`) and `CategoryNav`. The home page now shows carousel rows, and the categories open list pages.

## 9. Security

**What anyone can see:** everything the browser receives. That means the whole page code (HTML, CSS and the built JavaScript), the 6 JSON files in `/api`, and the contents of `localStorage`. Anyone can read these in DevTools, so nothing the shop sends to the browser can be private.

**What a visitor can change on their own computer:** the cart. It is a JSON list of lines (`id`, `name`, `price`, `quantity`) saved in `localStorage` under the key `tracer-bullet:cart`. `loadCart` is defensive in two ways:

- If the stored text is not valid JSON, or is not a list, the cart starts empty.

- Lines that do not have the right *types* (a number for `id`, `price` and `quantity`, text for `name`) are dropped.

It does **not** check the values. A visitor can edit a line's `price` or `quantity` (for example `-5` or `0`) and the page will show and total them. The stored price can also be out of date if the shop changes its prices later. This is read from the code and was not tested. For now it is harmless, because nothing is sent to the server and nothing is bought with the cart.

**Why the server must compute the final cart total:** The checkout form sends nothing: a valid order only empties the cart in the browser, so no order really exists. This is a design rule for a real checkout: Everything in the browser can be edited by the visitor, including prices, quantities and totals, so a total calculated in the browser can't be trusted. The server holds the real prices and stock, so when an order is placed it must recalculate the sum itself from the product ids and quantities, and ignore any price or total sent by the page. The checks in `validateCheckout` run only in the browser, so a real server must validate the name, mobile and address again.

**Text from the data is not trusted as HTML:** React escapes every value it shows, and the code uses no `innerHTML` or `dangerouslySetInnerHTML`, so a product name that contains tags is displayed as text.

**Secrets:** none found. A search of `src/` for `token`, `password`, `secret`, `Bearer`, `innerHTML`, `dangerouslySetInnerHTML`, `POST` and `method` returned nothing. The API address comes from `VITE_API_URL` in the `.env` files, and `vite.config.ts` contains only a public address (`https://gof.zzb.cx`) for the development proxy. Both are public, so they are not secrets.

**Rule for the deploy step:** any variable starting with `VITE_` is copied into the built files and is visible to everyone, so no password or key may ever go into an `.env` file.