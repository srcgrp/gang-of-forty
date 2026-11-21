# Armin Supermarket (strategic)

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
