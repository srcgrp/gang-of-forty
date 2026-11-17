# سوپرینو (Superino)

سوپرمارکت آنلاین تک‌صفحه‌ای. داده از فایل‌های `/api/*.json` خوانده می‌شود.

## ۱. نیازمندی‌ها

- یک مشتری می‌تواند دسته‌ها را ببیند و با کلیک روی هر دسته به بخش محصولات آن برود.
- یک مشتری می‌تواند محصولات هر دسته را در قالب کارت (عکس، نام، واحد، قیمت) ببیند و در کاروسل جابه‌جا شود.
- یک مشتری می‌تواند قیمت اصلی، درصد تخفیف و قیمت بعد از تخفیف را روی کارت ببیند.
- یک مشتری می‌تواند بر اساس نام در محصولات جستجو کند (فیلتر سمت کلاینت).
- یک مشتری می‌تواند محصول را به سبد اضافه کند، از سبد کم/حذف کند و تعداد کل را روی آیکن سبد ببیند.
- یک مشتری می‌تواند ناموجود بودن محصول را ببیند و نتواند بیش از موجودی سرور از آن در سبد بگذارد.
- یک مشتری می‌تواند بعد از بستن و باز کردن دوباره‌ی مرورگر، همان سبد را ببیند.
- یک مشتری می‌تواند اطلاعات فروشگاه را ببیند: آدرس، تلفن، ساعت کاری، اعلان فروشگاه (ارسال رایگان بالای ۵۰۰٬۰۰۰).

### ۱.۱. پیاده‌سازی نشده

- ثبت سفارش و پرداخت
- ورود/ثبت‌نام
- پیگیری سفارش
- نظرات و امتیاز
- صفحه‌ی جداگانه برای هر دسته
- صفحه جداگانه برای هر محصول

## ۲. بخش‌ها و صفحات

- نوار اعلان فروشگاه
- هدر (Header): لوگو، جستجو، آیکن سبدخرید با شمارنده
- لینک دسته‌ها و منوی فروشگاه (Nav)
- بنرها (Banners)
- لیست دسته‌بندی‌ها (Category list)
- کاروسل (Carousel): پیشنهاد ویژه، محصولات هر دسته
- کارت محصول: عکس، برچسب دسته، درصد تخفیف، نام، واحد، قیمت قبلی، قیمت نهایی، دکمه‌ی افزدون به سبد خرید (+) ·
- نوار تبلیغاتی (Promos)
- سبدخرید (Cart dropdown): محصولات، حذف، تعداد
- فوتر (Footer): اطلاعات فروشگاه، لینک دسته‌ها، ساعت کاری، کپی‌رایت
- اعلان موفقیت/خطا

## ۳. داده (types.ts)

```ts
type Id = number;

interface Product  { 
    id: Id; 
    categoryId: Id; 
    name: string; 
    image: string; 
    unit: string; 
    price: number; 
    tags: string[] 
}

interface Category { 
    id: Id; 
    slug: string; 
    name: string; 
    image: string; 
    emoji: string | null; 
    color: string 
}

interface Offer { 
    productId: Id; 
    percent: number; 
    label: string 
}

interface Stock { 
    updatedAt: string; 
    items: Record<string, number> 
}

type Cart = Record<string, number>;

interface Shop {
    name: string
    notice?: string | null
    slogan?: string | null
    about: string
    address: string
    phone: string
    copyright: string
    menu: ShopMenuItem[]
    schedule: ShopScheduleItem[]
    currency: string
}

interface Home { 
    hero?: BannerData | null
    side?: BannerData | null
    promos?: Promo[]
    carousels?: CarouselConfig[]
}
```

## ۴. هر بخش در کجا قرار می‌گیرد؟

