# Nardone

Nardone is the Persian, right-to-left grocery storefront I work on as part of the Gang of Forty project. It is located in `shops/semver`. I build the interface with React and TypeScript, use Vite for development and production builds, manage navigation with TanStack Router, and handle the cart and theme with Zustand.

## Commands I use

Run the following commands inside `shops/semver` when working in the group repository. When using the standalone `semver-shop` repository, execute them from the root directory. Nardone's `package.json` is available in both locations. If Windows PowerShell prevents `npm.ps1` from running, use `npm.cmd` instead.

- Use `npm install` to install the dependencies required by the project.
- Start the development server with `npm run dev`. Visit the address displayed by Vite in the terminal. By default, this address is [http://localhost:5173](http://localhost:5173).
- Use `npm run check` to verify the TypeScript types. The `npm run build` command verifies the types and generates the production build in `dist/`.
- Before making any commit, execute `npm run ci` and wait until it completes successfully. This command performs linting, verifies TypeScript, executes tests when a test script is defined, and builds the project.

## Folders and import rules

- Store common types in `src/types.ts` and use `import type` to import them.
- Set up routes in `src/App.tsx`. The router relies on hash-based URLs like `#/checkout`. `Layout` displays the current page between the common header and footer. Place route-specific pages in `src/components/pages/` and reusable interface components in `src/components/`.
- Make all direct `fetch` calls through `src/api/client.ts`. Catalog requests in `src/api/shop-api.ts` go through this client, while `src/api/guards.ts` checks the validity of the responses.
- `Layout` invokes `useLoadCatalog()` to retrieve the catalog from `shop-api.ts`. The pages, header, and footer access the shared result in `CatalogContext` by calling `useCatalog()`.
- Get product selection, sorting, and filtering functionality from `src/catalog/`. Keep common helper functions, including price formatting and notifications, in `src/utils/`.
- When working with UI code, select the required cart state or action from `src/hooks/useCartStore.ts`. The store relies on `src/cart/cart.ts` to perform cart operations and `src/storage/cart-storage.ts` to handle browser storage. The header calculates the item count using the quantities in the cart.
- Manage the light or dark theme through `src/hooks/useThemeStore.ts`. This Zustand store persists the chosen theme in browser storage.
- [DESIGN.md](DESIGN.md) describes the component responsible for each storefront section and its associated state.

## Rules for changes

- Limit all modifications to `shops/semver/`. The `api/` and `scripts/` directories and root-level files in the group repository are not part of this scope.
- When writing TypeScript, avoid using `any`, type assertions with `as` other than `as const`, the non-null assertion `!`, `@ts-ignore`, or any comments that turn off lint rules. Check the structure of incoming data and properly handle error states.
- Do not include `node_modules/`, `dist/`, `.vercel/`, `.env*` files, passwords, or tokens in commits. Passwords and tokens must also stay out of chats, screenshots, and pull requests.
- Check with me before beginning each assignment step. Inspect `git diff` before making a commit, create a single commit for each step, and afterward let me know what passed and what remains unresolved.

When preparing a release, follow the instructions in [.claude/skills/release/SKILL.md](.claude/skills/release/SKILL.md) one step at a time.
