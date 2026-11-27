# Changelog

## [1.0.0] - 2026-11-27

First production release of the Persian RTL grocery shop.

### Added

- Product search and a shopping cart for the grocery catalog.
- Docker packaging and CI checks for linting, type checking, and production builds.
- Vercel deployment configuration and production URL.

### Changed

- Added stock-aware checkout that blocks empty carts and quantities above available stock, then rechecks stock before completing an order.

### Fixed

- Stopped tracking local environment files.