| چرا | کجا | داده |
| ---: | ---: | ---: |
| کلاینت فقط می‌خواند و آن را تغییر نمی‌دهد | Server | Product، Category، Offer، Shop، Home, Stock |
| مرورگر فقط نمایش می‌دهد | Server | قیمت، تخفیف، هزینه‌ی ارسال |
| بعد از refresh  فقط id و تعداد بماند | localStorage | محتوای سبد |
| از داده‌های بالا مشتق می‌شود | Client state | جمع سبد، قیمت نهایی کارت، موجودیِ قابل‌افزودن |
| موقت | Client state | دادهٔ بارگذاری‌شده، وضعیت loading/error، باز/بسته بودن سبد، متن جستجو |
| قابل لینک و اشتراک‌گذاری | URL | دسته‌ی انتخابی و عبارت جستجو |
| هر چیزی در env با پیشوند VITE_ داخل باندل عمومی می‌شود | هیچ‌جا در کلاینت | کلید/توکن محرمانه |

## ۵. ‏API

همه GET، به‌صورت موازی (Promise.all)، یک‌بار در on start گرفته می‌شوند و پاسخ با type اعتبارسنجی می‌شود.

```
GET /api/products.json    → Product[]
GET /api/stock.json       → Stock
GET /api/offers.json      → Offer[]
GET /api/categories.json  → Category[]
GET /api/shop.json        → Shop
GET /api/home.json        → Home
```

- فایل stock.json دوباره هنگام باز کردن سبد و قبل از محاسبه‌ی نهایی خوانده می‌شود.

## ۶. وضعیت هر بخش 

| error | empty | success | loading | بخش |
| ---: | ---: | ---: | ---: | ---: |
| پیام خطا بالای main + دکمه‌ی «تلاش دوباره» | بخشی که محصول ندارد: «محصولی برای نمایش وجود ندارد» | رندر داده | skeleton | بنرها، دسته‌ها، کاروسل‌ها |
| عکس خراب: placeholder؛ stock ≤ 0: کارت کم‌رنگ، دکمه غیرفعال، «ناموجود» | - | قیمت + دکمه‌ی خرید فعال | skeleton | کارت محصول |
| - | چیزی پیدا نشد |لیست فیلترشده  | - | نتایج جستجو |
| نام محصول ناشناخته → «محصول {id}»؛ خطای localStorage → toast و سبد در حافظه | سبد خرید شما خالی است | ردیف‌ها + جمع | شمارنده‌ی ۰ تا وقتی داده نیامده | سبد خرید |
| مقدار پیش‌فرض (نام فروشگاه) | بخش خالی مخفی می‌شود | متن‌ها | skeleton-text | فوتر/اطلاعات فروشگاه |


## ۷. ‏Folders

```
src/
  main.tsx          → نقطه‌ی شروع (createRoot)
  App.tsx           → State، Effect و تابع‌های رویداد (بدون JSX بزرگ)
  components/       → لایه‌ی نمایش (JSX)، با زیرپوشه‌های layout-home-catalog-cart-status-shared
  lib/              → انیمیشن، اعلان، توابع کمکی (غیر از کامپوننت)
  scripts/
    types.ts, types/→ لایه‌ی داده
    logic/          → توابع خالص (سبد، قیمت، فیلتر، مرتب‌سازی)
  api/              → لایه‌ی شبکه (getJSON، loadCatalog)
  guards/           → اعتبارسنجی پاسخ API
  scripts/storage/  → خواندن/نوشتن localStorage و URL
  styles/           → CSS
```

قانون وابستگی: components → logic → types ؛ فقط App.tsx به api/ و storage/ دست می‌زند
و داده را با props پایین می‌دهد. logic/ به DOM دست نمی‌زند و هیچ کامپوننتی fetch یا localStorage ندارد.

## ۸. درخت کامپوننت‌ها

```
App                          State: state، cart، categoryId، query، attempt
└─ Page                      switch روی state.status
   ├─ Skeleton               → loading
   ├─ Status                 → empty / error (+ دکمه‌ی تلاش دوباره)
   └─ Storefront             → success
      ├─ Header
      │  ├─ Search
      │  └─ CartPanel        State محلی: open
      │     └─ CartLineItem × n
      ├─ Catalog (<main>)
      │  ├─ SearchResults    → وقتی query خالی نیست
      │  │  └─ ProductList   → ProductCard × n
      │  └─ وگرنه:
      │     ├─ Hero (بنرها)
      │     ├─ CategoryNav   (دسته‌ی فعال، onPick)
      │     ├─ ProductGrid   State محلی: sort  («پیشنهاد ویژه»)
      │     │  ├─ SortSelect
      │     │  └─ Carousel   State محلی: offset، max
      │     │     └─ ProductList → ProductCard × n (Price، OfferBadge)
      │     ├─ Promos
      │     └─ ProductGrid × n (هر دسته)
      └─ Footer
```

