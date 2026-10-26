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

[![RTL](https://img.shields.io/badge/RTL-Persian-2ea44f?style=for-the-badge)](https://en.wikipedia.org/wiki/Right-to-left_script)
[![A11y](https://img.shields.io/badge/A11y-WCAG_AA-blueviolet?style=for-the-badge)](#-دسترسپذیری)
[![Responsive](https://img.shields.io/badge/Responsive-320px_to_4K-orange?style=for-the-badge)]()

<br>

<img src="assets/preview-desktop.png" alt="پیش‌نمایش دسکتاپ" width="720">

<br>
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

- 🔪 **شکستن** `script.ts` به لایه‌های `api`, `storage`, `cart`, `catalog`, `ui`, `main`
- 🛡️ **Type Guard** برای داده‌های خارجی (`unknown`)
- 🧩 **`LoadState`** با `never` و `switch`
- 📐 **`tsconfig.json`** سخت‌گیرانه (`strict: true`)
- 🚀 **آماده‌ی `build` و `preview`** با `base: './'` و فایل‌های `.env`
- 🧪 **`check-arch.mjs`** برای بررسی معماری

---

## 🏛 معماری لایه‌ای

```text
┌──────────────────────────────────────┐
│         main.ts / main-render         │  ← اتصال، State، رویدادها
├──────────────────────────────────────┤
│   ui  │  cart  │  catalog  │ storage │  ← منطق و نمایش
├──────────────────────────────────────┤
│                 api                  │  ← fetch و Type Guard
├──────────────────────────────────────┤
│               types.ts               │  ← بدون هیچ Import
└──────────────────────────────────────┘
```

### 📏 قانون وابستگی

- **`types.ts`** — هیچ `import`ی ندارد
- **`api/`** — فقط `types`، تنها جایی که `fetch` دارد
- **`storage/`** — فقط `types`، تنها جایی که `localStorage` دارد
- **`cart/`** و **`catalog/`** — فقط `types`، توابع خالص
- **`ui/`** — `types` + `catalog` + `cart`، فقط DOM می‌سازد
- **`main.ts`** — همه لایه‌ها را وصل می‌کند
- **`main-render.ts`** — `state` و `onAdd` را پارامتر می‌گیرد

### 🔍 بررسی خودکار

```bash
node check-arch.mjs src --shop
# ✓ All layer imports are valid. No circular dependencies found.
#   Checked 31 file(s) in src/
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
│   ├── api/
│   │   ├── client.ts         ← fetch با timeout/retry → Promise<unknown>
│   │   ├── guards.ts         ← Type Guard (isProduct, isCategory, ...)
│   │   └── load.ts           ← loadAll + LoadState
│   ├── storage/
│   │   ├── cart-storage.ts
│   │   ├── stock-storage.ts
│   │   └── theme-storage.ts
│   ├── cart/
│   │   ├── cart.ts           ← توابع خالص سبد
│   │   └── parse.ts          ← اعتبارسنجی CartItem
│   ├── catalog/
│   │   ├── filter.ts
│   │   ├── search.ts         ← fuse.js
│   │   └── stock.ts
│   ├── ui/
│   │   ├── dom.ts
│   │   ├── format.ts
│   │   ├── product-card.ts
│   │   ├── product-events.ts
│   │   ├── cart-view.ts
│   │   ├── cart-item.ts
│   │   ├── detail.ts
│   │   ├── filter-modal.ts
│   │   ├── search-init.ts
│   │   ├── error-state.ts
│   │   ├── empty-state.ts
│   │   ├── skeleton.ts
│   │   ├── banner.ts
│   │   ├── theme.ts
│   │   ├── toast.ts
│   │   ├── modal.ts
│   │   └── animate.ts
│   ├── main.ts               ← State + boot + اتصال لایه‌ها
│   └── main-render.ts        ← رندر (state و onAdd پارامتر)
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
  "erasableSyntaxOnly": true
}
```

**نکته:** `noImplicitAny: false` **حذف** شده. `strict: true` هم فعال است.

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
- ✅ **مودال جزئیات محصول**
- ✅ **افکت جشن** با `canvas-confetti`
- ✅ **پیام Toast** با `notyf`

### ⚡ معماری

- ✅ **۷ لایه** بدون circular dependency
- ✅ **`getJSON` خروجی `unknown`**
- ✅ **Type Guardها** (`isProduct`, `isCategory`, `isOffer`, `isStock`)
- ✅ **`LoadState<T>`** با `switch` و `never`
- ✅ **`check-arch.mjs`** بررسی خودکار
- ✅ **بدون `any` / بدون `@ts-ignore`**

### 🛡 مدیریت خطا

- ✅ **State Loading/Error/Empty**
- ✅ **Retry خودکار** با exponential backoff
- ✅ **حالت آفلاین** با banner
- ✅ **پیام خطای قابل‌فهم** برای ۴۰۴ و JSON نامعتبر

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
- [x] `node check-arch.mjs src --shop` و `npm run check` بدون خطا
- [x] `base: './'` و آدرس API از `.env.development` و `.env.production`
- [x] `npm run build` موفق و `npm run preview` بدون خطا
- [x] هیچ `any`, `as` برای ساکت کردن خطا، و `@ts-ignore`

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
- ✅ **`aria-expanded`** و **`aria-controls`** برای جستجو
- ✅ **`focus-visible`** — فوکوس واضح
- ✅ **کنتراست رنگ** — طبق WCAG AA
- ✅ **`prefers-reduced-motion`**
- ✅ **`lang="fa"`** و **`dir="rtl"`**

---

## 📊 آمار پروژه

| مورد                          |   مقدار    |
| ----------------------------- | :--------: |
| فایل‌های TypeScript در `src/` |     ۳۱     |
| تعداد لایه‌ها                 |     ۷      |
| حجم JS (gzip)                 |  ۳۰.۰۲ KB  |
| حجم CSS (gzip)                |  ۱۳.۶۲ KB  |
| حجم HTML (gzip)               |  ۵.۵۲ KB   |
| **کل حجم (gzip)**             | **~۴۹ KB** |
| زمان build                    |   ۵۶۷ms    |
| TypeScript errors             |     ۰      |
| `any` در کد                   |     ۰      |
| `@ts-ignore`                  |     ۰      |

---

<div align="center">

### ساخته شده با ❤️ و TypeScript

**Developer:** Arman Gholamali
**Week:** 4 — Gang of Fourty

</div>
