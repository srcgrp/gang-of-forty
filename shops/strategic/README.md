# Armin Supermarket (strategic)

Armin Supermarket is a Persian RTL grocery storefront where shoppers can browse products by category, search the catalog, and manage their cart.

[Open the live shop](https://strategic-shop.vercel.app/)

[![CI](https://github.com/armin-panahi/strategic-shop/actions/workflows/deploy.yml/badge.svg)](https://github.com/armin-panahi/strategic-shop/actions/workflows/deploy.yml)

![Armin Supermarket product catalog on mobile](docs/mobile.png)

## Run locally

From the shop directory, install the dependencies and start the development server:

```sh
npm install
npm run dev
```

Open the local URL printed by Vite in your terminal.

## Run with Docker

From the shop directory (`shops/strategic/`), build the image and start the container:

```sh
docker build -t strategic-shop .
docker run -d -p 8080:80 --name shop strategic-shop
```

Open [the shop](http://localhost:8080) in your browser. To check the API connection, open [the product catalog](http://localhost:8080/api/products.json). You should see a JSON list of products.

When you finish testing, stop and remove the container:

```sh
docker stop shop
docker rm shop
```

### Run the published image

Pull and run version 1.0.0 from GitHub Container Registry.

```sh
docker pull ghcr.io/armin-panahi/strategic-shop:1.0.0
docker run -d -p 8080:80 --name strategic-shop-ghcr ghcr.io/armin-panahi/strategic-shop:1.0.0
```

Open [the shop](http://localhost:8080) and check [the product catalog](http://localhost:8080/api/products.json).

Stop and remove the container after testing.

```sh
docker stop strategic-shop-ghcr
docker rm strategic-shop-ghcr
```
