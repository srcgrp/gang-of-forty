# سوپرینو (Superino)

سوپرمارکت آنلاین چندمسیره (SPA با TanStack Router و hash history). داده از فایل‌های `/api/*.json` خوانده می‌شود.

## ۱. نیازمندی‌ها

- یک مشتری می‌تواند دسته‌ها را ببیند و با کلیک روی هر دسته به صفحه‌ی فهرست محصولات آن دسته (PLP) برود.
- یک مشتری می‌تواند محصولات هر دسته را در قالب کارت (عکس، نام، واحد، قیمت) ببیند و در کاروسل صفحه‌ی اصلی جابه‌جا شود.
- یک مشتری می‌تواند با «مشاهده هر N محصول» فهرست کامل یک کاروسل را ببیند و آن را مرتب کند (پیش‌فرض، ارزان‌ترین، گران‌ترین، نام).
- یک مشتری می‌تواند صفحه‌ی جداگانه‌ی هر محصول را ببیند.
- یک مشتری می‌تواند قیمت اصلی، درصد تخفیف و قیمت بعد از تخفیف را روی کارت ببیند.
- یک مشتری می‌تواند بر اساس نام در محصولات جستجو کند (فیلتر سمت کلاینت).
- یک مشتری می‌تواند محصول را به سبد اضافه کند، از سبد کم/حذف کند و تعداد کل را روی آیکن سبد ببیند.
- یک مشتری می‌تواند ناموجود بودن محصول را ببیند و نتواند بیش از موجودی سرور از آن در سبد بگذارد.
- یک مشتری می‌تواند بعد از بستن و باز کردن دوباره‌ی مرورگر، همان سبد و همان تم را ببیند.
- یک مشتری می‌تواند بین تم روشن و تیره جابه‌جا شود.
- یک مشتری می‌تواند در صفحه‌ی تسویه‌حساب خلاصه‌ی سبد (جمع، هزینه‌ی ارسال، جمع کل) را ببیند، فهرست محصولات را در مودال باز کند، نام/موبایل/آدرس را وارد و «ثبت سفارش» را بزند.
- یک مشتری می‌تواند اطلاعات فروشگاه را ببیند: آدرس، تلفن، ساعت کاری، اعلان فروشگاه (ارسال رایگان بالای آستانه‌ی `freeDeliveryOver`).

### ۱.۱. پیاده‌سازی نشده

- ارسال سفارش به سرور و پرداخت (فرم تسویه فقط در کلاینت اعتبارسنجی می‌شود، یک toast نشان می‌دهد و سبد را خالی می‌کند)
- ورود/ثبت‌نام
- پیگیری سفارش
- نظرات و امتیاز


## ۲. بخش‌ها و صفحات

صفحات: خانه، فهرست محصولات (PLP)، محصول، تسویه‌حساب، ۴۰۴ (جزئیات در بخش ۸).

بخش‌های مشترک (Layout):

- پیوند «پرش به محتوای اصلی»
- نوار اعلان فروشگاه
- هدر (Header): لوگو، جستجو، آیکن سبدخرید با شمارنده و dropdown، دکمه‌ی تم
- لینک دسته‌ها و منوی فروشگاه (Nav)
- فوتر (Footer): اطلاعات فروشگاه، لینک دسته‌ها، ساعت کاری، کپی‌رایت
- اعلان موفقیت/خطا (Notyf)

بخش‌های صفحه‌ی خانه: بنرها (Hero)، شمارش معکوس حراج (SaleBanner)، لیست دسته‌بندی‌ها (CategoryNav)، کاروسل‌ها (CarouselSection)، نوار تبلیغاتی (Promos)، نتایج جستجو.

کارت محصول: عکس، برچسب دسته، درصد تخفیف، نام، واحد، قیمت قبلی، قیمت نهایی، دکمه‌ی افزودن به سبد خرید (+).

## ۳. داده (types)

