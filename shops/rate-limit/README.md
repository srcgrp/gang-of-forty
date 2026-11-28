# Rate Limit

Rate Limit فروشگاه آنلاین مواد غذایی فارسی با جست‌وجوی محصولات، پیشنهادهای ویژه و سبد خرید است.

[مشاهدهٔ فروشگاه آنلاین](https://rate-limit-shop.vercel.app/)

![CI](https://github.com/ravenblark/rate-limit-shop/actions/workflows/deploy.yml/badge.svg)

![نمای موبایل فروشگاه Rate Limit](docs/mobile.png)

## اجرا

دستورها را از پوشه‌ای اجرا کنید که فایل `package.json` فروشگاه در آن قرار دارد.

```bash
npm install
npm run dev
```

فروشگاه در `http://localhost:5173` در دسترس است.

## اجرا با Docker

```bash
docker build -t rate-limit-shop .
docker run --rm -p 8080:80 rate-limit-shop
```

فروشگاه در `http://localhost:8080` در دسترس است.
