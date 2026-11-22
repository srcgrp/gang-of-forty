# Sharding

Sharding is a Persian RTL grocery shop in `shops/sharding`, built with React, TypeScript, Vite, TanStack Router, and Zustand. Week 7 focuses on releasing the week 6 shop.

## Commands

- Run shop commands from the directory containing this file and `package.json`.
- `npm run dev` starts the Vite development server (check the terminal for the local URL).
- `npm run ci` runs lint, TypeScript checks, tests if configured, and the production build. It must pass before each commit.
- `npm run preview` serves the production build locally.

## Folders and import rules

- `src/App.tsx` owns the hash-based routes. `src/components/Layout.tsx` loads and shares the catalog through `src/hooks/useCatalog.ts`.
- `src/components/` composes UI, and route pages live in `src/components/pages/`. Use hooks and shared or feature logic for data and state.
- Call `fetch` only in `src/shared/api/get-json.ts`. JSON loaders in `src/shared/api/` use `getJSON` and validate responses before exposing typed data.
- Put shared types in `src/shared/types/` and import them through `src/shared/types.ts` with `import type`.
- Keep `src/features/cart/` and `src/features/products/` independent. Both may use shared code. UI components combine cart state with catalog data.
- Keep cart and theme state in `src/hooks/useCartStore.ts` and `src/hooks/useThemeStore.ts`. Keep category and search filters in the router URL via `src/hooks/useUrlFilters.ts`.

## Never

- Use `any`, type assertions other than `as const`, non-null assertions (`!`), `@ts-ignore`, or lint suppression comments.
- Edit files outside `shops/sharding/` or commit `node_modules/`, `dist/`, `.vercel/`, `.env*`, or credentials.
- Put tokens, secrets, or credentials in any file or chat message.
- Commit assistant changes before showing the diff for review.

## Before committing

- Run `git diff` and read every change. Treat the assistant's output like a teammate's Pull Request.
- Run `npm run ci` and confirm it passes with no errors.
- Confirm no file outside `shops/sharding/` is touched.