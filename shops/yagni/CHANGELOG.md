# Changelog

## [1.0.0] - 2026-11-23

### Added

- Vercel deployment pipeline (check, docker, deploy jobs) and `vercel.json`
- Dockerfile and `.dockerignore` for the shop
- `nginx.conf` for the production image
- `AGENTS.md` for the shop
- Week 7 deploy setup — `shop.json` with `week` and `liveUrl`
- `ci` script in `package.json` (lint, check, test, build)

### Changed

- Small change to `index.html` (comment added in the last line)
- `shop.json`: set `liveUrl` to the production URL

### Fixed

- Reverted the header responsive styles change (search, theme toggle, checkout)
