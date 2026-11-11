# طراحی فروشگاه MARTO (shops/dry)

## ۱. نیازمندی‌ها

کاربر می‌تواند:
- پیشنهادهای ویژه و لبنیات را در کاروسل ببیند
- محصولات را جستجو کند (جستجوی فارسی که به اشتباه تایپی هم حساس نیست) و نتیجه را همان لحظه ببیند
- محصولات را بر اساس دسته فیلتر کند
- محصول را به سبد اضافه یا از آن حذف کند و تعداد سبد را در هدر و جمع کل را در پنل سبد ببیند
- با Refresh سبد خود را از دست ندهد و تعداد سبد را در عنوان تب مرورگر ببیند
- بفهمد کدام محصول ناموجود است
- اگر بارگذاری شکست خورد، پیام فارسی ببیند و با دکمه‌ی «تلاش دوباره» دوباره امتحان کند
- شمارش معکوس حراج را ببیند و بتواند آن را ببندد و دوباره نشان دهد

بعد از تمام شدن معماری اضافه می‌شود:
- دکمه‌ی علاقه‌مندی (♡) که انتخاب کاربر را در localStorage نگه می‌دارد
- صفحه‌ی جدا برای هر محصول (آدرس #/product/<id>)
- صفحه‌ی سبد خرید با تغییر تعداد

عمداً در این نسخه نیست: ورود و ثبت‌نام، پرداخت و ذخیره‌ی سبد روی سرور،
چون API فقط فایل JSON خواندنی است و خروجی dist باید روی هر سرور استاتیکی کار کند.
دسته و متن جستجو هم این هفته در آدرس (URL) نگه داشته نمی‌شوند؛ فقط در State برنامه‌اند.

## ۲. بخش‌های صفحه

هدر (لوگو، جستجو، سبد) · منوی دسته‌ها · هیرو · دسته‌بندی‌ها ·
پیشنهادهای ویژه · لبنیات · محصولات · حراج ویژه · بنرها · مجله · پنل سبد · فوتر.

بخش‌هایی که با داده‌ی API پر می‌شوند: پیشنهادهای ویژه، لبنیات، محصولات (با فیلتر دسته و جستجو).
بقیه ثابت‌اند و فقط JSX هستند.

## ۳. درخت کامپوننت‌ها

```
App
├─ LogoSprite
├─ Header
│  └─ SearchBox
├─ CategoryNav
├─ main
│  ├─ Hero
│  ├─ CategoryGrid
│  ├─ Catalog
│  │  ├─ Status                (فقط وقتی داده loading، empty یا error است؛ در error دکمه‌ی Retry دارد)
│  │  └─ ProductGrid × 3       (پیشنهادهای ویژه، لبنیات، محصولات)
│  │     └─ ProductCard × n
│  ├─ SaleSection
│  │  └─ SaleCountdown
│  ├─ PromoBanners
│  ├─ Blog
│  └─ CartPanel
└─ Footer
```

کامپوننت‌ها props را فقط می‌خوانند. هر اتفاقی (افزودن، حذف، انتخاب دسته، تایپ جستجو، Retry)
با یک callback prop به App گزارش می‌شود و App State را عوض می‌کند.

## ۴. State کجا زندگی می‌کند

| State | کامپوننت صاحب | چه کسی عوضش می‌کند | کجا ذخیره می‌شود |
|---|---|---|---|
| `cart` (آرایه‌ی CartLine: id و qty) | App | handleAdd و handleRemove (با توابع خالص addToCart و removeFromCart) | حافظه و localStorage با کلید `dry-cart`؛ شروع با loadCart، ذخیره در Effect روی `[cart]` |
| `categoryId` | App | CategoryNav و CategoryGrid با `onPick` | فقط حافظه |
| `query` (متن جستجو) | App | SearchBox با `onQuery` | فقط حافظه |
| `state` (LoadState) | App | Effect بارگذاری (و handleRetry که آن را `loading` می‌کند) | فقط حافظه؛ داده از api/*.json می‌آید |
| `attempt` (شمارنده‌ی تلاش دوباره) | App | handleRetry | فقط حافظه؛ در deps همان Effect بارگذاری است |
| `open` (نمایش شمارش معکوس) | SaleSection | دکمه‌ی بستن/نمایش | فقط حافظه |
| `left` (ثانیه‌های باقی‌مانده) | SaleCountdown | setInterval داخل Effect | فقط حافظه |

مقدارهایی که State نیستند و موقع render حساب می‌شوند:

| مقدار | از چه حساب می‌شود | چرا State نیست |
|---|---|---|
| تعداد سبد (`cartCount`) | `cart` | از سبد قابل حساب است؛ State جدا ممکن است با سبد ناهماهنگ شود |
| ردیف‌ها و جمع کل سبد (`cartSummary`) | `cart`، محصولات و تخفیف‌ها | اگر جدا ذخیره شود، با عوض شدن سبد یا قیمت جمع قدیمی می‌ماند؛ حساب‌کردنش ارزان است |
| محصولات نمایش‌داده‌شده | `state`، `categoryId` و `query` | فیلتر خروجی همین سه تاست و با هر تغییر خودش درست می‌شود |
| کارت‌های پیشنهاد ویژه و لبنیات | `state` | فقط تبدیل داده‌ی بارگذاری‌شده به کارت است |
| عنوان تب مرورگر | `cart` | State نیست؛ اثر جانبی است و در Effect نوشته می‌شود |

## ۵. داده‌ها و صاحبشان

| داده | صاحب | کجا زندگی می‌کند |
|---|---|---|
| لیست محصولات، موجودی، پیشنهادها | سرور | api/*.json (فقط خواندنی) |
| وضعیت بارگذاری (LoadState) | برنامه | حافظه؛ features/products/api/load.ts می‌سازد و Effect داخل App آن را نگه می‌دارد |
| سبد (آرایه‌ی CartLine: id و qty) | کاربر | حافظه‌ی App و localStorage با کلید dry-cart (فقط داخل features/cart/storage/cartStorage.ts) |
| محصولات علاقه‌مندی (بعداً) | کاربر | localStorage، کلید dry-favorites |
| آدرس API | پروژه | env، متغیر VITE_API_URL، خوانده‌شده در features/products/api/http.ts |

## ۶. قرارداد API

| فایل | نوع در types.ts | Type Guard |
|---|---|---|
| products.json | Product[] | isProduct |
| stock.json | Stock | isStock |
| offers.json | Offer[] | isOffer |
| categories.json | Category[] | isCategory |

هر پاسخ اول `unknown` است و فقط بعد از رد شدن از Guard به نوع واقعی تبدیل می‌شود.
محصول یا تخفیفی که از Guard رد نشود حذف می‌شود و تعدادش در Console نوشته می‌شود.
سبد ذخیره‌شده در localStorage هم از بیرون می‌آید و با isCartLine چک می‌شود.
فعلاً صفحه از categories.json و shop.json استفاده نمی‌کند؛ Guard و نوع‌شان آماده است.

## ۷. حالت‌ها

وضعیت داده یک Union به نام LoadState است (loading, success, empty, error).
کامپوننت Status آن را با switch روی `status` نشان می‌دهد؛ حالت success را Catalog خودش با ProductGrid نشان می‌دهد.

| بخش | loading | success | empty | error |
|---|---|---|---|---|
| Catalog (پیشنهادها، لبنیات، محصولات) | «در حال بارگذاری...» | سه ProductGrid با کارت‌ها | «محصولی برای نمایش وجود ندارد» | پیام فارسی با role=alert و دکمه‌ی «تلاش دوباره» |
| ProductGrid بدون نتیجه (دسته یا جستجو) | — | — | «محصولی برای نمایش وجود ندارد» | — |
| CartPanel | — | ردیف‌ها، دکمه‌ی حذف و جمع کل | «سبد خرید شما خالی است» | — |

دکمه‌ی «تلاش دوباره» `state` را به `loading` برمی‌گرداند و `attempt` را یکی زیاد می‌کند؛
چون `attempt` در deps Effect بارگذاری است، Effect دوباره اجرا می‌شود.
پرچم `ignore` و cleanup جلوی نشستن جواب قدیمی روی جواب جدید را می‌گیرند.

## ۸. پوشه‌ها

```
src/
  main.tsx           نقطه‌ی شروع: App را داخل StrictMode روی #root می‌گذارد
  App.tsx            State، Effect ها و تابع‌های رویداد؛ تنها جایی که به هر دو Feature می‌رسد
  components/        کامپوننت‌های React (Header، SearchBox، CategoryNav، Catalog، Status،
                     ProductGrid، ProductCard، CartPanel، SaleSection، SaleCountdown، ...)
  shared/
    types.ts         مدل داده، هیچ چیز import نمی‌کند
    checks.ts        بررسی‌های ساده‌ی نوع (رشته، عدد، شیء) که هر دو Feature لازم دارند
  features/
    products/
      api/           fetch، Guard ها و بارگذاری (تنها جایی که fetch دارد)
      storage/       خواندن و نوشتن URL (این هفته توسط React استفاده نمی‌شود)
      catalog/       قیمت، موجودی، دسته، جستجو، ساخت کارت و خلاصه‌ی سبد (توابع خالص)
    cart/
      rules/         قانون‌های سبد (توابع خالص)
      storage/       localStorage سبد (تنها جایی که به آن دست می‌زند)
```

پوشه‌های ui قدیمی (ساختن و تغییر DOM) و main.ts با کامپوننت‌های React عوض شدند.

قانون‌ها:
- داخل هر Feature جهت import ها همان است: catalog و api و storage ← shared.
- دو Feature هیچ‌وقت مستقیم از هم import نمی‌کنند؛ فقط App به هر دو می‌رسد.
- components فقط نمایش می‌دهند: State ندارند مگر State محلی خودشان (SaleSection و SaleCountdown)،
  و fetch و localStorage ندارند. قیمت و متن را App از catalog می‌گیرد و به شکل props پایین می‌دهد.
- هیچ فایلی بیشتر از ۷۰ خط نیست.

## ۹. امنیت

هر چیزی که در مرورگر است عمومی است: کد، متغیرهای VITE_ و localStorage.
کاربر می‌تواند در DevTools تعداد سبد، قیمت‌ها و کد را عوض کند.
پس هیچ کلید یا رمزی در env نمی‌گذاریم، و جمع نهایی سبد باید در سرور حساب شود،
چون جمع کلی که مرورگر نشان می‌دهد فقط برای نمایش است و قابل اعتماد نیست.
متن جستجو هم از بیرون می‌آید؛ React متن را به‌صورت متن نشان می‌دهد و ما از
`dangerouslySetInnerHTML` استفاده نمی‌کنیم، پس به HTML تبدیل نمی‌شود.
