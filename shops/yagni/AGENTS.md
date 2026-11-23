# Mina Store

Persian RTL grocery shop, React + TypeScript + Vite (Gang of Forty, shops/yagni).

## Commands

- npm run dev → http://localhost:5173
- npm run ci → lint, check, test, build: must pass before every commit

## Folders and import rules

- src/types.ts (+ src/types/) → only types
- src/api/ → the only place that calls fetch (requests + response validation)
- src/cart/ → pure cart logic — no fetch, no network
- src/catalog/ → pure catalog and carousel calculations — no fetch, no network, no DOM
- src/storage/ → persistent browser storage (localStorage)
- src/hooks/ → React hooks: useCatalog (fetches via src/api); useCartStore/useThemeStore (use src/storage)
- src/components/ → reusable UI — props + hooks, no fetch, no pages
- src/pages/ → route pages — use hooks and components, no fetch
- src/App.tsx → TanStack Router configuration
- src/main.tsx → entry point

## Import rules

- fetch/HTTP happens only in src/api/ — other layers call it through hooks (useCatalog).
- Data flows down: pages/components use hooks; hooks use src/api, src/types and pure logic (src/cart, src/catalog).
- Pure layers (src/cart, src/catalog) must not import hooks, pages or components.
- For a release, follow .claude/skills/release/SKILL.md step by step.

## Never

- any, as (except as const), !, @ts-ignore
- edit files outside this folder; commit node_modules, dist, .env\*, .vercel
