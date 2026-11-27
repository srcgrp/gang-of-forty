# Week 7 — Publish the Week 6 Supermarket

> Replace every `<...>` placeholder below with your real observed outputs after completing the manual GitHub, Vercel, Playwright MCP, and Lighthouse actions.

## Live URL

`<MANUAL ACTION REQUIRED: real Vercel production URL>`

## Preview URL

`<MANUAL ACTION REQUIRED: real Vercel preview URL from PR>`

## Workflow Run

`<MANUAL ACTION REQUIRED: real GitHub Actions deploy.yml run URL>`

## CI

- check: `<PENDING — verify PASS on GitHub Actions>`
- docker: `<PENDING — verify PASS on GitHub Actions>`
- publish (GHCR): `<PENDING — verify PASS on push to main>`
- deploy: `<PENDING — verify PASS on push to main>`

## MCP Check

- viewport: `390x844`
- products visible: `<PENDING — YES/NO after checking live URL>`
- console errors: `<PENDING — must be 0>`
- console warnings: `<PENDING — must be 0>`
- failed network requests: `<PENDING — must be 0>`
- screenshot saved: `docs/mobile.png`

## Lighthouse

- Performance: `<PENDING — real Mobile score>`
- Accessibility: `<PENDING — real Mobile score (must be >= 90)>`
- Best Practices: `<PENDING — real Mobile score>`
- SEO: `<PENDING — real Mobile score>`

`<MANUAL ACTION REQUIRED: Attach Lighthouse Mobile screenshot here>`

## AI Usage

- **AI tool/model:** Google AI Studio Build (`models/gemini-4-hydrogen`)
- **What AI implemented:**
  - Inspected the Week 6 `sabzkaleh` supermarket codebase and preserved Week 6 UI/logic except for verified deployment, network, font, and accessibility bug fixes (`src/shared/api/client.ts`, `src/hooks/useCatalog.ts`, `src/components/SearchBox.tsx`, `style.css`).
  - Created `shop.json`, `AGENTS.md`, `CLAUDE.md`, `Dockerfile`, `.dockerignore`, `nginx.conf`, `.github/workflows/deploy.yml`, `.claude/skills/release/SKILL.md`, `CHANGELOG.md` (`1.0.0`), `evals.md`, `README.md`, and `docs/` bonus/verification guides.
  - Updated `package.json` (`week: 7`, `npm run ci`), generated `package-lock.json`, and updated `vercel.json` (`/api/:path*` proxy rewrite before SPA catch-all).
- **What was manually reviewed & locally tested:**
  - Verified all configs contain zero hard-coded secrets or tokens (`VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, `GITHUB_TOKEN` referenced strictly via GitHub Secrets).
  - Verified `npm ci`, `npm run ci` (`oxlint --deny-warnings`, `tsc --noEmit`, `vite build`), and local `dist/` preview (`vite preview`) via `playwright-cli` at `390x844` (`0` console errors, `0` warnings, `0` failed requests, `56` products rendered, `scrollWidth === 390`).
  - Ran local Lighthouse Mobile against `dist/` (`Performance: 74`, `Accessibility: 87 -> 96` after fixing `aria-allowed-attr` in `SearchBox.tsx` and `.site-footer` `content-visibility: auto` contrast in `style.css`, `Best Practices: 100`, `SEO: 91`). *Live Vercel URL Lighthouse audit still pending.*
- **Real AI mistake & discovery/fix:**
  - During workspace verification, an initial `find` command used `-not -path './.git*'`, which inadvertently hid `./.github/workflows/deploy.yml` from the listing; discovered via explicit `ls -la .github/workflows/deploy.yml` and corrected the filter to `-not -path './.git' -not -path './.git/*'`.
  - `<ADD ANY ADDITIONAL OBSERVED MISTAKE FROM YOUR OWN GITHUB/VERCEL/EVALS EXECUTION>`

## Definition of Done

- [x] `shop.json` created with `week: 7`, `name: "سبزکاله"`, `slug: "sabzkaleh"` (`liveUrl` ready to update post-deploy)
- [x] `npm run ci` configured and passing locally (`lint` + `check` + `build`)
- [x] `AGENTS.md` and `CLAUDE.md` (`@AGENTS.md`) tailored specifically to `sabzkaleh`
- [x] Multi-stage `Dockerfile`, `.dockerignore`, and `nginx.conf` (`/api/` proxy + SPA `try_files`) ready
- [x] `vercel.json` configured with `/api/:path*` proxy rewrite before SPA fallback
- [x] `.github/workflows/deploy.yml` configured (`check`, `docker`, `publish`, `deploy`)
- [x] `.claude/skills/release/SKILL.md` created with human-gated push workflow
- [x] `CHANGELOG.md` (`1.0.0`) and `README.md` updated
- [ ] Real `liveUrl` updated in `shop.json` and `README.md`
- [ ] GitHub Actions `check`, `docker`, `publish`, `deploy` all green on `main`
- [ ] Branch protection enabled on `main`
- [ ] Playwright MCP live check passed at `390x844` and `docs/mobile.png` committed
- [ ] Lighthouse Mobile run (Accessibility >= 90) and screenshot attached

## Bonus

- **Bonus #1 (`evals.md`):** 5 project-specific `AGENTS.md` evaluation tasks prepared (`<fill in executed comparison results>`).
- **Bonus #2 (GHCR):** `publish` job configured in `.github/workflows/deploy.yml` pushing `ghcr.io/<github-user>/sabzkaleh-shop:1.0.0` and `:latest` (`<attach GHCR package URL after push>`).
- **Bonus #3 (GitHub MCP):** Procedure documented in `docs/GITHUB-MCP-BONUS.md` (`<attach temporary PR / CI fail -> fix link after execution>`).
- **Bonus #4 (Rollback):** Procedure documented in `docs/ROLLBACK-BONUS.md` (`<attach 1.0.0, 1.0.1, revert, 1.0.2 timestamps & URLs after execution>`).

## Questions

### 1. Why did we write `AGENTS.md` ourselves instead of giving it to AI?

Writing `AGENTS.md` manually (as the repository owner/engineer) forces us to establish explicit architectural boundaries, naming conventions, forbidden practices, and deployment constraints—such as forcing `/api/*` through same-origin proxies to avoid CORS failures, using `sabzkaleh-*` Zustand storage keys, and requiring `npm ci`—rather than letting an AI invent generic boilerplate or ratify its own arbitrary habits. When humans author the ground-truth contract, every future AI session starts aligned with the team's real invariants and can be evaluated objectively against them (as tested in `evals.md`).

### 2. Why does the release Skill leave the final production push to the user?

A production push to `main` is an irreversible, high-impact operation that triggers automated builds, container publishing to GHCR, and live Vercel deployment affecting real users. Keeping the human in the loop after `npm run ci`, version/changelog updates, and `git diff` review ensures explicit human accountability, prevents accidental or premature releases, and guarantees that the maintainer verifies deployment readiness before shipping to production.
