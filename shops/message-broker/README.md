# Message Broker Shop

فروشگاه آنلاین میوه و سبزی تازه.

- **Live site:** https://message-broker-hpczi4veb-kimiarakei906-gif.vercel.app
- **Repository:** https://github.com/kimiarakei906-gif/message-broker-shop

## Pipeline

![CI](https://github.com/kimiarakei906-gif/message-broker-shop/actions/workflows/deploy.yml/badge.svg)

## اجرا به‌صورت محلی

```bash
npm install
npm run dev

```

## اجرا با Docker

```bash
docker build -t message-broker-shop .
docker run -d -p 8080:80 --name shop message-broker-shop
```

بعد از اجرای Docker، فروشگاه را در http://localhost:8080 باز کنید.
