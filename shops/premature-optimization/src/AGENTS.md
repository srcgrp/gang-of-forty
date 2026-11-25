# Superino

Persian RTL grocery store built with React, TypeScript, Vite, and TanStack Router.
The project uses Zustand for shared state and CSS for styling.

## Commands

- `npm run dev` → start development server at http://localhost:5173
- `npm run build` → type-check and build production files
- `npm run lint` → run Oxlint
- `npm run check` → run TypeScript checks
- `npm run ci` → run all available checks and production build
- Run `npm run ci` before every commit.

## Folders and Responsibilities

- `src/components/` → UI components and pages only
- `src/hooks/` → Zustand stores and custom React hooks
- `src/api/` → API requests and catalog loading
- `src/guards/` → API response validation
- `src/scripts/logic/` → pure business logic
- `src/scripts/storage/` → localStorage and URL operations
- `src/scripts/types/` → TypeScript types
- `src/lib/` → shared utilities, animations, and notifications
- `src/style/` → CSS styles
- `public/api/` → local JSON API data
- `public/imgs/` → product images

## Architecture and Import Rules

- Follow the dependency structure documented in DESIGN.md.
- Components must not call fetch or access localStorage directly.
- All network requests must go through src/api/.
- Keep business logic independent of React and the DOM.
- Use hooks to connect components with shared state and data.
- Reuse existing components, hooks, and utilities when possible.
- Keep TypeScript types in the appropriate types directory.

## Never

- Do not use `any`, `as` (except `as const`), non-null assertions (`!`), or `@ts-ignore`.
- Do not suppress lint warnings.
- Do not modify files outside this project directory.
- Never commit node_modules/, dist/, .vercel/, or .env\* files.
- Never put secrets or API tokens in source code.
- Do not introduce unnecessary dependencies or duplicate existing functionality.
- Preserve the Persian RTL layout and existing application behavior.

For a release, follow .claude/skills/release/SKILL.md step by step.
