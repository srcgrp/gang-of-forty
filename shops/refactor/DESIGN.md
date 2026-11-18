# طراحی فروشگاه (DESIGN)

## نمای کلی

فروشگاه با React و TypeScript. صفحهٔ اصلی محصولات را نشان می‌دهد و ترتیب ثابتی دارد: بنر (Hero)، شمارش‌معکوس، نوار دسته‌بندی، گرید محصولات و دو ردیف کروسل. مسیرها با TanStack Router مدیریت می‌شوند. تم روشن/تاریک و سبد خرید با Zustand مدیریت و با localStorage ماندگار می‌شوند، و فیلترهای جستجو و دسته در search param زندگی می‌کنند تا با رفرش صفحه از بین نروند.

## تصمیم‌های مهم و دلیلشان

- **بدون Redux و React Query:** state پروژه ساده است (تم، سبد، واکشی کاتالوگ). به‌جای وابستگی اضافه، هر state با هوک یا store مخصوص خودش مدیریت می‌شود؛ نتیجه: کد کمتر، کنترل بیشتر.
- **فیلترها در URL، نه در state:** جستجو (`q`) و دسته (`category`) به‌صورت search param نگه داشته می‌شوند. فایده: رفرش صفحه فیلتر را حفظ می‌کند و لینک صفحه قابل اشتراک است.
- **state سراسری با Zustand به‌جای context + reducer:** به‌جای ساخت Provider، reducer و اتصال دستی، storeهای Zustand با selectorهای ریز فقط همان کامپوننت‌هایی را رندر می‌کنند که به آن بخش از state وابسته‌اند؛ ذخیره در localStorage هم با persist داخلی انجام می‌شود.
- **واکشی با state machine دستی:** `useCatalog` یک state با فیلد `status` برمی‌گرداند (idle، loading، success، error). مصرف‌کننده با narrowing مطمئن می‌شود فقط در حالت success به داده دست می‌زند.
- **App کوچک:** `App.tsx` زیر ۷۰ خط می‌ماند و فقط روت و Layout را سرهم می‌کند؛ منطق در کامپوننت‌ها و هوک‌هاست.

## ساختار پروژه

- `App.tsx` — نقطهٔ ورود رندر؛ روت اصلی و Layout.
- کامپوننت‌ها:
  - `Layout`، `Header`، `Footer` — قالب مشترک همهٔ صفحات.
  - `HomePage` — صفحهٔ اصلی روی مسیر `/`.
  - `Hero` و شمارش‌معکوس — بالای صفحه.
  - `CategoryNav` — نوار دسته‌بندی.
  - `ProductGrid` و `ProductCard` — لیست محصولات.
  - `CarouselRow` — ردیف اسکرول افقی برای بخش‌هایی مثل پیشنهادها.
  - `Status` — نمایش حالت‌های loading و error واکشی.
- هوک‌ها: `useCatalog` برای واکشی کاتالوگ، و `useSearch` و `useNavigate` از TanStack Router برای خواندن و نوشتن `q` و `category`.
- ابزارها: `safe-href.ts` برای ساخت لینک امن (`safeHref`) و کلیک کنترل‌شدهٔ anchor (`anchorClick`).

## مسیرها

| آدرس | صفحه | داده از کجا |
|---|---|---|
| `/` | `HomePage` | `useCatalog` + `carouselProducts` + فیلترهای `q` و `category` از search param |
| 【روت دوم پروژه】 | 【نام صفحه】 | 【منبع دادهٔ آن صفحه】 |
| 【روت سوم پروژه】 | 【نام صفحه】 | 【منبع دادهٔ آن صفحه】 |

مسیر اصلی `/` است و `HomePage` آن را رندر می‌کند:

- خواندن فیلترها: `useSearch({ from: '/' })` → `q` و `category`.
- نوشتن فیلترها: `useNavigate` — هر تغییر دسته یا عبارت جستجو URL را به‌روز می‌کند و صفحه از همان paramها دوباره رندر می‌شود.

نتیجه: لینک صفحهٔ فیلترشده قابل اشتراک است و با رفرش، فیلترها می‌مانند.

## جدول Store‌ها

