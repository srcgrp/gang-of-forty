# طراحی سوپرمارکت yaldastore در یک صفحه

## ۱. نیازمندی‌ها

- کاربر محصول‌ها را در دو ردیف «پیشنهاد ویژه امروز» و «لبنیات» می‌بیند.
- کاربر با فرم جست‌وجوی سربرگ، با کارت‌های دسته‌بندی و با مرتب‌سازی فیلتر می‌کند.
- کاربر با دکمه + به سبد اضافه می‌کند، از سبد حذف می‌کند و سبد را خالی می‌کند.
- سبد در `localStorage` می‌ماند و با Refresh از بین نمی‌رود.
- اگر API خراب باشد، صفحه سفید نمی‌شود؛ پیام خطای فارسی نشان داده می‌شود.
- خارج از نسخه: پرداخت آنلاین، حساب کاربری، پنل ادمین.

## ۲. بخش‌های صفحه

- سربرگ: نوار اطلاع‌رسانی، لوگوی SVG سبد با نام yaldastore، فرم جست‌وجو، لینک سبد با شمارنده، منوی اصلی.
- بنر بزرگ سبز و بنر کوچک کرم، ردیف دسته‌بندی‌ها (از API ساخته می‌شود).
- ردیف `#offers` (کارت‌های تخفیف‌دار با بج درصد و قیمت خط‌خورده) و `#status` برای حالت‌ها.
- دو بنر تبلیغاتی، ردیف `#dairy` (لبنیات)، جعبه `#cart` و فوتر تیره.
- کارت محصول: ایموجی روی زمینه پاستیلی، نام، واحد، قیمت نهایی و دکمه + سبز.

## ۳. داده‌ها و صاحبشان

- قیمت، نام، دسته، تخفیف، موجودی: سرور (`/api/*.json`)؛ فقط خواندنی در مرورگر.
- موجودی صفر یعنی «ناموجود»: کارت کم‌رنگ می‌شود و دکمه‌اش غیرفعال است.
- سبد خرید (`CartLine[]`): `localStorage` با کلید `separation-cart`.
- فیلتر دسته و متن جست‌وجو: حافظه React (`useState` در `App.tsx`)؛ با هر render از روی `products` فیلتر می‌شوند و با Refresh برنمی‌گردند.
- State برنامه (محصول‌ها، دسته‌ها، تخفیف‌ها، فیلتر دسته، سبد): حافظه `App.tsx` با `useState`.
- آدرس API: `env` (`VITE_API_URL`)؛ در dev برابر `/api` و در production برابر `../../api`.

## ۴. قرارداد API

- `GET products.json → Product[]` (فیلدها: `id, categoryId, name, emoji, unit, price, tags`).
- `GET categories.json → Category[]` (فیلدها: `id, slug, name, emoji` و `color` اختیاری).
- `GET offers.json → Offer[]` (فیلدها: `productId, percent, label`) برای بج تخفیف و قیمت نهایی.
- `GET stock.json → Stock` فعلاً فقط اعتبارسنجی می‌شود.
- همه خواندن‌ها با `getJSON(path): Promise<unknown>` و سپس Type Guard انجام می‌شود.
- رکوردهای خراب حذف و تعدادشان با `console.warn` گزارش می‌شود.

## ۵. حالت‌ها

- `loading`: `#status` می‌گوید «در حال بارگذاری…».
- `success`: `#status` خالی و مخفی می‌شود و هر دو ردیف رندر می‌شوند.
- `empty`: وقتی API خالی برگردد؛ پیام «محصولی پیدا نشد».
- `error`: وقتی fetch ناموفق است یا JSON خراب است؛ پیام `خطا: …`.
- نمایش حالت با `switch` روی `status` و بررسی `never` در `default` است.

## ۶. پوشه‌های src/ و لایه‌ها

