# yaldastore (separation)

Persian RTL grocery shop, React + TypeScript + Vite (Gang of Forty, shops/separation).

## Commands

- npm run dev → http://localhost:5173 (proxy /api → https://gof.zzb.cx)
- npm run ci → lint, check, test, build: must pass before every commit

## Folders and import rules

- src/types.ts → only types, no imports (Product, Category, Offer, CartLine, LoadState)
- src/api/ → the only place that calls fetch (getJSON, guards, loadShop)
- src/storage/ → the only place that touches localStorage (cartStorage) and URL (urlState)
- src/cart/ + src/catalog/ → pure logic, no fetch/document/localStorage (cart math, priceOf, filterProducts)
- src/components/ → view only, no fetch/localStorage (Header, ProductGrid, CartPanel, ...)
- App.tsx → all useState/useEffect live here, no direct fetch/localStorage
- main.tsx → entry, mounts App on #root with StrictMode
- Direction: App → components / logic / data → types, no cycles
- No helpers.ts / utils.ts, no enum, max 70 lines per file

## Never

- any, as (except as const), !, @ts-ignore / @ts-expect-error
- edit files outside this folder; commit node_modules, dist, .env*, .vercel

For a release, follow .claude/skills/release/SKILL.md step by step.
