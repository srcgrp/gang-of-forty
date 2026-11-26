# Nardone Changelog

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
