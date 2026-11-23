# Sharding Design

## 1. Requirements

What the user can do:
- See the shop info, hero, banners, categories and product shelves (all from the API).
- Filter by category and search products by name.
- See price, discount and if the product is in stock.
- Add a product to the cart, change the quantity, remove it. Quantity can't be more than stock.
- See the cart count in the header and open a small cart panel with items and an estimated total.
- Keep the cart after refresh (localStorage).
- Keep the selected category and search text in the URL (`?category=dairy&q=milk`), so refresh or sharing the link doesn't lose them.
- Choose light / dark / system theme.

Out of scope:
- Accounts and login.
- Payment and real checkout.
- Changing the shared `/api/` files or making a backend.

## 2. Page sections

- Header: logo, menu, search, cart badge, theme switch
- Hero: video, title, text, button (from `home.json`)
- Banners: promo carousel
- Categories: list + filter
- Shelves: one carousel per category + offers
- Product card: image, name, price, discount, stock, add/quantity buttons
- Cart panel: items, quantities, remove, total
- Footer: about, links, contact, working hours

## 3. Data and who owns it

| Data | Where | Owner |
|---|---|---|
| products, prices | products.json | server |
| categories | categories.json | server |
| offers | offers.json | server |
| stock | stock.json | server |
| shop info | shop.json | server |
| hero and shelves config | home.json | server |
| cart (id and quantity only) | state + localStorage | browser |
| selected category and search text | state + URL | URL |
| theme | localStorage | browser |
| API address | .env files | build config |

The cart only keeps product ids and quantities. Price, discount and stock are always read from the API, so the cart never has an old price.
API data is not trusted until a type guard checks it, because TypeScript types don't exist at runtime.

## 4. API contract

The API is read only, I don't change it. The base address is `VITE_API_URL`.

All JSON files are loaded once at start with `Promise.allSettled`, so if one fails the others still work.

Relations: `Product.categoryId` = `Category.id`, `Offer.productId` = `Product.id`, `Stock.items` is keyed by product id.

`getJSON(path)` returns `Promise<unknown>` and throws `HTTPError` on bad status or `AbortError` on timeout. After that each data type has its own guard. A bad product is removed and counted in the console, the other products still show. A bad link inside `shop.json` or `home.json` is filtered out to save the rest of the UI. If `products.json` fails entirely, `loadAllData` returns `LoadState` with `status: 'error'` and a friendly Persian message depending on the error type (timeout / network / invalid data).

## 5. States

Products use this union:

```ts
type LoadState =
  | { status: 'loading' }
  | { status: 'success'; products: Product[] }
  | { status: 'empty' }
  | { status: 'error'; message: string };
```

`renderProducts` uses a `switch` on `status` and `assertNever` in the `default`, so a new state gives a compile error until I handle it.

| Section | loading | success | empty | error |
|---|---|---|---|---|
| Header, footer | skeleton | text | hidden | skeleton removed |
| Hero | skeleton | video + text | only title | no button |
| Categories | skeleton | list | only "All" | skeleton removed |
| Shelves | skeleton cards | cards | "no products" | message + retry |
| Search | - | results | "nothing found" | same as empty |
| Cart panel | - | items + total | "cart is empty" | unknown ids skipped |

Empty is not the same as error. I test with `broken.json` and `missing.json` and the page must show a message, not a white page.

Note: If `stock.json` fails, we assume items are in stock to avoid breaking the UI, because the stock limit is a soft constraint.

## 6. Folders

```text
src/
  main.ts               Entry point: wires features and shared, no business logic.
  
  shared/               Code used by more than one feature.
    types.ts            Global types, imports nothing.
    content.ts          Static image maps.
    api/                Data layer: fetch + type guards. One file per JSON.
    storage/            Data layer: localStorage and URL management.
    state/              AppState type + createState.
    logic/              Pure functions: pricing, stock, content helpers.
    ui/                 Reusable DOM components: dom, icons, theme, toast, etc.

  features/             Isolated business domains.
    cart/               Cart logic, UI panel, and cart rows.
      logic/            Pure cart state functions (add, remove, count).
      ui/               DOM rendering for the cart panel and buttons.
      
    products/           Product shelves, categories, search, and header.
      logic/            Pure product filtering and card mapping.
      ui/               DOM rendering for products, search, and header.
```

Imports only go down:
- `main` can use `ui`, `logic`, `data`, `types`
- `ui` can use only `ui` and `types`
- `logic` can use only `logic` and `types`
- `data` can use only `data` and `types`
- Features only use `shared` and their own code. They do not import each other. `main.ts` connects them.

Other rules: max 70 lines per file, no `utils.ts` or `helpers.ts`, a function with two jobs becomes two functions, no `any`, `as`, `!` or `@ts-ignore`.

## 7. Security and deploy

- Everything in the browser is public, also the `VITE_*` variables. No secrets or keys in the code or .env.
- A user can change prices, stock and totals in DevTools. So the cart total here is only an estimate. If I add checkout later, the server must calculate the final total from real prices, discounts and stock.
- Text from the API is added with `textContent`, not `innerHTML`.
- `href` attributes from the API are validated with `isLink` to prevent `javascript:` XSS.
- `base: './'` and relative asset paths, so `dist/` works under `/shops/<slug>/`.
- `.env.development`: `VITE_API_URL=/api`. `.env.production`: `VITE_API_URL=../../api`.
- Before PR: `npm run check`, `node check-arch.mjs src --shop`, `npm run build` and `npm run preview` with no errors in Console and all files 200 in Network. To test the subfolder, serve the `dist` folder under a subpath.
