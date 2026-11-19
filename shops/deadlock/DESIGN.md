# Herman Shop — React Design

## Component tree

```text
App
├─ Header
├─ CategoryNav
├─ ProductGrid (selected category)
│  └─ ProductCard × n
├─ ProductGrid (special offers)
│  └─ ProductCard × n
└─ CartPanel

Header, ProductCard, and CartPanel read the cart directly from `useCartStore`.
```

## State

| State | Owner | Who changes it | Where it is saved |
|---|---|---|---|
| `categoryId` | `App` | `CategoryNav` through `onPick` | In memory |
| `lines` | `src/hooks/useCartStore.ts` | ProductCard and CartPanel actions | `storage/cartStorage.ts` |
| catalog load state and retry attempt | `src/hooks/useCatalog.ts` | API effect and Retry button | In memory |

These values are calculated while rendering and are not separate state:

- `visibleProducts` filters products by `categoryId`.
- `offerProducts` contains products with an offer.
- `cartCount` adds the quantities in the cart.
- `cartTotal` adds the current prices of cart products.

## Cart store choice

The cart uses Zustand so `Header`, product cards, and `CartPanel` can subscribe to
only the cart data or action they need without passing cart props through `App`
and `ProductGrid`. Cart updates stay in the existing pure functions, and the
store subscription saves each updated cart through `storage/cartStorage.ts`.

## Data and folders

- `src/App.tsx` applies the selected theme and renders the current page.
- `src/hooks/useCatalog.ts` loads and validates products, stock, and offers.
- `src/components/pages/HomePage.tsx` uses the catalog hook and owns the selected category.
- `src/components/` contains `Header`, `CategoryNav`, `ProductGrid`, `ProductCard`, and `CartPanel`.
- `src/api/` contains the existing API helpers and data guards.
- `src/features/cart/` contains the pure cart update and total functions.
- `src/storage/` reads and saves the cart in browser storage.
- `src/types.ts` contains shared product, cart, and loading types.
- `src/main.tsx` starts React and imports the page styles.

Products, offers, and stock are loaded together from the API. If loading fails, the Retry button starts the request again. The search box is visual only. Adding an available product updates the cart; the cart remains after a page refresh.
