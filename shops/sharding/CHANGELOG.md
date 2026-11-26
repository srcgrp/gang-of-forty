# Changelog

## [1.0.0] - 2026-11-26

First production release of the Sharding grocery shop.

### Added

- Added routes for product listings, product details, and checkout.
- Added live product search, category filtering, and price sorting.
- Added Docker and a Vercel deployment pipeline with lint, TypeScript, and build checks.
- Added a full-page mobile screenshot captured with Playwright MCP.

### Changed

- Moved cart and theme state into Zustand stores and kept category and search filters in the URL.
- Rendered SVG icons directly in React, eliminating the separate sprite request.

### Fixed

- Fixed cart and catalog error handling, including recovery after a failed load.
- Made product shelves and the footer render in full-page screenshots.
