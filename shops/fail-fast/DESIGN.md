# DESIGN.md — اسپیس مارکت

سند طراحی فنی نسخه فعلی پروژه اسپیس مارکت؛ یک سوپرمارکت آنلاین فارسی با چیدمان راست‌به‌چپ (RTL) که با React، TypeScript و Vite پیاده‌سازی شده است.

---

## ۱. Scope & Requirements

### محدوده فعلی

اسپیس مارکت صفحه اصلی، صفحه فهرست محصولات بر اساس carousel و سبد خرید را ارائه می‌دهد. مسیرها با TanStack Router و hash history مدیریت می‌شوند. سبد خرید و تم با Zustand نگهداری می‌شوند و داده‌های کاتالوگ با چند هوک React دریافت و اعتبارسنجی می‌شوند.

### قابلیت‌های پیاده‌شده

| قابلیت | وضعیت | توضیح |
|--------|-------|-------|
| صفحه اصلی | ✅ | بنرها، دسته‌بندی‌ها، carouselهای محصولات و تبلیغات |
| صفحه PLP | ✅ | مسیر `plp/$carouselId` برای carouselهای `offers` و `dairy` |
| کاتالوگ | ✅ | ترکیب سه `LoadState` در `useCatalog()` |
| سبد خرید | ✅ | افزودن، شمارش، نمایش جزئیات، حذف کامل خط و محاسبه مجموع |
| ذخیره سبد | ✅ | localStorage با کلید `space-market-cart` |
| تم روشن/تاریک | ✅ | Zustand persist با کلید `fail-fast-theme` |
| حالت بارگذاری/خطا | ✅ | `LoadingContent` بر اساس وضعیت کاتالوگ |
| انتخاب دسته‌بندی | ⚠️ | فقط انتخاب و bold شدن آیتم در `Nav`؛ فیلتر واقعی ندارد |
| جستجو | ⚠️ | فقط input نمایشی؛ React state یا فیلتر ندارد |

### پیاده‌نشده یا خارج از محدوده

- صفحه جزئیات محصول
- جستجو و فیلتر واقعی محصولات
- نمایش موجودی انبار و وضعیت ناموجود بودن
- تغییر تعداد هر خط سبد به‌صورت جداگانه؛ فقط افزودن و حذف کامل خط وجود دارد
- تکمیل خرید و پرداخت
- احراز هویت کاربر
- نوتیفیکیشن؛ `notyf` نصب شده اما در `src/` استفاده نمی‌شود

### محدودیت‌های شناخته‌شده

- `ProductCard` با `memo` پوشش داده نشده است؛ بهینه‌سازی رندر به‌عنوان bonus انجام نشده است.
- فایل‌های `ProductGrid.tsx` و `CategoryNav.tsx` در `src/components/` وجود دارند اما در JSX فعلی import یا استفاده نمی‌شوند.
- `stock.json` و `shop.json` در پوشه `api/` وجود دارند، اما کد فعلی آن‌ها را fetch نمی‌کند.

---

## ۲. Architecture & Folder Structure

### نقطه ورود و جریان رندر

`index.html` فایل `src/main.tsx` را بارگذاری می‌کند. `main.tsx` برنامه را در `StrictMode` و `RouterProvider` قرار می‌دهد. root route کامپوننت `App` را رندر می‌کند و `App` صفحه‌ها را از طریق `Outlet` داخل `PageLayout` نمایش می‌دهد.

```text
index.html
└─ src/main.tsx
   └─ StrictMode
      └─ RouterProvider
         └─ App
            └─ PageLayout
               ├─ Header
               ├─ main → Outlet / CartPanel
               └─ Footer
```

### ساختار پوشه‌ها

