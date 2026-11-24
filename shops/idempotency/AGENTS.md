# تازه‌خانه (idempotency)

Persian RTL grocery shop built with React, TypeScript, and Vite.
Part of Gang of Forty, inside `shops/idempotency/`.

## Commands

- `npm run dev` — Start the local website.
- `npm run ci` — Run lint, TypeScript check, optional tests, and build.
- `npm run preview` — Preview the production build.
- Always run `npm run ci` before committing changes.

## Folders and import rules

- `src/main.tsx` — Starts the React application.
- `src/App.tsx` — Defines routes using TanStack Router.
- `src/components/pages/` — Home, PLP, and NotFound pages.
- `src/components/` — React UI components.
- `src/hooks/` — Catalog loading and Zustand stores for cart and theme.
- `src/features/products/api/` — Loads and checks product data.
- `src/shared/api/get-json.ts` — The only file that directly calls `fetch`.
- `src/features/products/logic/` — Product filtering, search, and carousels.
- `src/features/cart/logic/` — Cart rules and calculations.
- `src/features/cart/storage/` — Saves and loads cart data.
- `src/shared/types/` — Shared TypeScript types.
- `src/shared/validation/` — Shared data validation.

Import rules:

- Components can use hooks, features, and shared files.
- Hooks can use features and shared files.
- Features can use shared files.
- Shared files must not depend on components or hooks.

## Never

- Do not use `any`, unsafe `as` casts (except `as const`), `!`, or `@ts-ignore`.
- Do not disable lint rules.
- Do not edit files outside `shops/idempotency/`.
- Do not commit `node_modules/`, `dist/`, `.vercel/`, `.env*`, or secrets.
- Do not change the existing UI or features unless the task needs it.
- Do not make unrelated changes or add unnecessary code.
- Review `git diff` before each commit.
- Do not commit, push, or deploy without my approval.

For a release, follow .claude/skills/release/SKILL.md step by step.
