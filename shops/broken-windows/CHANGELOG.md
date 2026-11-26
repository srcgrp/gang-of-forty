# Changelog
## [1.0.1] - 2026-11-26

### Fixed

- API base URL falls back to `/api` when `VITE_API_URL` is not set, so production no longer breaks without `.env` files.



## [1.0.0] - 2026-11-26

First production release of Sara Market: Persian RTL supermarket shop with product listing, categories, offers, Docker setup, CI pipeline and live deploy on Vercel.

### Added

- Product listing, product page, categories, offers, search, and catalog carousel.
- Checkout form and sorting via search params.
- Pages routed with TanStack Router, including navigation, dropdown, and footer categories loaded from the API.
- Retry with an attempt counter when the catalog fails to load.
- Docker setup with README instructions.
- Vercel deployment workflow, production URL, and CI pipeline (lint, typecheck, and build).
- Agent instructions and the release skill.

### Changed

- Header, footer, cart panel, address, and theme-button design.
- Source files kept under 70 lines, with fewer renders on the catalog.
- `.env` files are no longer tracked.

### Fixed

- Product images and the banner SVG are imported so they are bundled in the production build.
- HTML validation errors.
- Supermarket details in the footer and a navigation typo.
   