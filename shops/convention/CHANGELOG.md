# Changelog

## [1.0.0] - 2026-11-27

### Added

- Persian RTL storefront with product search, category lists, offers and a sale countdown.
- Product detail routes, shareable price sorting, a persistent cart and validated demo checkout.
- Two-stage Docker image and a release workflow for CI, Vercel previews, production and GHCR.

### Changed

- The storefront requests its catalog from the same-origin `/api/` path on each host.
- Search results can be narrowed by category using a controlled React input.

### Fixed

- Localized the countdown and cart quantities to Persian digits.
- Restored keyboard skip navigation, repeated taps on the mobile menu and checkout with obsolete saved products.
- Removed the old DOM entry point, sample catalog, unused product grid, artwork and dependencies.
