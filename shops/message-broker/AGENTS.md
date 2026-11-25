Persian RTL grocery shop, React + TypeScript + Vite + TanStack Router.
Commands: `npm run dev`; `npm run ci` runs lint, check, tests if available and build.
Development: http://localhost:5173
Folders and import rules:
`src/types.ts`: shared types; `src/api/`: only place calling fetch.
`src/cart/`, `src/catalog/`, `src/storage/`: pure logic; import types only.
`src/hooks/`: imports API, cart, storage and types; `src/components/`: UI and pages.
`src/ui/`: UI utilities and hooks; `src/router.tsx`: connects pages and Layout.
Never: no `any`, `!`, `@ts-ignore`, or `as` except `as const`; no edits outside shop; never commit `node_modules`, `dist`, `.env*`, `.vercel`.