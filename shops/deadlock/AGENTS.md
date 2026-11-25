# Herman Shop

This is a Persian RTL grocery shop built with React, TypeScript, and Vite.

## Commands
- `npm run dev` starts the local Vite server at `http://localhost:5173`.
- `npm run ci` runs lint, type checks, tests when present, and the production build.
- Run `npm run ci` before each commit.

## Folders and imports
- `src/types.ts` contains shared TypeScript types only.
- `src/api/` is the only folder that calls `fetch`; validate data before using it.
- `src/features/` contains pure cart and product logic.
- `src/hooks/` contains React hooks for shared state and loading data.
- `src/components/` contains reusable UI; page components live in `src/components/pages/`.
- Keep routes in `src/App.tsx` and follow the component and data flow in `DESIGN.md`.
- Avoid importing page components into reusable components.

## Never
- Do not use `any`, type assertions other than `as const`, non-null `!`, or `@ts-ignore`.
- Do not silence lint rules with comments.
- Do not edit files outside this shop folder.
- Do not commit `node_modules`, `dist`, `.env*`, `.vercel`, or tokens.
- For a release, follow `.claude/skills/release/SKILL.md` step by step.
