# Nardone Changelog

## [1.0.3] - 2026-11-27

Restored Persian digits in Nardone prices after the rollback drill.

### Fixed

- Reverted the temporary price formatting change and restored the fa-IR locale.

## [1.0.2] - 2026-11-27

Introduced a temporary price display regression for the Week 7 rollback drill.

### Changed

- Displayed prices use Latin digits during the drill. Numeric price values and cart totals follow the existing calculations.

## [1.0.1] - 2026-11-27

Improved Nardone's mobile layout, promotional cards, and readability.

### Added

- Added original breakfast and fresh-bread photos to the corresponding promotional cards.

### Changed

- Made the mobile header more compact across the storefront and checkout, and moved the cart count onto the cart icon at all widths.
- Reworked the layout of the homepage banner, categories, and product cards for smaller screens.
- Positioned the promotional cards together on desktop and in separate sections on mobile. Matched their hover styling to the product cards.
- Made Vazirmatn the default typeface, retained IranYekan for promotional titles, and removed link underlines.

## [1.0.0] - 2026-11-27

Initial release of Nardone with a product catalog, a shopping cart, and automated deployment.

### Added

- Added category and product listing pages, a product details page, catalog search, and a local checkout form.
- The shopping cart and the selected light or dark theme persist in the browser after the page is closed.
- Added support for running the storefront with Docker and deploying it to Vercel through GitHub Actions.

### Changed

- Split the storefront interface into React components written in TypeScript and centralized catalog loading.
- The deployment workflow runs automated code checks, builds the project, tests the running Docker container, and provides a separate preview deployment.

### Fixed

- The Docker test waits for Nginx to be ready so a connection reset during container startup does not end the test prematurely.
