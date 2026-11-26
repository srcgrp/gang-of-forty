# ناردونه

[![وضعیت CI شاخهٔ main](https://github.com/amirnasr-dev/semver-shop/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/amirnasr-dev/semver-shop/actions/workflows/deploy.yml)

ناردونه یک فروشگاه فارسی و راست‌به‌چپ برای جست‌وجوی محصولات، دیدن قیمت‌ها و ساخت سبد خرید است. [فروشگاه زنده را باز کن](https://semver-shop.vercel.app/)

## اجرا روی کامپیوتر

در ترمینال وارد پوشه‌ای شو که `package.json` ناردونه داخل آن است. در مخزن گروهی این پوشه `shops/semver` است. در مخزن شخصی `semver-shop` از همان ریشهٔ مخزن استفاده کن.

```powershell
npm install
npm run dev
```

بعد از اجرا آدرسی را که Vite در ترمینال نشان می‌دهد باز کن. آدرس پیش‌فرض `http://localhost:5173` است. در PowerShell ویندوز می‌توانی به‌جای `npm` از `npm.cmd` استفاده کنی.

## اجرا با Docker

Docker را روشن کن و در همان پوشهٔ فروشگاه این دستورها را اجرا کن.

```powershell
docker build -t semver-shop .
docker run -d -p 8080:80 --name shop semver-shop
```

در مرورگر `http://localhost:8080` را باز کن. برای بررسی API، نشانی `http://localhost:8080/api/products.json` را باز کن و ببین فهرست محصولات به‌صورت JSON برمی‌گردد.

## نمای موبایل

![نمای تمام‌صفحهٔ فروشگاه ناردونه در موبایل](docs/mobile.png)
