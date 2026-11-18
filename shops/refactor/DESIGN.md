# طراحی فروشگاه (DESIGN)

## نمای کلی

فروشگاه با React و TypeScript. صفحهٔ اصلی محصولات را نشان می‌دهد و ترتیب ثابتی دارد: بنر (Hero)، شمارش‌معکوس، نوار دسته‌بندی، گرید محصولات و دو ردیف کروسل. مسیرها با TanStack Router در فایل جدا (`src/router.tsx`) تعریف می‌شوند و `App.tsx` فقط `RouterProvider` را رندر می‌کند. تم روشن/تاریک و سبد خرید با Zustand مدیریت و با localStorage ماندگار می‌شوند؛ فیلترهای جستجو و دسته و مرتب‌سازی PLP در search param زندگی می‌کنند تا با رفرش از بین نروند. چهار صفحهٔ اختصاصی داریم: خانه، فهرست کالای هر کاروسل (PLP)، جزئیات محصول و تسویه حساب.

## تصمیم‌های مهم و دلیلشان

- **بدون Redux و React Query:** state پروژه ساده است (تم، سبد، واکشی کاتالوگ). به‌جای وابستگی اضافه، هر state با هوک یا store مخصوص خودش مدیریت می‌شود؛ نتیجه: کد کمتر، کنترل بیشتر.
- **فیلترها در URL، نه در state:** جستجو (`q`)، دسته (`category`) و مرتب‌سازی (`sort`) به‌صورت search param نگه داشته می‌شوند. فایده: رفرش و دکمهٔ Back ترتیب و فیلتر را حفظ می‌کنند و لینک صفحه قابل اشتراک است.
- **state سراسری با Zustand به‌جای context + reducer:** به‌جای ساخت Provider، reducer و اتصال دستی، storeهای Zustand با selectorهای ریز فقط همان کامپوننت‌هایی را رندر می‌کنند که به آن بخش از state وابسته‌اند؛ ذخیره در localStorage هم با persist داخلی انجام می‌شود.
- **مسیرها در فایل جدا (`src/router.tsx`):** تعریف روت‌ها، اعتبارسنجی search و ساخت `router` همه در یک فایل جمع شده است؛ `App.tsx` فقط `RouterProvider` را رندر می‌کند. خواندن پارامتر در صفحات هم با `useParams({ from: '/plp/$carouselId' })` انجام می‌شود تا type مسیر و پارامترها از همان تعریف روت استخراج شود و اگر آدرس اشتباه تایپ شود، `npm run check` خطا می‌دهد.
- **واکشی با state machine دستی:** `useCatalog` یک state با فیلد `status` برمی‌گرداند (loading، success، empty، error). مصرف‌کننده با narrowing مطمئن می‌شود فقط در حالت success به داده دست می‌زند.
- **کمترین render:** `ProductCard` با `memo` بسته شده و همهٔ مشترک‌های store فقط با selector دقیق subscribe می‌کنند (`useCartStore((s) => s.add)`، `useCartStore((s) => cartCount(s.items))`). `Layout` اصلاً مشترک store سبد نیست، پس تغییر سبد کل درخت را دوباره رندر نمی‌کند.
- **App کوچک:** `App.tsx` ۶ خط است و فقط `RouterProvider` را رندر می‌کند؛ منطق در کامپوننت‌ها، هوک‌ها و `router.tsx` است.

## ساختار پروژه

- `App.tsx` — نقطهٔ ورود رندر؛ فقط `<RouterProvider router={router} />`.
- `router.tsx` — تعریف همهٔ مسیرها، `validateSearch`، `createHashHistory` و `Register`.
- کامپوننت‌ها:
  - `Layout`، `Header`، `Footer` — قالب مشترک همهٔ صفحات؛ `Layout` با `<Outlet />` مسیر را داخل خودش رندر می‌کند.
  - `HomePage` — صفحهٔ اصلی روی مسیر `/`.
  - `PlpPage` — فهرست کالاهای یک کاروسل روی `/plp/$carouselId` با مرتب‌سازی.
  - `ProductPage` — جزئیات یک کالا روی `/product/$productId`.
  - `CheckoutPage` — فرم تسویه روی `/checkout`.
  - `NotFound` — صفحهٔ ۴۰۴ برای هر آدرس ناشناخته.
  - `CheckoutForm` — فرم controlled تسویه با اعتبارسنجی.
  - `Hero` و شمارش‌معکوس، `CategoryNav`، `ProductGrid`، `ProductCard` (با `memo` و لینک عنوان به صفحهٔ محصول)، `CarouselRow`، `Status`.
