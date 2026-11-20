# سوپرمارکت اسید (Acid)
Persian RTL grocery shop, React + TypeScript + Vite (Gang of Forty, shops/acid).

## Commands
- npm run dev → http://localhost:5173
- npm run ci → lint, check, test, build: must pass before every commit

## Folders and import rules
- src/types.ts → only types
- src/api/ → the only place that calls fetch
- src/storage/ → the only place that uses localStorage
- src/cart/ → pure logic for cart (no DOM)
- src/components/ → React components, pure UI
- src/App.tsx → orchestrates everything

## Never
- any, as (except as const), !, @ts-ignore
- edit files outside this folder; commit node_modules, dist, .env*, .vercel
