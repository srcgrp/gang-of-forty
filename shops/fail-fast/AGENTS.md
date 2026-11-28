# Fail-Fast Shop

Persian RTL grocery shop built with React, TypeScript, Vite, TanStack Router, and Zustand.

## Commands

- `npm run dev` starts the Vite development server.
- `npm run ci` runs lint, type checking, tests when configured, and a production build.
- Run commands from this shop directory.

## Folder and import rules

- Keep domain types in `src/types.ts` and `src/types/`.
- `src/api/` is the only place that may call `fetch`; validate remote data before use.
- Keep pure catalog and cart logic in `src/catalog/` and `src/cart.ts`.
- Keep React UI in `src/components/`; shared state and hooks belong in `src/hooks/`.
- Keep persistent browser storage in `src/storage/`.
- Follow the existing folder responsibilities and import direction documented in `DESIGN.md`.

## Constraints

- Work only inside `shops/fail-fast/` in the Gang of Forty repository.
- Do not use `any`, `as` (except `as const`), non-null assertions, or `@ts-ignore`.
- Do not commit `node_modules/`, `dist/`, `.env*`, `.vercel/`, or credentials.
- Run `npm run ci` after changes and before a commit.
