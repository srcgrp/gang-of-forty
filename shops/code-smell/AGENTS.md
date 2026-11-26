# سوپرمارکت بوی کد

Persian RTL grocery shop built with React, TypeScript, and Vite in `shops/code-smell/`.

## Commands

- Run `npm run dev` from `shops/code-smell/` to open `http://localhost:5173/`.
- Run `npm run ci` before every commit. Lint, type checks, tests if present, and build must pass.
- Review the changes with `git diff` before committing.

## Folders and import rules

- `src/types.ts` contains shared types and has no imports. Use `import type` when using these types.
- `src/api/` loads and checks JSON. Only `src/api/getJSON.ts` calls `fetch`. API loaders use that helper.
- `src/catalog/` prepares product cards, carousels, and search results. Keep React components out of this layer.
- `src/cart/` contains pure cart functions. It can import shared types and pricing helpers from `src/catalog/`.
- `src/hooks/useCartStore.ts` uses cart functions and `src/storage/cartStorage.ts` to save and load the cart.
- `src/hooks/useCatalog.ts` uses the API loaders. Components and pages get catalog data through the hook.
- `src/App.tsx` defines the routes and imports route pages from `src/components/pages/`.

## Never

- Do not use `any`, type assertions with `as` except `as const`, non-null assertions (`!`), or `@ts-ignore`.
- Do not edit files outside `shops/code-smell/`.
- Do not commit `node_modules/`, `dist/`, `.env*`, `.vercel/`, or tokens.