```text
src/
  types.ts            ← types: هیچ import ندارد
  api/                ← data: تنها جای fetch (getJSON، Guardها، loadShop)
  storage/            ← data: تنها جای localStorage (cartStorage)
  cart/               ← logic: تابع خالص سبد (add/remove/count/total/join)
  catalog/            ← logic: قیمت تخفیف (offers)؛ فیلتر هفته چهارم هم اینجاست
  components/         ← view: کامپوننت‌های React (Header، CategoryNav، ProductGrid، ...)
  App.tsx             ← state: همه Stateها و Effectها، بدون fetch/localStorage مستقیم
  main.tsx            ← entry: سوار کردن App روی #root با StrictMode
```

- جهت import فقط به پایین است: `App → components / logic / data → types` و هیچ دایره‌ای نیست.
- `ui/` و `main.ts` هفته چهارم در گام ۵ حذف شدند؛ `index.html` حالا `/src/main.tsx` را لود می‌کند و فقط `<div id="root">` دارد.
- حساب قیمت نهایی و جدا کردن دو ردیف در `catalog/offers.ts` است، نه در UI.
- انتخاب دسته با `slug` (نه `id`) در URL ذخیره می‌شود تا لینک خوانا بماند؛ `popstate` هم از همان یک فایل `storage/urlState.ts` گوش داده می‌شود و `main.ts` فقط `subscribeFilters` را صدا می‌زند.
- هیچ فایل `helpers.ts` یا `utils.ts` وجود ندارد و هیچ فایلی بیشتر از ۷۰ خط نیست.
- استایل عمداً ساده و فقط با flex نوشته شده تا در حد کار تمرین کلاسی بماند.

## ۷. امنیت

- در مرورگر همه‌چیز عمومی است: کلید محرمانه و رمز در `env` نمی‌گذاریم.
- جمع نهایی سبد فقط برای نمایش است؛ عدد نهایی را باید سرور حساب کند.
- متن کاربر و داده بیرونی در JSX گذاشته می‌شود، نه `innerHTML`.

## ۸. درخت کامپوننت‌ها (هفته پنجم)

```text
App
├─ Header
│  └─ SearchBox
├─ Hero
├─ SaleCountdown
├─ Status
├─ CategoryNav
├─ ProductGrid
│  └─ ProductCard × n
├─ CartPanel
└─ Footer
```

## ۹. State کجا زندگی می‌کند (هفته پنجم)

| State | صاحب (کامپوننت) | چه کسی عوضش می‌کند | کجا ذخیره می‌شود |
|---|---|---|---|
| `categoryId` | `App` | کاربر با کلیک روی `CategoryNav` (`onPick`) | حافظه React |
| `query` | `App` | کاربر با تایپ در `SearchBox` (`onQuery`) | حافظه React |
| `attempt` | `App` | کلیک «تلاش دوباره» در حالت `error` (اجرای مجدد `useEffect` بارگذاری) | حافظه React |
| `showSale` | `App` | کلیک روی دکمه نمایش/بستن شمارش معکوس | حافظه React |
| `cart` | `App` | کاربر با `+` (`onAdd`)، حذف و خالی کردن سبد | حافظه React + `localStorage` (کلید `separation-cart`) |
| `load` (`LoadState`) | `App` | یک `useEffect` با `Promise.all` روی `/api` | حافظه React |
| `cats` / `offers` / `stock` | `App` | همان `useEffect` بارگذاری | حافظه React |
| `document.title` | — (اثر جانبی) | یک `useEffect` روی `[cart]` | تب مرورگر |

- مقدارهای حساب‌شده State نیستند و هنگام render حساب می‌شوند:
  - `filtered` (محصول‌های دسته انتخاب‌شده + جست‌وجو، با `filterProducts`) — چون از `products` و `categoryId`/`query` ساخته می‌شود.
  - `items` (قیمت نهایی با `priceOf`) — چون از `filtered` و `offers`/`stock` ساخته می‌شود.
  - `count` و `total` سبد (`cartCount`/`cartTotal`) — چون از `cart` ساخته می‌شوند؛ `useState` جدا برایشان لازم نیست.
