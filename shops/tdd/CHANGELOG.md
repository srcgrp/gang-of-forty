# Changelog

## [1.0.0] - 2026-11-27

### Added

- Persian RTL storefront with API-driven categories, product search, stock and offers.
- Product listing and detail pages, with price sorting in the URL.
- Persistent cart and theme, plus a checkout form with client-side validation.
- Docker build with Nginx serving the shop and forwarding `/api/` requests.
- GitHub Actions checks and Vercel deployments for pull requests and production.
- Mobile screenshot of the live storefront.

### Changed

- Migrated the storefront to React and TypeScript, with validation for API data.
- Registered the production URL in `shop.json`.
- Documented project commands and the release workflow.

### Fixed

- Apply product discounts to cart totals.
