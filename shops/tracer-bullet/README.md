# Tracer Bullet

## Run with Docker

Build the Docker image:

```bash
docker build -t tracer-bullet-shop .
```

Run the container:

```bash
docker run -d -p 8080:80 --name shop tracer-bullet-shop
```

Open http://localhost:8080 in your browser.

Stop and remove the container:

```bash
docker stop shop
docker rm shop
```
