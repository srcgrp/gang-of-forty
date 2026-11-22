# Refactor

Persian RTL grocery shop, React + TypeScript + Vite + TanStack Router + Zustand (Gang of Forty, shops/refactor).

## Commands
- npm run dev   → http://localhost:5173
- npm run ci    → lint, check, test, build: must pass before every commit

## Folders and import rules
- src/types.ts → only types
- src/api/ → the only place that calls fetch
- src/data/validation.ts → pure type-guard helpers (isId, ...); used only by src/api/ and src/storage/
- src/storage/ → localStorage read/write only (cart.ts)
- src/features/ → pure functions only (cart/calculate, catalog/carousel, catalog/sort, products/select); no React, no fetch
- src/hooks/ → useCatalog (fetch state machine), useCartStore, useThemeStore (Zustand)
- src/components/ → UI; components/pages/ → the 4 pages + NotFound
- Only App.tsx and main.tsx may import from components/pages/; pages must never import App.tsx (circular import)
- Routes, validateSearch and Register live only in App.tsx; App.tsx has no useState/useEffect
- Filters (q, category, sort) live in the URL search params, not in state
- Subscribe to stores with precise selectors only; Layout must not subscribe to the cart store
- Every displayed number uses toLocaleString("fa-IR"); no file longer than 70 lines

## Never
- any, as (except as const), !, @ts-ignore, lint-silencing comments
- edit files outside this folder; commit node_modules, dist, .env*, .vercel

For a release, follow .claude/skills/release/SKILL.md step by step.