```ts
type Id = number;

interface Product  { id: Id; categoryId: Id; name: string; image?: string; emoji?: string;
                     unit: string; price: number; tags: string[] }
interface Category { id: Id; slug: string; name: string; image?: string; emoji: string | null; color: string }
interface Offer    { productId: Id; percent: number; label: string }
interface Stock    { updatedAt: string; items: Record<string, number> }

type Cart = Record<string, number>;                      
interface CartLine { id: Id; name: string; price: number; quantity: number }

interface Shop {
  name: string; slogan: string | null; owner: string; city: string; phone: string
  hours: { open: string; close: string }
  deliveryFee: number; freeDeliveryOver: number; currency: string
  notice: string | null; about: string; address: string
  schedule: { days: string; time: string }[]
  menu: { label: string; href: string }[]
  copyright: string
}

interface CarouselConfig { id: string; title: string; emoji?: string | null; source?: string;
                           categoryId?: number | null; category?: { id: number } }
interface Home { hero?: BannerData | null; side?: BannerData | null;
                 promos?: Promo[]; carousels?: CarouselConfig[] }

interface CatalogData { products: Product[]; stock: Stock; offers: Offer[];
                        categories: Category[]; shop: Shop; home: Home }
type LoadState =
  | { status: "loading" }
  | { status: "empty" }
  | { status: "error"; message: string }
  | ({ status: "success" } & CatalogData);

type Sort  = "default" | "price" | "price-desc" | "name";
type Theme = "light" | "dark";
```

## ۴. هر بخش در کجا قرار می‌گیرد؟

| چرا | کجا | داده |
| ---: | ---: | ---: |
| کلاینت فقط می‌خواند و آن را تغییر نمی‌دهد | Server | Product، Category، Offer، Shop، Home، Stock |
| مرورگر فقط نمایش می‌دهد | Server | قیمت، تخفیف، هزینه‌ی ارسال |
| بعد از refresh فقط id و تعداد بماند | localStorage (`superino-cart`) | محتوای سبد |
| ترجیح کاربر است و باید بعد از refresh بماند | localStorage (`premature-optimization-theme`) | تم روشن/تیره |
| از داده‌های بالا مشتق می‌شود | Client state | جمع سبد، قیمت نهایی کارت، موجودیِ قابل‌افزودن، هزینه‌ی ارسال، خطاهای فرم |
| موقت | Client state | دادهٔ بارگذاری‌شده، وضعیت loading/error، باز/بسته بودن سبد و مودال، مقادیر فرم تسویه |
| قابل لینک و اشتراک‌گذاری | URL | فهرست انتخابی (`/plp/:carouselId`)، محصول (`/product/:productId`)، مرتب‌سازی (`?sort=`)، عبارت جستجو (`?q=`) |
| هر چیزی در env با پیشوند VITE_ داخل باندل عمومی می‌شود | هیچ‌جا در کلاینت | کلید/توکن محرمانه |

## ۵. ‏ API

همه GET، به‌صورت موازی (`Promise.all`)، یک‌بار هنگام اولین رندر `Layout` (از طریق `useCatalog`) گرفته می‌شوند و پاسخ با type guard اعتبارسنجی می‌شود. آدرس پایه از `VITE_API_URL` می‌آید.

```
GET /api/products.json    → Product[]
GET /api/stock.json       → Stock
GET /api/offers.json      → Offer[]
GET /api/categories.json  → Category[]
GET /api/shop.json        → Shop
GET /api/home.json        → Home
```

- در لیست‌ها، آیتم نامعتبر حذف می‌شود (با `console.warn`) و کل بارگذاری شکست نمی‌خورد؛ ساختار نامعتبر یا خطای شبکه به `status: "error"` با پیام کاربرپسند تبدیل می‌شود.
- اگر `products` خالی باشد، `status: "empty"` است.
- درخواست‌ها بین صفحه‌ها تکرار نمی‌شوند: داده در store مشترک نگه داشته می‌شود و فقط «تلاش دوباره» دوباره می‌خواند.
- فایل `stock.json` فعلاً فقط یک‌بار خوانده می‌شود. (دوباره‌خوانی هنگام باز کردن سبد و قبل از محاسبه‌ی نهایی هنوز انجام نمی‌شود؛ `stock-storage.ts` هم فعلاً استفاده نمی‌شود.)

