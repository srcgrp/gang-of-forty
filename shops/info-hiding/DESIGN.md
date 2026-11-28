# سوپرمارکت یاسمن — طراحی هفتهٔ ششم

## نیازمندی‌ها و محدوده

فروشگاه React هفتهٔ پنجم ادامه داده می‌شود. خانه، کاروسل‌های home.json را با حداکثر شش کارت در هر ردیف و لینک تعداددار «مشاهده همه» نمایش می‌دهد. هر کاروسل و دسته صفحهٔ فهرست کامل دارد. کارت محصول، تخفیف، موجودی و سبد قبلی بازاستفاده می‌شوند. تم روشن/تیره و سبد بین صفحه‌ها مشترک‌اند و بعد از Refresh می‌مانند.

فقط سطح اصلی انجام شده است. صفحهٔ جزئیات محصول، مرتب‌سازی در search params، memo و فرم checkout بونس‌اند و انجام نشده‌اند. سبد در صفحهٔ اصلی و PLP نمایش داده می‌شود؛ شمارنده در سربرگ همهٔ صفحه‌ها وجود دارد.

## جدول مسیرها

| آدرس بعد از # | صفحه | داده از کجا |
|---|---|---|
| / | HomePage | useCatalog؛ carousels از home.json، محصولات هر ردیف از carouselProducts |
| /plp/$carouselId | PlpPage | useParams با from مشخص، useCatalog و carouselProducts |
| /plp/offers | PlpPage | محصولات دارای پیشنهاد در offers.json |
| /plp/dairy | PlpPage | کاروسل لبنیات با categoryId برابر 2 |
| /plp/<category.slug> | PlpPage | دستهٔ categories.json و محصولات همان categoryId |
| /plp/nothing | PlpPage | پیام «این فهرست پیدا نشد» |
| هر مسیر دیگر | NotFound | پیام «صفحه پیدا نشد» و لینک خانه |

createHashHistory برای میزبانی فایل ثابت است؛ مثال واقعی: http://localhost:4173/#/plp/dairy. Refresh درخواست مسیر عمیق به سرور نمی‌فرستد. مسیرها فقط در App.tsx تعریف شده‌اند و Register لینک‌ها را نوع‌دار می‌کند. صفحه‌ها App را import نمی‌کنند؛ useParams({ from }) پارامتر را نوع‌دار می‌خواند و چرخهٔ import زمان اجرا ساخته نمی‌شود.

## Storeها و مالکیت داده

| Store | تعریف | داده و اکشن | چه کسی عوض می‌کند؟ | محل ذخیره |
|---|---|---|---|---|
| تم | hooks/useThemeStore.ts | theme و toggle | ThemeToggle | persist با کلید yasaman-theme؛ فقط theme |
| سبد | hooks/useCartStore.ts | lines، stock و add/remove/sync | ProductCard، CartPanel و useCatalog | خطوط سبد از راه storage/cart.ts با کلید قبلی yasaman-cart-v4 |

برای سبد Zustand انتخاب شد: تم از قبل همین ابزار را دارد، Provider اضافه لازم نیست و هر بخش فقط داده یا اکشن لازم را با selector می‌گیرد. Header فقط تعداد، ProductCard فقط add و CartPanel خطوط و remove را می‌خوانند. هیچ prop سبدی از App، Layout یا صفحه‌ها عبور نمی‌کند.

stock در حافظهٔ store برای محدود کردن افزودن به موجودی لازم است و ذخیره نمی‌شود. sync پس از دریافت داده، خطوط ذخیره‌شده را با محصولات و موجودی فعلی تطبیق می‌دهد. subscribe فقط هنگام تغییر lines، saveCart را صدا می‌زند. قیمت در localStorage ذخیره نمی‌شود.

useThemeStore() کل store را می‌خواند و به همهٔ تغییراتش واکنش نشان می‌دهد؛ useThemeStore(state => state.theme) فقط theme را انتخاب می‌کند. همهٔ خواندن‌های کامپوننتی selector دارند. استفادهٔ getState در هوک بارگذاری فقط برای صدا زدن sync است، نه خواندن State برای render.

## محاسبات و هوک داده

