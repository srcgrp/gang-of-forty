# Strategic Supermarket — design on one page

## 1. Needs (what must it do?)
- Browse the home page, open a category or the special offers, and search by name, unit, tag or category.
- See on every card: image, name, unit, current price, discount (if any) and stock status.
- Add a product, change its quantity or remove it. The quantity can never go above the current stock.
- The cart survives a refresh. A category or a search is a link that can be shared and restored.
- On purpose NOT in this version: accounts, payment, real orders. The checkout button only says "not active yet".

## 2. Parts of the page
Header (brand, notice, menu, search box, cart button with count and hover summary) · Home (hero, category grid, product shelves, promo banners) · Category / offers grid · Search results · Product card with the +/- capsule · Cart summary panel · Footer (about, categories, help, hours, contact, social).

## 3. Data and who owns it
| Data | Owner | Notes |
|---|---|---|
| products, categories, offers, stock, shop texts, home content | server (`/api`) | source of truth, read only |
| sale price, lookup maps, search index | State (memory) | derived at start, never saved |
| loaded model, load state, cart panel open/closed | State (`main.ts`, memory) | rebuilt on every start |
| cart: product id → quantity | localStorage `armin-market:cart` | validated on load, then cut down to the stock |
| selected category, search text | URL `?category=…&q=…` | restored after refresh; old `?cat=` links still read |
| API base address | env `VITE_API_URL` | `/api` in dev, `../../api` in production |

## 4. API contract
All six files are fetched once, in parallel, at start (one 30 s timeout). A retry button fetches them again. The base is `import.meta.env.VITE_API_URL`; only `src/api/` calls `fetch`.
| File | Type | If it is wrong |
|---|---|---|
| `products.json` | `Product[]` | a bad record is skipped and counted in the Console |
| `categories.json` | `Category[]` | error state |
| `stock.json` | `StockData` | error state |
| `offers.json` | `Offer[]` | error state |
| `shop.json` | `ShopData` | error state |
| `home.json` | `HomeData` | error state |
`getJSON(path)` returns `Promise<unknown>` and checks the HTTP status. A Type Guard checks every answer before any other code sees it.

## 5. States (`LoadState`: loading · success · empty · error)
| Part | loading | success | empty | error |
|---|---|---|---|---|
| Page | skeleton (hero, categories, cards); after 3 s a slow-connection note | routed view | "no products yet" | readable message + file name + retry button |
| Category / offers | skeleton | product grid | "no products in this section" | "category not found" with a way home |
| Search | skeleton | matching products | "nothing found" + clear-search button | same as page |
| Cart panel | "products are still loading" | items, count, display-only total | "your cart is empty" | same as loading (saved cart is kept) |
The page state is a union, shown with a `switch` whose `default` assigns the value to `never`.

## 6. Folders (each file one job, at most 70 lines)
`src/types.ts` all shared types, imports nothing · `api/` fetch + Type Guards · `storage/` localStorage (cart) and the URL (`location`, `history`) · `cart/` pure cart rules and totals · `catalog/` pure prices, model, search, product pictures · `ui/` builds and updates the DOM (no fetch, no localStorage) · `main.ts` holds State, wires events, starts the app.
Imports only point down: `main` → `ui` / `cart` / `catalog` / `api` / `storage` → `types`. The three layers `ui`, data (`api/`, `storage/`) and logic (`cart/`, `catalog/`) never import one another; only `main.ts` connects them. There are no import circles. `cart/` and `catalog/` never touch `document`, `window`, `fetch` or `localStorage`. No file is called `utils` or `helpers`. Checked by `npm run check` (types) and `node check-arch.mjs src --shop` (architecture).

## 7. Security
- Everything in the browser is public: `VITE_` values end up in the bundle, so they hold only the API address, never a key or secret. localStorage can be read and edited by the user.
- API answers, URL values and the saved cart are untrusted: Type Guards check them, bad saved quantities are dropped, text is shown with `textContent` (never as HTML), and links go through a safe-address check.
- The cart total is for display only. Anyone can change prices, quantities and the total in DevTools. When ordering is built, the server must recompute price, discount, stock and the final total from product ids and quantities, and must never trust the browser's total.