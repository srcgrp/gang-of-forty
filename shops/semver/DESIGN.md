# سوپرمارکت ناردونه (Nardooneh) — Design on one page

Owner: Amirhossein Nasr · Shop folder: `shops/semver/` · Branch: `feat/semver-w4-arch`

> This page was written after the first working version of the code, while
> splitting `script.ts` into layers. Sections 5 to 7 describe the target
> design. Section 8 tells honestly what is already done and what is not.

## 1. What must it do? (requirements)

- A visitor sees the shop name, slogan and the free-delivery notice
  (free delivery over 500,000 Toman).
- A visitor sees the 7 categories: fruits and vegetables, dairy, bakery,
  pantry, drinks, protein and snacks.
- A visitor sees product carousels with emoji, name, unit and price.
- A visitor sees the special offers with their discount percentage and label
  (for example "تخفیف روز", 30%).
- A visitor sees whether a product is in stock. Some products have stock `0`
  and must show "out of stock".
- If one product's data is broken, the page still works.
- If the network or a JSON file fails, the page shows a readable message, not
  a white page.
- `npm run build` creates `dist/`, and that folder works on any server without
  changes.

**Not in this version:** working search, a real cart page, removing items,
changing quantities, checkout, login, payment.

## 2. Screens and parts (from `index.html`)

| Part | Element | Content |
|---|---|---|
| Notice bar | `#news-section` | Free-delivery text |
| Brand and nav | `#site-brand`, `nav` | Logo `pomegranate-logo-02.svg`, name, tagline, search box, cart button |
| Category menu | `#header-categories` | "All categories" dropdown and quick links |
| Hero | `.hero-container` | Big title, text and the call-to-action button |
| Categories | `.flex-item-categories` | One card per category (emoji, name, color) |
| Offers carousel | `#offers-carousel` | Products that have an offer |
| Second carousel | `#discounted-carousel` | Products of one category (currently snacks, id 7) |
| Feature banners | `.feature-container` | Two text banners |
| Footer | `footer` | About, address, phone, category links, help links, working hours |

Each carousel has its own loading text and error text inside it.

## 3. Data (`src/types.ts`)

These types follow the real JSON files:

- `Category`: `id`, `slug`, `name`, `emoji`, `color`.
  The slug is the section fragment, for example `#dairy`.
- `Product`: `id`, `categoryId`, `name`, `emoji`, `unit`, `price` (Toman), `tags: string[]`.
- `Offer`: `productId`, `percent`, `label`.
- `Stock`: `updatedAt` and `items`, a map from the product id to the quantity.
  It is `Record<string, number>`, because JSON keys are always strings.
- `Shop`: name, slogan, city, phone, hours, delivery fee, free-delivery limit,
  notice, about, address, schedule, menu, help and copyright.
- `CartLine`: a `Product` plus `quantity`.
- `LoadState`: `loading`, `success` (with `products`), `empty`, `error` (with `message`).

Utility types we use in real code:

- `Pick<Product, 'id' | 'price'>` for a cart line.
- `Record<string, number>` for stock.
- `Readonly<Shop>` for shop data that must not change.

Sort and filter options are defined with `as const`, and their type is derived
from the array. `enum` is not used.

## 4. Who owns each piece of data?

| Data | Lives in | Why |
|---|---|---|
| Product name, emoji, unit | Server (`products.json`) | Source of truth |
| Product price | Server | The client must never decide a price |
| Stock | Server (`stock.json`, `items[id]`) | Changes often |
| Discount percent and label | Server (`offers.json`) | A business decision |
| Category list | Server (`categories.json`) | Same for every visitor |
| Shop info, notice, hours | Server (`shop.json`) | Changing it should not need a new build |
| Hero, banners, promos | Server (`home.json`) | Same reason |
| What the carousel shows now | State (`LoadState` in `main.ts`) | Only lives while the page is open |
| Cart quantities | `localStorage`, key `cart` | Must survive a reload |
| Section the user opened | URL hash, e.g. `#dairy` | Can be shared |
| API address | `.env` (`VITE_API_URL`) | Different in dev and production |

Joining rules from the API README:
`product.id` ↔ `stock.items[product.id]` ↔ `offer.productId`, and
`product.categoryId` ↔ `category.id`.
The final price is `price × (1 − percent / 100)`. This is only for display.

## 5. API contract (what we fetch, when, and what shape)

Base address: `import.meta.env.VITE_API_URL`.

