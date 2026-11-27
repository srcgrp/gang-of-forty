# Tracer Bullet supermarket

Persian RTL grocery shop, React + TypeScript + Vite (Gang of Forty, shops/tracer-bullet).

## Commands
- npm run dev → http://localhost:5173
- npm run ci → lint, check, test, build: must pass before every commit

## Folders and import rules
- src/types.ts → imports nothing, only types
- src/api/ → the only place that calls fetch (getJSON and the type guards)
- src/storage/ → saves the cart in localStorage (the theme is saved by zustand persist in hooks/useThemeStore.ts); components never touch storage
- src/components/ → React components (pages in components/pages/); no fetch, no storage
- src/hooks/ → shared state (useCatalog, useCartStore, useThemeStore); never imports a component
- src/cart/, src/catalog/ → pure rule functions: no page, network or storage
- src/format/ → number and price formatting
- Imports point down: main.tsx → App.tsx → components/ → hooks/ → api, storage, cart, catalog, format → types.ts (a layer may skip down, never up)
- No file is longer than 70 lines

## Never
- any, as (except as const), !, @ts-ignore
- edit files outside this folder; commit node_modules, dist, .env*, .vercel
- comments that silence the linter (oxlint-disable, eslint-disable)
- Expose tokens, passwords, credentials or secrets.
- Commit changes without showing me git diff and receiving my approval.
- Run git push automatically.

## Release
- For a release, follow .claude/skills/release/SKILL.md step by step.