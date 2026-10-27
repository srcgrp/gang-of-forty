<div align="center">

# 🛒 سبزکاله — هفته چهارم

### سوپرمارکت آنلاین با معماری لایه‌ای، TypeScript سخت‌گیرانه و آماده انتشار

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Layers](https://img.shields.io/badge/Architecture-Layered-2ea44f?style=for-the-badge)]()
[![Any](https://img.shields.io/badge/any-0-blue?style=for-the-badge)]()
[![TS Errors](https://img.shields.io/badge/TS_Errors-0-success?style=for-the-badge)]()
[![Build](https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge)]()
[![check--arch](https://img.shields.io/badge/check--arch-Passing-brightgreen?style=for-the-badge)]()
[![Files](https://img.shields.io/badge/files-51_≤70_lines-success?style=for-the-badge)]()

[![RTL](https://img.shields.io/badge/RTL-Persian-2ea44f?style=for-the-badge)](https://en.wikipedia.org/wiki/Right-to-left_script)
[![A11y](https://img.shields.io/badge/A11y-WCAG_AA-blueviolet?style=for-the-badge)](#-دسترسپذیری)
[![Responsive](https://img.shields.io/badge/Responsive-320px_to_4K-orange?style=for-the-badge)]()

<br>

**Week 4 Project · Gang of Fourty · Deep Module Shop**

</div>

---

## 📖 فهرست مطالب

- [درباره پروژه](#-درباره-پروژه)
- [معماری لایه‌ای](#-معماری-لایهای)
- [ساختار پوشه‌ها](#-ساختار-پوشهها)
- [تکنولوژی‌ها](#-تکنولوژیها)
- [ویژگی‌ها](#-ویژگیها)
- [نصب و اجرا](#-نصب-و-اجرا)
- [Definition of Done](#-definition-of-done)
- [درس‌های TypeScript](#-درسهای-typescript)
- [امنیت](#-امنیت)
- [دسترس‌پذیری](#-دسترسپذیری)
- [آمار](#-آمار)

---

## ✨ درباره پروژه

**سبزکاله** یک فروشگاه آنلاین مدرن است که با **TypeScript**، **Vite** و **۴ پکیج npm** ساخته شده.

در هفته سوم، کد در یک فایل بزرگ `script.ts` بود. در هفته چهارم، این فایل به **۷ لایه** تقسیم شد، تایپ‌ها سخت‌گیرانه شدند (`strict: true`) و پروژه برای **انتشار روی هر سروری** آماده شد.

### 🎯 هدف هفته چهارم

- 🔪 **شکستن** `script.ts` به لایه‌های `shared`, `features`, `main`, `boot`
- 🛡️ **Type Guard** برای داده‌های خارجی (`unknown`)
- 🧩 **`LoadState`** با `never` و `switch`
- 📐 **`tsconfig.json`** سخت‌گیرانه (`strict: true` + `noUncheckedIndexedAccess`)
- 🚀 **آماده‌ی `build` و `preview`** با `base: './'` و فایل‌های `.env`
- 🧪 **`check-arch.mjs`** برای بررسی معماری
- 📏 **هیچ فایلی بالای ۷۰ خط نیست** (۵۱ فایل)

---

## 🏛 معماری لایه‌ای

```text
┌──────────────────────────────────────┐
│      main.ts  /  boot.ts             │  ← ورودی، راه‌اندازی، State
├──────────────────────────────────────┤
│         main-render.ts               │  ← توزیع State به UI
├──────────────────────────────────────┤
│   features/                          │  ← منطق دامنه
│   (cart, catalog, filter, theme)     │
├──────────────────────────────────────┤
│   shared/ui/                         │  ← کامپوننت‌های عمومی UI
├──────────────────────────────────────┤
│   shared/api/                        │  ← fetch + Type Guard
├──────────────────────────────────────┤
│   shared/types.ts                    │  ← بدون هیچ Import
└──────────────────────────────────────┘
```

### 📏 قانون وابستگی

- **`shared/types.ts`** — هیچ `import`ی ندارد
- **`shared/api/`** — فقط `types`، تنها جایی که `fetch` دارد
- **`shared/ui/`** — `types` + `features`، فقط DOM می‌سازد
- **`features/*/`** — منطق دامنه، بدون دسترسی به `main` یا `main-render`
- **`main.ts`** — نقطه ورود
- **`boot.ts`** — راه‌اندازی و fetch اولیه
- **`main-render.ts`** — `state` و `onAdd` را پارامتر می‌گیرد

### 🔍 بررسی خودکار

```bash
node check-arch.mjs src --shop
# ✓ All layer imports are valid. No circular dependencies found.
#   Checked 51 file(s) in src/
```

---

## 📁 ساختار پوشه‌ها

```text
shops/deep-module/
├── index.html                ← ورودی HTML
├── style.css                 ← استایل‌ها
├── DESIGN.md                 ← مستندات معماری (۷ بخش)
├── README.md                 ← همین فایل
├── package.json
├── package-lock.json
├── tsconfig.json             ← سخت‌گیرانه (strict: true)
├── vite.config.ts            ← base: './' + proxy
├── .env.development          ← VITE_API_URL=/api
├── .env.production           ← VITE_API_URL=../../api
├── check-arch.mjs            ← اسکریپت بررسی لایه‌ها
├── .gitignore
│
├── src/
│   ├── types.ts              ← همه Interfaceها (بدون Import)
│   ├── main.ts               ← نقطه ورود (≤ 40 خط)
│   ├── boot.ts               ← راه‌اندازی و fetch اولیه
│   ├── main-render.ts        ← رندر State (≤ 30 خط)
│   │
│   ├── shared/
│   │   ├── types.ts
│   │   ├── api/
│   │   │   ├── client.ts     ← fetch + timeout + retry
│   │   │   ├── guards.ts     ← Type Guardها
│   │   │   └── load.ts       ← loadAll + LoadState
│   │   └── ui/
│   │       ├── dom.ts
│   │       ├── format.ts     ← formatPrice, safeHref
│   │       ├── loading.ts    ← لودر سراسری
│   │       ├── banner.ts     ← آفلاین + Retry Toast
│   │       ├── modal.ts
│   │       ├── toast.ts
│   │       ├── skeleton.ts
│   │       ├── error-state.ts
│   │       ├── empty-state.ts
│   │       ├── header.ts
│   │       ├── hero.ts
│   │       ├── banners.ts
│   │       ├── footer.ts
│   │       ├── global-events.ts
│   │       └── animate.ts
│   │
│   └── features/
│       ├── cart/
│       │   ├── cart.ts          ← توابع خالص سبد
│       │   ├── parse.ts         ← اعتبارسنجی CartItem
│       │   ├── cart-storage.ts
│       │   ├── cart-view.ts
│       │   ├── cart-item.ts
│       │   └── cart-controller.ts
│       │
│       ├── catalog/
│       │   ├── filter.ts
│       │   ├── search.ts        ← fuse.js
│       │   ├── stock.ts
│       │   ├── stock-storage.ts
│       │   ├── url.ts           ← State در URL
│       │   ├── search-init.ts
│       │   ├── search-events.ts
│       │   ├── search-actions.ts
│       │   ├── search-form.ts
│       │   ├── search-keyboard.ts
│       │   ├── search-render.ts
│       │   ├── product-card.ts
│       │   ├── product-events.ts
│       │   ├── detail.ts
│       │   ├── categories.ts
│       │   ├── offers.ts
│       │   ├── all-products.ts
│       │   ├── category-sections.ts
│       │   └── setup-filter-search.ts
│       │
│       ├── filter/
│       │   ├── filter-modal.ts
│       │   └── filter-render.ts
│       │
│       └── theme/
│           ├── theme.ts
│           └── theme-storage.ts
│
├── assets/
│   ├── fonts/                ← Vazirmatn (4 وزن)
│   └── icons/
│
└── dist/                     ← خروجی build (git ignored)
```

---

## 🛠 تکنولوژی‌ها

| تکنولوژی       | نسخه | کاربرد             |
| -------------- | :--: | ------------------ |
| **TypeScript** | 5.9  | زبان با تایپ       |
| **Vite**       | 5.4  | dev server + build |
| **npm**        | 10+  | مدیریت پکیج        |

### ⚙️ تنظیمات TypeScript (هفته چهارم)

```json
{
  "target": "es2023",
  "module": "esnext",
  "moduleResolution": "bundler",
  "strict": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true,
  "noFallthroughCasesInSwitch": true,
  "verbatimModuleSyntax": true,
  "erasableSyntaxOnly": true,
  "noUncheckedIndexedAccess": true,
  "exactOptionalPropertyTypes": true
}
```

**نکته:** `noImplicitAny: false` **حذف** شده. `strict: true` و دو گزینه بونوس فعال‌اند.

### 📦 پکیج‌های npm

| پکیج                         | کاربرد       | حجم  |
| ---------------------------- | ------------ | :--: |
| 🍞 **notyf**                 | پیام Toast   | ~۳KB |
| 🎉 **canvas-confetti**       | افکت جشن     | ~۶KB |
| 🔍 **fuse.js**               | جستجوی فازی  | ~۸KB |
| ✨ **@formkit/auto-animate** | انیمیشن لیست | ~۳KB |

### 🌍 متغیرهای محیطی

```bash
# .env.development (npm run dev)
VITE_API_URL=/api

# .env.production (npm run build)
VITE_API_URL=../../api
```

---

## 🚀 ویژگی‌ها

### 🎨 طراحی

- ✅ **تم روشن و تاریک**
- ✅ **Responsive کامل** (۳۲۰px تا 4K)
- ✅ **فونت Vazirmatn** local
- ✅ **۱۵+ انیمیشن**

### 🛒 قابلیت‌ها

- ✅ **سبد خرید کامل** با `localStorage`
- ✅ **جستجوی فازی** با `fuse.js`
- ✅ **فیلتر پیشرفته** (دسته، موجودی، تخفیف، مرتب‌سازی)
- ✅ **State در URL** (با Refresh حفظ می‌شود)
- ✅ **مودال جزئیات محصول**
- ✅ **افکت جشن** با `canvas-confetti`
- ✅ **پیام Toast** با `notyf`
- ✅ **لودر سراسری** روی fetch اولیه
- ✅ **Retry Toast** هنگام تلاش مجدد

### ⚡ معماری

- ✅ **۷ لایه** بدون circular dependency
- ✅ **`getJSON` خروجی `unknown`**
- ✅ **Type Guardها** (`isProduct`, `isCategory`, `isOffer`, `isStock`, `isShop`, `isHome`)
- ✅ **`LoadState<T>`** با `switch` و `never`
- ✅ **`check-arch.mjs`** بررسی خودکار (۵۱ فایل، صفر نقض)
- ✅ **هیچ فایلی بالای ۷۰ خط نیست**
- ✅ **بدون `any` / بدون `@ts-ignore`**

### 🛡 مدیریت خطا

- ✅ **State Loading/Error/Empty**
- ✅ **Retry خودکار** با exponential backoff
- ✅ **حالت آفلاین** با banner
- ✅ **پیام خطای قابل‌فهم** برای ۴۰۴ و JSON نامعتبر
- ✅ **`ApiError` با ۷ نوع خطا** (`offline`, `timeout`, `parse`, `abort`, ...)

### 🔗 ناوبری

- ✅ **هر بخش دسته** هم `#cat-<id>` و هم `#<slug>` (مثل `#dairy`, `#fruits`)
- ✅ **`.section-anchor`** برای offset اسکرول زیر sticky header

---

## 🚀 نصب و اجرا

### نصب

```bash
cd shops/deep-module
npm install
```

### دستورات

| دستور                            | کاربرد           | نتیجه                    |
| -------------------------------- | ---------------- | ------------------------ |
| `npm run dev`                    | حالت توسعه       | `http://localhost:5173/` |
| `npm run check`                  | بررسی TypeScript | خروجی خالی               |
| `node check-arch.mjs src --shop` | بررسی معماری     | `✓ All layer imports...` |
| `npm run build`                  | ساخت production  | پوشه `dist/`             |
| `npm run preview`                | پیش‌نمایش build  | `http://localhost:4173/` |

---

## ✅ Definition of Done

تمام موارد **سطح قبولی** هفته چهارم پیاده شد:

- [x] `tsconfig.json` شبیه قالب Vite، بدون `noImplicitAny: false` و بدون `ignoreDeprecations` + `strict: true`
- [x] `DESIGN.md` با ۷ بخش
- [x] `src/types.ts` با نوع داده‌های API، دو Utility Type (`Pick`, `Record`) و یک `as const` (بدون enum)
- [x] `getJSON` با خروجی `unknown` + Type Guard برای محصول/دسته/تخفیف/موجودی
- [x] `LoadState` به‌صورت Union با `switch` و `never` (`assertNever`)
- [x] کد در لایه‌های `types`, `api`, `storage`, `cart`, `catalog`, `ui`, `main` — بدون `script.ts`
- [x] **هیچ فایلی بالای ۷۰ خط نیست** (۵۱ فایل، ۱۰۰٪ ≤ ۷۰)
- [x] `node check-arch.mjs src --shop` و `npm run check` بدون خطا
- [x] `base: './'` و آدرس API از `.env.development` و `.env.production`
- [x] `npm run build` موفق و `npm run preview` بدون خطا
- [x] هیچ `any`, `as` برای ساکت کردن خطا، و `@ts-ignore`

### 🎁 امتیازهای بونوس

- [x] `noUncheckedIndexedAccess` + `exactOptionalPropertyTypes` فعال
- [x] حفظ فیلترها، دسته و جستجو در URL (با Refresh)
- [x] ساختار `features/` و `shared/` (بدون ایمپورت مستقیم بین Featureها)
- [x] Global loader + Retry toast
- [x] Slug anchors (`#dairy`, `#fruits`) به موازات `#cat-<id>`

---

## 🎓 درس‌های TypeScript

- ✅ **`unknown`** — خروجی `getJSON` به‌جای `any`
- ✅ **Type Guards** — `isProduct(p): p is Product`
- ✅ **Type Predicates** — `filter((i): i is CartItem => ...)`
- ✅ **`never`** — بررسی `switch` در `userMessage`
- ✅ **`LoadState<T>`** — Union Type
- ✅ **`Pick<T, K>`** — `ProductId`
- ✅ **`Record<K, V>`** — `StockMap`
- ✅ **`as const`** — `SORTS`
- ✅ **بدون `enum`** — طبق `erasableSyntaxOnly`
- ✅ **`instanceof Element`** — Narrow کردن `EventTarget`
- ✅ **`closest<HTMLButtonElement>`** — با جنریک

### نمونه کد: Type Guard

```typescript
export function isProduct(v: unknown): v is Product {
  if (!isRecord(v)) return false;
  return (
    typeof v.id === "number" &&
    Number.isInteger(v.id) &&
    v.id > 0 &&
    typeof v.name === "string" &&
    v.name.length > 0 &&
    typeof v.price === "number" &&
    Number.isFinite(v.price) &&
    v.price >= 0
  );
}
```

### نمونه کد: `LoadState` با `never`

```typescript
export function assertNever(value: never): never {
  throw new Error(`Unhandled state: ${String(value)}`);
}

export function userMessage(kind: ApiErrorType): string {
  switch (kind) {
    case "offline":
      return "اتصال اینترنت خود را بررسی کنید";
    case "timeout":
      return "پاسخی از سرور دریافت نشد";
    // ...
    default:
      return assertNever(kind);
  }
}
```

---

## 🔒 امنیت

```typescript
// ✅ textContent (نه innerHTML برای داده)
name.textContent = product.name;

// ✅ safeHref برای لینک‌ها
a.href = safeHref(item.href);

// ✅ Type Guard برای داده‌های نامشخص
if (!isProduct(product)) return;

// ✅ catch با unknown
try { ... } catch (err: unknown) { ... }

// ✅ localStorage validate
const parsed: unknown = JSON.parse(raw);
if (!Array.isArray(parsed)) return [];
```

**هیچ `innerHTML` با داده‌ی کاربر در کد وجود ندارد.**

---

## ♿ دسترس‌پذیری

- ✅ **Skip link**
- ✅ **`aria-label`** روی همه‌ی دکمه‌های بدون متن
- ✅ **`role="dialog"`** و **`aria-modal`** برای مودال‌ها
- ✅ **`role="status"`** و **`aria-live="polite"`** برای لودر
- ✅ **`aria-expanded`** و **`aria-controls`** برای جستجو
- ✅ **`focus-visible`** — فوکوس واضح
- ✅ **کنتراست رنگ** — طبق WCAG AA
- ✅ **`prefers-reduced-motion`**
- ✅ **`lang="fa"`** و **`dir="rtl"`**

---

## 📊 آمار پروژه

| مورد                          |   مقدار    |
| ----------------------------- | :--------: |
| فایل‌های TypeScript در `src/` |     ۵۱     |
| تعداد لایه‌ها                 |     ۷      |
| حداکثر خط در یک فایل          |    ≤ ۷۰    |
| حجم JS (gzip)                 |  ~۳۰.۰ KB  |
| حجم CSS (gzip)                |  ~۱۳.۶ KB  |
| حجم HTML (gzip)               |  ~۵.۵ KB   |
| **کل حجم (gzip)**             | **~۴۹ KB** |
| TypeScript errors             |     ۰      |
| `any` در کد                   |     ۰      |
| `@ts-ignore`                  |     ۰      |
| نقض معماری (`check-arch`)     |     ۰      |

---

<div align="center">

### ساخته شده با ❤️ و TypeScript

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Developer:** Arman Gholamali
**Week:** 4 — Gang of Fourty

</div>
