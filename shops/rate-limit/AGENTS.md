# Rate-Limit

Persian RTL grocery shop, React + TypeScript + Vite (Gang of Forty, shops/rate-limit)

## Commands
- npm run dev -> https://localhost:5173
- npm run ci -> lint, check, test, build: must pass before every commit

## Folders and import rules
- `src/main.tsx` mounts React and loads `style.css`. `src/App.tsx` defines the routes and imports the layout and pages.
- `src/components/` contains the React UI. Route screens in `src/components/pages/` compose shared components. The UI reads state through hooks and uses catalog, cart, and formatting helpers as needed.
- `src/hooks/` contains React hooks and Zustand stores. `useCatalog` calls the catalog loader and uses `api/errors` for error messages. `useCartStore` combines cart rules with cart storage. `useThemeStore` persists the theme through Zustand middleware.
- `src/catalog/` builds, groups, filters, and sorts catalog data. `loadCatalog.ts` connects the API to `buildCatalog`. Keep catalog transformations independent of React and browser APIs.
- `src/cart/` contains pure cart rules and totals. `src/format/` contains pure display formatting for prices, Persian digits, titles, and card data.
- `src/api/` owns endpoints, requests, and response validation. Call `fetch` only in `src/api/http.ts`. Put response guards in `src/api/guards/`.
- `src/storage/` owns cart persistence and validation of saved cart data. Keep direct `localStorage` calls in `src/storage/cart.ts`.
- `src/data/` contains static shop data such as category metadata. `src/types.ts` contains shared type declarations only. Use `import type` for type-only imports.
- Use relative, extensionless imports between source modules. Keep dependencies flowing from the entry points and UI toward hooks and lower-level modules. Avoid circular imports.

## Never
- any, as (except as const), !, @ts-ignore
- edit files outside this folder; commit node_modules, dist, .env*, .vercel
