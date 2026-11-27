# Tazeh Khaneh | Online Grocery Store

![CI](https://github.com/Baran-06/idempotency-shop/actions/workflows/deploy.yml/badge.svg)

Tazeh Khaneh is an online grocery store built during my Frontend Bootcamp. It has a Persian RTL design and works on desktop and mobile devices.

**[Live Website](https://shop.baranbuilds.com)** · [Alternative Vercel URL](https://idempotency-shop.vercel.app)

## Mobile Preview

![Mobile Screenshot](docs/mobile.png)

## Features

- Responsive design
- Product search and filtering
- Shopping cart
- Light and dark mode
- Products loaded from an API
- Page navigation

## Technologies

React, TypeScript, Vite, Zustand, TanStack Router, Fuse.js, Docker, Nginx, GitHub Actions, and Vercel.

## Run Locally

From the shared Bootcamp repository:

```bash
cd shops/idempotency
npm install
npm run dev
```

## Run with Docker

Run these commands from the shop folder:

```bash
docker build -t idempotency-shop .
docker run --rm -p 8080:80 idempotency-shop
```

Open `http://localhost:8080` in your browser.

## GitHub Container Registry

Pushes to `main` in the standalone `Baran-06/idempotency-shop` repository publish
`ghcr.io/baran-06/idempotency-shop` after CI and the Docker build pass. Each
publish uses the version from `package.json` (for example, `1.0.0`) and also
updates the `latest` tag.

After the first publish, set the package visibility to **Public** in GitHub's
package settings so users can pull the image without signing in.

```bash
docker pull ghcr.io/baran-06/idempotency-shop:latest
docker run --rm -p 8080:80 ghcr.io/baran-06/idempotency-shop:latest
```

Open `http://localhost:8080` in your browser. Replace `latest` in both commands
with a version tag to run a specific release.

## CI/CD

Run the project checks with:

```bash
npm run ci
```

GitHub Actions checks the code, builds the Docker image, and deploys the website to Vercel.

## Version

Current stable version is `1.0.2`.

See [CHANGELOG.md](CHANGELOG.md) for version history.

## Week 7 Bonus Work

- **AI Evals** documented evaluation results for the shop. [AI Evals](evals.md)
- **GHCR** added publishing of versioned Docker images. [PR #3](https://github.com/Baran-06/idempotency-shop/pull/3) · [Container package](https://github.com/users/Baran-06/packages/container/idempotency-shop)
- **GitHub MCP** used an experimental pull request. It must remain unmerged. [PR #4](https://github.com/Baran-06/idempotency-shop/pull/4)
- **Production Rollback** introduced an intentionally incorrect header label in `1.0.1` and restored the correct label with `git revert` in `1.0.2`. The recorded detection at `2026-11-25T12:05:15Z` and recovery at `2026-11-25T12:54:10Z` were 48 minutes 55 seconds apart. [Exercise PR #5](https://github.com/Baran-06/idempotency-shop/pull/5) · [Recovery PR #6](https://github.com/Baran-06/idempotency-shop/pull/6)

Production pipeline runs by version are [1.0.0](https://github.com/Baran-06/idempotency-shop/actions/runs/45539045367), [1.0.1](https://github.com/Baran-06/idempotency-shop/actions/runs/4560997982), and [1.0.2](https://github.com/Baran-06/idempotency-shop/actions/runs/45618014925).
