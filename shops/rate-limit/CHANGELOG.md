# Changelog

## [1.0.0] - 2026-11-27

### Added

- Category product pages with search, price and discount sorting, and localized result counts.
- Cart feedback when shoppers reach a product's stock limit.
- Docker packaging with Nginx and a GitHub Actions workflow for Vercel deployments.

### Changed

- Migrated the Persian RTL storefront to React, TypeScript, and Vite, with TanStack Router for navigation and Zustand for shared state.
- Moved catalog processing and response validation into dedicated modules.

### Fixed

- Placed storefront images in Vite's public directory so production builds serve banners, category images, and cart icons.
- Configured Vercel rewrites so direct links to category pages resolve correctly.