```text
src/
├── main.tsx
├── router.tsx
├── App.tsx
├── cart.ts
├── types.ts
├── api/
│   ├── client.ts
│   ├── guards.ts
│   └── guards/
│       ├── index.ts
│       ├── exports.ts
│       ├── primitives.ts
│       ├── product.ts
│       ├── offer.ts
│       ├── stock.ts
│       ├── category.ts
│       └── filters.ts
├── catalog/
│   ├── catalog.ts
│   └── carousel.ts
├── components/
│   ├── Header/
│   │   ├── TopBar.tsx
│   │   ├── SearchBox.tsx
│   │   └── Nav.tsx
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── ProductListingPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── Header.tsx
│   ├── PageLayout.tsx
│   ├── CartPanel.tsx
│   ├── ThemeToggle.tsx
│   ├── SuccessContent.tsx
│   ├── ProductCarousel.tsx
│   ├── ProductCard.tsx
│   ├── ProductGrid.tsx        # بدون استفاده در JSX فعلی
│   ├── CategoryNav.tsx        # بدون استفاده در JSX فعلی
│   ├── HeroBanner.tsx
│   ├── Banner02.tsx
│   ├── PopularCategories.tsx
│   ├── CategoryCard.tsx
│   ├── Advertisement.tsx
│   ├── LoadingContent.tsx
│   └── Footer.tsx
├── context/
│   └── CatalogContext.tsx
├── hooks/
│   ├── useAppData.ts
│   ├── useHomeData.ts
│   ├── useOffers.ts
│   ├── useCatalog.ts
│   ├── useCartStore.ts
│   ├── useThemeStore.ts
│   ├── useCategorySelection.ts
│   └── useDocumentTitle.ts
├── storage/
│   └── cartStorage.ts
├── css/
│   └── style.css
├── fonts/
└── images/
```

### مسئولیت فایل‌های اصلی

| فایل | مسئولیت |
|------|---------|
| `src/main.tsx` | ساخت root و رندر `RouterProvider` |
| `src/router.tsx` | تعریف route tree با `createHashHistory()` و `notFoundComponent` |
| `src/App.tsx` | ترکیب کاتالوگ، انتخاب دسته، سبد، عنوان صفحه و ساخت `PageLayout` |
| `src/components/PageLayout.tsx` | قالب مشترک، `data-theme` و `Header` / `main` / `Footer` |
| `src/components/pages/*` | صفحه‌های `HomePage`، `ProductListingPage` و `NotFoundPage` |
| `src/components/Header.tsx` | ساختار Header و انتقال propها به `Nav` |
| `src/components/CartPanel.tsx` | نمایش سبد بر اساس `location.hash === 'cart'` |
| `src/components/SuccessContent.tsx` | محتوای صفحه اصلی در حالت موفق |
| `src/components/ProductCarousel.tsx` | carousel محصولات و لینک به PLP |
| `src/components/ProductCard.tsx` | نمایش یک محصول و دکمه افزودن به سبد |
| `src/context/CatalogContext.tsx` | Context برای دسترسی صفحه‌ها به `Catalog` آماده |
| `src/hooks/*` | دریافت داده، storeها، انتخاب دسته و عنوان صفحه |
| `src/storage/cartStorage.ts` | خواندن/نوشتن سبد در localStorage |
| `src/api/client.ts` | تنها لایه مجاز به `fetch` |
| `src/api/guards*` | اعتبارسنجی runtime داده‌ها |
| `src/catalog/catalog.ts` و `src/catalog/carousel.ts` | منطق خالص کاتالوگ و انتخاب محصولات carousel |

### نکته تاریخی

فایل `app.js` در ریشه پروژه یک نسخه قدیمی مبتنی بر DOM مستقیم است و در `index.html` بارگذاری نمی‌شود. نقطه ورود فعلی `src/main.tsx` است. فایل `src/main.ts` که در نسخه‌های قبلی مستندات ذکر شده بود، در پروژه وجود ندارد.

---

## ۳. Data Ownership & API Contract

### داده‌های مورد استفاده

