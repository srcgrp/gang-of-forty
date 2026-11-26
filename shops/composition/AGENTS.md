# Batshop / composition

Persian RTL grocery shop, built with React + TypeScript + Vite, TanStack Router and Zustand (Gang of Forty, shops/composition).
Read DESIGN.md before changing the architecture.
For a release, follow .claude/skills/release/SKILL.md step by step.

## Commands
- npm ci: install locked dependencies; use npm install only when intentionally changing dependencies.
- npm run dev: start development at http://localhost:5173 (Vite may choose another port if occupied).
- npm run build and npm run preview: build and inspect the production version.
- npm run ci: lint, TypeScript checking, tests if a test script exists, and build; must pass before every commit.
- Stop and fix failed checks. Review git diff before committing; commit or push only when the user explicitly requests it.

## Folders and import rules
- src/main.tsx mounts React with StrictMode; src/App.tsx defines typed routes and RouterProvider.
- Put route pages in src/components/pages and reusable JSX components in src/components.
- Keep shared models in src/shared/types.ts; this file must not import application code.
- HTTP requests (fetch) and response guards belong only in src/shared/api and src/features/products/api.
- src/hooks/useCatalogRequest.ts calls API functions; CatalogProvider and useCatalog share catalog state with components.
- Components must not call fetch or localStorage directly.
- Keep product selection, pricing, search and sorting as pure functions in src/features/products/catalog.
- Keep cart rules in src/features/cart/logic and cart persistence in src/features/cart/storage.
- Use src/hooks/useCartStore.ts for shared cart state and useThemeStore.ts for the persisted theme.
- Read only needed store values or actions with selectors; derive cart totals from items instead of duplicating state.
- Features must not import each other directly; shared code must not import features or UI. Avoid circular imports.
- Pure logic must not access document, fetch or localStorage. Keep each TS/TSX file at most 70 lines.
- Read the API base URL from VITE_API_URL without a hardcoded fallback.
- Treat JSON and stored data as unknown until validated; preserve response.ok checks and meaningful loading/error states.
- Use concrete DOM types where DOM access is necessary, and retain null checks at selection boundaries.

## Never
- Do not use any, type assertions with as (except as const), non-null assertions (!), or @ts-ignore.
- Do not disable lint rules, add suppression comments, or weaken compiler settings to make checks pass.
- Do not edit files outside shops/composition, including the repository root, other shops, or the root api/ and scripts/ folders.
- Never commit node_modules/, dist/, .env*, .vercel/, credentials or tokens.
- Never put secrets in VITE_ variables, logs or chat.
- Do not claim tests, screenshots or deployments that were not performed; report actual commands and results.
