````md
<div align="center">

# 🛒 سبزکاله

### سوپرمارکت آنلاین مدرن با TypeScript، Vite و ۴ پکیج npm

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Build](https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge)]()
[![TypeScript Errors](https://img.shields.io/badge/TS_Errors-0-success?style=for-the-badge)]()
[![Any](https://img.shields.io/badge/any-0-blue?style=for-the-badge)]()
[![HTML Valid](https://img.shields.io/badge/HTML_Valid-Passing-success?style=for-the-badge)]()

[![RTL](https://img.shields.io/badge/RTL-Persian-2ea44f?style=for-the-badge)](https://en.wikipedia.org/wiki/Right-to-left_script)
[![A11y](https://img.shields.io/badge/A11y-WCAG_AA-blueviolet?style=for-the-badge)](#-دسترسپذیری)
[![Responsive](https://img.shields.io/badge/Responsive-320px_to_4K-orange?style=for-the-badge)]()

<br>

**Week 3 Project · Gang of Fourty · Deep Module Shop**

</div>

---

## 📖 فهرست مطالب

- [درباره پروژه](#-درباره-پروژه)
- [تکنولوژی‌ها](#-تکنولوژیها)
- [پکیج‌های npm](#-پکیجهای-npm)
- [ویژگی‌ها](#-ویژگیها)
- [نصب و اجرا](#-نصب-و-اجرا)
- [ساختار پروژه](#-ساختار-پروژه)
- [درس‌های TypeScript](#-درسهای-typescript)
- [امنیت](#-امنیت)
- [دسترس‌پذیری](#-دسترسپذیری)
- [آمار پروژه](#-آمار-پروژه)
- [Definition of Done](#-definition-of-done)
- [امتیاز اضافه](#-امتیاز-اضافه)
- [شواهد خروجی‌ها](#-شواهد-خروجیها)
- [پاسخ سؤالات PDF](#-پاسخ-سؤالات-pdf)

---

## ✨ درباره پروژه

**سبزکاله** یک فروشگاه آنلاین مدرن است که با **TypeScript**، **Vite** و **۴ پکیج npm** ساخته شده.

این پروژه نسخه ارتقایافتهٔ **هفتهٔ دوم** است که از **JavaScript خالص** به **TypeScript** منتقل شد و به یک پروژهٔ واقعی با ابزارهای مدرن تبدیل شد.

### 🎯 هدف این هفته

- تبدیل JavaScript به TypeScript
- راه‌اندازی Vite به عنوان dev server و build tool
- استفاده از npm برای مدیریت پکیج‌ها
- نصب و استفاده از ۴ پکیج واقعی npm
- تایپ‌دهی کامل به DOM، رویدادها و داده‌های API
- حذف کامل `any` و `noImplicitAny: false`

> 🧠 این پروژه یک تمرین عملی از دورهٔ **Gang of Fourty** و مخصوص **هفتهٔ سوم** است، برای تسلط روی TypeScript، Type System، npm و Vite.

### 🎬 دموی زنده

🔗 **نسخهٔ آنلاین:** [`سبزکاله`](https://ArmanGhM.github.io/gang-of-fourty/shops/deep-module/)

```bash
cd shops/deep-module
npm install
npm run dev
# → http://localhost:5173/
```
````

---

## 🛠 تکنولوژی‌ها

<table>
<tr>
<td width="50%" valign="top">

### 🟦 زبان و ابزارهای ساخت

| تکنولوژی       | نسخه | کاربرد                   |
| -------------- | :--: | ------------------------ |
| **TypeScript** | 5.9  | زبان با تایپ             |
| **Vite**       | 5.4  | dev server + build       |
| **npm**        | 10+  | مدیریت پکیج              |
| **HTML5**      |  —   | سمنتیک و a11y            |
| **CSS3**       |  —   | Grid, Flex, Custom Props |

### ⚙️ تنظیمات TypeScript

```json
{
  "target": "ES2022",
  "module": "ESNext",
  "moduleResolution": "bundler",
  "strict": true,
  "noEmit": true
}
```

**نکته:** `noImplicitAny` حذف شده (یعنی همه‌چیز باید تایپ داشته باشد).

</td>
<td width="50%" valign="top">

### 📦 پکیج‌های npm

| پکیج                         | کاربرد       | حجم  |
| ---------------------------- | ------------ | :--: |
| 🍞 **notyf**                 | پیام Toast   | ~۳KB |
| 🎉 **canvas-confetti**       | افکت جشن     | ~۶KB |
| 🔍 **fuse.js**               | جستجوی فازی  | ~۸KB |
| ✨ **@formkit/auto-animate** | انیمیشن لیست | ~۳KB |

**کل حجم: ~۲۰KB gzip** 🚀

### 🔧 تنظیمات Vite

```typescript
// vite.config.ts
export default defineConfig({
  base: "./",
  server: { proxy: api },
  preview: { proxy: api },
});
```

Proxy برای دسترسی به API سرور واقعی.

</td>
</tr>
</table>

---

## 📦 پکیج‌های npm

### ۱. `notyf` — پیام‌های Toast

**نسخه:** `3.10.0` | **حجم:** ~۳KB gzip | **تایپ:** ✅ دارد

```typescript
const notyf = new Notyf({
  position: { x: "center", y: "top" },
  duration: 2500,
  dismissible: true,
});

notyf.success(`${product.name} به سبد اضافه شد`);
```

---

### ۲. `canvas-confetti` — افکت جشن

**نسخه:** `1.9.4` | **حجم:** ~۶KB gzip | **تایپ:** با `@types/canvas-confetti`

```typescript
confetti({
  particleCount: 150,
  spread: 80,
  origin: { y: 0.6 },
  colors: ["#d7ff00", "#b8dc00", "#111318", "#4da3ff"],
});
```

---

### ۳. `fuse.js` — جستجوی فازی

**نسخه:** `7.5.0` | **حجم:** ~۸KB gzip | **تایپ:** ✅ دارد

**کاربرد:** جستجوی هوشمند که غلط املایی را تحمل می‌کند (`"سیپ"` → پیدا کردن `"سیب"`).

```typescript
const fuseInstance = new Fuse(allProductsData, {
  keys: ["name", "unit"],
  threshold: 0.4,
  minMatchCharLength: 2,
  ignoreLocation: true,
});
```

---

### ۴. `@formkit/auto-animate` — انیمیشن خودکار

**نسخه:** `0.10.0` | **حجم:** ~۳KB gzip | **تایپ:** ✅ دارد

```typescript
const containers = ["cart-body", "all-track", "search-suggestions"];
containers.forEach((id) => {
  const el = document.getElementById(id);
  if (el) autoAnimate(el);
});
```

---

## 🚀 ویژگی‌ها

### 🎨 طراحی و ظاهر

- ✅ **تم روشن و تاریک** — دکمهٔ دستی + `prefers-color-scheme` + ذخیره در `localStorage`
- ✅ **Responsive کامل** — از ۳۲۰px تا 4K
- ✅ **فونت Vazirmatn** — local (بدون CDN)
- ✅ **SVG اختصاصی** — لوگو، هنروان، پنیر
- ✅ **گرادیانت‌های مدرن** — روی کارت‌ها، بنرها، دکمه‌ها
- ✅ **۱۵+ انیمیشن سیال** — stagger, pulse, float, shimmer
- ✅ **احترام به `prefers-reduced-motion`**

### 🛒 قابلیت‌های فروشگاه

- ✅ **سبد خرید کامل** — افزودن، کم کردن، حذف، ذخیره در localStorage
- ✅ **قیمت یکسان کارت و سبد** — `calcDiscountPrice()` در هر دو
- ✅ **جستجوی فازی** — با `fuse.js`
- ✅ **فیلتر پیشرفته** — دسته، موجودی، تخفیف، مرتب‌سازی
- ✅ **مودال جزئیات محصول**
- ✅ **افکت جشن** — با `canvas-confetti` موقع تسویه
- ✅ **پیام Toast** — با `notyf`
- ✅ **انیمیشن لیست** — با `@formkit/auto-animate`

### ⚡ تجربهٔ کاربری

- ✅ **State Loading/Error/Empty** — با اسکلتون‌های زیبا
- ✅ **Retry خودکار** — با exponential backoff (تا ۳ بار)
- ✅ **کش هوشمند** — ۳۰ دقیقه TTL در `localStorage`
- ✅ **حالت آفلاین** — بنر + fallback به کش
- ✅ **حرکت نرم** — `scroll-behavior: smooth`
- ✅ **جستجو با Debounce** — ۳۵۰ms بعد از تایپ

---

## 🚀 نصب و اجرا

### پیش‌نیازها

- **Node.js** نسخه ۲۲ یا بالاتر
- **npm** نسخه ۱۰ یا بالاتر

### نصب

```bash
cd shops/deep-module
npm install
```

### دستورات

| دستور                   | کاربرد                      | نتیجه                    |
| ----------------------- | --------------------------- | ------------------------ |
| `npm run dev`           | اجرا در حالت توسعه          | `http://localhost:5173/` |
| `npm run check`         | بررسی خطاهای TypeScript     | خروجی خالی (موفق)        |
| `npm run build`         | ساخت نسخه production        | پوشه `dist/`             |
| `npm run preview`       | پیش‌نمایش نسخه build شده    | `http://localhost:4173/` |
| `npm run validate:html` | بررسی HTML با html-validate | خروجی خالی (موفق)        |

---

## 📁 ساختار پروژه

```text
shops/deep-module/
├── index.html              ← صفحهٔ اصلی
├── style.css               ← استایل‌ها (یکپارچه)
├── script.ts               ← منطق TypeScript
├── package.json            ← تنظیمات npm
├── package-lock.json       ← قفل نسخه‌ها (commit شده)
├── tsconfig.json           ← تنظیمات TypeScript
├── vite.config.ts          ← تنظیمات Vite (proxy)
├── .gitignore              ← dist/, node_modules/, .vscode/
├── .htmlvalidate.json      ← تنظیمات HTML Validator
├── README.md               ← همین فایل
│
├── assets/
│   ├── fonts/              ← Vazirmatn (۱۰ فایل woff2)
│   └── img/                ← تصاویر SVG/PNG (Cheese, Tomato, ...)
│
└── dist/                   ← خروجی build (git ignored)
```

---

## 🎓 درس‌های TypeScript که پیاده شد

<table>
<tr>
<td width="50%" valign="top">

### Type System

- ✅ **Interfaces** — `Product`, `Category`, `CartItem`, `Shop`, `Offer`
- ✅ **Union Types** — `ErrorType`, `ApiErrorType`, `StockLevel`, `AddToCartReason`
- ✅ **Optional** — `emoji?`, `unit?`, `categoryId?`
- ✅ **readonly** — `Product.id`, `Offer.productId`, `Offer.percent`
- ✅ **Generics** — `h<K extends keyof HTMLElementTagNameMap>`
- ✅ **Type Guards** — `isValidProduct(p): p is Product`
- ✅ **Type Predicates** — `filter((item): item is CartItem => ...)`
- ✅ **`unknown` در `catch`** — به جای `any`
- ✅ **`Promise<T>`** — برای توابع async

</td>
<td width="50%" valign="top">

### DOM و Events

- ✅ **`querySelector<T>`** — با تایپ دقیق
- ✅ **`createElement<T>`** — تابع `h` با جنریک
- ✅ **`MouseEvent`, `KeyboardEvent`, `SubmitEvent`**
- ✅ **`e.target instanceof Element`** — قبل از `closest`
- ✅ **`closest<HTMLButtonElement>`** — با جنریک
- ✅ **`instanceof` برای Narrow کردن**
- ✅ **`HTMLElement | null`** — چک کردن `null`
- ✅ **بدون `any`** — کل کد type-safe
- ✅ **بدون `as` برای سرکوب خطا**

</td>
</tr>
</table>

### نمونه‌های کد

**Type Guard:**

```typescript
export function isValidProduct(p: unknown): p is Product {
  if (!isRecord(p)) return false;
  return (
    typeof p.id === "number" &&
    Number.isInteger(p.id) &&
    p.id > 0 &&
    typeof p.name === "string" &&
    p.name.length > 0 &&
    typeof p.price === "number" &&
    Number.isFinite(p.price) &&
    p.price >= 0
  );
}
```

**Type Predicate در filter:**

```typescript
return parsed
  .map(validateCartItem)
  .filter((item): item is CartItem => item !== null);
```

**Generic برای `createElement`:**

```typescript
function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  text?: string | number | null,
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  if (className !== undefined) el.className = className;
  if (text !== undefined && text !== null) el.textContent = String(text);
  return el;
}
```

**Event با Narrow کردن:**

```typescript
document.addEventListener("click", (e: MouseEvent) => {
  if (!(e.target instanceof Element)) return;

  const cartBtn = e.target.closest<HTMLElement>("#cart-btn");
  if (cartBtn !== null) {
    e.preventDefault();
    e.stopPropagation();
    openModal("cart-modal");
  }
});
```

**Typed Parser بدون `as`:**

```typescript
function parseShop(raw: Record<string, unknown>): Shop {
  const out: Shop = {};
  if (typeof raw.name === "string") out.name = raw.name;
  if (typeof raw.slogan === "string") out.slogan = raw.slogan;
  // ...
  return out;
}
```

---

## 🔒 امنیت

```typescript
// ✅ textContent به جای innerHTML برای داده
name.textContent = product.name;

// ✅ escapeHTML برای متن‌های API
const safeName = escapeHTML(product.name);

// ✅ safeHref برای لینک‌ها
a.href = safeHref(item.href);

// ✅ safeInt برای تبدیل امن به عدد
const id = safeInt(raw.id, 0);

// ✅ Type Guard برای داده‌های نامشخص
if (!isValidProduct(product)) return;

// ✅ catch با unknown
try { ... } catch (err: unknown) {
  console.error("خطا:", err);
}

// ✅ localStorage validate
const parsed: unknown = JSON.parse(raw);
if (!Array.isArray(parsed)) return [];
```

**هیچ `innerHTML` با داده‌ی کاربر در کد وجود ندارد.**

---

## ♿ دسترس‌پذیری

- ✅ **Skip link** — پرش به محتوا (اولین المان صفحه)
- ✅ **`aria-label`** روی همهٔ دکمه‌های بدون متن
- ✅ **`role="dialog"`** و **`aria-modal`** برای مودال‌ها
- ✅ **`aria-expanded`** و **`aria-controls`** برای جستجو
- ✅ **`role="combobox"`** و **`aria-autocomplete="list"`** برای فیلد جستجو
- ✅ **`aria-hidden="true"`** برای آیکون‌های تزئینی
- ✅ **`aria-labelledby`** برای بخش‌ها
- ✅ **`aria-pressed`** روی دکمهٔ تغییر تم (با JS sync می‌شود)
- ✅ **`focus-visible`** — فوکوس واضح
- ✅ **کنتراست رنگ** — طبق WCAG AA
- ✅ **`prefers-reduced-motion`**
- ✅ **`lang="fa"`** و **`dir="rtl"`**

---

## 📊 آمار پروژه

| مورد                          |   مقدار   |
| ----------------------------- | :-------: |
| خطوط TypeScript               |  ~۹۰۰ خط  |
| خطوط CSS                      | ~۲٬۹۰۰ خط |
| خطوط HTML                     |  ~۶۰۰ خط  |
| تعداد پکیج‌های npm            |     ۴     |
| حجم JS نهایی (gzip)           |   ~۳۲KB   |
| حجم CSS نهایی (gzip)          |   ~۱۲KB   |
| حجم HTML نهایی (gzip)         |  ~۵.۵KB   |
| **کل حجم (gzip)**             | **~۵۰KB** |
| زمان build                    |  ~۵۷۰ms   |
| TypeScript errors             |     ۰     |
| `any` در کد                   |     ۰     |
| `as` برای سرکوب خطا           |     ۰     |
| non-null assertion (`!`)      |     ۰     |
| `innerHTML` برای داده‌ی کاربر |     ۰     |

---

## ✅ Definition of Done

- [x] `package.json` با `private: true` و `type: "module"`
- [x] اسکریپت‌های `dev`, `build`, `preview`, `check`, `validate:html`
- [x] `typescript`، `vite` و `html-validate` در `devDependencies`
- [x] `package-lock.json` commit شده
- [x] `node_modules/` و `dist/` در `.gitignore` و commit نشده
- [x] `tsconfig.json` با `strict: true` بدون `noImplicitAny: false`
- [x] `script.js` حذف شده؛ `script.ts` با `type="module"`
- [x] `querySelector<T>` با تایپ دقیق
- [x] `createElement<T>` (تابع `h`) با تایپ
- [x] `instanceof Element` قبل از `closest`
- [x] حداقل ۲ پکیج npm در `dependencies` (در واقع ۴ پکیج)
- [x] `npm run check` بدون خطا
- [x] `npm run build` موفق
- [x] `npm run dev` و `preview` بدون خطای کنسول
- [x] بدون non-null assertion (`!`)
- [x] بدون `as` برای سرکوب خطا در `script.ts`
- [x] HTML Validation پاس می‌شود (`npm run validate:html`)
- [x] توضیح در PR با checklist و شواهد

## 🏅 امتیاز اضافه

- [x] `noImplicitAny: false` حذف شده
- [x] type برای همهٔ APIها (`Product`, `Category`, `Offer`, `Shop`, `Home`, `StockData`)
- [x] همهٔ توابع `fetch` خروجی `Promise<T>` دارند
- [x] همهٔ پارامترها و مقادیر برگشتی تایپ دارند
- [x] هیچ `any` صریحی در کد نیست
- [x] `catch (err: unknown)` استفاده شده
- [x] `Record<number, number>` برای stock
- [x] `Map<number, true>` برای `matchedIds` در جستجو
- [x] `readonly` برای فیلدهای ثابت
- [x] Type Guards: `isValidProduct`, `isValidCategory`, `isValidOffer`, `isCacheEntry`
- [x] Typed Parsers بدون `as`: `parseShop`, `parseHome`, `parseStock`

---

## 🧪 شواهد خروجی‌ها

### `npm run check`

```
PS> npm run check

> deep-module@1.0.0 check
> tsc --noEmit

PS>
```

**خروجی خالی → بدون خطای TypeScript.**

### `npm run build`

```
PS> npm run build

> deep-module@1.0.0 build
> tsc --noEmit && vite build

vite v5.4.21 building for production...
✓ 9 modules transformed.
dist/index.html                                25.28 kB │ gzip:  5.48 kB
dist/assets/Vazirmatn-Regular-CtGL0YI-.woff2   50.68 kB
dist/assets/Vazirmatn-Bold-_OhAJEdh.woff2      51.02 kB
dist/assets/Vazirmatn-SemiBold-26ZP1ILp.woff2  51.03 kB
dist/assets/Vazirmatn-Medium-D86t5Axy.woff2    51.13 kB
dist/assets/index-DYaYp9Dh.css                 57.63 kB │ gzip: 12.02 kB
dist/assets/index-nrxrv4Q1.js                  95.41 kB │ gzip: 32.10 kB
✓ built in 570ms
```

### `npm run validate:html`

```
PS> npm run validate:html

> deep-module@1.0.0 validate:html
> html-validate index.html

PS>
```

**بدون خطا.**

---

## 📦 شواهد پکیج‌ها

`package.json`:

```json
{
  "name": "deep-module",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview",
    "check": "tsc --noEmit",
    "validate:html": "html-validate index.html"
  },
  "devDependencies": {
    "@types/canvas-confetti": "^1.9.0",
    "html-validate": "^11.4.0",
    "typescript": "^5.0.0",
    "vite": "^5.0.0"
  },
  "dependencies": {
    "@formkit/auto-animate": "^0.10.0",
    "canvas-confetti": "^1.9.4",
    "fuse.js": "^7.5.0",
    "notyf": "^3.10.0"
  }
}
```

`.htmlvalidate.json` (بدون BOM):

```json
{
  "extends": ["html-validate:recommended"],
  "rules": {
    "void-style": "off",
    "prefer-native-element": "off"
  }
}
```

**توضیح:** `void-style` چون `<meta />` در HTML5 معتبر است (هرچند HTML-validate پیش‌فرض نمی‌پسندد) و `prefer-native-element` چون `role="listbox"` برای widget جستجوی فازی ضروری است (`<select>` ساده نمی‌تواند این کار را بکند).

---

## ❓ پاسخ سؤالات PDF

**۱. کدام سطح قبولی/امتیاز را پیاده کردی؟**
همهٔ سطح قبولی و همهٔ موارد امتیاز اضافه.

**۲. خروجی `npm run check`**
خالی. `tsc --noEmit` بدون خطا کامپایل می‌شود (بالاتر در بخش شواهد).

**۳. دو پکیج انتخابی، دلیل، حجم، تایپ**

- **`fuse.js`** — جستجوی فازی که غلط املایی را تحمل می‌کند. حجم ~۸KB gzip. تایپ داخلی دارد. کاربرد: جستجوی هوشمند محصولات.
- **`notyf`** — نمایش پیام Toast حرفه‌ای. حجم ~۳KB gzip. تایپ داخلی دارد. کاربرد: بازخورد افزودن به سبد و تسویه.

**۴. یک خطای TypeScript جالب و نحوهٔ حل**

`TS2540: Cannot assign to 'title' because it is a read-only property` روی `HeroSection` که با `readonly` تعریف شده بود. حل: `readonly` فقط روی فیلدهای واقعاً ثابت (`Product.id`, `Offer.productId`, `Offer.percent`) نگه داشته شد و از `HeroSection` (که parser آن را می‌سازد) حذف شد.

**۵. تفاوت `dependencies` و `devDependencies`**

- `dependencies`: کدی که در runtime به مرورگر می‌رود (`fuse.js`, `notyf`, `canvas-confetti`, `@formkit/auto-animate`).
- `devDependencies`: ابزار build و بررسی که فقط در development نصب می‌شود (`typescript`, `vite`, `html-validate`, `@types/*`).

**۶. چرا `package-lock.json` commit می‌شود ولی `node_modules/` نه**

- `package-lock.json` نسخه‌های دقیق همهٔ زیرپکیج‌ها را قفل می‌کند تا همهٔ توسعه‌دهنده‌ها و CI یکسان نصب کنند.
- `node_modules/` از lock بازتولید می‌شود و حجم زیادی دارد.

**۷. چرا با پاک‌کردن `noImplicitAny` خطاها پیدا می‌شوند**

`noImplicitAny` از implicit `any` جلوگیری می‌کند. با حذف آن، TypeScript هر جا type را نتواند infer کند خطا می‌دهد و مجبور می‌شوی برای پارامترها، متغیرها و مقادیر برگشتی تایپ دقیق بنویسی؛ که باگ‌های runtime را کم می‌کند.

---

## 🤝 مشارکت

1. Fork کن
2. برنچ بساز (`git checkout -b feat/amazing-feature`)
3. Commit کن (`git commit -m 'Add amazing feature'`)
4. Push کن (`git push origin feat/amazing-feature`)
5. Pull Request بزن

---

## 📝 مجوز

این پروژه تحت مجوز **MIT** منتشر شده.

---

## 🙏 تشکر

- **Gang of Fourty** — برای دوره و تسک
- **Vazirmatn** — برای فونت فارسی زیبا
- **npm community** — برای پکیج‌های عالی

---

<div align="center">

### ساخته شده با ❤️ و TypeScript

</div>
```