| داده | منبع | مصرف‌کننده | استفاده فعلی |
|------|------|------------|--------------|
| محصولات | `${VITE_API_URL}/products.json` | `useAppData()` | محصولات carouselها و PLP |
| دسته‌بندی‌ها | `${VITE_API_URL}/categories.json` | `useAppData()` | منوی دسته‌بندی در `Header`/`Nav` |
| carouselها | `${VITE_API_URL}/home.json` | `useHomeData()` | ساخت carouselهای صفحه اصلی |
| پیشنهادات | `${VITE_API_URL}/offers.json` | `useOffers()` | تخفیف محصولات در کارت‌ها و PLP |
| موجودی | `api/stock.json` | — | در کد فعلی fetch یا استفاده نمی‌شود |
| اطلاعات فروشگاه | `api/shop.json` | — | در کد فعلی fetch یا استفاده نمی‌شود |

### محیط API

| فایل | مقدار `VITE_API_URL` |
|------|----------------------|
| `.env.development` | `/api` |
| `.env.production` | `../../api` |

در `vite.config.ts` مسیر `/api` برای development و preview به `https://gof.zzb.cx` proxy می‌شود. `base` برابر `./` است.

### قرارداد `getJSON`

`getJSON(path: string): Promise<unknown>` تنها تابع مجاز به `fetch` است:

- اگر `response.ok` نباشد، خطای `HTTP ...` throw می‌شود.
- اگر JSON parse نشود، خطا throw می‌شود.
- داده به‌صورت `unknown` برگردانده می‌شود تا caller آن را اعتبارسنجی کند.

### اعتبارسنجی داده‌ها

| داده | اعتبارسنجی فعلی |
|------|------------------|
| محصولات | `filterValidProducts()`؛ رکوردهای نامعتبر حذف و تعداد آن‌ها در console ثبت می‌شود |
| دسته‌بندی‌ها | `isCategory()` روی هر آیتم |
| `home.json` | `isHomeData()`؛ فقط ساختار `carousels` و فیلدهای `id`، `title` و `emoji` هر carousel بررسی می‌شود |
| پیشنهادات | `useOffers()` یک `isOffer()` محلی دارد و آرایه را با آن فیلتر می‌کند |
| موجودی | `isStock()` در guards وجود دارد، اما در جریان فعلی برنامه استفاده نمی‌شود |
| پیشنهادات از guards | `filterValidOffers()` وجود دارد، اما `useOffers()` از آن استفاده نمی‌کند |

---

## ۴. UI States & Loading Behavior

### نوع `LoadState`

```typescript
type LoadState<T> =
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "empty" }
  | { status: "error"; message: string }
```

### وضعیت هر هوک

| هوک | Loading | Success | Empty | Error |
|-----|---------|---------|-------|-------|
| `useAppData()` | حالت اولیه | محصولات و دسته‌بندی‌های معتبر | اگر محصولات یا دسته‌بندی‌ها خالی باشند | خطای fetch یا آرایه نبودن `categories`؛ محصولات نامعتبر حذف می‌شوند و می‌توانند به empty منجر شوند |
| `useHomeData()` | حالت اولیه | `home.json` معتبر | تولید نمی‌شود | `isHomeData()` نامعتبر یا خطای fetch |
| `useOffers()` | حالت اولیه | آرایه معتبر؛ حتی آرایه خالی | تولید نمی‌شود؛ آرایه خالی با status موفق برمی‌گردد | آرایه نبودن داده یا خطای fetch |
| `useCatalog()` | تا وقتی همه داده‌های لازم موفق نیستند | ترکیب `products`، `categories`، `offers` و `carousels` | فقط وقتی `useAppData()` خالی باشد | اولین خطای یکی از سه هوک |

### رفتار `App`

