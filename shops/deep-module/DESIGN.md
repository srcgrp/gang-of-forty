# 📐 DESIGN.md — معماری چندصفحه‌ای سبزکاله (هفته ششم)

## ۱. جدول مسیرها (Routes)

| مسیر (`path`) | کامپوننت | Search / Params | کاربرد |
| :--- | :--- | :--- | :--- |
| `/` (`__root__` + `Layout`) | `HomePage` | — | صفحه اصلی: بنرها، شمارش معکوس و کاروسل‌های `home.json` با لینک «مشاهده همه» |
| `/plp/$carouselId` | `PlpPage` | `params.carouselId`, `search.sort` (`default` \| `price`) | صفحه فهرست محصولات هر کاروسل با مرتب‌سازی از طریق URL Search Params |
| `/product/$productId` | `ProductPage` | `params.productId` (`Number(productId)`) | صفحه جزئیات محصول، موجودی، تخفیف و افزودن به سبد خرید |
| `/checkout` | `CheckoutPage` | — | فرم کنترل‌شده ثبت سفارش (نام، موبایل، آدرس) با فوکوس خودکار روی اولین خطا |
| `*` (`notFoundComponent`) | `NotFound` | — | صفحه ۴۰۴ فارسی برای مسیرهای نامعتبر با لینک بازگشت به خانه |

> مسیریابی با `@tanstack/react-router` و `createHashHistory` پیاده‌سازی شده است.

---

## ۲. جدول Storeها و مدیریت State (Stores)

| Store / Hook | کتابخانه | State ذخیره‌شده | ذخیره‌سازی (Persist) | کاربرد |
| :--- | :--- | :--- | :--- | :--- |
| `useThemeStore` (`src/hooks/useThemeStore.ts`) | Zustand (`persist`) | `theme: "light" \| "dark"` | `localStorage` (`sabzkaleh-theme`) | اعمال `data-theme` روی `<div className="app">` بدون دستکاری `document.documentElement` |
| `useCartStore` (`src/hooks/useCartStore.ts`) | Zustand (`persist`) | `items: CartLine[]`, `consumed: Record<number, number>` | `localStorage` (`sabzkaleh-cart` + `storage/cart.ts`) | مدیریت سبد خرید بدون prop drilling؛ `count` و `total` به‌صورت derived با توابع خالص `src/cart/cart.ts` محاسبه می‌شوند |
| `useWishlistStore` (`src/hooks/useWishlistStore.ts`) | Zustand (`persist`) | `ids: number[]` | `localStorage` (`sabzkaleh-wishlist`) | ذخیره و تغییر علاقه‌مندی‌ها در کارت و مودال |
| `useCatalog` / `useCatalogStore` (`src/hooks/useCatalog.ts`) | Zustand + Hook | `state: LoadState<AppData>`, `attempt: number` | RAM (با `AbortController` و `retry`) | دریافت داده‌های API یک‌بار و جلوگیری از fetch تکراری در `App.tsx` |
| `useUiStore` (`src/hooks/useUiStore.ts`) | Zustand | `cartOpen`, `wishlistOpen`, `userOpen` | RAM | کنترل باز و بسته بودن مودال‌ها بدون prop drilling |

---

## ۳. درخت کامپوننت صفحات (Component Tree)

### `Layout` (`__root__`)
```text
Layout (<div className="app" data-theme={theme}>)
├── SiteHeader (TopBar + Link(/) + SearchBox + HeaderActions(ThemeToggle, Wishlist, Cart, Checkout Link) + MainNav)
├── <main id="main"><Outlet /></main>
├── SiteFooter
├── CartModal → CartPanel → Link(/checkout)
├── WishlistPanel → WishlistItemRow
└── UserModal
```

### `HomePage` (`/`)
```text
HomePage
├── Hero
├── HeroCards
├── SaleCountdown
├── CategoriesSection
├── BannersSection
└── Carousel Sections (home.carousels)
    ├── Header + <Link to="/plp/$carouselId">مشاهده همه</Link>
    └── CategorySlider → ProductCard (memo)
```

### `PlpPage` (`/plp/$carouselId`)
```text
PlpPage
├── Invalid carouselId → "این فهرست پیدا نشد" + Link(/)
└── Valid carouselId
    ├── Header + Sort Links (sort=default | sort=price) + Link(/)
    └── ProductGrid → ProductCard (memo) → Link(/product/$productId)
```

### `CheckoutPage` (`/checkout`)
```text
CheckoutPage
├── Order Total (cartTotal از useCartStore)
└── Controlled Form (onSubmit + validateCheckout + useRef focus)
    ├── <label htmlFor="checkout-name"> + <input ref={nameRef} />
    ├── <label htmlFor="checkout-mobile"> + <input ref={mobileRef} />
    ├── <label htmlFor="checkout-address"> + <textarea ref={addressRef} />
    └── Submit → consumeAndClear() + confetti + toast + navigate({ to: '/', replace: true })
```
