# فروشگاه ریفکتور (Refactor Shop)

سوپرمارکت آنلاین فارسی با معماری تمیز و کامپوننت‌های بهینه‌سازی‌شده.

## Run with Docker

```bash
docker build -t refactor-shop .
docker run -d -p 8080:80 --name shop refactor-shop
docker stop shop && docker rm shop
```