| Store | سبب وجود (کدام راه و چرا) | کجا تعریف شده | چه چیزی در آن است | چه کسی عوضش می‌کند | کجا ذخیره می‌شود |
|---|---|---|---|---|---|
| `useCartStore` | سبد بین `Header`، `Layout`/`CartPanel` و `ProductCard` مشترک است و props drilling نمی‌خواهد. راه انتخابی: **Zustand** — به‌جای context + reducer کد کمتری دارد و selectorهای ریز از رندر بی‌مورد جلوگیری می‌کنند (در گام ۵ با Profiler دیدیم که با تغییر سبد فقط سه مشترکِ store رندر شدند). | `src/hooks/useCartStore.ts` | آیتم‌های سبد (`CartItem[]`) و اکشن‌های `add` / `remove` / `change` | `ProductCard` (افزودن) و `CartPanel` (حذف و تغییر تعداد)؛ `Header` و `Layout` فقط می‌خوانند | `localStorage` به‌صورت دستی (بدون middleware `persist`): مقدار اولیه با `readCart()` از localStorage خوانده می‌شود و با `subscribe` + `writeCart` هر تغییر ذخیره می‌شود. |
| `useThemeStore` | تم در `Header` و همهٔ صفحه لازم است و باید بعد از رفرش بماند. راه انتخابی: **Zustand + persist** — همان مزایای بالا به‌علاوهٔ ذخیرهٔ خودکار در localStorage. | `src/hooks/useThemeStore.ts` | تم فعلی (`'light' \| 'dark'`) و اکشن `toggle` | دکمهٔ تغییر تم در `Header` | `localStorage` با `persist` (کلید `refactor-theme`). |

> **نکته:** state واکشی کاتالوگ store سراسری نیست؛ داخل هوک `useCatalog` و محدودهٔ مصرف‌کننده‌اش زندگی می‌کند.

## درخت کامپوننت‌ها برای هر صفحه

### صفحهٔ `/` (HomePage)

```
Layout
├─ Header
│  ├─ Logo
│  ├─ MainNav
│  └─ دکمهٔ سبد ← تعداد آیتم‌ها از useCartStore
├─ CartPanel
├─ Outlet
│  └─ HomePage
│     ├─ Hero
│     ├─ SaleCountdown (شمارش‌معکوس)
│     ├─ CategoryNav
│     ├─ ProductGrid
│     │  └─ ProductCard ×N
│     └─ CarouselRow ×2 (یکی با key="offers")
│        └─ ProductCard ×N
└─ Footer
```

## واکشی داده

`useCatalog` state واکشی را نگه می‌دارد و `HomePage` با narrowing مصرفش می‌کند:

```tsx
if (state.status !== 'success') return <Status state={state} />;
// از این خط به بعد TypeScript مطمئن است که داده موجود است
```

حالت‌های loading و error فقط در `Status` رندر می‌شوند و هیچ مسیری وجود ندارد که دادهٔ ناموجود خوانده شود.

## ماندگاری (persist)

- **تم:** انتخاب روشن/تاریک با persist در localStorage ذخیره می‌شود؛ رفرش صفحه تم را حفظ می‌کند.
- **سبد:** آیتم‌های سبد مطابق جدول Store‌ها ماندگاری می‌شوند؛ `Header` تعداد و جمع سبد را با اعداد فارسی نشان می‌دهد.

## قواعد ثابت کد

- هر عدد نمایش‌داده‌شده با `toLocaleString("fa-IR")` فارسی می‌شود (قیمت، تعداد سبد، تایمر).
- همهٔ لینک‌ها از `safe-href` می‌گذرند تا رفتار کلیک anchor کنترل‌شده باشد، نه ریلود کامل صفحه.
- هر کامپوننت یک کار دارد؛ منطق قابل استفادهٔ مجدد در هوک‌هاست، نه داخل JSX.

## کارایی

در گام ۵ با تب Profiler رندرها ضبط شد (با گزینهٔ Record why each component rendered). نتیجه: با افزودن کالا به سبد، فقط سه مشترکِ store سبد (`Layout`، `Header`، `CartPanel`) دوباره رندر شدند و بقیهٔ درخت — از روتر تا گرید محصولات — دست‌نخورده ماند. فهرست کامل در توضیحات PR گام ۵ آمده است.

## چک‌های سلامت

هر تغییر با چهار چک تأیید می‌شود:

```powershell
npm run check
npm run lint
npm run build
npm run preview
```

## کارهای بعدی

- صفحهٔ جزئیات محصول با روت اختصاصی (مثل `/product/$slug`)
- صفحهٔ کامل سبد و ثبت سفارش
- تست خودکار برای `useCatalog` و `safe-href`