- هوک‌ها: `useCatalog` (واکشی کاتالوگ)، `useCartStore` (سبد)، `useThemeStore` (تم) و `useSearch`/`useNavigate`/`useParams` از TanStack Router.
- توابع خالص: `features/catalog/carousel.ts` (کالاهای هر کاروسل)، `features/catalog/sort.ts` (مرتب‌سازی)، `features/cart/calculate.ts` (منطق سبد).
- ابزارها: `safe-href.ts` برای ساخت لینک امن و کلیک کنترل‌شدهٔ anchor.

## مسیرها

| آدرس | صفحه | داده از کجا |
|---|---|---|
| `/` | `HomePage` | `useCatalog` + `carouselProducts` + فیلترهای `q` و `category` از search param |
| `/plp/$carouselId` | `PlpPage` | `useCatalog` + `carouselProducts` + `sortProducts` با `?sort=default` یا `?sort=price` |
| `/product/$productId` | `ProductPage` | `useCatalog` + تبدیل `Number(productId)` و جستجو در کاتالوگ |
| `/checkout` | `CheckoutPage` | `useCartStore` (آیتم‌ها) + `useCatalog` (هزینهٔ ارسال) |
| هر آدرس دیگر | `NotFound` | بدون داده |

- مسیر اصلی `/` است و `HomePage` آن را رندر می‌کند:
  - خواندن فیلترها: `useSearch({ from: '/' })` → `q` و `category`.
  - نوشتن فیلترها: `useNavigate` — هر تغییر دسته یا عبارت جستجو URL را به‌روز می‌کند.
- مسیر PLP با `validateSearch` مقدار `sort` را اعتبارسنجی می‌کند (دقیقاً مثل نمونهٔ تمرین: خروجی `{ sort: 'default' \| 'price' }`)؛ هر مقداری غیر از `price` به `default` برمی‌گردد و `search={{ sort: 'cheap' }}` خطای TypeScript می‌دهد. دو لینک «پیش‌فرض» و «ارزان‌ترین» بالای فهرست با `search={{ sort: ... }}` ساخته شده‌اند.
- مسیر محصول پارامتر رشته‌ای می‌گیرد؛ با `Number(productId)` تبدیل می‌شود و اگر کالا پیدا نشود یا شناسه عدد نباشد، پیام «محصول پیدا نشد» نشان داده می‌شود.
- نتیجه: لینک صفحهٔ فیلترشده/مرتب‌شده قابل اشتراک است و با رفرش و Back، فیلتر و ترتیب می‌مانند (تست‌شده با `#/plp/offers?sort=price`).

## جدول Store‌ها

| Store | سبب وجود (کدام راه و چرا) | کجا تعریف شده | چه چیزی در آن است | چه کسی عوضش می‌کند | کجا ذخیره می‌شود |
|---|---|---|---|---|---|
| `useCartStore` | سبد بین `Header`، `CartPanel`، `ProductCard` و `CheckoutPage` مشترک است و props drilling نمی‌خواهیم. راه انتخابی: **Zustand** — به‌جای context + reducer کد کمتری دارد و selectorهای ریز از رندر بی‌مورد جلوگیری می‌کنند. | `src/hooks/useCartStore.ts` | آیتم‌های سبد (`CartItem[]`) و اکشن‌های `add` / `remove` / `change` / `clear` | `ProductCard` و `ProductPage` (افزودن)، `CartPanel` (حذف و تغییر تعداد)، `CheckoutPage` (خالی کردن با `clear` بعد از ثبت سفارش)؛ `Header` فقط می‌خواند | `localStorage` به‌صورت دستی (بدون middleware `persist`): مقدار اولیه با `readCart()` خوانده می‌شود و با `subscribe` + `writeCart` هر تغییر ذخیره می‌شود. |
| `useThemeStore` | تم در `Header` و همهٔ صفحه لازم است و باید بعد از رفرش بماند. راه انتخابی: **Zustand + persist** — همان مزایای بالا به‌علاوهٔ ذخیرهٔ خودکار در localStorage. | `src/hooks/useThemeStore.ts` | تم فعلی (`'light' \| 'dark'`) و اکشن `toggle` | دکمهٔ تغییر تم در `Header` | `localStorage` با `persist` (کلید `refactor-theme`). |

> **نکته:** state واکشی کاتالوگ store سراسری نیست؛ داخل هوک `useCatalog` و محدودهٔ مصرف‌کننده‌اش زندگی می‌کند.

## درخت کامپوننت‌ها برای هر صفحه

### صفحهٔ `/` (HomePage)

