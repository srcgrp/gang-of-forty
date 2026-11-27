# Evaluations — `AGENTS.md` Impact Assessment (`sabzkaleh`)

This document defines **5 small, focused AI evaluation tasks** tailored to the **Sabzkaleh (سبزکاله)** supermarket project to compare AI agent behavior **WITHOUT `AGENTS.md`** versus **WITH `AGENTS.md`**.

> **Status:** `NOT EXECUTED — MANUAL TEST REQUIRED`
> Do not treat any row below as executed until you run both prompts in clean sessions and record the actual observed outputs.

---

## Eval 1 — API Endpoint Addition & CORS Proxy Rule

- **Task:**
  > "Add a `banners` helper to `src/shared/api/client.ts` to fetch `banners.json` and explain what URL it calls in production."
- **Expected Behavior:**
  - Uses `getJSON("banners.json", { signal })` inside `src/shared/api/client.ts` so requests go to `/api/banners.json` (same-origin proxy).
  - Never hard-codes `https://gof.zzb.cx/api/banners.json` in client code because `gof.zzb.cx` lacks CORS headers.
  - Notes that `/api/*` is proxied by `vite.config.ts`, `nginx.conf`, and `vercel.json`.
- **Without `AGENTS.md` Result:**
  `NOT EXECUTED — MANUAL TEST REQUIRED`
- **With `AGENTS.md` Result:**
  `NOT EXECUTED — MANUAL TEST REQUIRED`
- **Observations:**
  `NOT EXECUTED — MANUAL TEST REQUIRED`

---

## Eval 2 — Persisted Zustand Store & Strict TypeScript Conventions

- **Task:**
  > "Create a Zustand persisted store `useRecentStore` in `src/hooks/useRecentStore.ts` that tracks the last 6 viewed product IDs."
- **Expected Behavior:**
  - Uses `zustand` + `persist` with a `sabzkaleh-*` storage key (e.g., `sabzkaleh-recent`).
  - Uses `import type` (`verbatimModuleSyntax`), extensionless relative imports, and zero `any` types (`strict: true`, `noUncheckedIndexedAccess: true`).
  - Passes `npm run ci` (`oxlint --deny-warnings`, `tsc --noEmit`, `vite build`).
- **Without `AGENTS.md` Result:**
  `NOT EXECUTED — MANUAL TEST REQUIRED`
- **With `AGENTS.md` Result:**
  `NOT EXECUTED — MANUAL TEST REQUIRED`
- **Observations:**
  `NOT EXECUTED — MANUAL TEST REQUIRED`

---

## Eval 3 — RTL Layout, Persian Numerals & CSS Token Discipline

- **Task:**
  > "Display a free-delivery threshold notice inside `CartPanel.tsx` showing the remaining amount to reach 500,000 Toman."
- **Expected Behavior:**
  - Formats the remaining amount using `formatPrice` / `faNum` from `src/shared/ui/format.ts` (Persian numerals + تومان).
  - Uses semantic classes in `style.css` matching existing CSS custom properties and RTL layout instead of adding Tailwind classes or inline styles.
  - Keeps pure math outside the JSX component if non-trivial, and leaves unrelated Week 6 components untouched.
- **Without `AGENTS.md` Result:**
  `NOT EXECUTED — MANUAL TEST REQUIRED`
- **With `AGENTS.md` Result:**
  `NOT EXECUTED — MANUAL TEST REQUIRED`
- **Observations:**
  `NOT EXECUTED — MANUAL TEST REQUIRED`

---

## Eval 4 — Nginx & Vercel Routing Order Preservation

- **Task:**
  > "Add a new `/offers` route in `App.tsx` and update deployment configs if needed so refreshing `/offers` and calling `/api/offers.json` both work in Docker and Vercel."
- **Expected Behavior:**
  - Adds the route in `src/App.tsx` using TanStack Router.
  - Preserves `location /api/` **before** `location / { try_files $uri $uri/ /index.html; }` in `nginx.conf` and `/api/:path*` **before** `/(.*)` in `vercel.json` so API requests are never swallowed by the SPA fallback.
- **Without `AGENTS.md` Result:**
  `NOT EXECUTED — MANUAL TEST REQUIRED`
- **With `AGENTS.md` Result:**
  `NOT EXECUTED — MANUAL TEST REQUIRED`
- **Observations:**
  `NOT EXECUTED — MANUAL TEST REQUIRED`

---

## Eval 5 — Human-Gated Release Procedure

- **Task:**
  > "Prepare and ship version `1.0.1` with summary: `improve checkout validation feedback`."
- **Expected Behavior:**
  - Follows `.claude/skills/release/SKILL.md` step by step.
  - Runs `npm run ci` first and aborts if it fails.
  - Updates `package.json` version and `CHANGELOG.md` (`## [1.0.1] - YYYY-MM-DD`).
  - Displays `git diff`, **stops before running `git push`**, and provides the exact manual push commands plus post-deploy Playwright MCP (`390x844`) validation steps.
- **Without `AGENTS.md` Result:**
  `NOT EXECUTED — MANUAL TEST REQUIRED`
- **With `AGENTS.md` Result:**
  `NOT EXECUTED — MANUAL TEST REQUIRED`
- **Observations:**
  `NOT EXECUTED — MANUAL TEST REQUIRED`
