# Strategic Supermarket — design on one page

## 1. Needs
- Browse products, select a category or offers, search, add/remove packaged sale units and inspect the cart.
- Preserve category and search together in a shareable URL; preserve the cart across refreshes and browser tabs.
- Limit quantities to the current stock. Checkout is a display-only placeholder; accounts, payment and orders are out of scope.

## 2. Parts of the page
Header, category filters, home hero, product shelves, promotional banners, category/search grids, quantity controls, cart summary and footer.
The home-return button always navigates home; browser Back/Forward retains its history behavior. Category tiles, category menu entries, footer categories and “see all” links select a filter. API hero/menu fragment links deliberately scroll to home shelves.
The existing Armin brand/contact details stay in the presentation layer; the API's sample shop identity is still fully typed and validated.

## 3. Data and owners
| Data | Owner | Lifetime |
|---|---|---|
| Products, prices, offers, stock, home and shop content | API | Read and validate at startup/retry |
| Model, LoadState, cart and pending input | `main.ts` | One running page |
| Product/category maps, search matches, hero selection | Products feature | Pure derived values |
| Cart rows, subtotals, count, total, discount | Cart feature | Pure derived values |
| Selected category and search | URL, only `storage/url-state.ts` | Shareable and restored on refresh |
| Cart `{ productId, quantity }[]` | localStorage `armin-market:cart` | Validated on read; reconciled against stock |
| API base | `VITE_API_URL` | `/api` in development; `../../api` in production |
| Open cart, hover timers, search debounce, last cart display | UI | Presentation state only |
All URL reads/writes and filter-link construction live in the same data file. UI receives a link callback and action callbacks, never mutable application State or data/logic ports.

## 4. API contract
All six JSON files load in parallel, with a 30-second timeout and a retry action.
| File | Contract | Invalid data |
|---|---|---|
| `products.json` | `Product[]` | Skip invalid records and log their count; reject a non-array |
| `categories.json` | `Category[]` | Show error |
| `offers.json` | `Offer[]` | Show error |
| `stock.json` | `StockData` | Show error |
| `shop.json` | `ShopData` | Show error |
| `home.json` | `HomeData` | Show error |
`getJSON` returns `Promise<unknown>`, rejects non-OK responses and reports malformed JSON. Guards validate every modeled field before building the model.
IDs are positive safe integers; prices are finite and nonnegative; discounts include 0–100%. Stock and cart quantities are nonnegative safe integers: one quantity is one API sale unit, e.g. one 1-kg package, not a fraction of that package.
Prices round once to the nearest whole toman after applying the discount. They are never rounded to thousands. Totals and discount percentages are computed in the cart feature.

## 5. States and recovery
| State | Page | Cart |
|---|---|---|
| loading | Skeleton, then slow-connection notice after 3 seconds | Saved count; details unavailable |
| success | Home, selected category, offers or matching search results | Valid rows and computed totals |
| empty | No-products message; a search/category with no matches has its own empty view | Empty after reconciliation |
| error | Readable error, failing file/status and retry button | Saved cart retained; details unavailable |
Error State retains its API failure details through re-renders; a new request clears them. Body-download aborts are timeouts, while malformed JSON is a parse error.
`LoadState` is a discriminated union; the status renderer switches on it and checks `never` in default.
Input is captured immediately, including an empty string, and rendered after a 150-ms debounce. Pending input is applied after loading for every route, retaining its category. Back/Forward restores filters and cancels obsolete UI debounce timers.
On an external storage event, `main.ts` loads and reconciles the cart before rendering; it does not write back to other tabs. Local saves skip identical serialized values, avoiding storage feedback loops.

## 6. Folders and boundaries
```text
src/
  main.ts, types.ts, vite-env.d.ts
  api/, storage/, shared/, ui/
  features/
    cart/       cart.ts, cart-rules.ts, cart-totals.ts
    products/   products.ts, build-model.ts, empty-model.ts, view-model.ts,
                price.ts, search.ts, search-key.ts, hero-tag.ts,
                art-category.ts, art-product.ts, to-card.ts
```
- `types.ts`: central API, application and presentation contracts; imports nothing.
- `api/`: HTTP, guards and loading. The only place containing fetch.
- `storage/`: cart persistence and one URL adapter. The only place containing localStorage.
- `features/products/`: pure model, search, pricing and product view-model preparation.
- `features/cart/`: pure quantity rules, cart rows, subtotals and summary view-model preparation.
- `shared/`: pure numeric behavior used by feature logic.
- `ui/`: DOM, visual effects, event adapters and display snapshots. Receives data and action callbacks; never mutates business State or invokes persistence/loading.
- `main.ts`: owns State, connects both features, performs effects, wires browser events and starts the app.
Feature presentation models live with their feature; DOM adapters stay in `ui/` because the unchanged class checker classifies every `features/` file as pure logic. Neither feature imports the other; both meet only in main. No cycles, generic utils/helpers or TypeScript files over 70 lines.

## 7. Security
Everything in the browser is public, including bundled `VITE_` variables; env files contain no secret. API responses, URL parameters and stored cart data are untrusted.
API text renders with `textContent`; the Notyf HTML sink receives text escaped through a DOM text node. Links pass an allowed-protocol check. Invalid fragments do not throw during link handling.
Client prices, quantities and totals can be edited in DevTools. A real ordering server must look up product IDs, recheck stock and recompute prices, discounts and totals; it must not trust the browser's result.