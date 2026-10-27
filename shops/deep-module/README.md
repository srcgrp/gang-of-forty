<div align="center">

# 🛒 سبزکاله

### سوپرمارکت آنلاین مدرن با TypeScript، Vite و ۴ پکیج npm

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![npm](https://img.shields.io/badge/npm-74_packages-CB3837?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)
[![Build](https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge)]()
[![TypeScript Errors](https://img.shields.io/badge/TS_Errors-0-success?style=for-the-badge)]()
[![Any](https://img.shields.io/badge/any-0-blue?style=for-the-badge)]()

[![RTL](https://img.shields.io/badge/RTL-Persian-2ea44f?style=for-the-badge)](https://en.wikipedia.org/wiki/Right-to-left_script)
[![A11y](https://img.shields.io/badge/A11y-WCAG_AA-blueviolet?style=for-the-badge)](#-دسترسپذیری)
[![Responsive](https://img.shields.io/badge/Responsive-320px_to_4K-orange?style=for-the-badge)]()

<br>

<img src="assets/preview-desktop.png" alt="پیش‌نمایش دسکتاپ" width="720">

<br>
<br>

**Week 3 Project · Gang of Fourty · Deep Module Shop**

</div>

---

## 📖 فهرست مطالب

- [درباره پروژه](#-درباره-پروژه)
- [دموی زنده](#-دموی-زنده)
- [پیش‌نمایش](#-پیش‌نمایش)
- [تکنولوژی‌ها](#-تکنولوژی‌ها)
- [پکیج‌های npm](#-پکیجهای-npm)
- [ویژگی‌ها](#-ویژگیها)
- [نصب و اجرا](#-نصب-و-اجرا)
- [ساختار پروژه](#-ساختار-پروژه)
- [ساختار صفحه](#-ساختار-صفحه)
- [درس‌های TypeScript](#-درسهای-typescript)
- [امنیت](#-امنیت)
- [دسترس‌پذیری](#-دسترسپذیری)
- [آمار](#-آمار)
- [تست شده روی](#-تست-شده-روی)
- [مشارکت](#-مشارکت)
- [مجوز](#-مجوز)

---

## ✨ درباره پروژه

**سبزکاله** یک فروشگاه آنلاین مدرن است که با **TypeScript**، **Vite** و **۴ پکیج npm** ساخته شده.

این پروژه نسخه ارتقایافته‌ی **هفته دوم** است که از **JavaScript خالص** به **TypeScript** منتقل شد و به یک پروژه واقعی با ابزارهای مدرن تبدیل شد.

### 🎯 هدف این هفته

- تبدیل JavaScript به TypeScript
- راه‌اندازی Vite به عنوان dev server و build tool
- استفاده از npm برای مدیریت پکیج‌ها
- نصب و استفاده از ۴ پکیج واقعی npm
- Type-Dehی کامل به DOM، رویدادها و داده‌های API
- حذف کامل `any` و `noImplicitAny: false`

> 🧠 این پروژه یک تمرین عملی از دوره **Gang of Fourty** و مخصوص **هفته سوم** است، برای تسلط روی TypeScript، Type System، npm و Vite.

---

## 🎬 دموی زنده

🔗 **نسخه آنلاین:** [`سبزکاله`](https://ArmanGhM.github.io/gang-of-fourty/shops/deep-module/)

```bash
# یا به صورت لوکال
cd shops/deep-module
npm install
npm run dev
# → http://localhost:5173/
```

---

## 🖼 پیش‌نمایش

<div align="center">

### 🖥 دسکتاپ

<img src="assets/preview-desktop.png" alt="دسکتاپ" width="700">

### 📱 موبایل

<img src="assets/preview-mobile.png" alt="موبایل" width="280">

</div>

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

**کاربرد در پروژه:**

- پیام «به سبد اضافه شد» هنگام افزودن محصول
- پیام «سفارش ثبت شد» هنگام تسویه حساب

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

**کاربرد در پروژه:**

- افکت کاغذرنگی هنگام تسویه حساب

```typescript
confetti({
  particleCount: 150,
  spread: 80,
  origin: { y: 0.6 },
  colors: ["#2e7d32", "#a5d6a7", "#ffd470", "#f9a825"],
});
```

---

### ۳. `fuse.js` — جستجوی فازی

**نسخه:** `7.5.0` | **حجم:** ~۸KB gzip | **تایپ:** ✅ دارد

**کاربرد در پروژه:**

- جستجوی هوشمند که غلط املایی رو تحمل می‌کنه
- تایپ `"سیپ"` → پیدا کردن `"سیب"` و `"سیب زمینی"`
- تایپ `"کیلو"` → پیدا کردن محصولاتی که واحدشون کیلوئه

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

**کاربرد در پروژه:**

- انیمیشن خودکار لیست‌های داینامیک
- سبد خرید، محصولات، پیشنهادهای جستجو

```typescript
const containers = ["cart-body", "all-track", "search-suggestions"];
containers.forEach((id) => {
  const el = document.getElementById(id);
  if (el) autoAnimate(el);
});
```

**نتیجه:** با یک خط کد، هر آیتمی که اضافه/حذف بشه با انیمیشن نرم انجام می‌شه.

---

## 🚀 ویژگی‌ها

### 🎨 طراحی و ظاهر

- ✅ **تم روشن و تاریک** — دکمه دستی + `prefers-color-scheme`
- ✅ **Responsive کامل** — از ۳۲۰px تا 4K
- ✅ **فونت Vazirmatn** — local (بدون CDN)
- ✅ **SVG اختصاصی** — لوگو، هنروان، پنیر
- ✅ **گرادیانت‌های مدرن** — روی کارت‌ها، بنرها، دکمه‌ها
- ✅ **۱۵+ انیمیشن سیال** — stagger, pulse, float, shimmer
- ✅ **احترام به `prefers-reduced-motion`**

### 🛒 قابلیت‌های فروشگاه

- ✅ **سبد خرید کامل** — افزودن، کم کردن، حذف، ذخیره در localStorage
- ✅ **جستجوی فازی** — با `fuse.js` (غلط املایی هم پیدا می‌شه)
- ✅ **فیلتر پیشرفته** — دسته، موجودی، تخفیف، مرتب‌سازی
- ✅ **مودال جزئیات محصول**
- ✅ **افکت جشن** — با `canvas-confetti` موقع تسویه
- ✅ **پیام Toast** — با `notyf`
- ✅ **انیمیشن لیست** — با `@formkit/auto-animate`

### ⚡ تجربه‌ی کاربری

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
# رفتن به پوشه پروژه
cd shops/deep-module

# نصب وابستگی‌ها
npm install
```

### دستورات

| دستور             | کاربرد                   | نتیجه                    |
| ----------------- | ------------------------ | ------------------------ |
| `npm run dev`     | اجرا در حالت توسعه       | `http://localhost:5173/` |
| `npm run check`   | بررسی خطاهای TypeScript  | خروجی خالی (موفق)        |
| `npm run build`   | ساخت نسخه production     | پوشه `dist/`             |
| `npm run preview` | پیش‌نمایش نسخه build شده | `http://localhost:4173/` |

---

## 📁 ساختار پروژه

```text
shops/deep-module/
├── index.html              ← صفحه اصلی
├── style.css               ← استایل‌ها (یکپارچه)
├── script.ts               ← منطق TypeScript
├── package.json            ← تنظیمات npm
├── package-lock.json       ← قفل نسخه‌ها (باید commit شود)
├── tsconfig.json           ← تنظیمات TypeScript
├── vite.config.ts          ← تنظیمات Vite (proxy)
├── .gitignore              ← dist/, node_modules/
├── .htmlvalidate.json      ← تنظیمات HTML Validator
├── README.md               ← همین فایل
│
├── assets/
│   ├── fonts/              ← Vazirmatn (4 وزن)
│   │   ├── Vazirmatn-Regular.woff2
│   │   ├── Vazirmatn-Medium.woff2
│   │   ├── Vazirmatn-SemiBold.woff2
│   │   └── Vazirmatn-Bold.woff2
│   └── icons/
│       └── favicon.svg
│
└── dist/                   ← خروجی build (git ignored)
```

---

## 🧩 ساختار صفحه

```text
┌──────────────────────────────────────┐
│  📢  نوار اطلاع‌رسانی (ارسال رایگان)   │
├──────────────────────────────────────┤
│  🏪  Header (لوگو + جستجو + سبد)      │
├──────────────────────────────────────┤
│  📂  منوی اصلی (همه دسته‌ها Dropdown)  │
├──────────────────────────────────────┤
│  🎯  Hero (کارت اصلی + طلایی)         │
├──────────────────────────────────────┤
│  🍎  ۷ دسته‌بندی اصلی                 │
├──────────────────────────────────────┤
│  🔥  کاروسل «پیشنهاد ویژه امروز»      │
├──────────────────────────────────────┤
│  🥖  بنرهای تبلیغاتی                  │
├──────────────────────────────────────┤
│  🛒  همه محصولات (با فیلتر و جستجو)    │
├──────────────────────────────────────┤
│  🦶  Footer (راهنما، ساعت کاری، تماس) │
└──────────────────────────────────────┘
```

---

## 🎓 درس‌های TypeScript که پیاده شد

<table>
<tr>
<td width="50%" valign="top">

### Type System (سیستم تایپ)

- ✅ **Interfaces** — `Product`, `Category`, `CartItem`, `Shop`, `Offer`
- ✅ **Union Types** — `ErrorType`, `ApiErrorType`
- ✅ **Optional** — `emoji?`, `unit?`, `categoryId?`
- ✅ **Generics** — `h<K extends keyof HTMLElementTagNameMap>`
- ✅ **Type Guards** — `isValidProduct(p): p is Product`
- ✅ **Type Predicates** — `filter((item): item is CartItem => ...)`
- ✅ **`unknown` در `catch`** — به جای `any`
- ✅ **`Promise<T>`** — برای توابع async

</td>
<td width="50%" valign="top">

### DOM و Events

- ✅ **`querySelector<T>`** — با تایپ دقیق
- ✅ **`createElement<T>`** — با تایپ
- ✅ **`MouseEvent`, `KeyboardEvent`, `SubmitEvent`**
- ✅ **`e.target instanceof Element`** — قبل از `closest`
- ✅ **`closest<HTMLButtonElement>`** — با جنریک
- ✅ **`instanceof` برای Narrow کردن**
- ✅ **`HTMLElement | null`** — چک کردن `null`
- ✅ **بدون `any`** — کل کد type-safe

</td>
</tr>
</table>

### نمونه‌های کد

**Type Guard:**

```typescript
export function isValidProduct(p: unknown): p is Product {
  if (!p || typeof p !== "object") return false;
  const o = p as Record<string, unknown>;
  return (
    typeof o.id === "number" &&
    Number.isInteger(o.id) &&
    o.id > 0 &&
    typeof o.name === "string" &&
    o.name.length > 0
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
  if (className) el.className = className;
  if (text !== undefined && text !== null) el.textContent = String(text);
  return el;
}
```

**Event با Narrow کردن:**

```typescript
document.addEventListener("click", (e: MouseEvent) => {
  if (!(e.target instanceof Element)) return;

  const cartBtn = e.target.closest<HTMLElement>("#cart-btn");
  if (cartBtn) {
    e.preventDefault();
    e.stopPropagation();
    openModal("cart-modal");
  }
});
```

---

## 🔒 امنیت

همه‌ی موارد امنیتی زیر در پروژه رعایت شده:

```typescript
// ✅ همه‌جا از textContent استفاده شده (نه innerHTML برای داده)
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
- ✅ **`aria-label`** روی همه‌ی دکمه‌های بدون متن
- ✅ **`role="dialog"`** و **`aria-modal`** برای مودال‌ها
- ✅ **`aria-expanded`** و **`aria-controls`** برای جستجو
- ✅ **`aria-hidden="true"`** برای آیکون‌های تزئینی
- ✅ **`aria-labelledby`** برای بخش‌ها
- ✅ **`focus-visible`** — فوکوس واضح
- ✅ **کنتراست رنگ** — طبق WCAG AA
- ✅ **`prefers-reduced-motion`** — احترام به کاربرانی که انیمیشن نمی‌خوان
- ✅ **Skip-to-content** — پرش به محتوا
- ✅ **`alt` برای تصاویر**
- ✅ **`lang="fa"`** و **`dir="rtl"`**

---

## 📊 آمار پروژه

| مورد                          |   مقدار   |
| ----------------------------- | :-------: |
| خطوط TypeScript               | ~۱۵۰۰ خط  |
| خطوط CSS                      | ~۳۶۰۰ خط  |
| خطوط HTML                     |  ~۵۰۰ خط  |
| تعداد پکیج‌های npm            |     ۴     |
| حجم JS نهایی (gzip)           |   ~۳۰KB   |
| حجم CSS نهایی (gzip)          |   ~۱۳KB   |
| حجم HTML نهایی (gzip)         |   ~۵KB    |
| **کل حجم (gzip)**             | **~۴۸KB** |
| زمان build                    |  ~۵۴۲ms   |
| TypeScript errors             |     ۰     |
| `any` در کد                   |     ۰     |
| `innerHTML` برای داده‌ی کاربر |     ۰     |

---

## 🧪 تست شده روی

| مرورگر  | نسخه | وضعیت |
| ------- | :--: | :---: |
| Chrome  | 120+ |  ✅   |
| Firefox | 121+ |  ✅   |
| Safari  | 17+  |  ✅   |
| Edge    | 120+ |  ✅   |

### دستگاه‌ها

- 📱 موبایل (۳۲۰px تا ۷۶۸px)
- 📱 تبلت (۷۶۸px تا ۱۰۲۴px)
- 💻 لپ‌تاپ (۱۰۲۴px تا ۱۴۴۰px)
- 🖥 دسکتاپ (۱۴۴۰px+)
- 🖥 4K (۳۸۴۰px+)

---

## 🤝 مشارکت

اگه باگی پیدا کردی یا پیشنهادی داری:

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

**[🔗 دمو](https://ArmanGhM.github.io/gang-of-fourty/shops/deep-module/) · [🐛 گزارش باگ](https://github.com/ArmanGhM/gang-of-fourty/issues) · [💡 پیشنهاد ویژگی](https://github.com/ArmanGhM/gang-of-fourty/issues)**

<br>

⭐ اگه از پروژه خوشت اومد، ستاره بده! ⭐

</div>
## ✅ Definition of Done

- [x] `package.json` با `private: true` و `type: "module"`
- [x] اسکریپت‌های `dev`, `build`, `preview`, `check`
- [x] `typescript` و `vite` در `devDependencies`
- [x] `package-lock.json` commit شده
- [x] `node_modules/` و `dist/` commit نشده
- [x] `tsconfig.json` با `strict: true` بدون `noImplicitAny: false`
- [x] `script.js` حذف شده؛ `script.ts` با `type="module"`
- [x] `querySelector<T>` با تایپ دقیق
- [x] `createElement<T>` با تایپ
- [x] `instanceof Element` قبل از `closest`
- [x] حداقل ۲ پکیج npm در `dependencies`
- [x] `npm run check` بدون خطا
- [x] `npm run build` موفق
- [x] `npm run dev` و `preview` بدون خطای کنسول
- [x] بدون `!` و `as` برای سرکوب خطا
- [x] HTML Validation پاس می‌شود
- [x] توضیح در PR با checklist و شواهد

## 🏅 امتیاز اضافه

- [x] `noImplicitAny: false` حذف شده
- [x] type برای همهٔ APIها (`Product`, `Category`, `Offer`, `Shop`, `Home`, `StockData`)
- [x] همهٔ توابع `fetch` خروجی `Promise<T>` دارند
- [x] همهٔ پارامترها و مقادیر برگشتی تایپ دارند
- [x] همهٔ متغیرها تایپ دارند یا مقدارشان تایپ را می‌سازد
- [x] هیچ `any` در کد نیست
- [x] `catch (err: unknown)` استفاده شده
- [x] `Record<number, number>` برای stock
- [x] `Map` برای `matchedIds` در جستجو

## 🧪 خروجی `npm run check`
