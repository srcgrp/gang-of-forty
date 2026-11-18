# Clean Market — design on one page

## 1. What must it do? (requirements)

- A customer can see the groceries, grouped by category, with the unit, the price, how many are left, and a discount when there is one.
- A customer can search by name, add an available product to the cart, see the cart count, and empty the cart.
- Not now: login, payment, checkout, and choosing a delivery time.

## 2. Page sections

One page, from top to bottom:

- Banner: the delivery notice
- Header: logo, slogan, search, cart count, menu
- Status line (`#status`)
- Hero and the side promo
- Category list, starting with All
- Featured rows: today's offers, plus the category named in `home.json`
- Promo strips
- One row for every other category
- Cart: the lines (name and qty), the discounted total, and a button that empties it
- Footer: about, address, phone, categories, help, hours, copyright

A product card shows the emoji, the name, the unit, the stock, the price, a discount badge when there is an offer, and the add button. An out-of-stock product is gray and its button is disabled.

## 3. Data and its owner

- Price, name, unit, and category: server (`products.json`, `categories.json`)
- Discount percent: server (`offers.json`). The browser computes the discounted price
- Stock left: server (`stock.json`)
- Banner, slogan, address, phone, menu, and footer: server (`shop.json`)
- Hero, promo strips, and the list of rows: server (`home.json`)
- Search text (`query`): React state in `Header`
- Selected category (`categoryId`): React state in `HomePage`
- Cart: shared context + reducer; saved in `localStorage` key `cart` only through `storage/cart-storage.ts`
- Theme: Zustand store with persist (`clean-code-theme`)
- Page jumps: TanStack Router hash routes (`#/`, `#/plp/$carouselId`)
- API address prefix: `.env`, variable `VITE_API_URL`

## 4. API contract

All six files are read once, together, when the page starts:

- `products.json` → `Product[]`: `id`, `categoryId`, `name`, `emoji`, `unit`, `price`, `tags`
- `categories.json` → `Category[]`: `id`, `slug`, `name`, `emoji`, `color`
- `offers.json` → `Offer[]`: `productId`, `percent`, `label`
- `stock.json` → `Stock`: `updatedAt`, `items` (product id → how many are left)
- `shop.json` → `Shop`: notice, slogan, about, address, phone, schedule, menu, help, copyright
- `home.json` → `Home`: hero, side, promos, carousels

Joins: `product.id` matches `stock.items` and `offer.productId`. `product.categoryId` matches `category.id`.

## 5. States

- loading: `#status` says the page is loading. Header and footer stay as an empty shell. Product rows, categories, hero, and promos are not filled yet. The cart can already show the saved lines.
- success: `#status` is cleared and hidden. Banner, hero, categories, rows, and footer show the server data. Cards show price, stock, and the add button.
- empty: a search with no match hides those cards, and hides a row whose cards are all hidden. The cart section still shows its lines and total. If the server returns no products, `#status` says nothing was found.
- error: `Status` shows the message and a Retry button. Retry sets loading and bumps `attempt` so the load Effect runs again. `broken.json` / `missing.json` use this same path. The page does not crash.

## 6. Component tree

See section 12 for the current per-page tree (routes + Layout).

## 7. Where state lives

| State | Owner | Who changes it | Where stored |
| --- | --- | --- | --- |
| `load` / `attempt` | `useCatalog` (used by pages) | load Effect (`loadShop`); Retry | React state |
| `query` | `Header` | `SearchBox` | React state |
| `categoryId` | `HomePage` | `CategoryNav` (`onPick`) | React state |
| `theme` | `useThemeStore` | `ThemeToggle` | `localStorage` (`clean-code-theme`) |
| `lines` (cart) | `CartProvider` + `cartReducer` | add / clear via `dispatch` | `localStorage` via `storage/cart-storage.ts` |
| `open` | `SalePanel` | toggle button | React state |
| `left` | `SaleCountdown` | `setInterval` every second | React state |

Derived (not state):

- cart count — from `lines` via `cartCount`
- cart rows / total — from `lines` + products + offers
- carousel products — `carouselProducts(catalog, id)`
- `document.title` — cart count Effect in `Header`

`App.tsx` only defines routes. Load goes through `api/` inside `useCatalog`; cart through `storage/` inside `CartProvider`.

## 8. Folders

```
src/
  types/             types layer     Product, Shop, Home, LoadState
  api/               data layer      reading JSON with fetch
  storage/           data layer      cart in localStorage; URL helpers
  catalog/           pure helpers    carouselProducts
  features/cart      cart rules      add, remove, count, rows, total
  features/products  product rules   offers, prices, filterProducts
  shared/            shared rules    findOffer and finalPrice
  hooks/             React hooks     useCatalog, useCart, useThemeStore, CartProvider
  components/        React UI        Layout, Header, pages/…
  App.tsx            TanStack Router only
  main.tsx           createRoot → CartProvider → App
```

## 9. Security

Everything on the page and in the JavaScript bundle is public: prices, discounts, and the value of `VITE_API_URL`. `.env` holds no password or private key, because every `VITE_` variable is copied into the file the browser downloads. The cart in `localStorage` can also be edited on that device.

The server must be the one that calculates the final cart total. A customer can change a price or a quantity in the browser tools. The server must add the total again from the product ids and its own prices, not from a number the page sends.

## 10. Routes

| Address             | Page       | Data from                                              |
| ------------------- | ---------- | ------------------------------------------------------ |
| `#/`                | `HomePage` | `useCatalog` → products, offers, home carousels        |
| `#/plp/$carouselId` | `PlpPage`  | `useCatalog` + `carouselProducts(catalog, carouselId)` |
| anything else       | `NotFound` | —                                                      |

Unknown `carouselId` stays on `PlpPage` and shows «این فهرست پیدا نشد» (not a blank page).
Routes are defined only in `App.tsx` with `createHashHistory()`.

## 11. Stores

| Store | Defined in                                                              | What it holds       | Who changes it                                                            | Where saved                                                                         |
| ----- | ----------------------------------------------------------------------- | ------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Theme | `hooks/useThemeStore.ts` (Zustand + persist)                            | `theme`, `toggle`   | `ThemeToggle`                                                             | `localStorage` key `clean-code-theme`                                               |
| Cart  | `hooks/cartReducer.ts` + `CartProvider` + `useCart` (context + reducer) | `lines`, `dispatch` | `HomePage` / `PlpPage` (add), `CartPanel` (clear), `Header` (reads count) | `localStorage` via `storage/cart-storage.ts` in a `useEffect` inside `CartProvider` |

Cart choice: **context + reducer**, not Zustand.
Why: cart actions stay as a pure reducer (`add` / `clear`) next to the week-4 cart helpers, and `CartProvider` owns save/load. Theme stayed on Zustand because it is tiny and `persist` is enough.

## 12. Component tree (per page)

```
main.tsx
└── CartProvider
    └── App (RouterProvider only)
        └── Layout
            ├── Banner
            ├── Header
            │   ├── Logo / SearchBox / CartIcon / ThemeToggle / MenuToggle
            └── Outlet
                ├── HomePage                         (#/)
                │   ├── SalePanel
                │   │   └── SaleCountdown
                │   ├── HomeIntro
                │   │   ├── CategoryNav / Hero / PromoStrips
                │   ├── HomeRows
                │   │   └── CarouselSection → ProductGrid → ProductCard
                │   ├── CartPanel
                │   └── Footer
                ├── PlpPage                          (#/plp/$carouselId)
                │   └── ProductGrid → ProductCard
                └── NotFound                         (unknown paths)
```
