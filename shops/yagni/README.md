## Run with Docker

```bash
docker build -t yagni-shop .
docker run -d -p 8080:80 --name shop yagni-shop
# Open http://localhost:8080 and check the products and /api/
docker stop shop && docker rm shop
```
