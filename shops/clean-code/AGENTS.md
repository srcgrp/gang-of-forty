# <Clean Market>

Persian RTL grocery shop, React + TypeScript + Vite (Gang of Forty, shops/<clean-code>).

## Commands

- npm run dev → http://localhost:5173
- npm run ci → lint, check, test, build: must pass before every commit

## Folders and import rules

- src/types/ → only types. Every folder may import it. It imports nothing else.
- src/api/ → the only place that calls fetch. Only src/hooks/ may import it.
- src/storage/ → cart in localStorage and URL helpers. Only src/hooks/ may import it.
- src/catalog/ → pure product lists. Components and hooks may import it.
- src/features/ → cart and product rules, no React. Components, hooks, and catalog may import it.
- src/shared/ → shared price and offer rules. features and catalog may import it.
- src/hooks/ → useCatalog, useCart, useThemeStore. Only components, App.tsx, and main.tsx may import it.
- src/components/ → React UI. No fetch. Only App.tsx and other components may import it.
- App.tsx → routes only. main.tsx → createRoot, CartProvider, App.

## Never

- any, as (except as const), !, @ts-ignore
- edit files outside this folder; commit node
  \_
  modules, dist, .env\*
  , .vercel
