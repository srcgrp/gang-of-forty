# طراحی فروشگاه MARTO (shops/dry)

## ۱. نیازمندی‌ها

کاربر می‌تواند:
- پیشنهادهای ویژه و یک قفسه برای هر دسته (از categories.json) را ببیند
- محصولات را جستجو کند (جستجوی فارسی که به اشتباه تایپی هم حساس نیست) و نتیجه را همان لحظه ببیند
- محصولات را بر اساس دسته فیلتر کند
- محصول را به سبد اضافه یا از آن حذف کند، تعداد سبد را در هدر ببیند و جمع کل را در کشوی سبد
- با Refresh سبد خود را از دست ندهد و تعداد سبد را در عنوان تب مرورگر ببیند
- بعد از هر افزودن به سبد یا علاقه‌مندی، یک پیام کوتاه ببیند
- محصول را علاقه‌مند کند (♡)، لیستشان را در هدر باز کند، از همان‌جا به سبد اضافه یا حذفشان کند، و با Refresh بمانند
- بین حالت روشن و تاریک جابه‌جا شود (انتخابش ذخیره می‌شود)
- بفهمد کدام محصول ناموجود است
- اگر بارگذاری شکست خورد، پیام فارسی ببیند و با دکمه‌ی «تلاش دوباره» دوباره امتحان کند
- شمارش معکوس حراج را ببیند و بتواند آن را ببندد و دوباره نشان دهد