## ۶. وضعیت هر بخش

| error | empty | success | loading | بخش |
| ---: | ---: | ---: | ---: | ---: |
| `Status` با پیام خطا و «تلاش دوباره» جای محتوا (بدون هدر/فوتر) | «در حال حاضر محصولی برای نمایش وجود ندارد» + «تلاش دوباره»؛ کاروسلی که محصول ندارد: «محصولی برای نمایش وجود ندارد» | رندر داده | `Skeleton` | صفحه‌ی اصلی: بنرها، دسته‌ها، کاروسل‌ها |
| `HomeLinkStatus` «این فهرست پیدا نشد» (carouselId ناشناخته) | «محصولی برای نمایش وجود ندارد» | عنوان، تعداد، مرتب‌سازی، شبکه‌ی کارت‌ها | `Skeleton` | صفحه‌ی PLP |
| `HomeLinkStatus` «محصول پیدا نشد» | - | جزئیات محصول + دکمه‌ی افزودن | `Skeleton` | صفحه‌ی محصول |
| بدون عکس: ایموجی یا 🛍️؛ stock ≤ 0: کارت کم‌رنگ، دکمه غیرفعال، «ناموجود» | - | قیمت + دکمه‌ی خرید فعال | `Skeleton` | کارت محصول |
| - | «چیزی پیدا نشد» | لیست فیلترشده | - | نتایج جستجو |
| نام محصول ناشناخته → «محصول {id}»؛ خطای localStorage → toast و سبد در حافظه می‌ماند | «سبد خرید شما خالی است» | ردیف‌ها + جمع | هدر تا رسیدن داده نمایش داده نمی‌شود | سبد خرید (dropdown) |
| خطای هر فیلد بعد از اولین «ثبت سفارش»، فوکوس روی اولین فیلد نامعتبر | سبد خالی: `HomeLinkStatus` «سبد خرید شما خالی است.» | toast «سفارش شما ثبت شد»، رفتن به `/`، خالی شدن سبد | `Skeleton` (وقتی سبد پر و داده نیامده) | تسویه‌حساب |
| - | بخش خالی نمایش داده نمی‌شود | متن‌ها | فوتر تا رسیدن داده نمایش داده نمی‌شود | فوتر/اطلاعات فروشگاه |

## ۷. ‏ Folders

```
src/
  main.tsx          → نقطه‌ی شروع (createRoot + StrictMode)
  App.tsx           → تعریف مسیرها و RouterProvider (بدون state)
  components/
    Layout.tsx      → ریشه‌ی همه‌ی مسیرها (تم، هدر، Outlet، فوتر)
    Page.tsx        → switch روی LoadState (Skeleton / Status / محتوا)
    pages/          → یک کامپوننت برای هر مسیر
    layout/ home/ catalog/ (+products/) cart/ checkout/ status/ shared/
  hooks/            → storeهای Zustand (cart، theme، search، catalog) و hookهای کمکی
  lib/              → انیمیشن، اعلان (Notyf)، توابع کمکی (غیر از کامپوننت)
  scripts/
    types.ts, types/→ لایه‌ی داده
    logic/          → توابع خالص (سبد، قیمت، فیلتر، مرتب‌سازی، کاروسل، اعتبارسنجی فرم)
    storage/        → خواندن/نوشتن localStorage و URL
  api/              → لایه‌ی شبکه (getJSON، loadCatalog)
  guards/           → اعتبارسنجی پاسخ API
  style/            → CSS
```

قانون وابستگی:

 components → hooks → logic / storage / api → types.
 
  فقط `hooks/` به `api/` و `storage/` دست می‌زند؛ هیچ کامپوننتی `fetch` یا `localStorage` ندارد. `logic/` به DOM و React دست نمی‌زند. داده‌ی کاتالوگ را صفحه‌ها با `useCatalog()` می‌گیرند و با props پایین می‌دهند.

## ۸. مسیرها

‏ Router با `createHashHistory` ساخته شده؛ آدرس واقعی به شکل `/#/plp/offers` است. همه‌ی مسیرها فرزند ریشه‌ی `Layout` هستند.