- اگر `catalogState.status === 'success'` باشد، `CatalogContext.Provider`، `Outlet` و `CartPanel` رندر می‌شوند.
- در غیر این صورت `LoadingContent` نمایش داده می‌شود.
- `LoadingContent` برای `error` پیام خطا و برای بقیه حالت‌ها (از جمله `empty`) وضعیت loading را نشان می‌دهد؛ بنابراین `App` عملاً حالت empty را به loading نگاشت می‌کند.
- `Header` همیشه رندر می‌شود. تا وقتی `catalogState.dataReady` برابر false است، `cartCount` برابر `0`، `selectedCategoryId` برابر `null` و `onCategoryPick` یک تابع خالی است.
- `Footer` فقط وقتی `catalogState.status === 'success'` است نمایش داده می‌شود.

### پیام‌های `LoadingContent`

| status | متن |
|--------|-----|
| `loading` | «در حال بارگذاری...» |
| `empty` | «داده‌ای برای نمایش وجود ندارد.» |
| `error` | مقدار `errorMessage` که از `App` می‌آید |

### وضعیت صفحه PLP

- برای `carouselId` معتبر، عنوان carousel و کارت‌های محصول نمایش داده می‌شوند.
- اگر `getProductsForCarousel()` برای `carouselId` مقدار `null` برگرداند، صفحه فقط `<p>این فهرست پیدا نشد</p>` را رندر می‌کند.
- حالت loading/error کاتالوگ قبل از رسیدن به PLP توسط `App` مدیریت می‌شود.

---

## ۵. State Management

### تم

- Store: `useThemeStore` در `src/hooks/useThemeStore.ts`
- State: `theme` با مقدار اولیه `light`
- Action: `toggle`
- Persistence: middleware `persist` با کلید `fail-fast-theme` در localStorage
- خواننده‌ها: `ThemeToggle` برای دکمه و `PageLayout` برای قرار دادن `data-theme` روی `.app`
- CSS با selector `[data-theme="dark"]` متغیرهای تم را تغییر می‌دهد.

### سبد خرید

- Store: `useCartStore` در `src/hooks/useCartStore.ts`
- State: `lines` و `itemCount`
- Actionها: `add`، `remove` و `getTotal`
- `add` با `addToCart()` quantity خط موجود را یک واحد افزایش می‌دهد یا خط جدید با quantity برابر ۱ می‌سازد.
- `remove` کل خط محصول را حذف می‌کند؛ کاهش تکی quantity وجود ندارد.
- `itemCount` با `getCartItemCount()` از مجموع quantityها محاسبه می‌شود.
- `getTotal(products)` با `getCartTotal()` مجموع قیمت محصولات موجود در سبد را برمی‌گرداند.
- Persistence: `loadCart()` هنگام ساخت store و `saveCart()` داخل `add`/`remove`؛ کلید `space-market-cart`
- خواننده‌ها: `App` (`itemCount`)، `ProductCarousel` و `ProductListingPage` (`add`)، `CartPanel` (`lines`, `remove`, `getTotal`) و `useDocumentTitle` (`itemCount`)

### کاتالوگ

- `useCatalog()` سه `LoadState` را از `useAppData()`، `useHomeData()` و `useOffers()` ترکیب می‌کند.
- `CatalogState` شامل `status`، `data`، `dataReady` و `categories` است.
- `CatalogContext.Provider` فقط در حالت success و فقط مقدار `Catalog` آماده را به `HomePage` و `ProductListingPage` می‌دهد.
- `LoadState` در store یا Context ذخیره نمی‌شود و persisted نیست؛ state محلی React است که از هوک‌های فراخوانی‌شده در `App` می‌آید.

### انتخاب دسته‌بندی

