# DESIGN.md — اسپیس مارکت

سند طراحی فنی پروژه اسپیس مارکت، یک سوپرمارکت آنلاین فارسی با چیدمان راست‌به‌چپ (RTL).

---

## ۱. Scope & Requirements

### محدوده پروژه

اسپیس مارکت یک فروشگاه آنلاین فارسی است که به کاربران اجازه می‌دهد محصولات لبنی و پیشنهادات ویژه روزانه را مشاهده کنند.

### قابلیت‌های پیاده‌سازی شده

| قابلیت | وضعیت | توضیح |
|--------|-------|-------|
| نمایش محصولات لبنیات | ✅ | فیلتر محصولات با `categoryId === 2` |
| نمایش پیشنهادات ویژه | ✅ | محصولات دارای تخفیف با درصد و قیمت جدید |
| نمایش وضعیت موجودی | ✅ | محصولات ناموجود با badge و دکمه غیرفعال |
| شمارنده سبد خرید | ✅ | فقط تعداد کل اقلام (بدون جزئیات) |
| نوتیفیکیشن‌ها | ✅ | Notyf برای موفقیت و خطا |
| پیام بارگذاری | ✅ | نمایش هنگام fetch |
| پیام خطا | ✅ | نمایش در صورت شکست API |
| پیام خالی بودن | ✅ | برای پیشنهادات بدون آیتم |

### خارج از محدوده (هنوز پیاده‌سازی نشده)

- جستجوی محصولات
- فیلتر پیشرفته
- صفحه جزئیات محصول
- صفحه سبد خرید
- ویرایش/حذف اقلام سبد
- تکمیل خرید و پرداخت
- ذخیره سبد در localStorage
- احراز هویت کاربر

---

## ۲. Data Ownership

### منابع داده

| داده | منبع | فرمت |
|------|------|------|
| محصولات | `/api/products.json` | آرایه‌ای از Product |
| پیشنهادات | `/api/offers.json` | آرایه‌ای از Offer |
| موجودی | `/api/stock.json` | شیء Stock با Record<string, number> |
| دسته‌بندی‌ها | `/api/categories.json` | آرایه‌ای از Category |
| اطلاعات فروشگاه | `/api/shop.json` | شیء Shop |

### مسئولیت لایه‌ها

| لایه | مسئولیت | دسترسی |
|------|---------|--------|
| **API** (`src/api/`) | ارسال درخواست و اعتبارسنجی داده | تنها لایه مجاز به `fetch` |
| **Catalog** (`src/catalog/`) | منطق خالص کسب‌وکار | بدون DOM، بدون fetch، بدون state |
| **Main** (`src/main.ts`) | هماهنگ‌کننده، state، UI rendering | دسترسی کامل |

### جریان داده

```
API (getJSON) → Type Guards → Catalog Logic → UI Render
```

1. `getJSON()` داده raw را از سرور می‌گیرد (`unknown`)
2. Type Guards داده را اعتبارسنجی می‌کنند
3. Catalog logic محاسبات را انجام می‌دهد
4. Main.ts نتیجه را در DOM نمایش می‌دهد

---

## ۳. API Contract

### مسیرهای API

| Endpoint | روش | توضیح |
|----------|-----|-------|
| `../../api/products.json` | GET | لیست همه محصولات |
| `../../api/offers.json` | GET | لیست پیشنهادات تخفیف |
| `../../api/stock.json` | GET | موجودی انبار |

**نکته:** URLها فعلاً hardcoded در `main.ts` هستند. در آینده باید از `import.meta.env.VITE_API_URL` استفاده شود.

### ساختار داده‌ها

#### Product
```typescript
{
  id: number;          // شناسه یکتا
  name: string;        // نام محصول
  categoryId: number;  // شناسه دسته‌بندی
  price: number;       // قیمت به تومان
  unit: string;        // واحد فروش
  emoji: string;       // ایموجی نمایشی
  tags?: string[];     // برچسب‌ها (اختیاری)
}
```

#### Offer
```typescript
{
  productId: number;   // شناسه محصول
  percent: number;     // درصد تخفیف
  label?: string;      // برچسب تخفیف (اختیاری)
}
```

#### Stock
```typescript
{
  updatedAt?: string;  // زمان آخرین بروزرسانی
  items: Record<string, number>;  // موجودی هر محصول
}
```

**نکته مهم:** کلیدهای `items` از نوع **string** هستند (`"101"` نه `101`).

### نحوه دریافت اطلاعات

1. `getJSON(path)` درخواست ارسال می‌کند
2. اگر `response.ok` نباشد، خطا throw می‌شود
3. اگر JSON parse نشود، خطا throw می‌شود
4. داده به صورت `unknown` برگردانده می‌شود

### برخورد با پاسخ نامعتبر

| حالت | برخورد |
|------|--------|
| HTTP Error | throw Error در `getJSON` |
| Invalid JSON | throw Error در `getJSON` |
| Invalid Product | فیلتر توسط `filterValidProducts()` |
| Invalid Offer | فیلتر توسط `filterValidOffers()` |
| Invalid Stock | throw Error در `main.ts` |

**Log کردن:** تعداد رکوردهای نامعتبر در console ثبت می‌شود.

---

## ۴. UI States

### محصولات لبنیات

| وضعیت | شرط | نمایش |
|-------|-----|-------|
| Loading | قبل از دریافت پاسخ | «در حال بارگذاری محصولات...» |
| Success | دریافت موفق | کارت‌های محصول لبنی |
| Error | شکست در دریافت | پیام خطا + نوتیفیکیشن |

**نکته:** حالت Empty پیاده‌سازی نشده است.

### پیشنهادات ویژه

