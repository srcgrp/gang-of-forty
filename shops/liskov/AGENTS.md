# Liskov Shop

Liskov is a Persian RTL grocery storefront built with React, TypeScript, and Vite.

## Commands

- `npm run dev` — start the local development server.
- `npm run check` — run TypeScript checks.
- `npm run lint` — run Oxlint.
- `npm run build` — build the production app.
- `npm run ci` — run all required checks before every commit.
- Every commit must be preceded by a successful `npm run ci`.

## Folders and Import Rules

- `src/types.ts` contains shared application types.
- `api.ts` in the shop root loads and validates application data.
- `src/api/` contains API utilities and runtime data guards.
- Only `src/api/index.ts` may call `fetch`.
- `src/hooks/useCatalog.ts` loads data through the root `api.ts` module.
- `src/catalog/` contains catalog-related helper functions.
- `src/cart/` contains cart operations.
- `src/storage/` handles cart persistence.
- `src/hooks/` contains React hooks and Zustand stores.
- `src/context/` contains application context.
- `src/components/` contains UI components and page components.
- Keep imports consistent with the existing project structure.
- Keep business logic out of presentation components when practical.

## Never

- Never use `any`.
- Never use type assertions with `as`, except `as const`.
- Never use non-null assertions (`!`).
- Never use `@ts-ignore` or lint suppressions.
- Never call `fetch` outside `src/api/index.ts`.
- Never modify files outside `shops/liskov/`.
- Never commit `node_modules/`, `dist/`, `.vercel/`, or local environment files.
- Never commit without reviewing `git diff` and passing `npm run ci`.
