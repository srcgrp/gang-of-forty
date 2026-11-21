# MARTO

Persian RTL grocery storefront using React, TypeScript, Vite and TanStack Router.

## Commands

- `npm ci` installs dependencies from the lockfile.
- `npm run dev` serves the shop and proxies `/api/` to the shared API.
- `npm run ci` runs lint, type checks, available tests and a production build.

## Folders and imports

- `src/App.tsx` configures hash routes. `src/components/pages/` composes page views.
- `src/components/` holds reusable UI and may consume feature hooks and stores.
- `src/features/` owns product, cart, search, favorites and theme behavior.
- `src/features/products/api/` owns fetch calls and parses API data before views consume it.
- `src/shared/` provides utilities and stays independent of feature and UI code.
- See `DESIGN.md` for additional module boundaries and state ownership.

## Changes and releases

- Keep changes inside `shops/dry/`. Review the diff and run CI before committing.
- Avoid `any`, casts other than `as const`, non-null assertions and `@ts-ignore`.
- Keep dependencies, build output, environment files, Vercel metadata and secrets out of Git.
- For a release, follow `.claude/skills/release/SKILL.md` step by step.
