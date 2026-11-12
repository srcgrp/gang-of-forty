# سوپرمارکت ناردونه — طراحی فعلی React

## ساختار کامپوننت‌ها

```text
App
└── Storefront
    ├── Header
    │   ├── SearchBox
    │   ├── CategoryNav
    │   └── CartPanel
    ├── main
    │   ├── CategoryList
    │   └── ProductCollections
    │       ├── SearchResults (وقتی query پر باشد)
    │       │   └── ProductGrid
    │       │       └── ProductCard × n
    │       ├── HomeCarousels (پیشنهادهای ویژه)
    │       │   ├── SaleCountdown
    │       │   └── ProductGrid → ProductCard × n
    │       ├── LatestProducts
    │       │   └── ProductGrid → ProductCard × n
    │       ├── CategoryShelves
    │       │   └── ProductGrid → ProductCard × n
    │       ├── HomeCarousels (بقیه اسکرول‌ها)
    │       └── PromoBanners
    └── Footer
```

در حالت خطای دریافت داده، `ProductCollections` پیام خطا و دکمهٔ تلاش دوباره را نشان می‌دهد. در حالت جست‌وجو، بخش‌های عادی محصولات با فهرست نتایج جایگزین می‌شوند؛ وقتی کادر جست‌وجو خالی شود، چیدمان عادی برمی‌گردد.

## مالکیت state

| داده | مالک | رفتار |
|---|---|---|
| `cart` | `App` | بارگذاری اولیه از `localStorage` و ذخیره با effect روی `[cart]` |
| `cartOpen` | `App` | باز و بسته شدن پنل سبد |
| `categoryId` | `App` | وضعیت انتخاب دسته برای ناوبری و جدیدترین‌ها |
| `query` | `App` | مقدار کنترل‌شدهٔ `SearchBox`; نتایج از روی کاتالوگ محاسبه می‌شوند |
| `attempt` | `App` | با Retry زیاد می‌شود و effect دریافت داده را دوباره اجرا می‌کند |
| `loadState` | `App` | یکی از حالت‌های `loading`, `success`, `empty`, `error` |
| `store` | `App` | اطلاعات فروشگاه، دسته‌ها و محتوای صفحه از API |
| `cartCount`, `cartTotal`, `visibleState` | مشتق‌شده در `App` | مقدار جداگانه‌ای در state نگهداری نمی‌شود |
| `secondsLeft` | `SaleCountdown` | شمارندهٔ محلی پیشنهاد ویژه؛ effect هر ثانیه کم می‌کند و در cleanup متوقف می‌شود |

## جریان جست‌وجو و دریافت داده

- `SearchBox` مقدار `query` را از `App` می‌گیرد و با `onQueryChange` به‌روزرسانی می‌کند.
- `filterProductsByQuery` در `src/catalog/` نام، واحد، برچسب‌ها و نام دسته را برای جست‌وجو بررسی می‌کند؛ دادهٔ اصلی و محصولات سبد خرید دست‌نخورده می‌مانند.
- effect دریافت داده در `App` محصولات، پیشنهادها، موجودی، دسته‌ها، اطلاعات فروشگاه و صفحهٔ خانه را هم‌زمان می‌گیرد.
- `ignore` در cleanup جلوی به‌روزرسانی state پس از unmount یا اجرای قبلی effect را می‌گیرد.
- Retry state را به `loading` برمی‌گرداند، اطلاعات قبلی فروشگاه را پاک می‌کند و `attempt` را زیاد می‌کند تا effect دوباره اجرا شود.
- خطای HTTP یا JSON نامعتبر به حالت `error` می‌رسد؛ خطای هر محصول نامعتبر با guard حذف می‌شود و محصولات سالم باقی می‌مانند.

## پوشه‌ها و مرز مسئولیت‌ها

```text
src/
  main.tsx                 اتصال React و stylesheet موجود
  App.tsx                  stateهای سراسری، effectهای API و handlerها
  types.ts                 نوع‌های داده و LoadState
  api/                     دریافت و اعتبارسنجی JSON
  catalog/                 ترکیب و فیلتر داده‌های محصول
  cart/                    قواعد خالص سبد خرید
  storage/                 خواندن و نوشتن سبد در localStorage
  components/              اجزای React و رابط صفحه
  utils/                   قالب‌بندی و اعلان موفقیت
```

فقط `api/` از `fetch` استفاده می‌کند و فقط `storage/` به `localStorage` دسترسی دارد. `App` مالک state است و اجزا از طریق props داده و callback می‌گیرند. رندر فهرست‌ها از شناسهٔ پایدار محصول، دسته، پیوند یا برنامهٔ کاری برای `key` استفاده می‌کند.

## محدوده و یادداشت‌ها

- جست‌وجو در دادهٔ دریافت‌شده از API و در مرورگر انجام می‌شود.
- شمارش‌گر از ۶۰ دقیقه شروع می‌شود؛ API فعلی زمان پایان واقعی پیشنهاد را ارائه نمی‌کند.
- سبد خرید برای نمایش و ماندگاری محلی است و پرداخت یا ثبت سفارش در این تسک وجود ندارد.
- فایل `style.css` موجود حفظ شده است؛ اجزای جدید از کلاس‌های فعلی صفحه استفاده می‌کنند.
