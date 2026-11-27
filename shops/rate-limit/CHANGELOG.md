# Changelog

## [1.0.0] - 2026-11-27

### Added

- Built a responsive Persian RTL storefront with promotional banners and category and product carousels.
- Loaded products, stock, and offers from the API and showed loading placeholders while the catalog was fetched.
- Added storefront search, a sale countdown, and light and dark themes.
- Category product pages with search, price and discount sorting, and localized result counts.
- Cart feedback when shoppers reach a product's stock limit.
- Docker packaging with Nginx and a GitHub Actions workflow for Vercel deployments.

### Changed

- Migrated catalog code to TypeScript and Vite, then split API requests, response validation, catalog processing, and cart storage into dedicated modules.
- Rebuilt the storefront with React components, added TanStack Router for navigation, and moved cart and theme state into Zustand.

### Fixed

- Placed storefront images in Vite's public directory so production builds serve banners, category images, and cart icons.
- Configured Vercel rewrites so direct links to category pages resolve correctly.
