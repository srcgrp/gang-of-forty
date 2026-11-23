
# سارا مارکت

Persian RTL grocery shop, built with React, TypeScript and Vite (Gang of Forty, `shops/broken-windows`).

## Commands
- `npm run dev`: Start the development server at http://localhost:5173.
- `npm run ci`: Run all required checks. This command must pass before every commit.

## Folders and import rules
- `src/types.ts` is the single source of shared TypeScript types.
- `api/` handles API requests, data loading and validation.
- Only `api/client.ts` is allowed to call `fetch`.
- `catalog/` contains pure product and catalog logic.
- `cart/` contains cart calculations and checkout logic.
- `storage/` handles localStorage access for cart persistence.
- `hooks/` contains React hooks and Zustand stores.
- `components/` contains reusable UI components; `components/pages/` contains route-level page components.
- `App.tsx` defines application routes and connects page components.
- `main.tsx` is the application entry point and loads global styles.
- `api/` may import shared types from `types.ts` and internal API modules.
- `catalog/` may import shared types and its own internal modules, but must not import `components/`, `hooks/` or `api/`.
- `cart/` may import shared types, but must not depend on UI components or hooks.
- `storage/` may import shared types and validation utilities, but must not depend on UI components or hooks.
- `hooks/` may use `api/`, `cart/`, `storage/` and shared types. Lower-level folders must not depend on hooks.
- Components may import hooks, `catalog/`, `cart/`, shared types, format utilities and other components, but must not directly call `fetch` or access localStorage.
- Keep business logic out of components.

## Never
- Use `any`, `as` (except `as const`), non-null assertions (`!`) or `@ts-ignore`.
- Edit files outside `shops/broken-windows`.
- Commit `node_modules`, `dist`, `.env*` or `.vercel`.