# Working on the Nardone Storefront

Nardone is a Persian, right-to-left storefront in `shops/semver` in the Gang of Forty repository. The interface is written in React and TypeScript. Vite runs and builds it, TanStack Router defines the page routes, and Zustand manages cart and theme state.

## Run and check the project

Run these commands from `shops/semver`. In Windows PowerShell, you can use `npm.cmd` in place of `npm`.

- `npm install` installs the project dependencies.
- `npm run dev` starts the development server. Open the address Vite prints in the terminal. The default is `http://localhost:5173`.
- `npm run check` checks TypeScript types, and `npm run build` writes the deployable output to `dist/`.
- `npm run ci` must pass before every commit. It runs lint, checks TypeScript, runs tests if defined, and then builds the project.

## Folders and import rules

- `src/types.ts` holds shared types. Bring them into other files with `import type`.
- `src/App.tsx` defines the routes. `src/components/` holds reusable UI components, and `src/components/pages/` holds storefront pages.
- Only `src/api/client.ts` may call `fetch` directly. `src/api/shop-api.ts` uses that client to make requests, and `src/api/guards.ts` checks the shape of API responses.
- `src/hooks/useCatalog.ts` uses `shop-api.ts` to load the catalog. `Layout` provides the data in one place, and pages read it through `useCatalog()`.
- `src/catalog/` holds the logic for selecting, sorting, and filtering products. Pages and UI components can import these functions. `src/utils/` holds shared utilities such as price formatting and notifications.
- `src/hooks/useCartStore.ts` uses `src/cart/cart.ts` for cart operations and `src/storage/cart-storage.ts` to read and write the cart in `localStorage`. UI components use this store to access the state or actions they need.
- See [DESIGN.md](DESIGN.md) for details on routes, page components, and data ownership.

## Scope and working rules

- Keep changes within `shops/semver/`. The group repository's `api/`, `scripts/`, and root-level files are outside this scope.
- In TypeScript, do not use `any`, type assertions using `as` except `as const`, the non-null assertion `!`, `@ts-ignore`, or comments that disable lint rules. Validate the shape of incoming data and handle error states.
- Keep `node_modules/`, `dist/`, `.vercel/`, `.env*` files, passwords, and tokens out of commits. Keep passwords and tokens out of chats, screenshots, and pull requests as well.
- Get the project owner's approval before starting each assignment step. Review the changes with `git diff` before committing, make one commit per step, and report test results and any open items afterward.
