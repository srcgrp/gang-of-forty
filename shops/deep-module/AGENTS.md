# AGENTS.md — Sabzkaleh (سبزکاله) Supermarket Shop

## Project Purpose
**Sabzkaleh (سبزکاله)** is a Persian-language (`lang="fa"`, `dir="rtl"`), mobile-first online supermarket storefront built during Week 6 and hardened for production deployment in Week 7.
Shop identity metadata is tracked in `shop.json` (`slug: "sabzkaleh"`, `name: "سبزکاله"`, `week: 7`).

## Important Directories & Files
- `src/App.tsx`, `src/main.tsx` — Entry point, palette initialization, and TanStack Router (`createBrowserHistory`) route tree (`/`, `/plp/$carouselId`, `/product/$productId`, `/checkout`, `*`).
- `src/cart/` — Pure cart line-item math (`addLine`, `incLine`, `decLine`, `removeLine`, `cartCount`, `cartTotal`).
- `src/catalog/` — Pure catalog lookup, sorting, effective stock calculation, and checkout validation (`validateCheckout`).
- `src/storage/` — Safe `localStorage` cart persistence helpers.
- `src/hooks/` — Zustand stores (`useCartStore`, `useWishlistStore`, `useThemeStore`, `useUiStore`, `useCatalogStore`), scroll-direction hysteresis (`scrollDirection.ts`, `useScrollDirection`), Fuse.js search (`useSearch`), filters (`useFilters`), and modal focus trapping (`useModalFocusTrap`).
- `src/shared/api/` — HTTP client (`client.ts`), runtime type guards (`guards.ts`), and parallel catalog loader (`load.ts`).
- `src/shared/ui/` — Persian numeral/currency formatters (`formatPrice`, `faNum`, `safeHref`) and Notyf toast wrapper (`toast.ts`).
- `src/components/` — Modular React UI components and `src/components/pages/` route views.
- `src/assets/fonts/` — Local `Vazirmatn` WOFF2 font files referenced by `style.css`.
- `style.css` — Complete design-token stylesheet (light/dark themes, OKLCH palettes, RTL layout, and mobile Bottom Sheet / 2-column grid rules).
- `Dockerfile`, `.dockerignore`, `nginx.conf`, `vercel.json` — Production container and edge deployment configuration.
- `.github/workflows/deploy.yml` — CI (`check`), container verification (`docker`), GHCR publishing (`publish`), and Vercel production deployment (`deploy`).
- `.claude/skills/release/SKILL.md` — Mandatory step-by-step release procedure.
- `docs/` — Manual verification guides (`MCP-AND-LIGHTHOUSE.md`, `GITHUB-MCP-BONUS.md`, `ROLLBACK-BONUS.md`, `PR7-TEMPLATE.md`) and production mobile screenshot target (`docs/mobile.png`).

## Commands & Package Manager Expectations
- Package manager: **npm only**. Do not introduce `bun.lock`, `yarn.lock`, or `pnpm-lock.yaml`.
- Always use `npm ci` in CI, Dockerfiles, and clean installs to respect `package-lock.json`.
- `npm run dev` — Start Vite dev server on `0.0.0.0:3000`.
- `npm run lint` — Run `oxlint src --deny-warnings`. Zero warnings and zero errors required.
- `npm run check` — Run `tsc --noEmit` with strict TypeScript settings.
- `npm run build` — Run `tsc --noEmit && vite build` into `dist/`.
- `npm run ci` — Run `npm run lint && npm run check && npm run build`.
- `npm run preview` — Preview the production `dist/` bundle locally on `0.0.0.0:3000`.

## Coding & Import Conventions
- TypeScript is configured with `strict: true`, `noUncheckedIndexedAccess: true`, `exactOptionalPropertyTypes: true`, `verbatimModuleSyntax: true`, and `erasableSyntaxOnly: true`.
- Use extensionless relative imports (e.g., `../cart/cart`) and `import type` for type-only imports. Keep all imports at the top of the file.
- Never use `any`; validate external API responses with type guards in `src/shared/api/guards.ts`.
- Keep pure business logic decoupled from React components (inside `src/cart/`, `src/catalog/`, `src/hooks/scrollDirection.ts`, `src/shared/`).
- Format all numbers, prices, and percentages in Persian using `faNum` and `formatPrice` from `src/shared/ui/format.ts`.
- Preserve RTL (`dir="rtl"`) layout and existing CSS design tokens in `style.css`. Do not introduce Tailwind CSS or inline style refactors.
- Zustand persisted store keys use the `sabzkaleh-*` namespace (`sabzkaleh-theme`, `sabzkaleh-cart`, `sabzkaleh-wishlist`).

## API & Deployment Conventions
- All catalog data (`products.json`, `categories.json`, `shop.json`, `home.json`, `offers.json`, `stock.json`) MUST be fetched through `src/shared/api/client.ts` via the same-origin `/api` prefix.
- NEVER point browser `fetch` calls directly at `https://gof.zzb.cx/api/*` because the upstream server does not return CORS headers (`Access-Control-Allow-Origin`).
- Every runtime must proxy `/api/*` to `https://gof.zzb.cx/api/*` **before** any SPA fallback rule:
  - Local dev: `vite.config.ts` `server.proxy["/api"]`
  - Docker/Nginx: `nginx.conf` `location /api/` before `location /` (`try_files $uri $uri/ /index.html;`)
  - Vercel: `vercel.json` `/api/:path*` rewrite before `/(.*)` -> `/index.html`
- Font URLs in `style.css` must resolve to `src/assets/fonts/...` so Vite bundles them into `dist/assets/` without 404/OTS warnings.

## Files That Should Not Be Modified Unnecessarily
- Do not refactor or restyle the Week 6 UI components under `src/components/` unless fixing a verified deployment, accessibility, or runtime bug.
- Do not modify `src/assets/fonts/` or `LICENSE`.

## Forbidden Practices
- Never hard-code `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, GitHub PATs, or any API secrets in code, workflows, or documentation.
- Never fabricate live URLs, Lighthouse scores, Playwright MCP outputs, console/network results, `evals.md` results, or `docs/mobile.png` screenshots.
- Never force-push, bypass CI, or push directly to `main` without explicit human review and approval.

## Release Workflow
For a release, follow `.claude/skills/release/SKILL.md` step by step.
Every release must pass `npm run ci`, bump `package.json`, document `Added` / `Changed` / `Fixed` changes in `CHANGELOG.md`, present `git diff` for review, and wait for the human maintainer to execute the final production push and post-deploy Playwright MCP verification.