```
Layout
├─ Header
│  ├─ Logo
│  ├─ ThemeToggle ← تم از useThemeStore
│  ├─ MainNav
│  ├─ لینک تسویه ← /checkout
│  └─ دکمهٔ سبد ← تعداد آیتم‌ها از useCartStore
├─ CartPanel
├─ Outlet
│  └─ HomePage
│     ├─ Hero
│     ├─ SaleCountdown (شمارش‌معکوس)
│     ├─ CategoryNav
│     ├─ ProductGrid
│     │  └─ ProductCard ×N (memo؛ عنوان هر کارت لینک به /product/$productId)
│     └─ CarouselRow ×2 (یکی با key="offers")
│        └─ ProductCard ×N
└─ Footer
```

### صفحهٔ `/plp/$carouselId` (PlpPage)

```
Layout
├─ Header (همان قالب مشترک)
├─ Outlet
│  └─ PlpPage
│     ├─ عنوان کاروسل + تعداد کالاها
│     ├─ لینک‌های مرتب‌سازی «پیش‌فرض» و «ارزان‌ترین» (search={{ sort: ... }})
│     ├─ لینک «بازگشت به خانه»
│     └─ ProductCard ×N (memo؛ با sortProducts مرتب شده)
│        یا پیام «کاروسل وجود ندارد» برای شناسهٔ نامعتبر
└─ Footer
```

### صفحهٔ `/product/$productId` (ProductPage)

```
Layout
├─ Header (همان قالب مشترک)
├─ Outlet
│  └─ ProductPage
│     ├─ عنوان + ایموجی + برچسب تخفیف
│     ├─ واحد، قیمت (Price) و موجودی انبار
│     ├─ دکمهٔ «افزودن به سبد» ← useCartStore.add
│     └─ یا پیام «محصول پیدا نشد» برای شناسهٔ نامعتبر
└─ Footer
```

### صفحهٔ `/checkout` (CheckoutPage)

```
Layout
├─ Header (همان قالب مشترک)
├─ Outlet
│  └─ CheckoutPage
│     ├─ خلاصهٔ سبد (تعداد، جمع، هزینهٔ ارسال)
│     └─ CheckoutForm
│        ├─ input نام (label htmlFor="checkout-name")
│        ├─ input موبایل (label htmlFor="checkout-mobile")
│        ├─ input نشانی (label htmlFor="checkout-address")
│        └─ دکمهٔ «ثبت سفارش» ← clear سبد + navigate به خانه با replace
└─ Footer
```

### آدرس ناشناخته (NotFound)

```
Layout
├─ Header (همان قالب مشترک)
├─ Outlet
│  └─ NotFound (notFoundComponent روت اصلی)
└─ Footer
```

## واکشی داده

`useCatalog` state واکشی را نگه می‌دارد و هر صفحه با narrowing مصرفش می‌کند:

```tsx
if (state.status !== 'success') return <Status state={state} />;
// از این خط به بعد TypeScript مطمئن است که داده موجود است
```

حالت‌های loading و error فقط در `Status` رندر می‌شوند و هیچ مسیری وجود ندارد که دادهٔ ناموجود خوانده شود.

## ماندگاری (persist)

- **تم:** انتخاب روشن/تاریک با persist در localStorage ذخیره می‌شود؛ رفرش صفحه تم را حفظ می‌کند.
- **سبد:** آیتم‌های سبد مطابق جدول Store‌ها ماندگاری می‌شوند؛ `Header` تعداد و جمع سبد را با اعداد فارسی نشان می‌دهد.
- **فیلتر و ترتیب:** `q`، `category` و `sort` در آدرس هستند؛ رفرش و Back همه را نگه می‌دارند.

## قواعد ثابت کد

- هر عدد نمایش‌داده‌شده با `toLocaleString("fa-IR")` فارسی می‌شود (قیمت، تعداد سبد، تایمر).
- لینک‌های داخلی با `Link` TanStack و پارامترها با `params` و `search` ساخته می‌شوند؛ لینک‌های anchor داخلی صفحه از `safe-href` می‌گذرند.
- هر کامپوننت یک کار دارد؛ منطق قابل استفادهٔ مجدد در هوک‌ها و توابع خالص است، نه داخل JSX.
- هیچ فایلی بیشتر از ۷۰ خط نیست.


## چک‌های سلامت

هر تغییر با چهار چک تأیید می‌شود:

```bash
npm run check    # بدون خطا
npm run lint     # بدون هشدار (oxlint --deny-warnings)
npm run build    # ساخت پوشه dist
npm run preview  # همان صفحه با همان تم و ترتیب بعد از رفرش
```

## کارهای بعدی

- تست خودکار برای `useCatalog`، `sortProducts` و `safe-href`
- صفحهٔ تاریخچهٔ سفارش‌ها
