# DESIGN

## 1. نیازمندی‌ها
### کاربر در صفحه چه کارایی میتونه بکنه:
- اگر کاربر از بخش همه دسته ها روی لبنیات کلیک کنه میره به بخش لبنیات و بستنی ینی کروسل دوم
- تو قسمت پنجره شکسته وقتی کاربر روی گزارش مشکل کلیک میکنه میره به بخش پایین صفحه و تماس با ما تا بتونه شماره تلفن فروشگاه رو برداره
- تو قسمت فوتر بخش دسته بندی ها وقتی کاربر روی لبنیات و بستنی میزنه میره به بخش لبنیات و بستنی
- سبد خرید مقدارش رو با رفرش حفظ میکنه
- محتوای سبد خرید(ینی کارت پنل) بعد از کروسل دوم نشون داده میشه به کاربر. همچنین جمع کالاهای کاربر هم بهش نشون داده میشه ولی هنوز استایل بهش ندادم
- وقتی کاربر یه محصول رو به سبد خریدش اضاف میکنه براش تو سبد خرید ذخیره میشه و شمارنده سبد خرید عوض میشه.
- در انتهای صفحه کاربر با کلیک روی دکمه بازگشت به بالا به ابتدای صفحه برمیگرده
- کاربر میتونه  با جستجو کردن محصول مورد نظر خودش رو در سایت پیدا کنه
- تو بخش دسته بندی ها اگر کاربر روی هر دسته بزنه، به صفحه‌ی فهرست همون دسته (PLP) میره و همه‌ی محصولاتش رو می‌ بینه
- کنار عنوان هر کاروسل لینک مشاهده همه هست که به صفحه‌ی فهرست همون کاروسل میره
### چه چیزی عمدا خارج ازین نسخه ست؟

- ـ(دکمه ورود ظاهریه) لاگین کردن کاربر
- کلیک روی کارت محصول چیزی رو باز نمیکنه 
- موجودی انبار تو کارت محصولاتم نشون داده نمیشه
- پرداخت و ثبت سفارش و حساب جمع نهایی توسط سرور

## 2. بخش‌های صفحه
- نوار اعلان 
- هدر 
- منوی ناوبری و همبرگری
- بنر
- یه قسمت برای مزایای خرید از سایت 
- دسته بندی ها 
- کاروسل پیشنهاد ویژه
- یه بخش که قسمتیش درباره موضوعم هست ینی پنجره شکسته و یه بخش درباره یکی از محصولات سایت داره اطلاع رسانی میکنه
- کاروسل لبنیات 
- قسمت سبد خرید کهاطلاعات سبد خرید رو به کاربر نشون میده
- یه بخش برای عضویت تو شگفتانه
- فوتر 



## 3. داده‌ها و صاحبشان
- نوار اعلان رو از ای پی آی گرفتم پس میشه سرور 
- بخش لبنیات (با رفرش از بین نمیره و توی آدرس بالای صفحه نوشته میشه ) پس میشه url - مثل #/plp/dairy
- منوی ناوبری و همبرگری رو از سرور گرفتم پس اینم میشه سرور
- محتوای کارت های محصول از سرور 
- بخش هایی از فوتر مثل دسته ها و قسمت تماس با ما و درباره فروشگاه رو از ای پی آی گرفتم یعنی سرور 
- آدرس api  از .env میاد
- تم روشن یا تیره تو localStorage ذخیره میشه، پس با رفرش میمونه - پس میشه Store
- سبد خرید تو localStorage ذخیره میشه - پس میشه Store
- متن جستجو فقط تو حافظه‌ی همین تب هست - پس میشه Store
## 4. قرارداد API

- فایل products.json رو به شکل product[] برای دو کاروسل پیشنهاد ویژه و لبنیات
- فایل stock.json رو به شکل { items: Record<number, number>} برای ناموجود بودن کارت های محصول
- فایل offers.json به شکل Offer[] برای کاروسل پیشنهاد ویژخ ینی قیمت های قدیمی  و جدید و تخفیف ها
- فایل categories.json به شکل Category برای بخش همه دسته ها - منو همبرگری - دسته بندی های فوتر و دسته بندی ها
- فایل shop.json به شکل shop برای بخش نوار اعلان آدرس و شماره (تماس با ما)- شعار و متن درباره ما (فوتر)- لینک های منو ناوبری

