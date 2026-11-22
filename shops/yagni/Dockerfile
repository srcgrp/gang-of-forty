# Stage 1: build the app (node:22-alpine + npm ci + npm run build → dist/)
FROM node:22-alpine AS build

WORKDIR /app

# Copy dependency manifests first: the npm ci layer is cached and reruns
# only when dependencies change, not when app code changes.
COPY package.json package-lock.json ./
RUN npm ci

# Copy the app source and build it.
COPY . .
RUN npm run build

# Stage 2: serve the prebuilt files with nginx — no Node, no dev dependencies.
FROM nginx:1.27-alpine

# Custom nginx config (SPA history routing + /api/ proxy).
COPY nginx.conf /etc/nginx/conf.d/default.conf

# dist/ from stage 1 → nginx's default folder /usr/share/nginx/html.
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
