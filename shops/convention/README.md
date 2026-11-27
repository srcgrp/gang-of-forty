# Convention | سوپرمارکت قرارداد به جای پیکربندی

[فروشگاه آنلاین Convention](https://convention-shop.vercel.app/)

[تصویر تمام‌صفحهٔ فروشگاه در موبایل](docs/mobile.png)

[![CI](https://github.com/YBN2004/convention-shop/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/YBN2004/convention-shop/actions/workflows/deploy.yml)

فروشگاه فارسی و راست‌به‌چپ Convention از کاتالوگ دوره برای جستجو، مرور دسته‌ها و سفارش تمرینی استفاده می‌کند. سبد خرید و تم پس از بستن مرورگر هم باقی می‌مانند.

## اجرای محلی

در مخزن دوره، PowerShell را در `shops/convention` باز کنید. در مخزن مستقل `convention-shop` دستورها را از ریشه اجرا کنید. برای اجرای آزمون‌ها Node.js نسخهٔ 22.18 یا جدیدتر لازم است.

```powershell
npm install
npm run dev
```

فروشگاه در [localhost:5173](http://localhost:5173/) باز می‌شود. در مخزن دوره، Vite فایل‌های کاتالوگ را از پوشهٔ مشترک `api` می‌خواند. در نسخهٔ مستقل درخواست‌های `/api/` به سرور دوره می‌روند.

```powershell
npm ci
npm run ci
npm run preview
```

دستور CI به‌ترتیب lint، TypeScript، آزمون‌های دامنه و build را اجرا می‌کند. دستور preview خروجی ساخته‌شده را نمایش می‌دهد.

## Docker

```powershell
docker build -t convention-shop .
docker run --rm -d -p 8080:80 --name convention-shop convention-shop
```

[فروشگاه محلی](http://localhost:8080/) را باز کنید. Nginx فایل‌های ساخته‌شده را سرو می‌کند و درخواست‌های کاتالوگ را به API دوره می‌فرستد. برای توقف کانتینر از `docker stop convention-shop` استفاده کنید.

## انتشار

گردش‌کار `.github/workflows/deploy.yml` از ریشهٔ مخزن مستقل اجرا می‌شود. در تنظیمات GitHub Actions آن مخزن سه secret با نام‌های `VERCEL_TOKEN`، `VERCEL_ORG_ID` و `VERCEL_PROJECT_ID` لازم است. شناسه‌ها متعلق به همان پروژهٔ Vercel باشند. تنظیم git.deploymentEnabled در vercel.json انتشار خودکار Git را غیرفعال می‌کند تا سایت از همین گردش‌کار منتشر شود.

پس از موفقیت بررسی‌ها، یک Pull Request داخل همان مخزن نسخهٔ preview می‌سازد. Push به `main` نسخهٔ production و تصویر GHCR را منتشر می‌کند. آدرس انتشار در Summary اجرای مربوط درج می‌شود. آدرس پایدار فروشگاه بعد از تأیید در `shop.json` ثبت می‌شود.

پس از انتشار نسخهٔ ۱.۰.۰ و عمومی شدن بسته، تصویر فروشگاه را با این دستور اجرا کنید.

```powershell
docker run --rm -d -p 8080:80 --name convention-release ghcr.io/ybn2004/convention-shop:1.0.0
```

[تغییرات نسخه](CHANGELOG.md) · [معماری پروژه](DESIGN.md)

## بررسی انتشار در VS Code

تغییرات Git از پوشهٔ اصلی `gang-of-fourty` در بخش Source Control دیده می‌شوند. برای استفاده از تنظیمات MCP فروشگاه، پوشهٔ `shops/convention` را به‌عنوان workspace در یک پنجرهٔ VS Code باز کنید. در مخزن مستقل، این تنظیمات در ریشه قرار می‌گیرند.

از Command Palette فرمان `MCP: List Servers` را اجرا کنید و `playwright` را شروع کنید. بعد از انتشار، آدرس واقعی `liveUrl` را در اندازهٔ ۳۹۰×۸۴۴ باز کنید، منتظر نمایش محصولات بمانید و Console و درخواست‌های شبکه را بررسی کنید. تصویر تمام‌صفحه را در `docs/mobile.png` ذخیره کنید.

برای تمرین CI قرمز، سرور `github` را شروع کنید. در پنجرهٔ ورود VS Code یک توکن fine-grained با تاریخ انقضا وارد کنید که فقط برای مخزن شخصی `convention-shop` و با دسترسی خواندن Contents، Actions و Pull requests ساخته شده باشد. لاگ اجرای ناموفق و اجرای موفق پس از اصلاح را در همان PR ثبت کنید.
