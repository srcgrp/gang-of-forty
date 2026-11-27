# Changelog

## [1.0.2] - 2026-11-27

### Fixed

- Release with an intentional typo in the special offers carousel title for rollback testing.

## [Unreleased]

### Changed

- `.env.development` and `.env.production` are tracked again. They contain only public settings (the API path).  


## [1.0.1] - 2026-11-26

### Fixed

- API base URL falls back to `/api` when `VITE_API_URL` is not set, so production no longer breaks without `.env` files.

## [1.0.0] - 2026-11-26

First production release of broken windows: a Persian RTL supermarket shop with product listing, categories, offers, cart, checkout, Docker setup, CI pipeline and live deploy on Vercel.

### Added

- Home page sections: announcement bar, header, navigation and hamburger menu, hero banner, benefits, categories, "special offers" and "dairy" carousels, the "broken window" report section, cart panel, and footer.
- Product list pages (PLP) for each category and carousel, with a "view all" link next to every carousel title.
- Product page with details and an add-to-cart button.
- Search that finds products by name.
- Sorting by price on the PLP, kept in the URL (`?sort=`) so it survives a refresh.
- Cart stored in `localStorage` with add, remove and a live item counter.
- Checkout form for name, mobile number and address, with validation; a valid order clears the cart and returns to the home page.
- Light and dark theme, remembered after refresh.
- Routing with TanStack Router and hash history (`#/plp/dairy`), so the current page survives a refresh; browser Back and Forward work; unknown addresses show a "not found" page.
- Shop data (products, stock, offers, categories, shop info) loaded from API files with type guards, and four states: loading, success, error and empty, with a retry button.
- Shared state with zustand stores for theme, cart and search.
- Docker setup with README instructions.
- Vercel deployment workflow, production URL, and CI pipeline (lint, typecheck, and build).
- Agent instructions and the release skill.

### Changed

- Header, footer, cart panel, address, and theme-button design.
- Source files kept under 70 lines, with fewer renders on the catalog.

### Fixed

- Product images and the banner SVG are imported so they are bundled in the production build.
- HTML validation errors.
- Supermarket details in the footer and a navigation typo.