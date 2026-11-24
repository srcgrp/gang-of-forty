
# Least Surprise

Persian RTL grocery shop, React + TypeScript + Vite.

## Commands
- npm run dev -> http://localhost:5173
- npm run ci -> lint, check, test, build before every commit

## Folders and import rules
- src/types.ts -> only shared types
- src/api/ -> the only place that calls fetch
- src/cart/ -> cart logic
- src/catalog/ -> product filtering and carousel logic
- src/components/ -> shared UI components
- src/hooks/ -> hooks and stores
- src/pages/ -> page components
- src/storage/ -> storage utilities
- Pages can use components, hooks, api and catalog.
- Components can use hooks and cart logic.
- Shared folders must not import page components.
- Follow the architecture in DESIGN.md.

## Never
- any, as (except as const), !, @ts-ignore
- Edit files outside shops/least-surprise/
- Commit node_modules, dist, .env*, .vercel

## Release
- For a release, follow .claude/skills/release/SKILL.md step by step.
