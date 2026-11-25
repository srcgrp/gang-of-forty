# Stage 1: install dependencies and build the site into dist/
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# .env* is kept out by .dockerignore, so give Vite the API path here.
# nginx.conf proxies /api/ to the real API.
ENV VITE_API_URL=/api
RUN npm run build

# Stage 2: serve only dist/ with nginx
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
