# Herman Shop — React Design

## Component tree

```text
App (TanStack Router)
└─ Layout
   ├─ Header
   ├─ Outlet
   │  ├─ HomePage → CategoryNav, ProductGrid × n, CartPanel
   │  ├─ PlpPage → ProductGrid, CartPanel
   │  └─ NotFound
   └─ Footer

Header, ProductCard, and CartPanel read the cart directly from `useCartStore`.
```

## Routes

| URL | Page | Data source |
|---|---|---|
| `/` | `HomePage` with short product rows and a “مشاهده همه” link for each row | `useCatalog` and `src/catalog/carousels.ts` |
| `/plp/$carouselId` | `PlpPage` with every product in that row | `useParams` and `carouselProducts` |
| Any other URL | `NotFound` with a link home | No catalog data |

## State

| State | Owner | Who changes it | Where it is saved |
|---|---|---|---|
| selected route | TanStack Router | Category and “مشاهده همه” links | URL hash |
| `lines` | `src/hooks/useCartStore.ts` | ProductCard and CartPanel actions | `storage/cartStorage.ts` |
| catalog load state and retry attempt | `src/hooks/useCatalog.ts` | API effect and Retry button | In memory |

These values are calculated while rendering and are not separate state:

- `carouselProducts` selects all products, one category, or products with an offer.
- `cartCount` adds the quantities in the cart.
- `cartTotal` adds the current prices of cart products.

## Cart store choice

The cart uses Zustand so `Header`, product cards, and `CartPanel` can subscribe to
only the cart data or action they need without passing cart props through `App`
and `ProductGrid`. Cart updates stay in the existing pure functions, and the
store subscription saves each updated cart through `storage/cartStorage.ts`.

## Data and folders

- `src/App.tsx` defines typed routes with TanStack Router.
- `src/components/Layout.tsx` applies the selected theme and renders `Header`, `Outlet`, and `Footer`.
- `src/hooks/useCatalog.ts` loads and validates products, stock, and offers.
- `src/components/pages/` contains `HomePage`, `PlpPage`, and `NotFound`.
- `src/catalog/carousels.ts` defines home rows and selects products for each row.
- `src/components/` contains `Header`, `CategoryNav`, `ProductGrid`, `ProductCard`, and `CartPanel`.
- `src/api/` contains the existing API helpers and data guards.
- `src/features/cart/` contains the pure cart update and total functions.
- `src/storage/` reads and saves the cart in browser storage.
- `src/types.ts` contains shared product, cart, and loading types.
- `src/main.tsx` starts React and imports the page styles.

Products, offers, and stock are loaded together from the API. If loading fails, the Retry button starts the request again. The search box is visual only. Adding an available product updates the cart; the cart remains after a page refresh.
