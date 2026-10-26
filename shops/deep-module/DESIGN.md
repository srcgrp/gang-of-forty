
**قانون:** هیچ لایه‌ای به لایه‌ی بالاتر از خودش وابسته نیست.
- `types.ts` هیچ importی نداره
- `api/` فقط `types` رو می‌شناسه
- `storage/` فقط `types` و `localStorage`
- `cart/` و `catalog/` توابع خالص هستن (بدون DOM، بدون I/O)
- `ui/` فقط DOM می‌سازه و داده رو به‌عنوان پارامتر می‌گیره
- `main.ts` و `main-render.ts` لایه‌ها رو به هم وصل می‌کنن

## ۳. ساختار پوشه‌ها
src/
├── types.ts ← تمام Interfaceها (بدون Import)
├── api/
│ ├── client.ts ← fetch با timeout/retry
│ ├── guards.ts ← Type Guardها برای unknown
│ └── load.ts ← loadAll با LoadState
├── storage/
│ ├── cart-storage.ts
│ ├── stock-storage.ts
│ └── theme-storage.ts
├── cart/
│ ├── cart.ts ← توابع خالص سبد
│ └── parse.ts ← اعتبارسنجی CartItem
├── catalog/
│ ├── filter.ts ← فیلتر و مرتب‌سازی
│ ├── search.ts ← جستجوی فازی با fuse.js
│ └── stock.ts ← محاسبه موجودی
├── ui/
│ ├── dom.ts ← helper برای createElement
│ ├── format.ts ← formatPrice, safeHref
│ ├── product-card.ts
│ ├── product-events.ts
│ ├── cart-view.ts
│ ├── cart-item.ts
│ ├── detail.ts
│ ├── filter-modal.ts
│ ├── search-init.ts
│ ├── states/
│ │ ├── error-state.ts
│ │ ├── empty-state.ts
│ │ ├── skeleton.ts
│ │ └── banner.ts
│ ├── theme.ts
│ ├── toast.ts
│ ├── modal.ts
│ └── animate.ts
├── main.ts ← State + boot + اتصال لایه‌ها
└── main-render.ts ← رندر همه بخش‌های صفحه

