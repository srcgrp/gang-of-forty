# Changelog

## [1.0.0] - 2026-11-25

First official release of Tracer Bullet, a Persian RTL grocery shop with product browsing, category and product pages, a shopping cart, Docker support, automated CI/CD, and Vercel deployment.

### Added

- Home page with promotions and product carousels, category and product detail pages, and URL-based sorting.
- Persistent shopping cart and a checkout form.
- Dark and light themes with a saved preference.
- Docker setup, automated CI checks, and a Vercel deployment workflow.
- Production mobile verification with Playwright MCP, with a full-page screenshot at `docs/mobile.png`.

### Changed

- Migrated the storefront to React and TypeScript, with TanStack Router for navigation and Zustand for shared cart and theme state.
- Reduced unnecessary re-renders when adding products to the cart.

### Fixed

- Corrected duplicate React keys in footer lists.
