# فروشگاه ریفکتور (Refactor Shop)

![CI](https://github.com/ZahraGolabi/refactor-shop/actions/workflows/deploy.yml/badge.svg)

A Persian RTL online grocery shop built with React, TypeScript, and Vite.

**Live:** [https://refactor-shop.vercel.app](https://refactor-shop.vercel.app)

![Mobile](docs/mobile.png)

## Run

```bash
npm install
npm run dev
```

## Run with Docker

```bash
docker build -t refactor-shop .
docker run -d -p 8080:80 --name shop refactor-shop
docker stop shop && docker rm shop
```
