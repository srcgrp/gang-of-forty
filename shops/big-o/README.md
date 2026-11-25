# big-o

A Persian (right-to-left) grocery shop built with React, TypeScript and Vite.

## Run with Docker

You need Docker Desktop installed and running. Run these commands from the project folder (the one that contains the `Dockerfile`):

```
docker build -t big-o-shop .
docker run -d -p 8080:80 --name shop big-o-shop
```

Then open http://localhost:8080 in your browser.

To stop and remove the container:

```
docker stop shop && docker rm shop
```