| وضعیت | شرط | نمایش |
|-------|-----|-------|
| Loading | قبل از دریافت پاسخ | «در حال بارگذاری پیشنهادهای روزانه...» |
| Success | دریافت موفق، حداقل یک آیتم | کارت‌های محصول با تخفیف |
| Empty | دریافت موفق، آرایه خالی | «فعلاً پیشنهادی برای نمایش وجود ندارد.» |
| Error | شکست در دریافت | پیام خطا + نوتیفیکیشن |

### وضعیت سبد خرید

| وضعیت | نمایش |
|-------|-------|
| خالی | عدد `0` کنار آیکون |
| دارای آیتم | تعداد کل اقلام |

---

## ۵. Architecture

### ساختار پوشه‌ها

```
src/
├── types.ts           # تایپ‌های مشترک
├── main.ts            # نقطه ورود، هماهنگ‌کننده
├── api/
│   ├── client.ts      # تابع getJSON
│   └── guards.ts      # Type Guards
├── catalog/
│   └── catalog.ts     # منطق خالص کاتالوگ
├── css/
│   └── style.css      # استایل‌ها
├── fonts/             # فونت‌های Peyda
└── images/            # تصاویر و آیکون‌ها
```

### مسئولیت هر فایل

#### `src/types.ts`

- تایپ‌های مشترک: `Product`, `Offer`, `Stock`, `Category`, `Shop`, `OfferProduct`
- Utility types: `ProductPrice`, `ShopConfig`, `LoadState`
- Constants: `NOTIFICATION_TYPES`, `CATEGORY_IDS`
- **محدودیت:** نباید چیزی import کند

#### `src/api/client.ts`

- تابع `getJSON(path: string): Promise<unknown>`
- تنها لایه مجاز به استفاده از `fetch`
- بررسی `response.ok` و throw در صورت خطا
- مدیریت JSON parse error
- **محدودیت:** نباید DOM یا state دسترسی داشته باشد

#### `src/api/guards.ts`

- Type Guards: `isProduct()`, `isOffer()`, `isStock()`, `isCategory()`
- Filter Functions: `filterValidProducts()`, `filterValidOffers()`
- اعتبارسنجی runtime برای داده‌های unknown
- Log تعداد رکوردهای نامعتبر
- **محدودیت:** نباید DOM، fetch، یا state دسترسی داشته باشد

#### `src/catalog/catalog.ts`

- توابع خالص: `filterProductsByCategory()`, `calculateDiscountedPrice()`, `buildOfferProducts()`
- بدون عوارض جانبی
- **محدودیت:** بدون DOM، بدون fetch، بدون localStorage، بدون notifications

#### `src/main.ts`

- نقطه ورود برنامه
- نگهداری state: `cartCount`, `notyf`
- DOM manipulation و event handling
- فراخوانی API و استفاده از guards
- هماهنگی بین لایه‌ها

### لایه‌های هنوز پیاده‌سازی نشده

| لایه | وضعیت | توضیح |
|------|-------|-------|
| `src/cart/` | ❌ | منطق سبد خرید (آینده) |
| `src/storage/` | ❌ | localStorage (آینده) |
| `src/ui/` | ❌ | رندر مجزا از main (آینده) |

### جهت وابستگی

```
main.ts
   ↓
catalog.ts
   ↓
api/client.ts + api/guards.ts
   ↓
types.ts
```

**قوانین:**
- لایه‌های پایین نباید از لایه‌های بالاتر import کنند
- `types.ts` نباید چیزی import کند
- `catalog.ts` نباید از `api/` یا DOM import کند

---

## ۶. Security & Validation

### اعتبارسنجی داده‌ها

| مرحله | روش | توضیح |
|-------|-----|-------|
| ۱. دریافت | `getJSON()` | Return `unknown`، نه `any` |
| ۲. بررسی ساختار | Type Guards | `isProduct()`, `isOffer()`, `isStock()` |
| ۳. فیلتر | Filter Functions | حذف رکوردهای نامعتبر |
| ۴. Log | Console | ثبت تعداد نامعتبرها |

### Type Guards

| تابع | اعتبارسنجی |
|------|------------|
| `isProduct()` | فیلدهای الزامی + اختیاری (`tags`) |
| `isOffer()` | فیلدهای الزامی + اختیاری (`label`) |
| `isStock()` | ساختار `items` با values عددی |

### محدودیت‌های باقی‌مانده

| محدودیت | وضعیت | توضیح |
|---------|-------|-------|
| URLهای hardcoded | ⚠️ | باید از `.env` استفاده شود |
| بدون persist | ⚠️ | سبد خرید در refresh از بین می‌رود |
| DOM در main | ⚠️ | هنوز رندر در main.ts است |
| بدون exhaustive switch | ⚠️ | `LoadState` تعریف شده اما استفاده نشده |

### امنیت

- **داده‌های مرورگر عمومی هستند:** همه چیز در DevTools قابل مشاهده است
- **متغیرهای `VITE_`:** در bundle نهایی embed می‌شوند - نباید secret داشته باشند
- **اعتبارسنجی نهایی:** در یک سیستم واقعی، سرور باید قیمت‌ها، تخفیف‌ها و موجودی را validate کند

---

## ۷. Dependencies

| پکیج | نسخه | کاربرد |
|------|------|--------|
| `vite` | ^8.3.5 | Build tool |
| `typescript` | ^7.0.2 | Type checking |
| `notyf` | ^3.10.0 | Notifications |
| `lucide-static` | ^1.61.0 | SVG Icons |
| `canvas-confetti` | ^1.9.4 | (فعلاً استفاده نشده) |

---

## ۸. Scripts

| دستور | کاربرد |
|-------|--------|
| `npm run dev` | اجرای development server |
| `npm run check` | TypeScript type checking |
| `npm run build` | Build برای production |
| `npm run preview` | Preview production build |
