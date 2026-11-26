# Changelog

## [1.0.0] - 2026-11-26

First release: Docker setup, CI pipeline and Vercel deployment.

### Added
- Docker image served by nginx with an `/api` proxy, and a "Run with Docker" section in the README
- CI/deploy workflow and Vercel config; live URL in `shop.json`
- `npm run ci` script (lint, check, build)
- Release skill, AGENTS.md and CLAUDE.md
- Routes in `App.tsx` with a hash history: home page, product list page (PLP), product page and not found page
- PLP sorting by final price, with the sort kept in the URL search param
- Product page, linked from the product name
- Zustand stores: shared cart and theme (light / dark, persisted)
- Cart side drawer, kept in localStorage through the storage layer
- Home carousels from `home.json`, sale countdown, retry button for failed loads
- Meta description and `robots.txt` for SEO

### Changed
- Product page layout improved on mobile and balanced on desktop
- Data loading moved into the `useCatalog` hook; cart read from the store instead of props
- Carousels scroll with buttons instead of hash anchors
- README completed, with a mobile screenshot of the live site

### Fixed
- Unavailable localStorage no longer breaks the cart
- `index.html` has charset, viewport, title and an empty favicon