| آدرس | صفحه | داده از کجا |
| ---: | ---: | ---: |
| `/` | `HomePage` → `Catalog` | `useCatalog()`؛ برای هر کاروسل `homeCarousels(data)` + `carouselProducts(data, carousel.id)` (فقط ۸ کارت اول)؛ اگر `?q=` پر باشد `filterProducts(products, query)` با `useSearchStore` |
| `/plp/$carouselId` (اختیاری: `?sort=`) | `PlpPage` → `ProductListing` | `useParams` برای `carouselId`؛ `useCatalog()`؛ `carouselProducts(data, carouselId)` و `carouselTitle(data, carouselId)`؛ `sort` از `useSearch` (`usePlpSort`) و `sortProducts` |
| `/product/$productId` | `ProductPage` → `ProductDetail` | `useParams` برای `productId`؛ `useCatalog()`؛ `findProduct(products, productId)` + `productDetails(product, data)` (تخفیف، قیمت نهایی، موجودی، نام دسته) |
| `/checkout` | `CheckoutPage` → `OrderSummary` + `CheckoutForm` | `useCartStore` (سبد خالی؟)؛ `useCatalog()` برای `products`، `offers`، `shop`؛ `getPricedLines`، `cartTotal`، `deliveryCost` |
| هر آدرس دیگر | `NotFound` | - |

نکته‌ها:

<div dir='rtl' align='right'>

- ‏ `$carouselId` یا `id` یکی از `home.carousels` است (مثل `offers`) یا `slug` یک دسته. اگر هیچ‌کدام نباشد، `carouselProducts` مقدار `null` برمی‌گرداند و «این فهرست پیدا نشد» نمایش داده می‌شود.

- ‏ `sort` با `validateSearch` بررسی می‌شود؛ مقدار نامعتبر به `default` تبدیل می‌شود و مقدار `default` از URL حذف می‌شود.

- ‏ `?q=` در `location.search` (بیرون از hash) با `history.replaceState` نوشته می‌شود. تایپ در جستجو همیشه به `/` می‌رود.

- لینک دسته‌ها در هدر/فوتر و `href`های `#slug` در داده‌ی `home.json` با `PlpLink` / `DataLink` به `/plp/$carouselId` تبدیل می‌شوند؛ `#contact` و `#top` اسکرول داخل صفحه‌اند (`AnchorLink`).

</div>

## ۹. ‏ Storeها

همه با Zustand و در `src/hooks/` تعریف شده‌اند.

| کجا ذخیره می‌شود | چه کسی عوضش می‌کند | چه چیزی در آن است | کجا تعریف شده | Store |
| ---: | ---: | ---: | ---: | ---: |
| localStorage با کلید `premature-optimization-theme` (middleware `persist`) | `ThemeToggle` با `toggle`. خواننده‌ها: `Layout` (`data-theme` روی `.app`) و `ThemeToggle` | `theme: "light" \| "dark"` (پیش‌فرض `light`)، `toggle()` | `hooks/useThemeStore.ts` | تم |
| localStorage با کلید `superino-cart`. مقدار اولیه با `readCart()` (اعتبارسنجی‌شده) خوانده می‌شود؛ هر تغییر با `subscribe` و `saveCart()` نوشته می‌شود؛ اگر نوشتن شکست بخورد toast (`saveFailedFeedback`) و سبد در حافظه می‌ماند | `add` ← `AddToCartButton`؛ `remove` ← `CartLineItem`؛ `clear` ← `CheckoutForm` بعد از ثبت موفق و رفتن به `/`. محاسبه‌ها با توابع خالص `addItem` / `removeItem` | `cart: Record<id, تعداد>`، `add(id)`، `remove(id)`، `clear()` | `hooks/useCartStore.ts` | سبد |
| ذخیره نمی‌شود؛ با هر بار بازکردن صفحه از API گرفته می‌شود | `load()` بعد از رندر در حالت `loading` (یک Promise مشترک در `pending`، پس هر صفحه درخواست جدا نمی‌زند)؛ `retry()` وضعیت را `loading` می‌کند | `state: LoadState` | `hooks/useCatalog.ts` (store خصوصی؛ از بیرون فقط `useCatalog()`) | کاتالوگ |
| URL: `?q=` (`writeQuery` با `subscribe`)؛ مقدار اولیه با `readQuery()` | `Search` (ورودی هدر) | `query: string`، `setQuery()` | `hooks/useSearchStore.ts` | جستجو |

