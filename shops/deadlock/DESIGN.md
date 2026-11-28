# Herman Shop — React Design

## Component tree

```text
App (RouterProvider)
└── Layout
    ├── Header
    ├── Outlet
    │   ├── HomePage
    │   │   ├── CategoryNav
    │   │   ├── ProductGrid (one per carousel)
    │   │   │   └── ProductCard (one per product)
    │   │   └── CartPanel
    │   ├── PlpPage
    │   │   ├── ProductGrid
    │   │   │   └── ProductCard (one per product)
    │   │   └── CartPanel
    │   ├── ProductPage
    │   │   └── CartPanel
    │   └── NotFound
    └── Footer
```

`Outlet` is where the router displays the page for the current URL. `Header` and
`CartPanel` read the cart state from `useCartStore`. `ProductCard` reads the
store's `add` action.

## Routes

| URL | Page | Data source |
|---|---|---|
| `#/` | `HomePage` with short product rows and a “مشاهده همه” link for each row | `useCatalog` and `src/catalog/carousels.ts` |
| `#/plp/$carouselId` | `PlpPage` with every product in that row and sort links | `useParams`, `useSearch`, and `carouselProducts` |
| `#/product/$productId` | `ProductPage` with details for one product | `useParams` and `useCatalog` |
| Any other URL | `NotFound` with a link home | No catalog data |

Routes are defined in `src/App.tsx` with TanStack Router and hash history. An
unknown carousel ID also shows a not found message. Hash history keeps these
routes working on a static site after refresh.

## State

| State | Owner | Who changes it | Where it is saved |
|---|---|---|---|
| Selected route | TanStack Router | Navigation links | URL hash |
| Cart `lines` | `src/hooks/useCartStore.ts` | `ProductCard` add action and `CartPanel` remove action | `src/storage/cartStorage.ts` (`localStorage`) |
| Catalog load state and retry attempt | `src/hooks/useCatalog.ts` | API effect and Retry button | In memory |

The cart update flow is:

```text
ProductCard add button
        |
        v
useCartStore.add(productId)
        |
        v
addToCart(currentLines, productId)
        |
        v
new cart lines -----------------> saveCart() -> localStorage
        |
        +----> Header updates its item count
        |
        +----> CartPanel updates its rows and total
```

Removing an item follows the same path through `remove` and `removeFromCart`.
The cart is loaded from `localStorage` when the store starts. `ProductCard`
selects the `add` action, while `Header` and `CartPanel` select the cart data
they need.

These values are calculated while rendering and are not separate state:

- `carouselProducts` selects all products, one category, or products with an offer.
- `cartCount` adds the quantities in the cart.
- `cartTotal` adds the current prices of cart products.

## Cart store choice

The cart uses Zustand so components can subscribe to the cart data or action
they need without passing cart props through `App` and `ProductGrid`. Cart
updates stay in the existing pure functions, and the store subscription saves
each updated cart through `src/storage/cartStorage.ts`.

## Data and folders

- `src/App.tsx` defines typed routes with TanStack Router.
- `src/components/Layout.tsx` applies the selected theme and renders `Header`, `Outlet`, and `Footer`.
- `src/hooks/useCatalog.ts` loads and validates products, stock, and offers.
- `src/components/pages/` contains `HomePage`, `PlpPage`, and `NotFound`.
- `src/components/pages/ProductPage.tsx` displays one product's details.
- `src/catalog/carousels.ts` defines home rows and selects products for each row.
- `src/components/` contains `Header`, `CategoryNav`, `ProductGrid`, `ProductCard`, and `CartPanel`.
- `src/api/` contains the API helpers and data guards.
- `src/features/cart/` contains the pure cart update and total functions.
- `src/storage/` reads and saves the cart in browser storage.
- `src/types.ts` contains shared product, cart, and loading types.
- `src/main.tsx` starts React and imports the page styles.

Products, offers, and stock load together from the API. If loading fails, the
Retry button starts the request again. The search box is visual only. Adding an
available product updates the cart, displays a message, and keeps the cart
after a page refresh.
