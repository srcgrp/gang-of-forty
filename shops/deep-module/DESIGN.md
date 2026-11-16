# 📐 DESIGN.md — معماری و طراحی سبزکاله (هفته پنجم)

## ۱. معماری React

پروژه از معماری کامپوننت‌محور React استفاده می‌کند. State اصلی در `App` مدیریت می‌شود و از طریق hooks و props به کامپوننت‌های فرزند منتقل می‌شود.

## ۲. درخت کامپوننت‌ها (Component Tree)

App
├── SiteHeader
│ ├── TopBar (shop.notice)
│ ├── Header (brand + SearchBox + actions)
│ │ ├── SearchBox (query + suggestions)
│ │ ├── ThemeIcon (dark/light)
│ │ └── Cart Badge
│ └── MainNav
│ ├── Mobile Toggle
│ ├── Mega Menu (categories)
│ └── Nav Links (shop.menu)
├── main
│ ├── Hero (HeroCopy + HeroVisual)
│ ├── HeroCards (home.hero + home.side)
│ ├── SaleCountdown (24h timer + localStorage)
│ ├── CategoriesSection (grid)
│ ├── SpecialOffers (Swiper)
│ ├── BannersSection (home.promos)
│ ├── CategorySections
│ │ └── CategorySlider (Swiper per category)
│ └── ProductGrid (all-products + filter)
├── SiteFooter
├── Cart Modal (with controls + checkout confetti)
└── Filter Modal (category/stock/discount/sort)

## ۳. مدیریت State

| State                                        | مالک                       | چه کسی عوضش می‌کند                             | ذخیره‌سازی                     |
| :------------------------------------------- | :------------------------- | :--------------------------------------------- | :----------------------------- |
| `products/categories/shop/home/offers/stock` | `App` (via `useShopData`)  | `useEffect` (fetch API)                        | RAM                            |
| `query`                                      | `App`                      | `SearchBox` (onChange)                         | RAM                            |
| `cart`                                       | `App` (via `useCart`)      | `addToCart`/`increase`/`decrease`/`removeItem` | RAM + `localStorage`           |
| `filters`                                    | `App` (via `useFilters`)   | `FilterModal` (onChange)                       | RAM                            |
| `cartOpen`                                   | `App`                      | Header cart button                             | RAM                            |
| `filterOpen`                                 | `App`                      | Filter button                                  | RAM                            |
| `attempt`                                    | `App`                      | Retry button (error)                           | RAM                            |
| `theme`                                      | `useTheme`                 | Theme toggle button                            | `localStorage`                 |
| `time`                                       | `useCountdown`             | `setInterval` (1s)                             | RAM + `localStorage` (endTime) |
| `suggestions`                                | `App` (via `useSearch`)    | Fuse.js on `query`                             | RAM (computed)                 |
| `filtered`                                   | `App` (via `applyFilters`) | Computed from filters + query                  | RAM (computed)                 |
| `cartTotal`                                  | `CartPanel`                | Computed from `cart`                           | RAM (computed)                 |

**مقادیر محاسبه‌شده (Computed):**

- `suggestions` — از `useSearch` (Fuse.js روی products)
- `filtered` — از `applyFilters` (category/stock/discount/sort/query)
- `cartTotal` — از `cart.reduce` در `CartPanel`
- `activeCount` — تعداد فیلترهای فعال (از `useFilters`)
- `catProducts` — محصولات هر دسته (از `CategorySections`)

## ۴. Hooks سفارشی

| Hook                         | کاربرد                                       |
| :--------------------------- | :------------------------------------------- |
| `useShopData(attempt)`       | دریافت داده‌ها از API + retry                |
| `useCart()`                  | مدیریت سبد + localStorage + toast + confetti |
| `useFilters()`               | فیلترها + `applyFilters`                     |
| `useSearch(products, query)` | جستجوی فازی با Fuse.js                       |
| `useTheme()`                 | تم روشن/تاریک + localStorage                 |
| `useCountdown()`             | شمارنده حراج ۲۴ ساعته + localStorage         |

## ۵. ساختار پوشه‌ها

src/
├── types.ts ← تایپ‌ها (بدون import)
├── main.tsx ← نقطه ورود React
├── App.tsx ← کامپوننت اصلی
│
├── components/
│ ├── SiteHeader.tsx
│ ├── TopBar.tsx
│ ├── MainNav.tsx
│ ├── SearchBox.tsx
│ ├── ThemeIcon.tsx
│ ├── Logo.tsx
│ ├── Hero.tsx
│ ├── HeroCopy.tsx
│ ├── HeroVisual.tsx
│ ├── HeroCards.tsx
│ ├── CategoriesSection.tsx
│ ├── CategorySections.tsx
│ ├── CategorySlider.tsx ← Swiper
│ ├── SaleCountdown.tsx
│ ├── SpecialOffers.tsx ← Swiper
│ ├── BannersSection.tsx
│ ├── ProductGrid.tsx
│ ├── ProductCard.tsx
│ ├── CartPanel.tsx
│ ├── FilterModal.tsx
│ └── SiteFooter.tsx
│
├── hooks/
│ ├── useShopData.ts
│ ├── useCart.ts
│ ├── useFilters.ts
│ ├── useSearch.ts
│ ├── useTheme.ts
│ └── useCountdown.ts
│
└── shared/
├── types.ts
├── api/
│ ├── client.ts
│ ├── guards.ts
│ └── load.ts
└── ui/
├── format.ts
└── toast.ts

## ۶. تکنولوژی‌ها

| پکیج                      | کاربرد                           |
| :------------------------ | :------------------------------- |
| **react** / **react-dom** | UI                               |
| **vite**                  | build tool                       |
| **typescript**            | strict types                     |
| **swiper**                | اسلایدر (پیشنهاد ویژه + دسته‌ها) |
| **fuse.js**               | جستجوی فازی                      |
| **notyf**                 | toast notification               |
| **canvas-confetti**       | افکت جشن (checkout)              |
| **oxlint**                | linter                           |

## ۷. امکانات

- ✅ **Theme Toggle** (روشن/تاریک + localStorage)
- ✅ **Live Search** (Fuse.js fuzzy)
- ✅ **Filter کامل** (category/stock/discount/sort)
- ✅ **Cart Modal** با controls (+/−/حذف/checkout)
- ✅ **Confetti** موقع ثبت سفارش
- ✅ **Toast** برای افزودن/حذف
- ✅ **Swiper** برای پیشنهاد ویژه و دسته‌ها
- ✅ **Countdown** ۲۴ ساعته با localStorage
- ✅ **Category Sections** جداگانه با slug anchors
- ✅ **Mobile Nav** (hamburger toggle)
- ✅ **RTL** کامل
- ✅ **A11y** (aria-label, aria-expanded, aria-pressed)
