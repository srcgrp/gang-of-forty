# Changelog

## [1.0.2] - 2026-11-27

### Fixed

- Restore Persian digits in prices by reverting the intentional 1.0.1 display change.

## [1.0.1] - 2026-11-27

### Added

- Publish the Docker image to GHCR and verify it can be pulled and started.

### Changed

- Load shop routes on demand and improve page metadata.
- Display prices with Latin digits for the rollback drill.

### Fixed

- Configure the production API endpoint for deployment.

## [1.0.0] - 2026-11-26

First public release of Batshop.

### Added

- Persian right-to-left grocery catalog with category browsing, product details, and a sale countdown.
- Product search with suggestions and sorting on product listings.
- Shopping cart with quantity controls and a checkout page.
- Docker and Nginx packaging, GitHub Actions CI, and Vercel deployment.

### Changed

- Share cart and theme state through Zustand and preserve both across reloads.
- Keep search and category filters in the URL so filtered views can be shared.

### Fixed

- Handle missing stock data in the catalog.
- Improve sale countdown visibility and cart quantity controls.
- Remove the local React DevTools script from the production shop.
