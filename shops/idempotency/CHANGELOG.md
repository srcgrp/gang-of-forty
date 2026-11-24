# Changelog

## [1.0.0] - 2026-11-24

Initial release of the idempotency shop.

### Added

- Persian RTL grocery storefront with product search and filtering, a shared cart, and dark mode.
- Docker setup that builds the Vite app and serves it with Nginx.
- GitHub Actions workflow for CI, Docker build checks, and Vercel preview and production deployments.
- Mobile storefront screenshot in `docs/mobile.png`.

### Changed

- Migrated the storefront to React and TypeScript and added TanStack Router for product listing navigation.

### Fixed

- Restored category carousels and fragment navigation.
- Prevented decorative hero elements from blocking clicks.
