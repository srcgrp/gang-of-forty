# big-o

Persian RTL grocery shop, React + TypeScript + Vite (Gang of Forty, shops/big-o).

## Commands
- npm run dev → http://localhost:5173
- npm run ci → lint, check, test, build: must pass before every commit

## Folders and import rules
- `src/types.ts` — only types
- `src/api/` — the only place that calls fetch
- `src/storage/` — the only place that reads or writes localStorage
- `src/cart/` — pure functions for the cart; no React, no localStorage
- `src/catalog/` — pure functions for products; no React, no fetch
- `src/hooks/` — Zustand stores and useCatalog
- `src/components/` — React UI; read the stores directly; never call fetch
- `src/components/pages/` — one file per route; at most 70 lines each
- `src/App.tsx` — only the routes
- Imports only go down: main → App → pages → components → hooks → cart, catalog, api, storage → types


## Never
- any, as (except as const), !, @ts-ignore, lint-disable comments
- edit files outside shops/big-o; commit node_modules, dist, .env*, .vercel
- define routes anywhere except App.tsx
- use dangerouslySetInnerHTML or put secrets in VITE_ variables
- run git push: tell me the command and I run it myself