- Development (`.env.development`): `/api`. Vite sends it to `https://gof.zzb.cx`.
- Production (`.env.production`): `../../api`, so `dist/` works under `/shops/semver/`.
- `.env.*.local` files are never committed.

| File | Read by | When | Result | Guard |
|---|---|---|---|---|
| `categories.json` | `fetchCategories` | At start | `Category[]` | `isCategory` |
| `products.json` | `fetchProducts` | At start | `Product[]` | `isProduct` |
| `offers.json` | offers loader | At start | `Offer[]` | `isOffer` |
| `stock.json` | stock loader | At start | `Stock` | `isStock` |
| `shop.json`, `home.json` | not used yet | Later | `Shop` | later |

How one fetch works:

1. `getJSON(path)` returns `Promise<unknown>`. If `res.ok` is false it throws an error.
2. `fetchChecked<T>` and `fetchList<T>` check the data with a Type Guard.
3. Items that fail the guard are dropped, and `N items dropped` is written to the Console.
4. Only valid data goes to the screen.

I test it by changing the file name to `broken.json` (invalid JSON) and then to
`missing.json` (404). In both cases the page must show an understandable message.

## 6. States of each part

| Part | loading | success | empty | error |
|---|---|---|---|---|
| Offers carousel | "در حال بارگذاری محصولات..." | Product cards with discount | "No offers today" | Error message |
| Second carousel | Same loading text | Product cards | "No products in this category" | Error message |
| Categories | Nothing yet | Category cards | Nothing | Message in the console (to improve) |
| Cart count (later) | 0 | Saved count | 0 | Empty cart if stored data is invalid |

- Text comes from `ui/state-text.ts`, from one `switch` on `status`.
- The `default` branch assigns the state to a `never` variable. If a new state
  is added later and not handled, `tsc` shows an error.
- A product with stock `0` still appears, with "out of stock" and a disabled button.

## 7. Folders and layers
shops/semver/

index.html loads /src/main.ts

style.css

DESIGN.md

vite.config.ts base “./”, dev proxy /api -> https://gof.zzb.cx

tsconfig.json strict, include [“src”]

.env.development VITE_API_URL=/api

.env.production VITE_API_URL=…/…/api

src/

types.ts types imports nothing

api/

client.ts data getJSON, fetchChecked, fetchList

guards.ts data isProduct, isOffer, isCategory, isStock

shop-api.ts data fetchCategories, fetchProducts

storage/ data the only place with localStorage

cart/ logic pure cart rules

ui/ ui builds DOM from parameters

format.ts price and number formatting

notify.ts notifications

product-card.ts one product card

state-text.ts text for each LoadState

carousel.ts draws a carousel from a LoadState

categories.ts draws category cards

main.ts main state, events, start


Rules:

- Imports only go down: `main → ui / logic / data → types`. No cycles.
- Only `src/api/` has `fetch`. Only `src/storage/` has `localStorage`.
- `src/ui/` only draws. It does no fetch and no calculation.
- No file longer than 70 lines.
- No `utils.ts` or `helpers.ts`.
- A function that does two things becomes two functions.
- Forbidden in all code: `any`, `as` to silence errors, `!`, `@ts-ignore`, `enum`.

## 8. Security

- Everything in the browser is public: JS code, `localStorage` and API data.
  Anyone can change a price or quantity in the DevTools.
- Never put a secret in a `VITE_` variable. It ends up in the public bundle.
- The cart total in the browser is only to show the user.
- At checkout, the server must read prices, stock and offers from its own data.
  It must ignore any price sent by the browser, and calculate the delivery fee
  and the final total itself.
- JSON from outside is trusted only after a Type Guard check.

## 9. Current status and known gaps

Done:

- `strict` mode, `types.ts`, guards, `getJSON`, layered folders.
- `index.html` loads `src/main.ts`. `script.ts` is removed.
- Categories and the second carousel render from the API.
- `VITE_API_URL` and the env files.
- Favicon, and the logo renamed without a space.

Not done yet:

- `loadOffers` and `#offers-carousel` are not connected to the API.
- Offers and stock are not joined to products yet.
- The category container (`.flex-item-categories`) has no `id`.
- `shop.json` and `home.json` are not used. The header, footer and hero text are still static in the HTML.
- Search, cart and `src/storage/`, `src/cart/` are not built yet.
- The hero redesign is on the branch `style/hero-redesign`. It is design work and is not part of this task.
`
    