# Sam Market — design on one page

## 1. What must it do? (requirements)

Sam Market is a single-page supermarket website. Customers can browse products and categories, search for products, check prices, discounts and stock, and add available products to the cart. The cart stores each product and its quantity in localStorage, so it stays after a page refresh. Clearing the cart requires confirmation.

The home page features carousels for dairy products and special offers, using data from the API. Customers can add products directly from these carousels to the cart. Other categories are available through navigation links and their own product sections, without separate home-page carousels.

Not included: checkout, placing orders, or user accounts.

## 2. Screens and parts

- **Header:** logo, shop notice, search form, cart count, clear-cart button, and desktop/mobile navigation
- **Home:** hero banner, promotions, dairy and offer carousels, and a side banner loaded from `home.json`
- **Category list:** category links from the API and product sections for each category
- **Search results:** Fuse.js search results, including a message when nothing matches. The search term and selected category stay in the URL, so the same results can be shared or restored after a refresh
- **Product card:** product name, emoji, unit, original or discounted price, stock status, and add button
- **Cart:** product rows with quantities, total item count, total price, Notyf success message, and SweetAlert2 confirmation before clearing
- **Story and footer:** Sam Market's custom story is written in the project rather than fetched from the API (cus it's mine and not in JSON files - other parts of footer are fetched from API). Shop information, address, phone number, opening hours, and footer links come from the API

### React component tree

`src/main.tsx` mounts `App` inside React Strict Mode. `App` owns the application state and event handlers. It renders the loading status until the API data is ready, then passes data and callbacks to `Storefront`.

```text
main.tsx
└── App
    ├── LoadStatus
    └── Storefront
        ├── Header
        │   ├── CartPanel
        │   └── CategoryNav
        ├── Hero
        ├── SearchResults
        ├── PromoGrid
        ├── CategoryGrid
        ├── ProductGrid
        │   └── ProductCard
        │       ├── OfferBadge
        │       └── Price
        ├── SideBanner
        ├── StoreStory
        ├── About
        └── Footer
```

## 3. Data (types.ts)

All shared shop data models are defined in `src/shared/types.ts` and imported with `import type` where needed. The file also contains reusable utility types and an `as const` list for fixed options.

| Type | Main fields |
| --- | --- |
| `Product` | `id`, `categoryId`, `name`, `emoji`, `unit`, `price`, `tags` |
| `CartLine` | `productId`, `quantity` |
| `Category` | `id`, `slug`, `name`, `emoji`, `color` |
| `Stock` | `updatedAt`, `items: Record<number, number>` |
| `Offer` | `productId`, `percent`, `label` |
| `Shop` | name, slogan, contact information, opening hours, delivery settings, navigation links, and other shop details |
| `Home` | hero, side banner, promotions, and carousel configurations |

The cart is an array of `CartLine` objects. Each line stores a product ID and its quantity.

## 4. Where does each piece live?

| Owner | Data |
| --- | --- |
| **Server / API** | products, categories, prices, stock, discounts, home content, and shop information |
| **React state** | `loadState`, `shopData`, `categoryId`, and `cart` |
| **localStorage** | `tdd:w5:cart`, used to restore the cart lines and quantities after a refresh |
| **URL** | `?category=<slug>&q=<term>` stores the selected category and search term. `#section` links to a section or product. Both filters survive a refresh and browser Back/Forward |
| **Project files** | `StoreStory` and other static storefront content in `src/components/` |
| **Environment** | public API base URL through `VITE_API_URL` |

Only `src/shared/data/url.ts` reads or writes the URL. Category links update the category parameter, and submitting a search updates `q`. Search results are filtered by the category when one is selected.

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

| State | Owner | Changed by | Storage |
| --- | --- | --- | --- |
| `loadState` | `App` | API loading effect: loading, success, empty, or error | React state only; loaded again when the app starts |
| `shopData` | `App` | API loading effect after `loadShopData()` succeeds | React state only; fetched again when the app starts |
| `categoryId` | `App` | Category selection callback passed to navigation, category cards, promotions, and banners | React state only |
| `cart` | `App` | Add, remove, and clear event handlers | `localStorage` key `tdd:w5:cart`; restored by `loadCart()` and saved by `saveCart()` |

### Derived values (not state)

These values are calculated from existing state or API data when rendering:

- Cart item count, calculated by `cartCount(cart)`.
- Cart total, calculated by `cartTotal(cart, products)`.
- Product availability and offer details, derived from stock and offer data in `ProductGrid`.
- Discounted prices, calculated by `Price` from the original price and offer percentage.

The cart count is also reflected in the page title through an effect. Cart changes are saved to localStorage through an effect.

Loading is represented by a `LoadState` discriminated union. A `switch` on `status` in `LoadStatus` handles loading, empty, and error states. Successful data is rendered by `Storefront`.

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
    main.tsx
    App.tsx
    components/
      About.tsx
      CartPanel.tsx
      CategoryGrid.tsx
      CategoryNav.tsx
      Footer.tsx
      Header.tsx
      Hero.tsx
      LoadStatus.tsx
      OfferBadge.tsx
      Price.tsx
      ProductCard.tsx
      ProductGrid.tsx
      PromoGrid.tsx
      SearchResults.tsx
      SideBanner.tsx
      Storefront.tsx
      StoreStory.tsx
    shared/
      types.ts
      data/
        api/
          client.ts
          guards.ts
          shop-data.ts
          shop-guards.ts
        url.ts
    features/
      cart/
        cart.ts
        controller.ts
        count.ts
        data/
          storage.ts
      products/
        products.ts
        search.ts
```

- `src/main.tsx`: React entry point; mounts `App` inside Strict Mode.
- `src/App.tsx`: owns application state, effects, and event handlers, then passes data and callbacks to the page components.
- `src/components/`: React components for the storefront, including `Storefront` which composes the page, and smaller components for its sections and controls.
- `src/shared/types.ts`: shared API types and utility types.
- `src/shared/data/api/`: API requests and Type Guards; the only place that uses `fetch`.
- `src/shared/data/url.ts`: URL filter and hash helpers.
- `src/features/cart/`: pure cart operations in `cart.ts` and localStorage persistence in `data/storage.ts`. The older `controller.ts` and `count.ts` modules remain in the folder but are not used by the React app.
- `src/features/products/`: product rules and search logic.

The old DOM-based UI folders and the old `src/main.ts` entry point have been removed. React components now live in `src/components/`, and `App.tsx` is the application state owner. Files stay under 70 lines, and there are no generic `utils.ts` or `helpers.ts` files. TypeScript checks use `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes`. Feature import boundaries are checked with `node check-arch.mjs src --feature-based`. The class-specific required function names in that script do not match this storefront's simpler cart behavior.

For deployment, Vite uses `base: './'` and the environment-specific API URL. `npm run build` generates a self-contained `dist/` with relative asset paths that can be served under `/shops/tdd/`.