### چرا سبد با Zustand است (و نه Context + reducer)؟

1. مصرف‌کننده‌های سبد در شاخه‌های دور از هم هستند: `DocumentTitle`، `CartPanel`، `CartLines`، `CartLineItem` (در Layout/Header) و `AddToCartButton`، `ProductCard`، `OrderSummary`، `CheckoutForm`، `CheckoutPage` (داخل Outlet). با Context باید Provider را بالای `Layout` گذاشت؛ Zustand بدون Provider است.
2. با selector فقط کامپوننت ذی‌نفع دوباره رندر می‌شود. `useIsSoldOut` فقط یک boolean انتخاب می‌کند، پس با هر `add` فقط کارتی که ناموجود می‌شود رندر می‌شود. با Context، هر تغییر سبد همه‌ی `ProductCard` را رندر می‌کند (و `memo` کمکی نمی‌کند چون مقدار context عوض شده).
3. ذخیره‌سازی خارج از React انجام می‌شود: مقدار اولیه هم‌زمان از localStorage خوانده می‌شود (بدون flash سبد خالی) و یک `subscribe` در یک نقطه می‌نویسد، نه Effect در هر Provider.
4. ‏ actionها هویت ثابت دارند و منطق همچنان در توابع خالص `logic/cart/` می‌ماند؛ پس تست‌پذیری reducer را از دست نمی‌دهیم.

هزینه‌ی این انتخاب: یک وابستگی اضافه و store سراسری که در تست‌ها باید reset شود. اگر سبد فقط در یک زیردرخت مصرف می‌شد، Context + reducer کافی بود. تم هم به همین دلیل (مصرف در Layout و Header، و نیاز به persist) Zustand است.

## ۱۰. درخت کامپوننت‌ها

‏`Layout` ریشه‌ی همه‌ی صفحه‌هاست. صفحه‌ها داخل `<Outlet />` رندر می‌شوند. `Layout` هدر و فوتر را فقط وقتی داده رسیده (`status === "success"`) رندر می‌کند؛ در غیر این‌صورت فقط `Outlet` است، پس Skeleton و Status بدون هدر/فوتر دیده می‌شوند. نام و کپی‌رایت فروشگاه با ثابت `BRAND` در `Layout` روی داده‌ی `shop` جایگزین می‌شود.

### قاب مشترک (Layout)

```
RouterProvider
└─ Layout                     div.app[data-theme]  → useThemeStore، useCatalog
   ├─ (success) Frame
   │  ├─ DocumentTitle        → useCartStore (عنوان تب با تعداد سبد)
   │  ├─ AnchorLink           «پرش به محتوای اصلی»
   │  ├─ Header
   │  │  ├─ Link              لوگو و نام فروشگاه → /
   │  │  ├─ Search            → useSearchStore، useNavigate
   │  │  ├─ CartPanel         State محلی: open
   │  │  │  ├─ Link           تسویه حساب → /checkout (وقتی سبد پر است)
   │  │  │  └─ CartLines      → useCartStore
   │  │  │     └─ CartLineItem × n
   │  │  ├─ ThemeToggle       → useThemeStore
   │  │  └─ nav               PlpLink × n (دسته‌ها)، DataLink × n (منوی فروشگاه)
   │  ├─ Outlet               → صفحه‌ی مسیر (پایین)
   │  └─ Footer               PlpLink × n، AnchorLink «بازگشت به بالا»
   └─ (loading / empty / error) Outlet فقط
```

### صفحه‌ی خانه (`/`)

