# Sam Market

Work inside `shops/tdd/`. The shop uses React, TypeScript and Vite, with hash routes in `src/App.tsx`.

## Commands
- `npm run dev` starts the shop at http://localhost:5173.
- Run `npm run ci` before each commit and review the diff.

## Source
- Pages in `src/components/pages/` use hooks for catalog and cart state.
- Keep `fetch` in `src/shared/data/api/`. Use `import type` for models from `src/shared/types.ts`.
- Keep cart totals, product sorting and checkout validation in `src/features/`. These functions should not import components.

## Keep out
- No `any`, type assertions (except `as const`), non-null assertions, `@ts-ignore` or lint suppression comments.
- Keep `node_modules/`, `dist/`, `.env*`, `.vercel/` and tokens out of commits.
