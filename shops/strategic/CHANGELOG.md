# Changelog

## [1.0.0] - 2026-11-22

First release of Armin Supermarket with a Persian RTL storefront, product catalog, shopping cart, Docker build, and Vercel deployment.

### Added

- Responsive Persian RTL storefront for mobile, tablet, and desktop, with Vazirmatn typography, category navigation, product carousels, and special offers.
- API-backed product catalog with response validation, loading and error states, slow-loading feedback, and request retry.
- Live product search, category selection, sale countdown, product detail pages, and sortable product listing pages.
- Shared shopping cart with quantity controls, stock limits, item counts, totals, and local storage persistence.
- Checkout form with required name and address fields and Iranian mobile number validation, including Persian and Arabic digits.
- Theme switching backed by a Zustand store.
- Multi-stage Docker build that serves the production bundle with nginx and proxies catalog requests through `/api/`.
- GitHub Actions checks and Docker build, with Vercel preview deployments for eligible pull requests and production deployments from `main`.
- Project architecture documentation, agent instructions, and a recorded mobile verification of the live shop.

### Changed

- Migrated the storefront from HTML and JavaScript to React and TypeScript with Vite.
- Introduced typed hash routes for home, product listings, product details, and checkout using TanStack Router.
- Separated API validation, catalog loading, cart rules and totals, storage, and page components; shared cart state through Zustand with scoped subscriptions.
- Optimized product images and converted assets to WebP.

### Fixed

- Corrected product image, font, and stylesheet paths.
- Rendered category tile, menu, shelf, and catalog heading icons from API data.
- Aligned carousel types with API validation and tightened DOM element types.
