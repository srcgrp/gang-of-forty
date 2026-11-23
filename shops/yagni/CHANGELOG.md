# Changelog

## [1.0.0] - 2026-11-23

### Added

- React library and React components: Header, Banner, ProductCard, ProductGrid, CategoryNav, CategoryGrid, Storefront, RootLayout, CartPanel, SearchBox, PromoSections, SaleCountdown, StoreSupport, StoreFooter
- TanStack Router with hash history and routes (Home, PLP, Product, Cart, Checkout, NotFound)
- Zustand stores: `useCartStore`, `useThemeStore`
- API fetching layer with `useEffect`: products, offers, stock, shop, categories, home
- Search feature and `SaleCountdown`
- Product card page and checkout form
- Carousel links in `RootLayout`
- Document title updates via `useEffect`
- Design document (`DESIGN.md`) and types/utilities in `types.ts`
- Vercel deployment pipeline (check, docker, deploy jobs) and `vercel.json`
- `Dockerfile` and `.dockerignore` for the shop
- `nginx.conf` for the production image
- `AGENTS.md` for the shop
- Week 7 deploy setup — `shop.json` with `week` and `liveUrl`
- `ci` script in `package.json` (lint, check, test, build)

### Changed

- Converted `index.html` and `ui/` to React components
- Made files less than 70 lines (`App.tsx`, `RootLayout`, etc.)
- Removed `useState`/`useEffect` from `App.tsx`
- Fixed fetching all products
- Small change to `index.html` (comment added in the last line)
- `shop.json`: set `liveUrl` to the production URL

### Fixed

- Fixed closing tag error
- Fixed `banner__track` type in `home.ts`
- Reverted the header responsive styles change (search, theme toggle, checkout)
