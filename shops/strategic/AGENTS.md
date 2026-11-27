# Armin Supermarket (strategic)

Persian RTL grocery shop built with React, TypeScript and Vite (Gang of Forty, `shops/strategic/`).

## Commands

- `npm run dev` -> start the shop at `http://localhost:5173` (use the URL Vite prints if the port is busy).
- `npm run ci` → run lint, type checks, tests if defined, and the production build. This must pass before every commit.
- `git diff` and `git diff --cached` → review the working changes and the staged changes before committing.

## Folders and import rules

- `src/types.ts` → shared product, catalog and cart types. Use `import type` for these definitions.
- `src/api/` → validate API responses here. Only this folder may call `fetch`. The call lives in `src/api/http.ts`.
- `src/hooks/useCatalog.ts` → loads the catalog through the API layer and builds the model. Pages read the catalog through this hook.
- `src/features/cart/` → pure functions for quantities, stock limits and totals. The cart store in `src/hooks/useCartStore.ts` calls them and uses `src/storage/cart-storage.ts` to load and save cart lines.
- `src/components/pages/` → page components. Import them in `src/App.tsx` to register their routes.

## Never

- Use `any`, type assertions other than `as const`, the non-null assertion operator (`!`), `@ts-ignore`, or comments that disable lint rules.
- Edit files outside `shops/strategic/`.
- Commit `node_modules/`, `dist/`, `.env*`, `.vercel/`, or tokens.


For a release, follow .claude/skills/release/SKILL.md step by step.
