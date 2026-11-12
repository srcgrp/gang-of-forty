# Nardone Grocery Storefront — Design Notes

## Component tree

```text
index.html
└── src/main.tsx
    └── React.StrictMode
        └── App
            └── Storefront
                ├── Header
                │   ├── SearchBox
                │   │   └── Search suggestions popup (portal under the input)
                │   ├── CartPanel
                │   ├── CategoryNav
                │   └── Hero section (markup inside Header)
                ├── main
                │   ├── CategoryList
                │   └── ProductCollections
                │       ├── Error message + Retry button (error state)
                │       └── Home collections
                │           ├── HomeCarousels (offers)
                │           │   └── Offer section(s)
                │           │       ├── SaleCountdown
                │           │       └── ProductGrid → ProductCard × N
                │           ├── LatestProducts
                │           │   └── ProductGrid → ProductCard × N
                │           ├── CategoryShelves
                │           │   └── ProductGrid → ProductCard × N
                │           ├── HomeCarousels (other sources)
                │           │   └── ProductGrid → ProductCard × N
                │           └── PromoBanners
                └── Footer
```

`main.tsx` mounts `App` into the `#root` element inside `React.StrictMode`. `Storefront` composes the page. `ProductCollections` selects the error or home view; the error view takes precedence. Search results are rendered by `SearchBox` in its popup, while the home collections remain visible. Each product grid renders loading, empty, error, or product-card content from its `LoadState`.

## State ownership

| State or value | Owner | Updated by | Storage or reason it is derived |
|---|---|---|---|
| `cart` | `App` | Add and remove handlers | React state in memory; initialized from and persisted to `localStorage` through `storage/cart-storage.ts`. |
| `cartOpen` | `App` | Cart button click handler | React state in memory; controls the visibility of `CartPanel`. |
| `categoryId` | `App` | Category navigation callback | React state in memory; drives active-category selection and the `LatestProducts` filter. |
| `query` | `App` | `SearchBox` change callback | React state in memory; the controlled input value used to derive search results. |
| `attempt` | `App` | Retry handler | React state in memory; changing the counter reruns the loading effect. |
| `loadState` | `App` | API loading effect and Retry handler | React state in memory; represents `loading`, `success`, `empty`, or `error`; successful state carries product views. |
| `store` | `App` | Successful API loading effect; cleared by Retry | React state in memory; contains categories, home-page configuration, and shop information. |
| `secondsLeft` | `SaleCountdown` | Its one-second interval callback | React state in the mounted component; initialized to 3,600 seconds and reset when that instance mounts again. |
| `products` | `App` | Extracted from successful `loadState` | Derived during render; storing another copy would duplicate API state. |
| `categories` | `App` | Read from `store` or defaults to an empty list | Derived during render; it mirrors the loaded store data. |
| `cartCount` | `App` | Calculated from `cart` | Derived during render; it is the sum of cart quantities. |
| `cartTotal` | `App` | Calculated from `cart` and `products` | Derived during render; it is the current price total, so it should not be stored separately. |
| `searchState` | `App` | Filtered from `loadState`, `query`, and `categories` | Derived during render; this keeps search results synchronized with the current query and catalog. |

## Data flow and effects

- `App` requests products, offers, stock, categories, shop information, and home-page configuration together with `Promise.all` through `src/api/shop-api.ts`.
- Network access is kept in `src/api/client.ts`. API guards validate responses; malformed list entries are discarded with a warning, while an invalid response or failed request produces the error state.
- The loading effect depends on `[attempt]`. Its cleanup sets an `ignore` flag so a completed request from a cleaned-up effect cannot update the page.
- The Retry button clears the loaded shop data, switches `loadState` to `loading`, and increments `attempt`, which starts the requests again.
- `SearchBox` receives `query` and `onQueryChange` from `App`, so the input is controlled. On each render, `filterProductsByQuery` derives search results from the loaded catalog. It searches product names, units, category names, and tags, and normalizes Persian character variants, diacritics, and half-spaces. It does not mutate the source catalog.
- Matching results and loading, empty, or error feedback appear in a popup aligned below the search input. The popup is rendered through a portal so the input keeps its original position in the header layout; its position follows the input on scroll and resize. Clicking outside or pressing Escape closes it. The regular home collections remain visible while searching.
- Cart changes go through the pure functions in `src/cart/cart.ts`; persistence is handled by `src/storage/cart-storage.ts`.
- Each mounted `SaleCountdown` starts one one-second interval in an effect with an empty dependency array and clears that interval in cleanup. The current API does not provide an offer end time, so the display starts from one hour locally.

## Source layout

```text
src/
  main.tsx                  React entry point and existing stylesheet import
  App.tsx                   Page state, API loading, derived values, and handlers
  types.ts                  Shared data types and LoadState
  api/                      HTTP client, endpoints, response guards, product views
  catalog/                  Product-state helpers and search filtering
  cart/                     Cart operations
  storage/                  Cart localStorage read/write
  components/               Storefront, navigation, cart, product, and page sections
  utils/                    Formatting and notifications
```

`src/api/client.ts` is the only source module that calls `fetch`; `src/storage/cart-storage.ts` owns `localStorage` access. Components receive data and event handlers through props. Product lists use stable product or category identifiers for React keys.

## Scope and current limitations

- Search runs in the browser over the catalog returned by the API.
- The countdown is a one-hour client-side timer because the API has no sale deadline.
- The cart is stored locally; checkout and order submission are outside this implementation.
- The existing stylesheet at `../style.css` continues to define the storefront appearance. `SearchBox.css` contains only the requested search-popup styles.
