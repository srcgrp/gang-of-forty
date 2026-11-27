# Liskov Shop

A Persian RTL grocery storefront built with React, TypeScript, and Vite.

**Live Website:** [liskov-shop.vercel.app](https://liskov-shop.vercel.app)

## Features

- Browse products, categories, and promotional banners.
- Search and filter products.
- Explore carousel-based product listing pages.
- Sort products by price.
- View product details.
- Add, decrease, and remove cart items.
- View cart totals and item counts.
- Persist cart data between visits.
- Switch between light and dark themes.
- Complete checkout using a validated checkout form.
- Responsive layout for mobile and desktop screens.

## Tech Stack

- React 19
- TypeScript
- Vite
- TanStack Router
- Zustand
- Oxlint
- Docker
- Nginx
- Vercel
- GitHub Actions

## Getting Started

### Requirements

- Node.js 22 or later
- npm

### Installation

Install project dependencies:

```bash
npm ci
```

### Development

Start the development server:

```bash
npm run dev
```

Vite prints the local development URL in the terminal.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run lint` | Run Oxlint |
| `npm run check` | Run TypeScript checks |
| `npm run build` | Build the production application |
| `npm run preview` | Preview the production build |
| `npm run ci` | Run all required CI checks |

## Application Routes

| Route | Description |
| --- | --- |
| `/` | Homepage with banners, carousels, categories, and products |
| `/plp/$carouselId` | Product listing for a selected carousel |
| `/product/$productId` | Product details |
| `/checkout` | Checkout form and order summary |

The application uses TanStack Router with hash-based history.

## Project Structure

```text
src/
â”œâ”€â”€ api/          # API utilities and response guards
â”œâ”€â”€ cart/         # Cart operations
â”œâ”€â”€ catalog/      # Product filtering, sorting, and pricing
â”œâ”€â”€ components/   # UI components and pages
â”œâ”€â”€ context/      # Application context
â”œâ”€â”€ hooks/        # React hooks and Zustand stores
â””â”€â”€ storage/      # Cart persistence

api.ts             # Application data loading
AGENTS.md          # Coding agent instructions
DESIGN.md          # Application design documentation
Dockerfile         # Multi-stage Docker build
nginx.conf         # Nginx configuration
vercel.json        # Vercel API rewrite configuration
```

## Data and API

The application loads catalog data through its API layer.

- `src/api/index.ts` handles HTTP requests.
- `src/api/guards.ts` validates API responses.
- `src/hooks/useCatalog.ts` loads catalog data.
- `VITE_API_URL` configures the API base URL.

In development and production, `/api/` requests are routed to the configured backend.

## Deployment

### Vercel

The application is deployed to:

[Liskov Shop](https://liskov-shop.vercel.app)

Vercel rewrites API requests through the configuration in `vercel.json`.

GitHub Actions runs CI checks, builds the Docker image, and handles Vercel deployments.

### Docker

Build the Docker image:

```bash
docker build -t liskov-shop .
```

Run the container:

```bash
docker run --rm -p 8080:80 liskov-shop
```

Open `http://localhost:8080` in your browser.

The Docker image uses a Node.js build stage and an Nginx production stage.

After the `publish` job succeeds on the standalone repository's `main` branch,
pull and run the versioned image from GHCR:

```bash
docker pull ghcr.io/shayankhoshniyat/liskov-shop:1.0.0
docker run -d -p 8080:80 --name shop ghcr.io/shayankhoshniyat/liskov-shop:1.0.0
```

## Development Guidelines

See [AGENTS.md](AGENTS.md) for coding rules and project conventions.

See [DESIGN.md](DESIGN.md) for the application architecture and implementation details.
