# Sam Market — design on one page

## 1. What must it do? (requirements)

Sam Market is a single-page supermarket website. Customers can browse products and categories, search for products, check prices, discounts and stock, and add available products to the cart. The cart count is saved in localStorage, so it stays after a page refresh. Clearing the cart requires confirmation.

The home page features carousels for dairy products and special offers, using data from the API. Customers can add products directly from these carousels to the cart. Other categories are available through navigation links and their own product sections, without separate home-page carousels.

Not included: checkout, placing orders, user accounts, or changing quantities for individual products. The cart stores the total number of added items.

## 2. Screens and parts

- **Header:** logo, shop notice, search form, cart count, clear-cart button, and desktop/mobile navigation
- **Home:** hero banner, promotions, dairy and offer carousels, and a side banner loaded from `home.json`
- **Category list:** category links from the API and product sections for each category
- **Search results:** Fuse.js search results, including a message when nothing matches
- **Product card:** product name, emoji, unit, original or discounted price, stock status, and add button
- **Cart:** total item count, Notyf success message, and SweetAlert2 confirmation before clearing
- **Story and footer:** Sam Market's custom story is written in the project rather than fetched from the API (cus it's mine and not in JSON files - other parts of footer are fetched from API). Shop information, address, phone number, opening hours, and footer links come from the API

## 3. Data (types.ts)

All shared shop data models are defined in `src/types.ts` and imported with `import type` where needed. The file also contains reusable utility types and an `as const` list for fixed options.

| Type | Main fields |
| --- | --- |
| `Product` | `id`, `categoryId`, `name`, `emoji`, `unit`, `price`, `tags` |
| `Category` | `id`, `slug`, `name`, `emoji`, `color` |
| `Stock` | `updatedAt`, `items: Record<number, number>` |
| `Offer` | `productId`, `percent`, `label` |
| `Shop` | name, slogan, contact information, opening hours, delivery settings, navigation links, and other shop details |
| `Home` | hero, side banner, promotions, and carousel configurations |

The cart uses `cartCount` to store only the total number of added items. It does not have a per-product cart item model.

## 4. Where does each piece live?

| Owner | Data |
| --- | --- |
| **Server / API** | products, categories, prices, stock, discounts, home content, and shop information |
| **Client state** | `cartCount`, search input, search results, and rendered UI state |
| **localStorage** | `tdd:w2:cart-count`, used to restore the cart count after a refresh |
| **URL** | `location.hash` for navigation to sections and products. Search results use the form input rather than a URL query parameter |
| **Project files** | `brandStory` in TypeScript and the static `#story` section in HTML |
| **Environment** | public API base URL through `VITE_API_URL` |

The displayed discounted price is calculated from the product price and offer percentage. A product with zero stock has a disabled add button.

**Security:** Everything sent to the browser, including `VITE_*` values, is public. No secrets should go into frontend code or public environment variables. localStorage can also be edited by users. In a real checkout flow, the server must recalculate prices, verify stock, and validate the final total instead of trusting browser values.

## 5. API (what we fetch, and when)

Six JSON requests run together when the page starts:

| GET | Type | Used for |
| --- | --- | --- |
| `${import.meta.env.VITE_API_URL}/products.json` | `Product[]` | product cards and search |
| `${import.meta.env.VITE_API_URL}/stock.json` | `Stock` | product availability |
| `${import.meta.env.VITE_API_URL}/offers.json` | `Offer[]` | discounts and the offers carousel |
| `${import.meta.env.VITE_API_URL}/categories.json` | `Category[]` | category navigation and sections |
| `${import.meta.env.VITE_API_URL}/shop.json` | `Shop` | shop details and navigation |
| `${import.meta.env.VITE_API_URL}/home.json` | `Home` | banners, promotions, and home carousels |

The API layer returns `Promise<unknown>` from `getJSON(path)`, checks `response.ok`, and validates external data with Type Guards. Invalid products are skipped individually, and their count is logged to the console. A failed request or invalid required data produces a readable error state instead of a blank page.

The API base URL comes from `import.meta.env.VITE_API_URL`: `/api` in `.env.development` (proxied to `https://gof.zzb.cx`) and `../../api` in `.env.production`. Requests use this base rather than hard-coded deployment paths.

## 6. States of each screen

| State | What the user sees |
| --- | --- |
| **Loading** | A loading message and `aria-busy=true` while the initial requests run |
| **Success** | Banners, product cards, categories, and shop details |
| **Empty** | A message if a carousel has no products or the search has no matches |
| **Error** | A readable message in `#page-status` if loading fails; technical details go to the console |

An empty cart disables the clear button. Canceling the confirmation dialog leaves the cart unchanged. If localStorage cannot be updated, the page shows a separate message.

Page loading is represented by a `LoadState` discriminated union. A `switch` on `status` handles loading, success, empty, and error, with a `never` check for unhandled states.

## 7. Folders

Project structure:

```text
shops/tdd/
  index.html
  style.css
  DESIGN.md
  package.json
  package-lock.json
  tsconfig.json
  vite.config.ts
  check-arch.mjs
  .env.development
  .env.production
  src/
    types.ts
    api/
    storage/
    cart/
    catalog/
    ui/
    main.ts
```

- `src/types.ts`: shared data types and utility types
- `src/api/`: fetch requests and validation of external JSON
- `src/storage/`: all localStorage access
- `src/cart/`: cart rules without DOM, fetch, or localStorage
- `src/catalog/`: product filtering, discount calculation, and search rules
- `src/ui/`: DOM elements and rendering
- `src/main.ts`: application state, event handlers, and startup

Imports should point downward, from `main.ts` to UI, logic, and data modules, then to shared types. There should be no circular imports.

`index.html` loads `/src/main.ts`. The code is split by responsibility, with no circular imports, no generic `utils.ts` or `helpers.ts`, and files kept under 70 lines. The architecture is checked with `node check-arch.mjs src --shop` as well as `npm run check`.

For deployment, Vite uses `base: './'` and the environment-specific API URL. `npm run build` generates a self-contained `dist/` with relative asset paths that can be served under `/shops/tdd/`.
