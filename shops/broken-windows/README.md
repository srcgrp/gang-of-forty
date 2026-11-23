## اجرا با Docker

ابتدا Docker Image را بسازید:

```bash
docker build -t broken-windows-shop .
```

سپس کانتینر را اجرا کنید:

```bash
docker run -d -p 8080:80 --name shop broken-windows-shop
```

پس از اجرا، فروشگاه از آدرس زیر در دسترس خواهد بود:

http://localhost:8080

برای متوقف کردن و حذف کانتینر:

```bash
docker stop shop && docker rm shop
```