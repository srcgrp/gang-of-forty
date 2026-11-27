# Open-Closed Shop

Persian RTL grocery shop, React + TypeScript + Vite (Gang of Forty, shops/open-closed).

## Commands

- npm run dev → http://localhost:5173
- npm run ci → lint, check, test, build: must pass before every commit

## Folders and import rules

- src/types.ts → only types, imports nothing from other src folders
- src/api/ → the only place that calls fetch; validates responses in guards.ts
- src/cart/, src/catalog/, src/storage/, src/lib/ → pure functions, must not import React
- src/hooks/ → Zustand stores (theme, cart) and custom hooks (useCatalog)
- src/components/ → React components, one per file; pages live in components/pages/
- src/App.tsx → only route definitions

## Never

- any, as (except as const), !, @ts-ignore
- edit files outside shops/open-closed
- commit node_modules, dist, .env\*, .vercel
- put tokens or secrets in code, chat, or Pull Requests

## Releases

For a release, follow .claude/skills/release/SKILL.md step by step.