- Hook: `useCategorySelection()` با `useState<number | null>(null)`
- State: `selectedCategoryId`
- Callback: `onCategoryPick(categoryId)`
- `App` این مقادیر را به `Header` و سپس `Nav` می‌دهد.
- `Nav` با کلیک روی هر دسته، `onCategoryPick` را صدا می‌زند و لینک را به `/` با hash `categories` می‌فرستد.
- این state فقط برای bold کردن آیتم انتخاب‌شده استفاده می‌شود و فیلتر محصولات را تغییر نمی‌دهد.
- `CategoryCard`های صفحه اصلی فقط به hash `categories` لینک می‌دهند و صفحه دسته‌بندی جداگانه ندارند.
- Persisted نیست و با refresh ریست می‌شود.

### وضعیت مسیر و سبد

- `carouselId` یک route param در TanStack Router است و در `ProductListingPage` با `route.useParams()` خوانده می‌شود.
- باز بودن `CartPanel` state جداگانه ندارد؛ از `useLocation({ select: (location) => location.hash === 'cart' })` مشتق می‌شود.
- لینک سبد در `Header` با `hash="cart"` آن را باز می‌کند و لینک بستن در `CartPanel` با `hash=""` آن را می‌بندد.
- هر دو در آدرس hash history منعکس می‌شوند.

### جستجو

`SearchBox` یک `<input type="search">` بدون state و بدون فیلتر است. هیچ کامپوننتی مقدار آن را نمی‌خواند و persisted نیست.

---

## ۶. Route Table

Router در `src/router.tsx` با `createHashHistory()` ساخته شده است؛ بنابراین مسیرها بعد از دامنه با `#` نوشته می‌شوند.

| مسیر | کامپوننت / صفحه | پارامتر مسیر | آنچه کاربر می‌بیند |
|------|------------------|--------------|--------------------|
| `/` — مثال: `#/` | `HomePage` | — | `SuccessContent`: بنرها، دسته‌بندی‌ها، carouselهای محصولات و تبلیغات |
| `plp/$carouselId` — مثال: `#/plp/offers` و `#/plp/dairy` | `ProductListingPage` | `carouselId` (رشته)؛ مقادیر موجود در `api/home.json`: `offers`, `dairy` | عنوان carousel و کارت‌های محصول همان carousel؛ اگر کاتالوگ آماده نباشد، `App` به‌جای محتوای صفحه `LoadingContent` نشان می‌دهد |
| هر مسیر نامطابق | `NotFoundPage` (`notFoundComponent` در root route) | — | پیام «صفحه پیدا نشد» و لینک «بازگشت به صفحه اصلی» |

دو حالت متفاوت وجود دارد:

- **مقدار نامعلوم `carouselId`:** مسیر `plp/$carouselId` همچنان match می‌شود و `ProductListingPage` رندر می‌گردد. چون `getProductsForCarousel()` برای carousel پیدا نشده `null` برمی‌گرداند، صفحه پیام «این فهرست پیدا نشد» را نشان می‌دهد؛ `NotFoundPage` در این حالت استفاده نمی‌شود.
- **مسیر نامطابق:** مثلاً `#/some-unknown-path` با هیچ‌کدام از routeهای تعریف‌شده مطابقت ندارد و `NotFoundPage` از طریق `notFoundComponent` نمایش داده می‌شود.

---

## ۷. State Management Table