## 5. حالت‌ها
- loading = فچ زده شده ولی هنوز تموم نشده. صفحه‌ی اصلی و PLP پیام «در حال بارگذاری» رو نشون میدن.
- success = فایل‌ها اومدن و توشون محصول بود. کارت‌ها و دسته‌بندی‌ها درست بارگذاری میشن.
- error = اینترنت قطع باشه یا اسم فایل رو اشتباه زده باشم (مثلا بجای products.json بنویسم missing.json) و فایل پیدا نشه. سایت بالا نمیاد و مینویسه متاسفیم محصولات بارگذاری نشدند. یه دکمه‌ی «تلاش دوباره» هم هست.
- empty = فایل سالم اومده ولی لیستش خالیه. مینویسه «متأسفیم، محصولات بارگذاری نشدند. لطفاً دوباره تلاش کنید. و دکمه‌ی «تلاش دوباره هم هست.
## 6. پوشه‌ها
```
src/  
  api/      
      client.ts
      guards.ts
      loadShop.ts
      shopGuards.ts
  catalog/   
      carouselProducts.ts
      crouselTitle.ts
      cardView.ts
      finalPrice.ts
      lookup.ts
      pageView.ts
      stock.ts    

  cart/
    addToCart.ts
    removeFromCart.ts
    totals.ts
    unitPrice.ts


   hooks/
    useCatalog.ts  
    useThemeStore.ts  
    useCartStore.ts  
    useSearchStore.ts

  components/
    pages/
        HomePage.tsx
        NotFound.tsx
        PlpPage.tsx 
    ArrowLeft.tsx
    Benefits.tsx
    CartPanel.tsx
    CategoryNave.tsx
    Footer.tsx
    FooterBottom.tsx
    FooterCategory.tsx
    FooterContact.tsx
    FooterInfo.tsx
    FooterOpenHours.tsx
    Header.tsx
    Hero.tsx
    DocumentTitle.tsx
    Layout.tsx
    Middle.tsx
    Notification.tsx
    Navigation.tsx
    ProductCard.tsx
    ProductGrid.tsx
    Status.tsx
    SearchBox.tsx
    ThemeToggle.tsx
    carouselRow.tsx
  
  storage/
    cartStorage.ts

  App.tsx
  main.tsx
  types.ts  
  format.ts
  ```
## 7. امنیت

### چه چیزی در مرورگر عمومیه؟ 
همه‌چی: کد JS، فایل‌های API (products، stock، offers، categories، shop که شماره‌تلفن هم توشه)
و مقدارهای VITE_ توی .env که موقع build تو کد می‌شینن. کاربر با F12 همه‌شون رو می‌بینه
و می‌تونه عوضشون کنه. پس هیچ رمز و کلید محرمانه‌ای اونجا نمی‌ذاریم.
متن داده‌ی API با JSX می‌آید که خودش امنش می‌کند و از dangerouslySetInnerHTML استفاده نمی‌کنیم.



### چرا جمع نهایی سبد خرید رو سرور باید حساب کنه؟
چون هر چی تو مرورگر حساب بشه دست کاربره. مثلاً قیمت بعد از تخفیف الان تو مرورگر
حساب می‌شه و کاربر با F12 می‌تونه عددش رو عوض کنه یا درخواستی که می‌ره رو دستکاری کنه.
پس عددی که تو صفحه می‌بینه فقط نمایشه. وقتی سبد واقعی داشتیم، مرورگر فقط می‌فرسته
.کدوم محصول، چند تا و سرور با قیمت، تخفیف و موجودی خودش جمع رو حساب می‌کنه.

## 8. مسیرها

آدرس‌ها با `createHashHistory` ساخته میشن، پس شکلشون `#/plp/dairy` هست و با رفرش هم همون صفحه میاد. مسیرها فقط تو `App.tsx` تعریف شدن، چون قانون معماری فقط به `App.tsx` و `main.tsx` اجازه میده صفحه‌ها رو import کنن.

| آدرس | صفحه | داده از کجا |
|---|---|---|
| `/` | `HomePage` | `useCatalog` برای گرفتن داده از api، `carouselProducts` و `carouselTitle` برای ساختن کاروسل‌ها، `searchProducts` برای جستجو |
| `/plp/$carouselId` | `PlpPage` | `useParams` برای خوندن `carouselId` از آدرس، `useCatalog`، `carouselProducts` و `carouselTitle`، `searchProducts` |
| هر آدرس دیگه (مثلا `/nowhere`) | `NotFound` | داده‌ای نمی‌خواد |