```
Layout
└─ Outlet
   └─ HomePage                → useCatalog
      └─ Page                 switch روی state.status
         ├─ Skeleton          → loading
         ├─ Status            → empty / error (+ «تلاش دوباره»)
         └─ Catalog (<main>)  → useSearchStore
            ├─ SearchResults  → وقتی query خالی نیست
            │  └─ ProductList → ProductCard × n
            └─ وگرنه:
               ├─ Hero               DataLink، Art
               ├─ SaleBanner         State محلی: open
               │  └─ SaleCountdown   State محلی: left (تایمر)
               ├─ CategoryNav        AnchorLink × n، Art
               ├─ CarouselSection × n  (اول کاروسل «offers»، بعد Promos، بعد کاروسل هر دسته)
               │  ├─ PlpLink         «مشاهده هر N محصول» → /plp/$carouselId
               │  └─ Carousel        State محلی: offset، max
               │     └─ ProductList → ProductCard × n
               └─ Promos             DataLink، Art
```

### صفحه‌ی فهرست (`/plp/$carouselId`)

```
Layout
└─ Outlet
   └─ PlpPage                 → useParams، useCatalog
      └─ Page
         ├─ Skeleton / Status
         ├─ HomeLinkStatus    → carouselId ناشناخته («این فهرست پیدا نشد»)
         │  └─ Status
         └─ ProductListing (<main>)    → usePlpSort (URL: ?sort=)
            ├─ Link           بازگشت به صفحه اصلی
            ├─ SortSelect     → usePlpSort
            └─ ProductList → ProductCard × n
```

### صفحه‌ی محصول (`/product/$productId`)

```
Layout
└─ Outlet
   └─ ProductPage             → useParams، useCatalog
      └─ Page
         ├─ Skeleton / Status
         ├─ HomeLinkStatus    → محصول ناشناخته («محصول پیدا نشد»)
         └─ ProductDetail
            ├─ Link           بازگشت به صفحه اصلی (بیرون از <main>)
            └─ main > article
               ├─ ProductImage
               ├─ OfferBadge
               ├─ Price × 2   (قیمت قبلی و نهایی)
               └─ AddToCartButton   → useCartStore، useIsSoldOut
```

### صفحه‌ی تسویه‌حساب (`/checkout`)

```
Layout
└─ Outlet
   └─ CheckoutPage            → useCartStore (isEmpty)، useCatalog
      ├─ (سبد خالی) main > HomeLinkStatus   «سبد خرید شما خالی است.»
      └─ Page
         ├─ Skeleton / Status
         └─ main > section.checkout
            ├─ Link           بازگشت به صفحه اصلی
            ├─ OrderSummary   State محلی: itemsOpen
            │  ├─ Price × 3   (جمع، ارسال، جمع کل)
            │  └─ CartItemsModal   <dialog> با showModal
            │     └─ Price × n
            └─ CheckoutForm   State محلی: form، submitted
               ├─ FormField × 3   (نام، موبایل، آدرس)
               └─ دکمه‌ی «ثبت سفارش» → clear سبد + navigate("/")
```

### مسیر ناشناخته

```
Layout → Outlet → NotFound → HomeLinkStatus («صفحه‌ای یافت نشد.») → Status + Link
```

### کارت محصول (مشترک بین خانه، PLP و جستجو)

```
ProductCard (memo)            ← useIsSoldOut
├─ Link → /product/$productId
│  └─ ProductImage
├─ OfferBadge                 وقتی تخفیف دارد
├─ Price × 2                  قیمت قبلی (در تخفیف) و نهایی
└─ AddToCartButton            ← useCartStore.add، useIsSoldOut؛ انیمیشن flyToCart
```

## ۱۱. ‏ State محلی کامپوننت‌ها و مقدارهای مشتق

‏ State سراسری در بخش ۹ آمده. این‌ها فقط به یک کامپوننت تعلق دارند:

