<div align="center">

# 🛒 سبزکاله (Sabzkaleh) — هفته ششم

### فروشگاه آنلاین مدرن با React 18، TypeScript سخت‌گیرانه، TanStack Router، Zustand و طراحی Mobile-First (سبک دیجی‌کالا)

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TanStack Router](https://img.shields.io/badge/TanStack_Router-v1-FF4154?style=for-the-badge)](https://tanstack.com/router)
[![Zustand](https://img.shields.io/badge/Zustand-5-443E38?style=for-the-badge)](https://zustand-demo.pmnd.rs/)
[![Oxlint](https://img.shields.io/badge/Oxlint-0_Warnings-2ea44f?style=for-the-badge)](https://oxc.rs/)
[![RTL](https://img.shields.io/badge/RTL-Persian-2ea44f?style=for-the-badge)]()
[![Responsive](https://img.shields.io/badge/Responsive-Mobile_First-orange?style=for-the-badge)]()

</div>

---

## 📖 فهرست مطالب

- [درباره پروژه و ارتقاهای اخیر](#-درباره-پروژه-و-ارتقاهای-اخیر)
- [ویژگی‌ها و بهینه‌سازی‌های انجام‌شده](#-ویژگیها-و-بهینهسازیهای-انجامشده)
  - [۱. مسیریابی تمیز با BrowserHistory و Vercel SPA](#-۱-مسیریابی-تمیز-با-browserhistory-و-vercel-spa)
  - [۲. هدر دو ردیفه سبک دیجی‌کالا و اسکرول هوشمند](#-۲-هدر-دو-ردیفه-سبک-دیجیکالا-و-اسکرول-هوشمند)
  - [۳. تجربه کاربری و رابط کاربری اختصاصی موبایل (Mobile UX/UI)](#-۳-تجربه-کاربری-و-رابط-کاربری-اختصاصی-موبایل-mobile-uxui)
  - [۴. پولیش بصری، اسکلتون لودینگ و تم تاریک/روشن](#-۴-پولیش-بصری-اسکلتون-لودینگ-و-تم-تاریکروشن)
- [ساختار فایل‌ها و ماژول‌ها](#-ساختار-فایلها-و-ماژولها)
- [تکنولوژی‌ها و ابزارها](#-تکنولوژیها-و-ابزارها)
- [نصب، اجرا و تست](#-نصب-اجرا-و-تست)

---

## ✨ درباره پروژه و ارتقاهای اخیر

**سبزکاله** یک سوپرمارکت آنلاین فارسی‌زبان (RTL) است که از معماری لایه‌ای هفته چهارم به یک اپلیکیشن مدرن با **React 18**، **TypeScript سخت‌گیرانه (`strict: true`)**، **TanStack Router** و **Zustand** ارتقا یافته است.

در جریان به‌روزرسانی‌های اخیر، کل تجربه کاربری دسکتاپ و به‌ویژه **موبایل** بازطراحی شد تا بدون تداخل چیدمان، بدون اسکرول افقی اضافی و با کیفیت اپلیکیشن‌های بومی تجارت الکترونیک (مانند دیجی‌کالا و آمازون) کار کند.

---

## 🚀 ویژگی‌ها و بهینه‌سازی‌های انجام‌شده

### ۱. مسیریابی تمیز با BrowserHistory و Vercel SPA
- **حذف `#` از آدرس‌ها:** تغییر تاریخچه روتر از `createHashHistory` به `createBrowserHistory` در `src/App.tsx` (مسیرهای تمیز مانند `/plp/offers`, `/product/101`, `/checkout`).
- **پیکربندی SPA Rewrite:** ایجاد فایل `vercel.json` با قوانین بازنویسی به `/index.html` تا رفرش مستقیم صفحات داخلی با خطای 404 مواجه نشود.
- **صفحه 404 اختصاصی:** طراحی `NotFound.tsx` با لینک بازگشت به خانه و پیشنهادات ویژه.
- **اصلاح مسیر باندل CSS:** ایمپورت مستقیم `style.css` در `src/main.tsx` و تنظیم `base: "/"` در `vite.config.ts` برای بارگذاری صحیح استایل در تمام مسیرهای تودرتو.

### ۲. هدر دو ردیفه سبک دیجی‌کالا و اسکرول هوشمند
- **هدر دو ردیفه (`SiteHeader`, `HeaderTop`, `MainNav`):**
  - ردیف بالا: لوگو (`HeaderLogo`) در راست، نوار جستجوی برجسته با پیشنهاد هوشمند (`SearchBox`) در مرکز، و دکمه‌های عملیاتی (`HeaderActions`: تغییر تم، حساب، علاقه‌مندی، سبد خرید و دکمه تسویه) در چپ.
  - ردیف پایین: منوی ناوبری افقی با اسکرول لمسی نرم، نمایش همه دسته‌بندی‌ها با ایموجی و نشانگر صفحه فعال (`nav-link--active`) + مگامنو (`MegaMenu`).
- **اسکرول هوشمند بدون پرش و هم‌پوشانی (`useScrollDirection` و `scrollDirection.ts`):**
  - منطق خالص و تست‌شده برای جلوگیری از لرزش (حداقل اسکرول `100px` و آستانه `10px` تغییر جهت).
  - پنهان شدن نرم نوار ناوبری (`max-height` و `opacity` در `.main-nav-wrapper.nav--hidden`) هنگام اسکرول به پایین و نمایش مجدد هنگام اسکرول به بالا، بدون ایجاد فاصله خالی (`Gap`) یا افتادن هدر روی تیتر محصولات.

### ۳. تجربه کاربری و رابط کاربری اختصاصی موبایل (Mobile UX/UI)
تمام قوانین ریسپانسیو با مدیا کوئری خالص CSS (`@media (max-width: 768px)`) و با **صفر میلی‌متر سرریز افقی (`scrollWidth <= innerWidth`)** پیاده‌سازی شده‌اند:

- **هدر شیشه‌ای موبایل (Glassmorphism) و ردیف جستجوی هوشمند:**
  - افکت شیشه‌ای نیمه‌شفاف روی هدر موبایل (`rgba(var(--surface-rgb), 0.85)` به همراه `backdrop-filter: blur(12px)`) و سایه نرم پایینی.
  - ردیف بالای موبایل: دکمه همبرگری انیمیشنی (`44×44px`) + لوگوی جمع‌وجور در راست، و آیکون‌های سبد خرید با نشانگر تعداد، علاقه‌مندی‌ها و دکمه بازگشت جستجو (`44×44px`) در چپ.
  - ردیف دوم موبایل: نوار جستجوی تمام‌عرض و گرد که با **اسکرول به پایین به‌صورت نرم جمع و مخفی می‌شود** (`header-top__search--hidden`) و با اسکرول به بالا (یا لمس آیکون ذره‌بین در ردیف بالا) دوباره باز و فوکوس می‌شود.
- **منوی کشویی موبایل (`MobileMenu.tsx`):**
  - باز شدن کشویی نرم از سمت راست با افکت پس‌زمینه مات (`backdrop-filter: blur(4px)`).
  - شامل لوگو، دسترسی سریع **پروفایل من**، **تغییر تم روشن/تاریک (`ThemeToggle`)** و لیست کامل دسته‌بندی‌ها و صفحات با ارتفاع لمسی استاندارد (`44px+`).
- **نوار ناوبری پایین صفحه (`MobileBottomNav.tsx`):**
  - نوار ثابت شبیه اپلیکیشن‌های موبایل (مخفی در دسکتاپ، فعال در `<= 768px`) شامل ۴ تب اصلی: **خانه**، **دسته‌ها** (همگام با `useUiStore`)، **سبد خرید** (با Badge قرمز تعداد) و **پروفایل**.
- **گرید محصولات ۲ ستونه و اهداف لمسی استاندارد (`44×44px`):**
  - نمایش دقیق **۲ ستون** در گرید محصولات موبایل (`repeat(2, minmax(0, 1fr))`) با فاصله `12px` و پدینگ بهینه کارت‌ها.
  - دکمه‌های افزودن به سبد خرید در موبایل با ابعاد تمام‌عرض متقارن و حداقل ارتفاع لمسی `44px`.
- **مودال‌ها به شکل Bottom Sheet در موبایل:**
  - تبدیل تمام مودال‌ها (`CartModal`, `WishlistPanel`, `FilterModal`, `UserModal`) در موبایل به **Bottom Sheet** با انیمیشن اسلاید از پایین (`sheetSlideUp`)، گوشه‌های بالایی گرد (`20px 20px 0 0`)، دستگیره کشیدن بالایی (`.modal-sheet__handle`) و پس‌زمینه تیره نیمه‌شفاف.

### ۴. پولیش بصری، اسکلتون لودینگ و تم تاریک/روشن
- **کارت محصولات مدرن (`ProductCard`, `ProductCardFooter`):** افکت هاور نرم، بزرگ‌نمایی لطیف تصویر محصول، برچسب تخفیف گرادیانت و دکمه‌های مدرن.
- **اسکلتون لودینگ (`SkeletonCard`, `Layout`):** جایگزینی متن ساده لودینگ با انیمیشن Shimmer و گرید اسکلتون ۴ کارتی متوازن.
- **رفع کامل تم تاریک مودال‌ها (`Modal.tsx`):** انتقال `data-theme` به کانتینر پورتال‌شده مودال (`document.body`) تا در حالت Dark Mode پس‌زمینه و متون مودال‌ها کاملاً خوانا و هماهنگ باشند.
- **تقسیم‌بندی ماژولار فایل‌ها:** جداسازی منطق تمرکز مودال (`useModalFocusTrap.ts`)، آیکون‌های نوار پایین (`MobileNavIcons.tsx`) و گروه‌های فیلتر (`FilterGroup.tsx`) برای حفظ اندازه کوتاه و خوانای فایل‌های `.tsx`.

---

## 📁 ساختار فایل‌ها و ماژول‌ها

```text
├── index.html                  # نقطه ورود HTML + متا تگ‌ها
├── style.css                   # استایل‌های کامل (تم روشن/تاریک + بخش اختصاصی موبایل)
├── vercel.json                 # بازنویسی مسیرها برای SPA در Vercel
├── vite.config.ts              # تنظیمات Vite با base: "/"
├── package.json                # اسکریپت‌ها و وابستگی‌ها
├── tests/
│   └── scrollDirection.test.ts # تست واحد منطق اسکرول هدر (node:test)
└── src/
    ├── main.tsx                # مانت React و ایمپورت style.css
    ├── App.tsx                 # پیکربندی TanStack Router با createBrowserHistory
    ├── types.ts                # تعاریف تایپ‌های سخت‌گیرانه فروشگاه
    ├── hooks/
    │   ├── scrollDirection.ts      # تابع خالص محاسبه پنهان/نمایش اسکرول
    │   ├── useScrollDirection.ts   # هوک اسکرول بدون لرزش
    │   ├── useModalFocusTrap.ts    # قفل اسکرول و Focus Trap مودال‌ها
    │   ├── useUiStore.ts           # استیت سراسری مودال‌ها و منوی موبایل (Zustand)
    │   ├── useCartStore.ts         # استور سبد خرید
    │   ├── useWishlistStore.ts     # استور علاقه‌مندی‌ها
    │   ├── useThemeStore.ts        # استور تم روشن/تاریک و پالت رنگی
    │   ├── useCatalog.ts           # واکشی و مدیریت داده‌های کاتالوگ
    │   ├── useFilters.ts           # منطق فیلتر و مرتب‌سازی
    │   └── useSearch.ts            # جستجوی فازی با Fuse.js
    └── components/
        ├── Layout.tsx              # پوسته اصلی، اسکلتون لودینگ و رندر MobileBottomNav
        ├── SiteHeader.tsx          # هدر چسبان با کنترل اسکرول
        ├── HeaderTop.tsx           # ردیف اول هدر، همبرگر انیمیشنی و سرچ‌بار جمع‌شونده
        ├── HeaderLogo.tsx          # لوگوی هدر
        ├── HeaderActions.tsx       # دکمه‌های عملیات هدر + بج سبد خرید و علاقه‌مندی‌ها
        ├── MainNav.tsx             # منوی افقی و مگامنو
        ├── MobileMenu.tsx          # منوی کشویی موبایل (لوگو، پروفایل، تم، دسته‌ها)
        ├── MobileBottomNav.tsx     # نوار ناوبری ثابت پایین موبایل
        ├── MobileNavIcons.tsx      # آیکون‌های SVG نوار پایین موبایل
        ├── Modal.tsx               # مودال پایه با پشتیبانی Bottom Sheet موبایل و Dark Mode
        ├── CartModal.tsx           # Bottom Sheet سبد خرید
        ├── WishlistPanel.tsx       # Bottom Sheet علاقه‌مندی‌ها
        ├── FilterModal.tsx         # Bottom Sheet فیلتر محصولات
        ├── FilterGroup.tsx         # کامپوننت قابل استفاده مجدد گروه فیلترها
        ├── ProductGrid.tsx         # گرید محصولات (۲ ستونه در موبایل)
        ├── ProductCard.tsx         # کارت محصول با افکت‌های مدرن
        ├── ProductCardFooter.tsx   # قیمت و دکمه افزودن به سبد (هدف لمسی 44px+)
        ├── SkeletonCard.tsx        # کارت اسکلتون Shimmer
        └── pages/
            ├── HomePage.tsx        # صفحه اصلی فروشگاه
            ├── PlpPage.tsx         # صفحه لیست محصولات و دسته‌بندی
            ├── ProductPage.tsx     # صفحه جزئیات محصول
            ├── CheckoutPage.tsx    # صفحه تسویه حساب
            └── NotFound.tsx        # صفحه 404 اختصاصی
```

---

## 🛠 تکنولوژی‌ها و ابزارها

| تکنولوژی | کاربرد |
| :--- | :--- |
| **React 18 + TypeScript 5** | رابط کاربری کامپوننتی با تایپ‌های سخت‌گیرانه (`strict: true`, بدون `any`) |
| **TanStack Router** | مسیریابی مدرن کلاینت با `createBrowserHistory` و پشتیبانی کامل Search Params |
| **Zustand** | مدیریت استیت سبک برای سبد خرید، علاقه‌مندی، تم و وضعیت UI/Drawer |
| **Vite 5** | سرور توسعه سریع و باندل بهینه Production |
| **Swiper + Fuse.js + Notyf** | اسلایدر لمسی، جستجوی فازی فارسی و پیام‌های Toast |
| **Oxlint** | بررسی سریع کیفیت کد بدون خطا و هشدار |

---

## 🧪 نصب، اجرا و تست

```bash
# نصب وابستگی‌ها
npm install

# اجرای سرور توسعه (پورت 3000)
npm run dev

# بررسی تایپ‌های TypeScript و بیلد نهایی
npm run build

# بررسی کیفیت کد با Oxlint
npm run lint

# اجرای تست واحد منطق اسکرول هوشمند هدر
npx tsx --test tests/scrollDirection.test.ts
```
