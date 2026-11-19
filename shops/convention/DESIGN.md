# Convention - Week 6

## Routes

Routes are declared in `src/App.tsx`, the architecture entry point permitted to import pages.
TanStack Router registration types every Link and parameter. Pages read parameters through
`useParams({ from })`, avoiding an import cycle with App. Hash history preserves nested shop
URLs on static hosting and supports refresh, Back and Forward.

| Address | Page | Data |
| --- | --- | --- |
| `/` | HomePage | useCatalog; home.json carousels; category navigation; local search |
| `/plp/$carouselId` | PlpPage | useParams; useCatalog; carouselProducts |
| unmatched | NotFound | Return-home link |

Unknown list IDs display “این فهرست پیدا نشد”; empty lists remain valid lists.
Home rows show at most four products and link to the complete list with its total count.
Category navigation also accepts category slugs from categories.json.

## Stores and data

| Store | Defined in | State | Writers | Persistence |
| --- | --- | --- | --- | --- |
| Theme | hooks/useThemeStore.ts | light/dark | ThemeToggle calls toggle | Zustand persist, convention-theme |
| Cart | hooks/useCartStore.ts | CartItem[] only | ProductCard add; CartPanel remove | storage/cart-storage.ts, convention-cart |

Zustand was chosen for the cart because consumers subscribe to independent selectors without
providers or prop passing. Count and totals are derived; pure cart functions remain in cart/.
Header reads only the count, cards only the stable add action, and CartPanel reads lines.
`useThemeStore()` subscribes to every update; `useThemeStore(s => s.theme)` subscribes only
to the selected theme. Theme colors are CSS variables on Layout's wrapping div, not document.
Hooks never access document. Browser storage is isolated in storage/ or persist middleware.

useCatalog returns the LoadState discriminated union plus a retry action. Its effect ignores
late results after unmount. A shared in-flight request and memory cache avoid duplicate loads
across Layout, Home and PLP. Failures are not cached; retry starts a new request. All JSON is
validated as unknown without casts. API requests remain in api/; selection remains in catalog/.
Vite dev and preview serve the root repository API files through a read-only middleware because
the former remote proxy returned HTTP 502. Deployment still uses ../../api from the shop URL.

## Component trees

```text
App -> RouterProvider -> Layout
  Header -> ThemeToggle
  main -> Outlet
    HomePage -> CategoryNav, SearchBox, SaleCountdown, CarouselRow -> ProductCard
    PlpPage -> ProductCard
    NotFound -> home Link
  CartPanel
```

ProductCard is memoized and reads only the stable add selector. Cart changes update Header
and CartPanel; they do not change page props or card subscriptions. Theme changes update the
Layout wrapper; CSS variables propagate the new palette.

## Verification

Run from shops/convention: npm run check, npm run lint, npm run build, npm run preview.
The requested check-shop.mjs does not exist in this checkout and was explicitly waived by the owner.
Profiler evidence and final browser verification will be recorded after the bonus routes are complete.
