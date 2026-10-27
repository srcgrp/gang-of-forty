 <div align="center">

# 🛒 سبزکاله | Sabzkaleh

### سوپرمارکت آنلاین مدرن با TypeScript، Vite و چهار پکیج کاربردی npm

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Build](https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge)](#-شواهد-اجرای-پروژه)
[![TypeScript Errors](https://img.shields.io/badge/TypeScript_Errors-0-success?style=for-the-badge)](#-شواهد-اجرای-پروژه)
[![Any](https://img.shields.io/badge/Explicit_any-0-blue?style=for-the-badge)](#-استانداردهای-typescript)
[![HTML](https://img.shields.io/badge/HTML_Validation-Passing-success?style=for-the-badge)](#-شواهد-اجرای-پروژه)
[![RTL](https://img.shields.io/badge/RTL-Persian-2ea44f?style=for-the-badge)](https://en.wikipedia.org/wiki/Right-to-left_script)
[![Responsive](https://img.shields.io/badge/Responsive-320px_to_4K-orange?style=for-the-badge)](#-ویژگی‌های-پروژه)

<br>

**Week 3 Project · Gang of Fourty · Deep Module Shop**

[مشاهده دموی آنلاین](https://ArmanGhM.github.io/gang-of-fourty/shops/deep-module/) · [مشاهده مخزن گیت‌هاب](https://github.com/ArmanGhM/gang-of-fourty)

</div>

---

## 📌 درباره پروژه

**سبزکاله (Sabzkaleh)** یک فروشگاه آنلاین مدرن با رابط کاربری فارسی و راست‌چین است که با استفاده از **TypeScript، Vite، HTML5 و CSS3** توسعه داده شده است.

این پروژه نسخه ارتقایافته فروشگاه هفته دوم است که با هدف مهاجرت از JavaScript خالص به TypeScript، افزایش ایمنی کد، بهبود تجربه کاربری و آشنایی عملی با اکوسیستم npm پیاده‌سازی شده است.

تمرکز اصلی پروژه روی نوشتن کد قابل نگهداری، تایپ‌دهی دقیق، مدیریت داده‌های API، امنیت DOM، دسترس‌پذیری و بهینه‌سازی عملکرد است.

### 🎯 اهداف پروژه

- مهاجرت از JavaScript به TypeScript.
- راه‌اندازی Vite به‌عنوان سرور توسعه و ابزار Build.
- استفاده از npm برای مدیریت وابستگی‌ها.
- پیاده‌سازی چهار پکیج کاربردی npm.
- تایپ‌دهی دقیق داده‌ها، رویدادها، عناصر DOM و پاسخ‌های API.
- استفاده از تنظیمات سخت‌گیرانه TypeScript.
- حذف `any` صریح و جلوگیری از تایپ‌های ناامن.
- پیاده‌سازی حالت روشن و تاریک، سبد خرید و جستجوی پیشرفته.
- رعایت اصول امنیتی و استانداردهای دسترس‌پذیری.

## 🚀 شروع سریع

### پیش‌نیازها

- Node.js نسخه 22 یا بالاتر
- npm نسخه 10 یا بالاتر
- Git برای دریافت مخزن پروژه

### نصب و اجرا

ابتدا مخزن را دریافت کن:

```bash
git clone https://github.com/ArmanGhM/gang-of-fourty.git
```

وارد پوشه پروژه شو:

```bash
cd gang-of-fourty/shops/deep-module
```

وابستگی‌ها را نصب کن:

```bash
npm install
```

سرور توسعه را اجرا کن:

```bash
npm run dev
```

سپس آدرس نمایش‌داده‌شده در ترمینال را باز کن. آدرس پیش‌فرض Vite معمولاً این است:

`http://localhost:5173/`

### 📜 دستورات کاربردی

| دستور                   | کاربرد                                  |
| ----------------------- | --------------------------------------- |
| `npm install`           | نصب وابستگی‌های پروژه                   |
| `npm run dev`           | اجرای سرور توسعه                        |
| `npm run check`         | بررسی خطاهای TypeScript                 |
| `npm run build`         | بررسی TypeScript و ساخت نسخه Production |
| `npm run preview`       | اجرای پیش‌نمایش نسخه Build شده          |
| `npm run validate:html` | اعتبارسنجی HTML                         |

---

## 🛠 تکنولوژی‌های استفاده‌شده

| تکنولوژی     | نسخه | کاربرد                                             |
| ------------ | ---- | -------------------------------------------------- |
| TypeScript   | 5.9  | تایپ‌دهی ایستا و افزایش ایمنی کد                   |
| Vite         | 5.4  | سرور توسعه و Build                                 |
| npm          | 10+  | مدیریت پکیج‌ها                                     |
| HTML5        | —    | ساختار معنایی و دسترس‌پذیر                         |
| CSS3         | —    | طراحی واکنش‌گرا، Grid، Flexbox و Custom Properties |
| localStorage | —    | ذخیره‌سازی محلی سبد خرید، تنظیمات و کش             |
| Vazirmatn    | —    | فونت فارسی محلی                                    |

## 📦 پکیج‌های npm

در این پروژه چهار پکیج برای بهبود تجربه کاربری و قابلیت‌های فروشگاه استفاده شده‌اند.

| پکیج                                                                           | کاربرد                            |
| ------------------------------------------------------------------------------ | --------------------------------- |
| [`fuse.js`](https://www.npmjs.com/package/fuse.js)                             | جستجوی فازی و تحمل اشتباهات تایپی |
| [`notyf`](https://www.npmjs.com/package/notyf)                                 | نمایش اعلان‌های Toast             |
| [`canvas-confetti`](https://www.npmjs.com/package/canvas-confetti)             | افکت جشن هنگام تسویه حساب         |
| [`@formkit/auto-animate`](https://www.npmjs.com/package/@formkit/auto-animate) | متحرک‌سازی تغییرات لیست‌ها        |

> حجم نهایی وابستگی‌ها به نسخه‌ها، تنظیمات Build و میزان استفاده از قابلیت‌های هر پکیج بستگی دارد. برای اندازه‌گیری دقیق، خروجی Build نهایی ملاک است.

## ✨ ویژگی‌های پروژه

### 🎨 طراحی و رابط کاربری

- 🌗 **تم روشن و تاریک:** تغییر دستی، پشتیبانی از `prefers-color-scheme` و ذخیره تنظیمات در `localStorage`.
- 📱 **طراحی واکنش‌گرا:** سازگار با موبایل، تبلت، لپ‌تاپ و نمایشگرهای بزرگ.
- 🇮🇷 **رابط فارسی و راست‌چین:** استفاده از `lang="fa"` و `dir="rtl"`.
- 🔤 **فونت محلی Vazirmatn:** بدون وابستگی به CDN برای بارگذاری فونت.
- 🎨 **طراحی مدرن:** گرادیانت‌ها، رنگ‌های هماهنگ و جزئیات بصری.
- 🎞️ **انیمیشن‌های روان:** همراه با احترام به تنظیم `prefers-reduced-motion`.

### 🛒 قابلیت‌های فروشگاه

- افزودن محصولات به سبد خرید.
- افزایش و کاهش تعداد محصولات.
- حذف محصولات از سبد خرید.
- ذخیره سبد خرید در `localStorage`.
- هماهنگی محاسبه قیمت در کارت محصولات و سبد خرید با تابع `calcDiscountPrice()`.
- جستجوی فازی با استفاده از `fuse.js`.
- فیلتر محصولات بر اساس دسته‌بندی، موجودی و تخفیف.
- مرتب‌سازی محصولات.
- نمایش مودال جزئیات محصول.
- نمایش اعلان‌های موفقیت و خطا با `notyf`.
- افکت جشن با `canvas-confetti` هنگام تسویه حساب.
- انیمیشن تغییرات لیست با `@formkit/auto-animate`.

### ⚡ مدیریت داده و تجربه کاربری

- مدیریت وضعیت‌های Loading، Error و Empty.
- تلاش مجدد برای درخواست‌های ناموفق با Exponential Backoff تا سه بار.
- ذخیره کش داده‌ها در `localStorage` با زمان انقضای ۳۰ دقیقه.
- تشخیص وضعیت آفلاین و نمایش پیام مناسب.
- استفاده از داده‌های کش‌شده به‌عنوان راهکار جایگزین در حالت آفلاین.
- جستجوی Debounce با تأخیر ۳۵۰ میلی‌ثانیه.
- اعتبارسنجی داده‌های دریافت‌شده از API.
- مدیریت خطاهای ناهمگام با `catch (err: unknown)`.

---

## 🧠 استانداردهای TypeScript

پروژه با هدف استفاده عملی از TypeScript و قابلیت‌های تایپ‌دهی سخت‌گیرانه توسعه داده شده است.

### تنظیمات اصلی

تنظیمات اصلی `tsconfig.json` شامل موارد زیر است:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noEmit": true
  }
}
```

> این بخش تنظیمات اصلی را نشان می‌دهد؛ سایر گزینه‌های فایل واقعی پروژه می‌توانند جداگانه تعریف شده باشند. در حالت `strict: true`، گزینه `noImplicitAny` نیز به‌صورت پیش‌فرض فعال است، مگر اینکه صریحاً غیرفعال شود.

### مفاهیم TypeScript پیاده‌سازی‌شده

- **Interfaces:** تعریف ساختارهایی مانند `Product`، `Category`، `CartItem`، `Shop` و `Offer`.
- **Union Types:** تعریف نوع‌های محدود مانند `ErrorType`، `StockLevel` و `AddToCartReason`.
- **Optional Properties:** استفاده از ویژگی‌های اختیاری مانند `emoji?`، `unit?` و `categoryId?`.
- **Readonly Properties:** جلوگیری از تغییر فیلدهای ثابت.
- **Generics:** ساخت توابع عمومی مانند `h<K extends keyof HTMLElementTagNameMap>`.
- **Type Guards:** بررسی ساختار داده‌ها با توابعی مانند `isValidProduct`.
- **Type Predicates:** فیلتر کردن داده‌ها با حفظ نوع دقیق، مانند `item is CartItem`.
- **Unknown:** مدیریت ایمن خطاها و داده‌های ناشناخته.
- **Promise Types:** مشخص کردن نوع خروجی توابع ناهمگام.
- **Typed DOM:** تایپ‌دهی دقیق عناصر HTML و رویدادهای مرورگر.
- **Typed Parsers:** اعتبارسنجی و تبدیل داده‌های API بدون اتکا به Type Assertionهای ناامن.

### DOM و رویدادها

- استفاده از `querySelector<T>` با نوع مشخص.
- استفاده از `createElement<T>` در تابع کمکی `h`.
- تایپ‌دهی رویدادهای `MouseEvent`، `KeyboardEvent` و `SubmitEvent`.
- بررسی نوع `e.target` با `instanceof Element` پیش از فراخوانی `closest`.
- جلوگیری از استفاده از `any` صریح.
- پرهیز از Non-null Assertion با عملگر `!`.
- پرهیز از Type Assertion برای سرکوب خطاهای TypeScript.

---

## 🔒 امنیت و اعتبارسنجی داده‌ها

امنیت داده‌های ورودی و خروجی در پیاده‌سازی فروشگاه مورد توجه قرار گرفته است.

- استفاده از `textContent` به‌جای قرار دادن مستقیم داده‌های غیرقابل اعتماد در `innerHTML`.
- استفاده از `escapeHTML` برای Escape کردن متن‌هایی که در بستر HTML نمایش داده می‌شوند.
- اعتبارسنجی لینک‌ها با تابع `safeHref`.
- تبدیل کنترل‌شده اعداد با تابع `safeInt`.
- استفاده از Type Guard برای بررسی داده‌های نامشخص.
- مدیریت خطاها با `catch (err: unknown)`.
- اعتبارسنجی داده‌های ذخیره‌شده در `localStorage`.
- اعتبارسنجی ساختار داده‌های دریافتی از API پیش از استفاده.

**نکته امنیتی:** برای داده‌های غیرقابل اعتماد، از درج مستقیم HTML خودداری می‌شود. توابع Escape نیز باید متناسب با محل استفاده از داده طراحی شوند؛ Escape کردن HTML به‌تنهایی جایگزین اعتبارسنجی URL یا سایر کنترل‌های امنیتی نیست.

---

## ♿ دسترس‌پذیری (Accessibility)

در طراحی رابط کاربری، اصول دسترس‌پذیری و استفاده از قابلیت‌های بومی مرورگر در نظر گرفته شده‌اند.

- لینک Skip to Content.
- استفاده از برچسب‌های معنایی HTML.
- `aria-label` برای دکمه‌های فاقد متن قابل مشاهده.
- `role="dialog"` و `aria-modal="true"` برای مودال‌ها.
- استفاده از ویژگی‌های ARIA برای جستجو و پیشنهادهای آن.
- `aria-expanded` و `aria-controls` برای کنترل وضعیت اجزای تعاملی.
- `aria-pressed` برای دکمه تغییر تم.
- `aria-hidden="true"` برای آیکون‌های تزئینی.
- نمایش واضح Focus با `:focus-visible`.
- رعایت کنتراست مناسب رنگ‌ها.
- احترام به `prefers-reduced-motion`.
- پشتیبانی از زبان فارسی و جهت راست‌به‌چپ.

> برای ادعای انطباق کامل با WCAG AA، انجام تست کنتراست، بررسی صفحه‌خوان و آزمون دستی تعاملات صفحه ضروری است.

---

## 📁 ساختار پروژه

```text
shops/
└── deep-module/
    ├── index.html
    ├── style.css
    ├── script.ts
    ├── package.json
    ├── package-lock.json
    ├── tsconfig.json
    ├── vite.config.ts
    ├── .gitignore
    ├── .htmlvalidate.json
    ├── README.md
    ├── assets/
    │   ├── fonts/
    │   │   └── Vazirmatn font files
    │   └── img/
    │       └── SVG and PNG images
    └── dist/
        └── Production build output
```

> پوشه `dist/` خروجی Build است و نباید در Git ثبت شود، مگر اینکه روند انتشار پروژه صراحتاً به آن نیاز داشته باشد. پوشه `node_modules/` نیز باید در `.gitignore` قرار بگیرد.

---

## 📊 آمار و عملکرد Build

اعداد زیر بر اساس خروجی Build ثبت‌شده برای این پروژه هستند و ممکن است با تغییر کد یا نسخه وابستگی‌ها متفاوت شوند.

| مورد                               |       مقدار ثبت‌شده |
| ---------------------------------- | ------------------: |
| خطوط TypeScript                    |            حدود ۹۰۰ |
| خطوط CSS                           |          حدود ۲٬۹۰۰ |
| خطوط HTML                          |            حدود ۶۰۰ |
| پکیج‌های اصلی npm                  |                   ۴ |
| حجم JavaScript نهایی               |            ۹۵٫۴۱ KB |
| حجم JavaScript با gzip             |            ۳۲٫۱۰ KB |
| حجم CSS نهایی                      |            ۵۷٫۶۳ KB |
| حجم CSS با gzip                    |            ۱۲٫۰۲ KB |
| زمان Build                         | حدود ۵۷۰ میلی‌ثانیه |
| خطاهای TypeScript در اجرای ثبت‌شده |                   ۰ |

حجم JavaScript و CSS به‌تنهایی برابر با حدود ۴۴٫۱۲ کیلوبایت gzip است. حجم کل انتقالی صفحه به فایل‌های دیگر، از جمله HTML و سایر منابع وابسته، نیز بستگی دارد.

---

## 🧪 شواهد اجرای پروژه

### ۱. بررسی TypeScript

دستور:

```bash
npm run check
```

خروجی ثبت‌شده:

```text
> deep-module@1.0.0 check
> tsc --noEmit
```

خروجی بدون خطا بوده است.

### ۲. ساخت نسخه Production

دستور:

```bash
npm run build
```

خروجی ثبت‌شده:

```text
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

### ۳. اعتبارسنجی HTML

دستور:

```bash
npm run validate:html
```

خروجی ثبت‌شده:

```text
> deep-module@1.0.0 validate:html
> html-validate index.html
```

خروجی بدون خطا بوده است.

> این خروجی‌ها شواهد ثبت‌شده از اجرای پروژه هستند و لزوماً نتیجه اجرای جدید در محیط فعلی نیستند.

---

## 📋 Definition of Done

چک‌لیست معیارهای تکمیل پروژه:

- [x] تعریف `private: true` و `type: "module"` در `package.json`.
- [x] تعریف اسکریپت‌های `dev`، `build`، `preview`، `check` و `validate:html`.
- [x] استفاده از TypeScript، Vite و html-validate.
- [x] ثبت `package-lock.json`.
- [x] قرار دادن `node_modules/` و `dist/` در `.gitignore`.
- [x] فعال بودن `strict: true` در TypeScript.
- [x] مهاجرت منطق برنامه به `script.ts`.
- [x] استفاده از `type="module"` برای ورود ماژول TypeScript در HTML.
- [x] تایپ‌دهی عناصر DOM و توابع کمکی.
- [x] بررسی `instanceof Element` پیش از استفاده از `closest`.
- [x] استفاده از چهار پکیج کاربردی npm.
- [x] اجرای موفق بررسی TypeScript در خروجی ثبت‌شده.
- [x] اجرای موفق Build در خروجی ثبت‌شده.
- [x] اعتبارسنجی موفق HTML در خروجی ثبت‌شده.
- [x] پرهیز از Non-null Assertion در کد مورد بررسی.
- [x] پرهیز از استفاده از Type Assertion برای سرکوب خطاها در کد مورد بررسی.

## 🏅 موارد تکمیلی TypeScript

- [x] حذف تنظیم صریح `noImplicitAny: false`.
- [x] تعریف نوع برای مدل‌های اصلی داده.
- [x] استفاده از `Promise<T>` برای خروجی توابع ناهمگام.
- [x] تایپ‌دهی پارامترها و مقادیر برگشتی.
- [x] پرهیز از `any` صریح در کد مورد بررسی.
- [x] استفاده از `unknown` در مدیریت خطاها.
- [x] استفاده از `Record<number, number>` برای داده‌های موجودی.
- [x] استفاده از `Map<number, true>` برای شناسه‌های تطبیق‌یافته در جستجو.
- [x] استفاده از `readonly` برای فیلدهای واقعاً ثابت.
- [x] تعریف Type Guard برای داده‌های محصولات، دسته‌بندی‌ها، تخفیف‌ها و کش.
- [x] پیاده‌سازی Parserهای تایپ‌شده برای داده‌های فروشگاه.

---

## 📦 نمونه پیکربندی package.json

نمونه‌ای از ساختار تنظیمات و وابستگی‌های پروژه:

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

> این نمونه برای مستندسازی است. نسخه‌های واقعی نصب‌شده را می‌توان از `package.json` و نسخه‌های دقیق قفل‌شده را از `package-lock.json` بررسی کرد.

### نمونه پیکربندی HTML Validate

فایل `.htmlvalidate.json`:

```json
{
  "extends": ["html-validate:recommended"],
  "rules": {
    "void-style": "off",
    "prefer-native-element": "off"
  }
}
```

این پیکربندی، قوانین پیشنهادی html-validate را فعال می‌کند و دو قانون مشخص را متناسب با ساختار پروژه تغییر می‌دهد.

---

## ❓ پاسخ به سؤالات فنی پروژه

### ۱. کدام سطح از معیارهای پروژه پیاده‌سازی شده است؟

بر اساس مستندات و چک‌لیست پروژه، هدف پیاده‌سازی معیارهای اصلی و موارد امتیاز اضافه بوده است. تأیید نهایی هر معیار به بررسی کد و خروجی واقعی آن بستگی دارد.

### ۲. خروجی `npm run check` چیست؟

در اجرای ثبت‌شده، دستور `tsc --noEmit` بدون خطا به پایان رسیده است. این دستور نوع‌های TypeScript را بررسی می‌کند و فایل JavaScript خروجی تولید نمی‌کند.

### ۳. چرا از `fuse.js` و `notyf` استفاده شده است؟

- **Fuse.js:** برای جستجوی فازی و پیدا کردن محصولات حتی هنگام وجود اشتباه تایپی.
- **Notyf:** برای نمایش اعلان‌های کوتاه و واضح هنگام عملیات‌هایی مانند افزودن محصول یا نمایش خطا.

هر دو پکیج به بهبود تجربه کاربری کمک می‌کنند و قابلیت‌های آماده‌ای در اختیار برنامه قرار می‌دهند.

### ۴. یک خطای TypeScript و روش حل آن چه بود؟

خطای `TS2540` زمانی رخ می‌دهد که تلاش شود یک ویژگی فقط‌خواندنی تغییر کند.

راهکار مناسب، بررسی هدف آن ویژگی است: اگر مقدار واقعاً باید ثابت بماند، `readonly` حفظ می‌شود؛ اگر مقدار قرار است در طول اجرای برنامه تغییر کند، تعریف نوع باید متناسب با این رفتار اصلاح شود.

### ۵. تفاوت dependencies و devDependencies چیست؟

- `dependencies`: وابستگی‌های موردنیاز برنامه در زمان اجرا یا وابستگی‌هایی که هنگام Build به کد نهایی وارد می‌شوند.
- `devDependencies`: ابزارهای توسعه، بررسی نوع، اعتبارسنجی و Build که معمولاً برای توسعه و ساخت پروژه استفاده می‌شوند.

### ۶. چرا package-lock.json ثبت می‌شود اما node_modules نه؟

`package-lock.json` نسخه‌های دقیق وابستگی‌ها را ثبت می‌کند و نصب قابل تکرار را آسان‌تر می‌سازد. در مقابل، `node_modules/` از روی فایل‌های مدیریت وابستگی بازسازی می‌شود و معمولاً نباید در Git ثبت شود.

### ۷. چرا noImplicitAny اهمیت دارد؟

این گزینه از تبدیل ضمنی نوع‌های نامشخص به `any` جلوگیری می‌کند. در نتیجه، برنامه‌نویس باید در نقاطی که TypeScript نمی‌تواند نوع را استنتاج کند، نوع مناسب را مشخص کند.

---

## 🌐 مشاهده پروژه

- **دموی آنلاین:** [Sabzkaleh — GitHub Pages](https://ArmanGhM.github.io/gang-of-fourty/shops/deep-module/)
- **مخزن پروژه:** [ArmanGhM/gang-of-fourty](https://github.com/ArmanGhM/gang-of-fourty)
- **مستندات TypeScript:** [typescriptlang.org](https://www.typescriptlang.org/)
- **مستندات Vite:** [vite.dev](https://vite.dev/)
- **مستندات npm:** [npmjs.com](https://www.npmjs.com/)

---

## 📄 مجوز استفاده

این پروژه با مجوز **MIT** معرفی شده است.

برای انتشار رسمی تحت این مجوز، وجود فایل `LICENSE` با متن کامل مجوز MIT در مخزن پروژه ضروری است.

## 🙏 قدردانی

- **Gang of Fourty:** برای مسیر آموزشی و تسک‌های عملی.
- **Vazirmatn:** برای فونت فارسی متن‌باز.
- **TypeScript و Vite:** برای ابزارهای توسعه مدرن.
- **جامعه متن‌باز npm:** برای کتابخانه‌ها و ابزارهای کاربردی.

<div align="center">

---

### ساخته‌شده با ❤️، TypeScript و اشتیاق به یادگیری

**Sabzkaleh · Week 3 · Deep Module Shop**

</div>