- اگه `carouselId` ناشناخته باشه (مثلا `/plp/nothing`)، `carouselProducts` مقدار `null` برمی‌گردونه و `PlpPage` پیام «این فهرست پیدا نشد» رو نشون میده.
- `carouselId` یا `offers` هست (محصولات تخفیف‌دار) یا `slug` یکی از دسته‌ها تو `categories.json`.
- کاشی‌های دسته‌بندی و لینک «مشاهده همه» با `Link` به `/plp/$carouselId` میرن. آدرس و پارامتر تایپ‌دارن و غلط تایپی تو آدرس خطای TypeScript میده.
- هر صفحه خودش `useCatalog` رو صدا می‌زنه، پس با رفتن به هر صفحه پنج فایل دوباره گرفته میشه.

## 9. Storeها

Store یعنی State مشترک که بیرون از درخت React زندگی می‌کنه و هر کامپوننت با selector فقط تکه‌ای رو که لازم داره می‌خونه.

| Store | کجا تعریف شده | چی توشه | کی عوضش می‌کنه | کجا ذخیره میشه |
|---|---|---|---|---|
| تم | `hooks/useThemeStore.ts` | `theme` و تابع `toggle` | دکمه‌ی `ThemeToggle` تو `Header` | `localStorage` با میدلور `persist` |
| سبد | `hooks/useCartStore.ts` | `lines` و توابع `add` و `remove` | `add` با + تو `ProductCard`، `remove` با ✕ تو `CartPanel` | `localStorage` از راه `storage/cartStorage.ts` |
| جستجو | `hooks/useSearchStore.ts` | `query` و تابع `setQuery` | `SearchBox` تو `Header` | ذخیره نمیشه، با رفرش خالی میشه |

### چرا راه الف ینی zustand رو انتخاب کردم
چون نسبت به context API کدنویسی ساده تری داشت. نیاز به ساخت provider نداشت و با استفاده از سلکتور تونستم مشخص کنم هر کامپوننت فقط به کدوم بخش از استیت نیاز داره. این باعث میشه از رندر های غیر ضروری جلوگیری بشه و مدیریت استیت راحتتر باشه.

### چیزهایی که State نیستن، چون از بقیه حساب میشن

- تعداد کالاهای سبد و جمع سبد: از `lines` حساب میشن.
- محصولات هر کاروسل: هر بار با تابع خالص `carouselProducts` ساخته میشن.
- عنوان تب: یه کار بیرون از React هست و `DocumentTitle` با یه Effect انجامش میده.

## 10. درخت کامپوننت‌ها برای هر صفحه

`Layout` دور همه‌ی صفحه‌هاست و صفحه‌ی هر مسیر جای `Outlet` میشینه.

```
App
└─ RouterProvider
   └─ Layout (div تم)
      ├─ DocumentTitle
      ├─ Header
      │  ├─ SearchBox
      │  └─ ThemeToggle
      ├─ Navigation
      ├─ main
      │  └─ Outlet  ← صفحه‌ی مسیر
      └─ Footer
         ├─ FooterInfo
         ├─ FooterCategory
         ├─ FooterContact
         ├─ FooterOpenHours
         └─ FooterBottom
```


### صفحه‌ی اصلی `/`

```
HomePage
├─ Status (وقتی loading، empty یا error)
├─ Hero
├─ Benefits
├─ CategoryNav (هر کاشی یه Link به PLP)
├─ CarouselRow «پیشنهاد ویژه»
│  └─ ProductGrid → ProductCard × n
├─ Middle
├─ CarouselRow «لبنیات»
│  └─ ProductGrid → ProductCard × n
├─ CartPanel
└─ Notification
```
### صفحه‌ی فهرست محصولات `/plp/$carouselId`

```
PlpPage
├─ Status (وقتی loading، empty یا error)
├─ «این فهرست پیدا نشد» (وقتی id ناشناخته‌ست)
└─ وقتی id درسته:
   ├─ Link برگشت به خونه
   └─ ProductGrid (با wrap) → ProductCard × n
```

### صفحه‌ی پیدا نشد

```
NotFound
└─ Link برگشت به خونه
```