useCatalog وضعیت محلی LoadState<Catalog> دارد و هر صفحه آن را صدا می‌زند. محصولات، دسته‌ها، پیشنهادها، موجودی و home با Promise.all دریافت می‌شوند. getJSON خروجی unknown دارد، response.ok و Guardها بررسی می‌شوند. home فقط برای تعریف کاروسل‌ها استفاده می‌شود؛ ظاهر و نام فروشگاه قبلی حفظ می‌شوند.

Effect بارگذاری deps خالی و cleanup با ignore دارد. پاسخ صفحهٔ قبلی بعد از جابه‌جایی نمی‌تواند State یا موجودی مشترک را تغییر دهد. Status با switch و never حالت loading، success، empty و error را نمایش می‌دهد. ورودی نامعتبر home، خطای شبکه، 404 و JSON خراب پیام فارسی دارند. API و localStorage آموزشی تغییر نکرده‌اند.

تعداد، ردیف‌ها و جمع سبد State جدا نیستند؛ با cartCount، cartRows و cartTotal محاسبه می‌شوند. محصولات کاروسل با تابع خالص carouselProducts انتخاب می‌شوند؛ شناسهٔ نامعتبر null می‌دهد. قیمت و تخفیف کارت هم با toCard محاسبه می‌شوند. دادهٔ فهرست در store سراسری کپی نمی‌شود؛ هر صفحه آن را در هوک خود می‌گیرد.

## درخت کامپوننت‌ها

```text
App → RouterProvider → Layout[data-theme]
├─ Header → ThemeToggle، NavLinks و شمارندهٔ سبد
├─ Outlet
│  ├─ / : HomePage → Hero، Status، CategoryNav، CarouselRow × n
│  │                              └─ ProductCard × حداکثر 6
│  │                → Banners، CartPanel
│  ├─ /plp/$carouselId : PlpPage → Status یا عنوان، ProductGrid، CartPanel
│  │                                             └─ ProductCard × همه
│  └─ مسیر دیگر : NotFound → پیام و لینک خانه
└─ Footer
```

## پوشه‌ها و امنیت

types.ts مدل‌ها و نوع عمومی LoadState را دارد. api دریافت و Guardها، storage خواندن و نوشتن سبد، cart و catalog توابع خالص‌اند. hooks شامل دو store و useCatalog است. components نمایش مشترک و components/pages سه صفحه را نگه می‌دارند. App فقط Router را می‌سازد؛ main.tsx نقطهٔ ورود StrictMode است. فایل‌های TS/TSX حداکثر 70 خط‌اند.

متن API با React نمایش داده می‌شود و dangerouslySetInnerHTML نداریم. مقدار VITE_API_URL عمومی است. دادهٔ localStorage قابل اعتماد نیست: سبد Guard دارد و تم بازیابی‌شده به light/dark محدود می‌شود. مبلغ نهایی و موجودی سفارش واقعی باید دوباره در سرور بررسی شوند.

base برابر './'، پراکسی /api و متغیرهای محیطی حفظ شده‌اند. مقدار ../../api برای خروجی /shops/<slug>/ است. برای انتشار در /shops/info-hiding/info-hiding/ باید قبل از build مقدار .env.production به ../../../api تغییر کند. Hash Router عمق پوشهٔ میزبان را تغییر نمی‌دهد.

## بررسی و Profiler

در ثبت واقعی React DevTools روی PLP، یک کالا افزوده شد. بخش What caused this update نام Header و CartPanel را نشان می‌دهد: شمارنده و خطوط سبد تغییر کرده‌اند. تصویر profiler.png و تصاویر props و hooks در evidence-week6 هستند. memo اضافه نشده و امتیاز بونس ادعا نمی‌شود.

check، lint با deny-warnings، build، preview، Refresh مستقیم PLP، Back/Forward، تم، سبد مشترک، خطاها و نمایش موبایل آزموده شدند. خروجی آزمون‌ها در همان پوشه است. ابزار رسمی check-shop در مخزن عمومی موجود نبود؛ مطابق اعلام شما از آکادمی، این فایل‌ها لازم نیستند. بررسی محلی به نام خروجی ابزار رسمی ارائه نمی‌شود.
