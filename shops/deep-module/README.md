<div align="center">

# 🛒 سبزکاله (Sabzkaleh) — Week 7 Production Release

[![CI / Build / Deploy](https://github.com/<user>/sabzkaleh-shop/actions/workflows/deploy.yml/badge.svg)](https://github.com/<user>/sabzkaleh-shop/actions/workflows/deploy.yml)
[![Version](https://img.shields.io/badge/Version-1.0.0-2ea44f?style=for-the-badge)](CHANGELOG.md)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

**سوپرمارکت آنلاین فارسی‌زبان (RTL) با React 18، TypeScript سخت‌گیرانه، TanStack Router، Zustand و استقرار کامل Docker / GHCR / GitHub Actions / Vercel**

</div>

> **MANUAL ACTION REQUIRED:** Replace `<user>` in the CI badge URL above with your real GitHub username, and update the Live/Preview URLs below after connecting Vercel.

---

## 🌐 Deployment URLs

| Environment | URL | Status |
| :--- | :--- | :--- |
| **Production (Live URL)** | `MANUAL ACTION REQUIRED: <insert real Vercel production URL>` | Pending Vercel deploy |
| **Preview URL (PR)** | `MANUAL ACTION REQUIRED: <insert real Vercel preview URL>` | Pending Pull Request |
| **Container Registry (GHCR)** | `ghcr.io/<github-user>/sabzkaleh-shop:1.0.0` | Pending push to `main` |

---

## 📱 Mobile Screenshot (`390x844`)

![Sabzkaleh Mobile Production Screenshot](docs/mobile.png)

> **MANUAL ACTION REQUIRED:** `docs/mobile.png` must be captured from the real live Vercel production URL at `390x844` using Playwright MCP after deployment. Do not commit a local or placeholder screenshot. See [`docs/MCP-AND-LIGHTHOUSE.md`](docs/MCP-AND-LIGHTHOUSE.md).

---

## 🔀 Local Development vs. Preview vs. Production

| Aspect | Local Development | Preview Deployment (Vercel PR) | Production Deployment (`main`) |
| :--- | :--- | :--- | :--- |
| **Trigger** | `npm run dev` on developer machine | Opening/updating a Pull Request | Merging/pushing to protected `main` branch (CI `deploy` job) |
| **URL** | `http://localhost:3000` | Ephemeral per-PR URL (`*-<user>.vercel.app`) | Canonical production domain (`liveUrl` in `shop.json`) |
| **API Proxy (`/api/*`)** | `vite.config.ts` `server.proxy` -> `https://gof.zzb.cx` | `vercel.json` `/api/:path*` rewrite -> `https://gof.zzb.cx/api/:path*` | `vercel.json` (Vercel) or `nginx.conf` (Docker) -> `https://gof.zzb.cx/api/*` |
| **Bundle Mode** | Unminified ES modules served by Vite | Minified production `vite build` (`dist/`) | Minified production `vite build` (`dist/`) |
| **Purpose** | Rapid coding & local UI testing | PR review, visual checks, safe testing before merge | Public live storefront verified via Playwright MCP & Lighthouse |

---

## 💻 Local Installation, Development & CI

Requires **Node.js 22+** and **npm** (do not use `bun`, `yarn`, or `pnpm`).

```bash
# 1. Clean install from package-lock.json
npm ci

# 2. Start local dev server (http://0.0.0.0:3000)
npm run dev

# 3. Run full CI check (oxlint + tsc --noEmit + vite build)
npm run ci

# 4. Preview built dist/ locally on port 3000
npm run preview
```

---

## 🐳 Docker & GHCR Instructions

The multi-stage [`Dockerfile`](Dockerfile) builds the Vite app in `node:22-alpine` and serves static assets plus `/api/` reverse-proxying via `nginx:1.27-alpine` using [`nginx.conf`](nginx.conf).

### Build & Run Locally

```bash
# Build production image
docker build -t sabzkaleh-shop:1.0.0 .

# Run container on http://localhost:8080
docker run --rm -p 8080:80 sabzkaleh-shop:1.0.0
```

Verify both SPA routing (e.g. `http://localhost:8080/plp/offers`) and API proxying (`http://localhost:8080/api/products.json`).

### Run Published GHCR Image

On pushes to `main` after `check` passes, `.github/workflows/deploy.yml` publishes:
- `ghcr.io/<github-user>/sabzkaleh-shop:1.0.0`
- `ghcr.io/<github-user>/sabzkaleh-shop:latest`

```bash
docker pull ghcr.io/<github-user>/sabzkaleh-shop:1.0.0
docker run --rm -p 8080:80 ghcr.io/<github-user>/sabzkaleh-shop:1.0.0
```

---

## ⚙️ GitHub Actions & Vercel Deployment

Workflow file: [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)

1. **`check`** — Runs `npm ci` and `npm run ci` (`lint`, `check`, `build`) on every push and PR to `main`.
2. **`docker`** (`needs: check`) — Verifies the multi-stage Docker build passes.
3. **`publish`** (`needs: check`, `push` to `main` only) — Logs into `ghcr.io` with `GITHUB_TOKEN` (`packages: write`) and pushes `:1.0.0` and `:latest`.
4. **`deploy`** (`needs: check`, `push` to `main` only) — Pulls Vercel config, builds, and deploys prebuilt artifacts to Vercel Production using repository secrets:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`

Vercel configuration in [`vercel.json`](vercel.json) routes `/api/:path*` to `https://gof.zzb.cx/api/:path*` before the SPA rewrite `/(.*)` -> `/index.html`.

---

## 🎭 Playwright MCP & Lighthouse Mobile Validation

Add Playwright MCP to your MCP client configuration:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

Required production validation steps (see [`docs/MCP-AND-LIGHTHOUSE.md`](docs/MCP-AND-LIGHTHOUSE.md)):
1. Open the real Vercel production URL.
2. Resize viewport to `390x844`.
3. Wait until products are visible.
4. Check console messages (`0` errors, `0` warnings).
5. Check network requests and failed requests (`0` failed requests).
6. Save a full-page screenshot to `docs/mobile.png`.
7. Run Lighthouse Mobile audit (Performance, Accessibility >= 90, Best Practices, SEO) and attach the screenshot to Pull Request #7.

---

## 🚀 Release Workflow

AI coding rules live in [`AGENTS.md`](AGENTS.md) and [`CLAUDE.md`](CLAUDE.md).
To release a new version, follow [`.claude/skills/release/SKILL.md`](.claude/skills/release/SKILL.md) step by step:
1. Run `npm run ci` (abort if failing).
2. Bump `package.json` version and update [`CHANGELOG.md`](CHANGELOG.md).
3. Review `git diff` and wait for human approval.
4. Perform the final `git push` manually, then validate the live production site with Playwright MCP.

---

## 📚 Additional Week 7 Documentation

- [`AGENTS.md`](AGENTS.md) & [`CLAUDE.md`](CLAUDE.md) — Agent rules & strict project conventions
- [`evals.md`](evals.md) — 5 `AGENTS.md` comparison evaluations
- [`docs/MCP-AND-LIGHTHOUSE.md`](docs/MCP-AND-LIGHTHOUSE.md) — Playwright MCP `390x844` & Lighthouse Mobile guide
- [`docs/GITHUB-MCP-BONUS.md`](docs/GITHUB-MCP-BONUS.md) — Bonus #3 GitHub MCP CI-failure debugging exercise
- [`docs/ROLLBACK-BONUS.md`](docs/ROLLBACK-BONUS.md) — Bonus #4 `1.0.0 -> 1.0.1 -> git revert -> 1.0.2` rollback exercise
- [`docs/PR7-TEMPLATE.md`](docs/PR7-TEMPLATE.md) — Ready-to-complete Pull Request #7 template