## ۹. ‏State کجا زندگی می‌کند؟


| کجا ذخیره می‌شود | چه کسی عوضش می‌کند | صاحب (کامپوننت) | State |
| ---: | ---: | ---: | ---: |
|  هر بار از API گرفته می‌شود | Effect بارگذاری با `loadCatalog` | App | `state` (LoadState: loading / empty / error / success + داده) |
| localStorage (Effect روی `[cart]`) | `handleAdd` / `handleRemove` با `addItem` و `removeItem` (توابع خالص) | App | `cart` (`Record<id, تعداد>`) |
|  فقط برای پررنگ‌کردن دسته‌ی فعال | `onPick` در CategoryNav | App | `categoryId` |
| آدرس صفحه (`?q=`، با Effect) | `onQuery` در SearchBox | App | `query` |
|  فقط Effect بارگذاری را دوباره اجرا می‌کند | `handleRetry` (دکمه‌ی تلاش دوباره) | App | `attempt` |
|  فقط ظاهر | کلیک روی دکمه‌ی سبد / کلیک بیرون | CartPanel | `open` |
|  مخصوص همان بخش | SortSelect | هر ProductGrid | `sort` |
|  فقط موقعیت اسلاید | دکمه‌های قبلی/بعدی و تغییر اندازه‌ی صفحه | هر Carousel | `offset`، `max` |

### چرا این‌ها State نیستند 

| چرا State نیست | چطور حساب می‌شود | مقدار |
| ---: | ---: | ---: |
| از `cart` و `offers` حساب می‌شود؛ State جدا ممکن است با سبد ناهماهنگ شود | از ردیف‌های سبد با قیمت نهایی، هنگام render | جمع سبد (`cartTotal`) |
| همان دلیل | جمع تعداد‌های `cart` | تعداد کل سبد (`cartCount`) |
| از قیمت و تخفیف مشتق می‌شود | `calculatePrice(price, offer)` | قیمت نهایی کارت |
| وقتی سبد عوض شود خودش درست می‌شود، بدون State دوم | موجودی سرور منهای تعداد داخل سبد (`availableStock`) | موجودی قابل افزودن |
| از `products` و `query` مشتق می‌شود | `filterProducts(products, query)` | نتایج جستجو |
| از `products`، `categories` و `offers` مشتق می‌شوند | `categorySections` و `specialOffers` | بخش‌های دسته‌ها و پیشنهاد ویژه |
| کار با دنیای بیرون است، نه State | Effect روی `[cart, shopName]` | عنوان صفحه (`document.title`) |

## ۱۰. امنیت
در مرورگر همه‌چیز عمومی و قابل‌دستکاری است:
- کد جاوااسکریپت، فایل‌های /api/*.json  و localStorage را می‌توان با DevTools دید و تغییر داد.

چرا جمع نهایی را باید سرور حساب کند؟
- کلاینت فقط [{id, qty}] می‌فرستد؛ سرور قیمت، تخفیف فعال، موجودی و هزینه‌ی ارسال را از منبع خودش می‌خواند، qty را اعتبارسنجی می‌کند، id ناشناخته را رد می‌کند و total را خودش می‌سازد.
- نبودِ این کار یعنی: خرید با قیمت دلخواه، تخفیف جعلی، خرید بیش از موجودی.

قواعد این پروژه:
- بعد از خواندن localStorage، همیشه اعتبارسنجی کن.
- متن را فقط با textContent بنویس، نه innerHTML (جلوگیری از XSS).
- در سبد قیمت ذخیره نکن؛ همیشه از آخرین products/offers محاسبه کن.
- هیچ رمز یا کلید API در کد کلاینت یا <span dir='ltr'> VITE_*</span> نگذار.
