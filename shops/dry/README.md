# سوپرمارکت MARTO

فروشگاه فارسی با رابط راست‌به‌چپ، کاتالوگ متصل به API، جست‌وجو، علاقه‌مندی‌ها و سبد خرید.

[![CI](https://github.com/A-H-FEIZI/dry-shop/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/A-H-FEIZI/dry-shop/actions/workflows/deploy.yml)

[نسخهٔ زندهٔ فروشگاه MARTO](https://dry-shop-sepia.vercel.app)

## اجرای محلی

با Node.js نسخهٔ ۲۲ یا جدیدتر، از همین پوشه اجرا کنید.

```sh
npm ci
npm run dev
npm run ci
```

Vite درخواست‌های `/api/` را به API مشترک می‌فرستد. مسیرهای فروشگاه از hash استفاده می‌کنند و با تازه‌کردن صفحه حفظ می‌شوند.

## اجرا با Docker

```sh
docker build -t dry-shop .
docker run -d -p 8080:80 --name dry-shop dry-shop
```

فروشگاه روی [پورت ۸۰۸۰](http://localhost:8080) در دسترس است. برای توقف و حذف کانتینر، `docker rm -f dry-shop` را اجرا کنید.

پس از انتشار ایمیج و عمومی‌کردن بستهٔ GHCR، می‌توانید همان نسخه را مستقیم اجرا کنید.

```sh
docker run --rm -p 8080:80 ghcr.io/a-h-feizi/dry-shop:1.0.0
```

## انتشار فروشگاه

۱. مخزن عمومی و خالی `A-H-FEIZI/dry-shop` را در GitHub بسازید. پروژهٔ Vercel را از همین پوشه با `npx vercel@66.6.0 login` و `npx vercel@66.6.0 link` متصل کنید. سه GitHub Actions Secret با نام‌های `VERCEL_TOKEN`، `VERCEL_ORG_ID` و `VERCEL_PROJECT_ID` را در `dry-shop` تنظیم کنید. شناسه‌ها در `.vercel/project.json` هستند.

۲. پس از مرور و ثبت تغییرات، از ریشهٔ مخزن Gang of Forty اجرا کنید.

```sh
git remote add shop https://github.com/A-H-FEIZI/dry-shop.git
git subtree split --prefix=shops/dry -b dry-shop
git push shop dry-shop:main
```

۳. لینک اجرای سبز و آدرس انتشار را در Summary گردش‌کار بگیرید. برای Preview، تغییر کوچکی را از شاخه‌ای در خود مخزن `dry-shop` به `main` پیشنهاد دهید. پس از اولین اجرا، در محافظت از `main`، بازبینی از طریق PR و موفقیت بررسی `check` را الزامی کنید.

۴. آدرس واقعی production را در `shop.json` و این README ثبت کنید. با Playwright MCP در اندازهٔ ۳۹۰ × ۸۴۴ منتظر نمایش محصولات بمانید، هشدارها و خطاهای Console و پاسخ‌های خارج از 2xx را بررسی کنید و اسکرین‌شات کامل را در `docs/mobile.png` بگذارید. گزارش Lighthouse موبایل و لینک‌های production، preview و اجرای workflow را در PR هفتهٔ هفتم اضافه کنید.

## شواهد هفتهٔ هفتم

- [ارزیابی دستیار با و بدون دستور پروژه](evals.md)
- [بررسی موبایل، CI و تمرین بازگشت نسخه](docs/release-evidence.md)
