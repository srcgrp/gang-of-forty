# Suprino

پروژه سوپرمارکت سوپرینو

توسعه‌دهنده: الینا هژبری

## اجرای پروژه با Docker

ابتدا ایمیج Docker را بسازید:

```bash
docker build -t premature-optimization-shop .
```

سپس کانتینر را اجرا کنید:

```bash
docker run -d -p 8080:80 --name shop premature-optimization-shop
```

حالا فروشگاه از طریق آدرس زیر در دسترس است:

http://localhost:8080

برای متوقف کردن و حذف کانتینر:

```bash
docker stop shop
docker rm shop
```