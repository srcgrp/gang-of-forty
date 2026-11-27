# Changelog

All notable changes to the **Sabzkaleh (سبزکاله)** supermarket storefront (`sabzkaleh-shop`) are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-11-26

### Added
- Added `shop.json` with Week 7 shop metadata (`name: "سبزکاله"`, `slug: "sabzkaleh"`, `week: 7`) and manual placeholder for the post-deploy Vercel production `liveUrl`.
- Added `AGENTS.md` and `CLAUDE.md` (`@AGENTS.md`) documenting shop architecture, strict TypeScript/import conventions, API proxy rules, and release discipline.
- Added `.claude/skills/release/SKILL.md` defining a human-gated release procedure with `npm run ci`, changelog updates, manual push commands, and post-deploy Playwright MCP checks.
- Added multi-stage `Dockerfile` (`node:22-alpine` builder + `nginx:1.27-alpine` runtime), `.dockerignore`, and production `nginx.conf` with `/api/` proxy and SPA `try_files` fallback.
- Added GitHub Actions workflow `.github/workflows/deploy.yml` with `check`, `docker`, `publish` (GHCR `ghcr.io/<github-user>/sabzkaleh-shop` tagged `1.0.0` and `latest`), and `deploy` (Vercel production using GitHub Secrets).
- Added `npm run ci` (`npm run lint && npm run check && npm run build`) and generated `package-lock.json` for deterministic `npm ci` installs.
- Added `evals.md` with 5 project-specific `AGENTS.md` evaluation tasks and `docs/` manual checklists for Playwright MCP (`390x844`), Lighthouse Mobile, GitHub MCP bonus, Rollback bonus (`1.0.1` -> `git revert` -> `1.0.2`), and Pull Request #7.

### Changed
- Updated `package.json` metadata to `"week": 7` at version `1.0.0`.
- Updated `vercel.json` with Vite build settings and an explicit `/api/:path*` proxy rewrite to `https://gof.zzb.cx/api/:path*` before the SPA catch-all rewrite.
- Replaced the Week 6 `README.md` with Week 7 deployment, Docker/GHCR, CI, MCP validation, and release documentation.

### Fixed
- Fixed `src/shared/api/client.ts` so empty or direct `https://gof.zzb.cx/api` `VITE_API_URL` values fall back to the same-origin `/api` proxy instead of triggering browser CORS failures.
- Fixed `src/hooks/useCatalog.ts` to deduplicate initial catalog loads by `attempt` so router/StrictMode remounts do not abort in-flight `/api/*.json` requests (`0` failed requests in production build verification).
- Fixed `Vazirmatn` `@font-face` paths in `style.css` (`assets/fonts/...` -> `src/assets/fonts/...`) so Vite bundles and serves all font weights without `OTS parsing error` console warnings.
- Fixed `src/components/SearchBox.tsx` (`role="combobox"`, `aria-autocomplete="list"`, conditional `aria-controls`) and `.site-footer` (`content-visibility: auto` removal in `style.css`) after Lighthouse Mobile flagged `aria-allowed-attr` and `color-contrast` (local `dist/` Accessibility improved from `87` to `96`).
- Fixed `vite.config.ts` server binding (`host: "0.0.0.0"`, `port: 3000`, `allowedHosts: true`) for containerized preview compatibility.

<!--
MANUAL ACTION REQUIRED (Bonus #4 — Rollback Exercise):
After releasing 1.0.0, perform the real 1.0.1 -> controlled bug -> git revert -> 1.0.2 exercise
following docs/ROLLBACK-BONUS.md and add the real ## [1.0.1] and ## [1.0.2] entries above this comment.
-->
