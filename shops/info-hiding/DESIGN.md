# سوپرمارکت یاسمن — هفتهٔ پنجم

## نیازمندی‌ها

همان فروشگاه هفتهٔ چهارم با React نمایش داده می‌شود. کاربر پیشنهادها، لبنیات و همهٔ محصولات را می‌بیند، دسته و ترتیب قیمت را انتخاب می‌کند، کالاهای موجود را به سبد اضافه یا حذف می‌کند و جمع را می‌بیند. سبد پس از Refresh باقی می‌ماند و عنوان تب تعداد کالاها را نشان می‌دهد.

سطح اصلی انجام می‌شود. جستجو، دکمهٔ Retry و شمارش معکوس بونس این هفته‌اند و انجام نمی‌شوند. پرداخت، ثبت سفارش واقعی و ورود کاربر خارج از محدوده‌اند.

## بخش‌های صفحه و درخت کامپوننت‌ها

```text
App
└─ Storefront
   ├─ Header
   ├─ Hero
   ├─ Status
   ├─ CategoryNav
   ├─ ProductGrid (پیشنهادها)
   │  └─ ProductCard × n
   ├─ Banners
   ├─ ProductGrid (لبنیات)
   │  └─ ProductCard × n
   ├─ SortSelect
   ├─ ProductGrid (همهٔ محصولات)
   │  └─ ProductCard × n
   ├─ CartPanel
   ├─ ExtraCategories
   └─ Footer
```

کامپوننت‌ها props نوع‌دار دارند و رویدادها با callback به App می‌روند. فهرست‌ها با map و key شناسهٔ داده ساخته می‌شوند. Storefront فقط اجزای صفحه و مقادیر محاسبه‌شده را کنار هم قرار می‌دهد؛ هیچ State ندارد.

## State کجا زندگی می‌کند؟

| State | کامپوننت صاحب | چه کسی عوضش می‌کند؟ | کجا ذخیره می‌شود؟ |
|---|---|---|---|
| categoryId | App | callback انتخاب دسته از CategoryNav | حافظه؛ بعد از Refresh همه |
| cart | App | callback افزودن و حذف، تطبیق پس از دریافت داده | حافظه و Effect روی cart در localStorage |
| sort | App | callback انتخاب ترتیب از SortSelect | حافظه؛ بعد از Refresh ترتیب اصلی |
| state: LoadState | App | نتیجهٔ درخواست در Effect | حافظه |
| catalog | App | نتیجهٔ معتبر loadCatalog در Effect | حافظه؛ منبع اصلی سرور است |

محصولات دستهٔ انتخابی State نیستند؛ از products و categoryId هنگام render محاسبه می‌شوند.
محصولات مرتب‌شده State نیستند؛ از محصولات و sort محاسبه می‌شوند.
تعداد سبد State نیست؛ cartCount آن را از cart حساب می‌کند.
ردیف‌های سبد State نیستند؛ cartRows آن‌ها را از cart و داده‌های فعلی می‌سازد.
جمع سبد State نیست؛ cartTotal آن را از cart، قیمت‌ها و تخفیف‌ها محاسبه می‌کند. ذخیرهٔ دوبارهٔ آن باعث احتمال ناسازگاری دو مقدار می‌شود.
قیمت نهایی، تخفیف و موجودی کارت State نیستند؛ با toCard در map ساخته می‌شوند.
عنوان document هم State جدا نیست؛ یک Effect آن را از تعداد سبد به‌روز می‌کند.

## داده‌ها و API

مدل‌های Product، Category، Offer، Stock، Shop و CartLine در types.ts هستند. محصولات، دسته‌ها، پیشنهادها و موجودی با loadCatalog و Promise.all هم‌زمان دریافت می‌شوند. getJSON خروجی unknown دارد، response.ok بررسی می‌شود و Guardها پیش از استفاده شکل داده را کنترل می‌کنند. دادهٔ نامعتبر فهرست کنار گذاشته می‌شود و تعدادش گزارش می‌شود؛ ساختار کلی نامعتبر خطاست. نام و اطلاعات تماس فروشگاه ثابت‌اند.

Effect بارگذاری deps خالی دارد. ignore در cleanup برابر true می‌شود و پیش از به‌روزرسانی State بررسی می‌شود. در StrictMode توسعه دو مجموعه درخواست طبیعی است؛ پاسخ Effect قبلی نادیده گرفته می‌شود. App مستقیماً fetch یا localStorage را صدا نمی‌زند.

## حالت‌ها و Effectها

Status روی loading، success، empty و error با switch و بررسی never تصمیم می‌گیرد. خطای شبکه، 404 یا JSON خراب پیام فارسی نشان می‌دهد. حالت بدون محصول هم پیام مستقل دارد. برای تلاش دوباره صفحه را Refresh می‌کنیم؛ Retry بونس است.

سبد با lazy initializer و loadCart شروع می‌شود. Effect روی cart با saveCart فقط id و quantity را ذخیره می‌کند. پس از دریافت داده، سبد ذخیره‌شده با محصولات و موجودی معتبر تطبیق داده می‌شود. Effect جدا روی cart عنوان تب را تغییر می‌دهد. محاسبات خالص در render انجام می‌شوند و Effect ندارند.

## پوشه‌ها و وابستگی‌ها

```text
src/types.ts        نوع‌های مشترک، بدون import
src/api/            fetch و بررسی unknown
src/storage/        خواندن و نوشتن سبد
src/catalog/        فیلتر، تخفیف، قیمت و مدل کارت؛ توابع خالص
src/cart/           افزودن، حذف، تطبیق، تعداد و جمع؛ توابع خالص
src/components/     JSX، props و callback؛ بدون State
src/App.tsx         State، Effectها و اتصال callbackها
src/main.tsx        createRoot و StrictMode
```

main.ts و ui قبلی حذف شده‌اند. فایل‌های TypeScript و TSX حداکثر ۷۰ خط دارند. React نمایش DOM را مدیریت می‌کند؛ نوع داده‌ها از types.ts وارد می‌شود و محاسبات هفتهٔ چهارم بازاستفاده می‌شوند.

## امنیت و انتشار

React متن API را به صورت متن نمایش می‌دهد؛ dangerouslySetInnerHTML استفاده نمی‌شود. مقدارهای VITE_ عمومی‌اند و هیچ راز یا توکن ندارند. localStorage قابل تغییر است؛ فقط شناسه و تعداد ذخیره می‌شوند و قیمت از دادهٔ فعلی محاسبه می‌شود. سرور هنگام ثبت سفارش واقعی باید قیمت و موجودی را دوباره تأیید کند.

base برابر './' و proxy مسیر /api حفظ شده است. .env.production مقدار ../../api دارد و برای انتشار در /shops/<slug>/ مناسب است. اگر خروجی در /shops/info-hiding/info-hiding/ قرار بگیرد، پیش از build مقدار باید ../../../api شود. مسیر پوشهٔ کد به تنهایی URL نهایی انتشار را تعیین نمی‌کند.

check، lint، build و preview محلی بررسی می‌شوند. ابزار رسمی scripts/check-shop.mjs و check-arch.mjs باید از نسخهٔ هفتهٔ پنجم مخزن آکادمی اجرا شوند؛ نسخهٔ فعلی main عمومی این دو فایل را ندارد. بررسی محلی جای آن را نمی‌گیرد.