| کجا ذخیره می‌شود | چه کسی عوضش می‌کند | صاحب (کامپوننت) | State |
| ---: | ---: | ---: | ---: |
| فقط ظاهر | کلیک روی دکمه‌ی سبد / کلیک بیرون | `CartPanel` | `open` |
| فقط موقعیت اسلاید | دکمه‌های قبلی/بعدی و `ResizeObserver` | هر `Carousel` | `offset`، `max` |
| فقط ظاهر | دکمه‌ی «بستن/نمایش شمارش» | `SaleBanner` | `open` |
| تایمر | `setInterval` هر ثانیه | `SaleCountdown` | `left` |
| فقط ظاهر | دکمه‌ی «مشاهده محصولات»، بستن مودال | `OrderSummary` | `itemsOpen` |
| تا لحظه‌ی ثبت سفارش | `onChange` فیلدها / `handleSubmit` | `CheckoutForm` | `form`، `submitted` |

### چرا این‌ها State نیستند

| چرا State نیست | چطور حساب می‌شود | مقدار |
| ---: | ---: | ---: |
| از `cart` و `offers` حساب می‌شود؛ State جدا ممکن است با سبد ناهماهنگ شود | `getPricedLines` + `cartTotal`، هنگام render | جمع سبد |
| همان دلیل | `cartCount(cart)` به‌صورت selector | تعداد کل سبد |
| از قیمت و تخفیف مشتق می‌شود | `calculatePrice(price, offer)` داخل `productDetails` | قیمت نهایی کارت |
| وقتی سبد عوض شود خودش درست می‌شود، بدون State دوم | `useIsSoldOut`: موجودی سرور منهای تعداد داخل سبد | ناموجود بودن / موجودیِ قابل‌افزودن |
| از جمع سبد و تنظیمات فروشگاه مشتق می‌شود | `deliveryCost(subtotal, shop.deliveryFee, shop.freeDeliveryOver)` | هزینه‌ی ارسال |
| از `products` و `query` مشتق می‌شود | `filterProducts(products, query)` | نتایج جستجو |
| از `home.carousels`، `categories` و `products` مشتق می‌شود | `homeCarousels(data)`، `carouselProducts(data, id)` | کاروسل‌ها و محصولات آن‌ها |
| از URL و فهرست مشتق می‌شود | `sortProducts(products, sort)` | ترتیب فهرست PLP |
| از مقدارهای فرم مشتق می‌شود | `validateCheckout(form)` در هر render؛ فقط بعد از `submitted` نشان داده می‌شود | خطاهای فرم |
| کار با دنیای بیرون است، نه State | Effect در `DocumentTitle` روی `[name, count]` | عنوان صفحه (`document.title`) |

## ۱۲. امنیت

در مرورگر همه‌چیز عمومی و قابل‌دستکاری است:

- کد جاوااسکریپت، فایل‌های `/api/*.json` و localStorage را می‌توان با DevTools دید و تغییر داد.

چرا جمع نهایی را باید سرور حساب کند؟

- کلاینت فقط `[{id, qty}]` می‌فرستد؛ سرور قیمت، تخفیف فعال، موجودی و هزینه‌ی ارسال را از منبع خودش می‌خواند، `qty` را اعتبارسنجی می‌کند، `id` ناشناخته را رد می‌کند و `total` را خودش می‌سازد.
- نبودِ این کار یعنی: خرید با قیمت دلخواه، تخفیف جعلی، خرید بیش از موجودی.
- در حال حاضر «ثبت سفارش» چیزی به سرور نمی‌فرستد؛ وقتی اضافه شد، باید همین قاعده رعایت شود. همچنین `add` در `useCartStore` خودش موجودی را بررسی نمی‌کند و محدودیت فقط با غیرفعال‌شدن دکمه (`useIsSoldOut`) اعمال می‌شود، پس سرور باید دوباره بررسی کند.

قواعد این پروژه:

- بعد از خواندن localStorage، همیشه اعتبارسنجی کن (`readCart` این کار را می‌کند).
- متن را فقط به‌صورت child در JSX بنویس (React escape می‌کند)؛ `dangerouslySetInnerHTML` و `innerHTML` ممنوع (جلوگیری از XSS).
- در سبد قیمت ذخیره نکن؛ همیشه از آخرین products/offers محاسبه کن.
- هیچ رمز یا کلید API در کد کلاینت یا <span dir='ltr'>VITE_*</span> نگذار.