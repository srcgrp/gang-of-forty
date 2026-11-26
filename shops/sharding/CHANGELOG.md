# Changelog

## [1.0.2] - 2026-11-26

### Fixed

- Restored the discounted price as the current price on product cards.

## [1.0.1] - 2026-11-26

### Added

- Publish multi-platform Docker images to GHCR with the shop version and `latest` tags.

### Changed

- Intentionally show the pre-discount price as the current price on product cards for the production rollback exercise.

## [1.0.0] - 2026-11-26

First production release of the Sharding grocery shop.

### Added

- Built the responsive Persian storefront with a hero carousel, category navigation, and product shelves.
- Connected the catalog to the API for products, stock, and offers, with loading and retry states.
- Added routes for product listings, product details, and checkout.
- Added live product search, category filtering, and price sorting.
- Added Docker and a Vercel deployment pipeline with lint, TypeScript, and build checks.
- Added a full-page mobile screenshot captured with Playwright MCP.

### Changed

- Introduced TypeScript and Vite, with runtime validation for API data and separate cart and product logic.
- Rebuilt the storefront as React components.
- Moved cart and theme state into Zustand stores and kept category and search filters in the URL.
- Rendered SVG icons directly in React, eliminating the separate sprite request.

### Fixed

- Fixed cart and catalog error handling, including recovery after a failed load.
- Made product shelves and the footer render in full-page screenshots.