| State | محل نگهداری | خواننده‌ها | به‌روزرساننده‌ها | پایداری |
|-------|-------------|------------|------------------|----------|
| `theme` | Zustand store `useThemeStore` در `src/hooks/useThemeStore.ts` | `ThemeToggle` (نمایش دکمه و فراخوانی `toggle`) و `PageLayout` (برای `data-theme`) | اکشن `toggle` هنگام کلیک دکمه تم | بله؛ middleware `persist` با کلید `fail-fast-theme` در localStorage |
| Cart (`lines`, `itemCount`) | Zustand store `useCartStore` در `src/hooks/useCartStore.ts` | `App` (`itemCount`)، `ProductCarousel` و `ProductListingPage` (`add`)، `CartPanel` (`lines`, `remove`, `getTotal`)؛ `Header` عدد را به‌عنوان prop می‌گیرد؛ `useDocumentTitle` آن را در عنوان صفحه می‌گذارد | اکشن‌های `add` و `remove` از طریق توابع خالص `cart.ts` | بله؛ `loadCart()` هنگام ساخت store و `saveCart()` داخل `add`/`remove` با کلید `space-market-cart` |
| Catalog `LoadState` | React state محلی در سه هوک `useAppData`، `useHomeData` و `useOffers`؛ `useCatalog()` آن‌ها را ترکیب می‌کند و متعلق به `App` است | `App` وضعیت را بررسی می‌کند؛ `CatalogContext.Provider` مقدار `Catalog` آماده را به `HomePage` و `ProductListingPage` می‌دهد | `useEffect` داخل هوک‌ها پس از fetch از `products.json`، `categories.json`، `home.json` و `offers.json` | خیر |
| Category selection | React state محلی در `useCategorySelection()` (`useState`)؛ متعلق به `App` | `Header` و `Nav` از طریق propها (`selectedCategoryId`, `onCategoryPick`) | `onCategoryPick` هنگام کلیک روی لینک دسته‌بندی در `Nav` | خیر |
| `carouselId` | TanStack Router route params | `ProductListingPage` با `route.useParams()` | ناوبری از `ProductCarousel` یا وارد کردن مستقیم آدرس | بله؛ بخشی از آدرس hash history است |
| وضعیت باز بودن سبد | مشتق‌شده از router location در `CartPanel` (`location.hash === 'cart'`) | `CartPanel` | لینک سبد خرید در `Header` (`hash="cart"`) و لینک بستن در `CartPanel` (`hash=""`) | بله؛ از روی آدرس محاسبه می‌شود |
| فیلد جستجو | DOM input بدون React state در `SearchBox` | هیچ کامپوننتی آن را نمی‌خواند | فقط کاربر با تایپ کردن | خیر |

نکته: `itemCount` یک مقدار مشتق‌شده از `lines` است که در store نگهداری می‌شود. `getTotal` یک action خواندنی است و state را تغییر نمی‌دهد. `ProductCard` با `memo` پوشش داده نشده است؛ خواندن store با selector انجام می‌شود، اما رندر مجدد والدها می‌تواند `ProductCard` را نیز رندر کند.

---

## ۸. Component Tree

### ساختار مشترک برنامه

```text
main.tsx
└─ StrictMode
   └─ RouterProvider
      └─ App  (component مربوط به root route)
         └─ PageLayout
            ├─ div#top
            ├─ Link.skip «پرش به محتوای اصلی»
            ├─ Header  (prop: header)
            │  ├─ TopBar
            │  ├─ div.header
            │  │  ├─ input#menu / label.menu-btn
            │  │  ├─ Link.logo
            │  │  ├─ SearchBox
            │  │  ├─ ThemeToggle
            │  │  └─ Link.cart
            │  └─ Nav
            ├─ main#main
            │  └─ mainContent
            │     ├─ CatalogContext.Provider  (وقتی catalogState.status === 'success')
            │     │  ├─ Outlet  → HomePage / ProductListingPage / NotFoundPage
            │     │  └─ CartPanel  (فقط وقتی location.hash === 'cart')
            │     └─ LoadingContent  (در حالت loading / error؛ empty به loading نگاشت می‌شود)
            └─ Footer  (وقتی catalogState.status === 'success')
```

`CartPanel` فرزند `mainContent` و داخل `<main>` است، نه فرزند `Header`. تا وقتی `catalogState.dataReady` برابر false است، `Header` با `cartCount={0}`، `selectedCategoryId={null}` و `onCategoryPick` خالی رندر می‌شود؛ `Footer` فقط در حالت `success` کامل نمایش داده می‌شود.

### Home page