بعد از تمام شدن معماری اضافه می‌شود:
- صفحه‌ی جدا برای هر محصول (آدرس #/product/<id>)
- صفحه‌ی سبد خرید با تغییر تعداد

عمداً در این نسخه نیست: ورود و ثبت‌نام، پرداخت و ذخیره‌ی سبد روی سرور،
چون API فقط فایل JSON خواندنی است و خروجی dist باید روی هر سرور استاتیکی کار کند.
دسته و متن جستجو هم این هفته در آدرس (URL) نگه داشته نمی‌شوند؛ فقط در State برنامه‌اند.

## ۲. بخش‌های صفحه

هدر (لوگو، جستجو، دکمه‌ی تم، علاقه‌مندی‌ها، سبد) · منوی دسته‌ها · هیرو · حراج ویژه ·
دسته‌بندی‌ها · پیشنهادهای ویژه · قفسه‌ی هر دسته · (نتایج، فقط وقتی دسته یا جستجو فعال است) ·
بنرها · مجله · کشوی سبد · فوتر.

بخش‌هایی که با داده‌ی API پر می‌شوند: منوی دسته‌ها، کارت‌های دسته، پیشنهادهای ویژه، قفسه‌ها و نتایج.
بقیه ثابت‌اند و فقط JSX هستند.

## ۳. درخت کامپوننت‌ها

```
App
├─ LogoSprite
├─ Header
│  ├─ SearchBox
│  ├─ ThemeToggle
│  ├─ FavoritesMenu           (دکمه‌ی ♥ و شمارنده)
│  │  └─ FavoritesDrawer      (کشوی علاقه‌مندی‌ها)
│  └─ Toaster                 (پیام کوتاه افزودن)
├─ CategoryNav
├─ main
│  ├─ Hero
│  ├─ SaleSection
│  │  └─ SaleCountdown
│  ├─ CategoryGrid
│  ├─ Catalog
│  │  ├─ Status               (فقط وقتی داده loading، empty یا error است؛ در error دکمه‌ی Retry دارد)
│  │  └─ ProductGrid × n      (پیشنهادهای ویژه، نتایج، و یکی برای هر دسته)
│  │     └─ ProductCard × n   (دکمه‌ی ♡ و + داخل کارت)
│  ├─ PromoBanners
│  ├─ Blog
│  └─ CartPanel               (کشوی سبد)
└─ Footer
```

کامپوننت‌ها props را فقط می‌خوانند. هر اتفاقی (افزودن، حذف، انتخاب دسته، تایپ جستجو، Retry، باز کردن سبد)
با یک callback prop به App گزارش می‌شود و App State را عوض می‌کند.
دو استثنا: داده‌ای که بیرون از React زندگی می‌کند و چند کارت باید با هم هماهنگ باشند
(علاقه‌مندی‌ها و پیام کوتاه) از یک store بیرونی با useSyncExternalStore خوانده می‌شود، نه از App.

## ۴. State کجا زندگی می‌کند

| State | کامپوننت صاحب | چه کسی عوضش می‌کند | کجا ذخیره می‌شود |
|---|---|---|---|
| `cart` (آرایه‌ی CartLine: id و qty) | App | handleAdd و handleRemove (با توابع خالص addToCart و removeFromCart) | حافظه و localStorage با کلید `dry-cart`؛ شروع با loadCart، ذخیره در Effect روی `[cart]` |
| `categoryId` | App | CategoryNav با `onPick` | فقط حافظه |
| `query` (متن جستجو) | App | SearchBox با `onQuery` | فقط حافظه |
| `state` (LoadState) | App | Effect بارگذاری (و handleRetry که آن را `loading` می‌کند) | فقط حافظه؛ داده از api/*.json می‌آید |
| `attempt` (شمارنده‌ی تلاش دوباره) | App | handleRetry | فقط حافظه؛ در deps همان Effect بارگذاری است |
| `cartOpen` (باز بودن کشوی سبد) | App | دکمه‌ی سبد در Header و CartPanel (`onClose`) | فقط حافظه |
| `theme` | ThemeToggle | دکمه‌ی تم | localStorage با کلید `dry-theme`؛ Effect آن را روی `data-theme` عنصر html می‌گذارد |
| `open` (شمارش معکوس) | SaleSection | دکمه‌ی بستن/نمایش | فقط حافظه |
| `left` (ثانیه‌های باقی‌مانده) | SaleCountdown | setInterval داخل Effect | فقط حافظه |
| `open` (کشوی علاقه‌مندی‌ها) | FavoritesMenu | دکمه‌ی ♥ هدر | فقط حافظه |
| `favorites` (آرایه‌ی id) | store بیرونی (features/favorites) | قلب کارت‌ها و حذف در FavoritesMenu | localStorage با کلید `dry-favorites` |
| پیام کوتاه (toast) | store بیرونی (features/toast) | showToast از ProductCard و FavoritesMenu | فقط حافظه؛ بعد از ۲٫۵ ثانیه پاک می‌شود |

مقدارهایی که State نیستند و موقع render حساب می‌شوند:

| مقدار | از چه حساب می‌شود | چرا State نیست |
|---|---|---|
| تعداد سبد (`cartCount`) | `cart` | از سبد قابل حساب است؛ State جدا ممکن است با سبد ناهماهنگ شود |
| ردیف‌ها و جمع کل سبد (`cartSummary`) | `cart`، محصولات و تخفیف‌ها | اگر جدا ذخیره شود، با عوض شدن سبد یا قیمت جمع قدیمی می‌ماند؛ حساب‌کردنش ارزان است |
| نتایج نمایش‌داده‌شده | `state`، `categoryId` و `query` | فیلتر خروجی همین سه تاست و با هر تغییر خودش درست می‌شود |
| قفسه‌ی هر دسته و کارت‌های دسته | `state` (categories و products) | فقط تبدیل داده‌ی بارگذاری‌شده به کارت است |
| کارت‌های علاقه‌مندی‌ها | `state` و `favorites` | از دو منبع دیگر ساخته می‌شود |
| قلب پر یا خالی (`liked`) | `favorites` و `card.id` | از لیست علاقه‌مندی‌ها قابل حساب است |
| عنوان تب مرورگر | `cart` | State نیست؛ اثر جانبی است و در Effect نوشته می‌شود |

## ۵. داده‌ها و صاحبشان

| داده | صاحب | کجا زندگی می‌کند |
|---|---|---|
| لیست محصولات، موجودی، پیشنهادها، دسته‌ها | سرور | api/*.json (فقط خواندنی) |
| وضعیت بارگذاری (LoadState) | برنامه | حافظه؛ features/products/api/load.ts می‌سازد و Effect داخل App آن را نگه می‌دارد |
| سبد (آرایه‌ی CartLine: id و qty) | کاربر | حافظه‌ی App و localStorage با کلید dry-cart (فقط داخل features/cart/storage/cartStorage.ts) |
| علاقه‌مندی‌ها | کاربر | localStorage با کلید dry-favorites (فقط داخل features/favorites/storage/favoritesStorage.ts) |
| تم | کاربر | localStorage با کلید dry-theme (فقط داخل features/theme/storage/themeStorage.ts) |
| آدرس API | پروژه | env، متغیر VITE_API_URL، خوانده‌شده در features/products/api/http.ts |

## ۶. قرارداد API

| فایل | نوع در types.ts | Type Guard |
|---|---|---|
| products.json | Product[] | isProduct |
| stock.json | Stock | isStock |
| offers.json | Offer[] | isOffer |
| categories.json | Category[] | isCategory |

هر پاسخ اول `unknown` است و فقط بعد از رد شدن از Guard به نوع واقعی تبدیل می‌شود.
محصول، تخفیف یا دسته‌ای که از Guard رد نشود حذف می‌شود و تعدادش در Console نوشته می‌شود.
سبد، علاقه‌مندی‌ها و تم ذخیره‌شده در localStorage هم از بیرون می‌آیند و قبل از استفاده چک می‌شوند
(isCartLine، آرایه‌ای از عدد، isTheme)؛ اگر خراب باشند، مقدار پیش‌فرض برمی‌گردد.
فعلاً صفحه از shop.json استفاده نمی‌کند.

## ۷. حالت‌ها

وضعیت داده یک Union به نام LoadState است (loading, success, empty, error).
کامپوننت Status آن را با switch روی `status` نشان می‌دهد؛ حالت success را Catalog خودش با ProductGrid نشان می‌دهد.

| بخش | loading | success | empty | error |
|---|---|---|---|---|
| Catalog (پیشنهادها، نتایج، قفسه‌ها) | «در حال بارگذاری...» | ProductGrid ها با کارت‌ها | «محصولی برای نمایش وجود ندارد» | پیام فارسی با role=alert و دکمه‌ی «تلاش دوباره» |
| ProductGrid بدون نتیجه (دسته یا جستجو) | — | — | «محصولی برای نمایش وجود ندارد» | — |
| کشوی سبد | — | ردیف‌ها، دکمه‌ی حذف و جمع کل | «سبد خرید شما خالی است» | — |
| کشوی علاقه‌مندی‌ها | — | ردیف‌ها با «افزودن به سبد» و «حذف» | «هنوز محصولی را به علاقه‌مندی‌ها اضافه نکرده‌اید» | — |

دکمه‌ی «تلاش دوباره» `state` را به `loading` برمی‌گرداند و `attempt` را یکی زیاد می‌کند؛
چون `attempt` در deps Effect بارگذاری است، Effect دوباره اجرا می‌شود.
پرچم `ignore` و cleanup جلوی نشستن جواب قدیمی روی جواب جدید را می‌گیرند.

## ۸. پوشه‌ها

```
src/
  main.tsx           نقطه‌ی شروع: App را داخل StrictMode روی #root می‌گذارد
  App.tsx            State، Effect ها و تابع‌های رویداد؛ تنها جایی که به Feature ها می‌رسد
  components/        کامپوننت‌های React (Header، SearchBox، ThemeToggle، FavoritesMenu، Toaster،
                     CategoryNav، CategoryGrid، Catalog، Status، ProductGrid، ProductCard،
                     CartPanel، SaleSection، SaleCountdown، ...)
  hooks/
    useFavorites.ts  خواندن علاقه‌مندی‌ها از store بیرونی با useSyncExternalStore
  shared/
    types.ts         مدل داده، هیچ چیز import نمی‌کند
    checks.ts        بررسی‌های ساده‌ی نوع (رشته، عدد، شیء) که Feature ها لازم دارند
  features/
    products/
      api/           fetch، Guard ها و بارگذاری (تنها جایی که fetch دارد)
      storage/       خواندن و نوشتن URL (این هفته توسط React استفاده نمی‌شود)
      catalog/       قیمت، موجودی، دسته، جستجو، قفسه‌ها، کارت و خلاصه‌ی سبد (توابع خالص)
    cart/
      rules/         قانون‌های سبد (توابع خالص)
      storage/       localStorage سبد (تنها جایی که به آن دست می‌زند)
    favorites/
      rules/         افزودن و حذف علاقه‌مندی (تابع خالص)
      storage/       localStorage علاقه‌مندی‌ها و store بیرونی
    theme/
      rules/         نوع Theme، isTheme و toggleTheme
      storage/       localStorage تم
    toast/           store بیرونی پیام کوتاه
```

پوشه‌های ui قدیمی (ساختن و تغییر DOM) و main.ts با کامپوننت‌های React عوض شدند.

قانون‌ها:
- داخل هر Feature جهت import ها همان است: catalog و rules و api و storage ← shared.
- Feature ها هیچ‌وقت مستقیم از هم import نمی‌کنند؛ فقط App و کامپوننت‌ها آن‌ها را کنار هم می‌گذارند.
- components فقط نمایش می‌دهند: fetch و localStorage ندارند، و State فقط وقتی دارند که فقط خودشان به آن نیاز دارد
  (باز بودن یک کشو، تم، شمارش معکوس). قیمت و متن را از catalog می‌گیرند.
- هیچ فایلی بیشتر از ۷۰ خط نیست.

## ۹. امنیت

هر چیزی که در مرورگر است عمومی است: کد، متغیرهای VITE_ و localStorage.
کاربر می‌تواند در DevTools تعداد سبد، قیمت‌ها، علاقه‌مندی‌ها و کد را عوض کند.
پس هیچ کلید یا رمزی در env نمی‌گذاریم، و جمع نهایی سبد باید در سرور حساب شود،
چون جمع کلی که مرورگر نشان می‌دهد فقط برای نمایش است و قابل اعتماد نیست.
متن جستجو هم از بیرون می‌آید؛ React متن را به‌صورت متن نشان می‌دهد و ما از
`dangerouslySetInnerHTML` استفاده نمی‌کنیم، پس به HTML تبدیل نمی‌شود.
