# Fail-Fast Shop

[![CI](https://github.com/ElahehGhelichi/gang-of-forty-fail-fast/actions/workflows/deploy.yml/badge.svg)](https://github.com/ElahehGhelichi/gang-of-forty-fail-fast/actions/workflows/deploy.yml)

فروشگاه فارسی RTL ساخته‌شده با React، TypeScript و Vite.

## اجرای محلی

```bash
npm ci
npm run dev
```

## بررسی و ساخت

```bash
npm run ci
npm run build
```

## اجرای Docker

```bash
docker build -t fail-fast-shop .
docker run --rm -p 8080:80 --name fail-fast-shop fail-fast-shop
```

سپس `http://localhost:8080` را باز کنید. درخواست‌های `/api/` از طریق Nginx به API کاتالوگ هدایت می‌شوند.

## استقرار

این پروژه برای Vercel آماده شده است. در GitHub Actions، سه Secret زیر را برای مخزن اختصاصی فروشگاه تنظیم کنید:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

Pull Request به `main` یک پیش‌نمایش Vercel می‌سازد و push به `main` نسخه production را منتشر می‌کند. آدرس production را پس از deploy در `shop.json` ثبت کنید.

## بررسی موبایل و کیفیت

- [اسکرین‌شات موبایل (390×844)](docs/mobile.png)
- [خلاصه‌ی Lighthouse](docs/lighthouse.md)
- [گزارش کامل Lighthouse (HTML)](docs/lighthouse-report.report.html)
- [داده‌ی خام Lighthouse (JSON)](docs/lighthouse-report.report.json)

## مجوز و همکاری

این پروژه بخشی از بوت‌کمپ Gang of Forty است. راهنمای ساخت و نگهداری در `AGENTS.md` قرار دارد.
