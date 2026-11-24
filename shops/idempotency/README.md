# Tazeh Khaneh | Online Grocery Store

![CI](https://github.com/Baran-06/idempotency-shop/actions/workflows/deploy.yml/badge.svg)

Tazeh Khaneh is an online grocery store built during my Frontend Bootcamp. It has a Persian RTL design and works on desktop and mobile devices.

**[Live Website](https://idempotency-shop.vercel.app)**

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

## CI/CD

Run the project checks with:

```bash
npm run ci
```

GitHub Actions checks the code, builds the Docker image, and deploys the website to Vercel.

## Version

Current version: `1.0.0`

See [CHANGELOG.md](CHANGELOG.md) for version history.