```text
HomePage
└─ SuccessContent
   ├─ HeroBanner
   ├─ PopularCategories
   │  └─ CategoryCard × 6
   ├─ Banner02
   ├─ div.layout
   │  └─ ProductCarousel × تعداد carouselهای catalog
   │     └─ ProductCard × محصولات آن carousel
   └─ Advertisement
```

`HomePage` مستقیماً فقط `SuccessContent` را رندر می‌کند. `ProductCarousel` داخل `SuccessContent` قرار دارد و لینک «مشاهده همه» آن به `plp/$carouselId` می‌رود.

### Product Listing Page (PLP)

```text
ProductListingPage
└─ section.section
   ├─ div.section-title
   │  └─ h2  (carousel.emoji + carousel.title)
   └─ div.products
      └─ ProductCard × محصولات برگشتی از getProductsForCarousel()
```

اگر `carouselId` با هیچ carouselی مطابقت نداشته باشد، `getProductsForCarousel()` مقدار `null` برمی‌گرداند و `ProductListingPage` به‌جای موارد بالا فقط `<p>این فهرست پیدا نشد</p>` رندر می‌کند. `ProductCarousel` بخشی از درخت PLP نیست؛ فقط در Home page قرار دارد و به این مسیر لینک می‌دهد.

### کامپوننت‌های بدون استفاده در JSX فعلی

`ProductGrid` و `CategoryNav` در `src/components/` تعریف شده‌اند اما در هیچ‌کدام از صفحه‌ها یا کامپوننت‌های فعال import نمی‌شوند.

---

## ۹. Dependencies & Scripts

### Scripts

| دستور | کاربرد |
|-------|--------|
| `npm run dev` | اجرای Vite development server |
| `npm run check` | بررسی TypeScript با `tsc --noEmit` |
| `npm run build` | `tsc --noEmit && vite build` |
| `npm run preview` | پیش‌نمایش build با Vite |
| `npm run lint` | اجرای `oxlint src --deny-warnings` |

### Dependencies

| پکیج | نسخه | وضعیت استفاده |
|------|------|----------------|
| `@tanstack/react-router` | ^1.170.46 | استفاده می‌شود |
| `zustand` | ^5.1.0 | استفاده می‌شود |
| `notyf` | ^3.10.0 | در `src/` استفاده نمی‌شود |
| `canvas-confetti` | ^1.9.4 | در `src/` استفاده نمی‌شود |
| `lucide` | ^1.61.0 | در `src/` استفاده نمی‌شود |
| `lucide-static` | ^1.61.0 | در `src/` استفاده نمی‌شود |

### DevDependencies

| پکیج | نسخه |
|------|------|
| `vite` | ^8.3.5 |
| `typescript` | ^7.0.2 |
| `oxlint` | ^1.93.0 |
| `@vitejs/plugin-react` | ^6.3.0 |
| `@types/react` | ^19.3.0 |
| `@types/react-dom` | ^19.3.0 |

نکته: کد از `react` و `react-dom` import می‌کند، اما این دو پکیج در `dependencies` یا `devDependencies` فایل `package.json` فعلی فهرست نشده‌اند.

---

## ۱۰. Security & Validation

- داده‌های مرورگر عمومی هستند و همه چیز در DevTools قابل مشاهده است.
- مقادیر `VITE_` در bundle نهایی embed می‌شوند و نباید secret باشند.
- `getJSON()` تنها لایه fetch است و خطای HTTP یا JSON را throw می‌کند.
- داده‌های API به‌صورت `unknown` دریافت و با type guardهای runtime اعتبارسنجی می‌شوند.
- سبد خرید و تم در localStorage ذخیره می‌شوند و برای کاربر قابل خواندن/تغییر هستند.
- در یک سیستم واقعی، سرور باید قیمت‌ها، تخفیف‌ها و موجودی را نهایی اعتبارسنجی کند.
- احراز هویت، پرداخت و اعتبارسنجی سمت سرور در این نسخه پیاده‌سازی نشده‌اند.
