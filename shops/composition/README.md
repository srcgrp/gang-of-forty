# Batshop / composition

فروشگاه مواد غذایی فارسی و راست‌به‌چپ با React، TypeScript و Vite.

## اجرا با Docker

این دستورها را داخل پوشهٔ فروشگاه اجرا کنید:

```bash
docker build -t composition-shop .
docker run -d -p 8080:80 --name shop composition-shop
```

فروشگاه در http://localhost:8080 در دسترس است. درخواست‌های `/api/` توسط Nginx به API فروشگاه هدایت می‌شوند.
آدرس عمومی API هنگام ساخت تنظیم می‌شود؛ فایل‌های `.env*` وارد ایمیج نمی‌شوند.

برای توقف و حذف کانتینر:

```bash
docker stop shop
docker rm shop
```
