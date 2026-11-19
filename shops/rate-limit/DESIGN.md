# Rate Limit — design on one page
 
## 1. What must it do? (requirements)
- A customer can browse all available products.
- A customer can browse products by category.
- A customer can view product details, prices, offers, and availability.
- A customer can search products, switch UI themes, and manage items in the shopping cart.
- Not now: Online payment, Delivery address management
## 2. Screens and parts
Announcement bar · Top bar & Header (logo, search box, theme toggle, cart count) · Hero & Sale countdown · Category cards & navigation · Product carousels & Catalog grid · Product card (offer badge, price) · Ad banner · Learn section · Cart panel · Footer
 
## 3. Component Tree
```text
App
├── AnnouncementBar
├── Header
│   ├── TopBar
│   │   ├── Logo
│   │   ├── SearchBox
│   │   └── ThemeToggle
│   └── CategoryNav
├── Hero
│   └── SaleCountdown
├── CategoryCards
├── CategoryCarousel × n
│   └── Carousel
│       └── ProductCard × n
│           ├── OfferBadge
│           └── Price
├── AdBanner
├── Catalog
│   ├── Status
│   └── ProductGrid
│       └── ProductCard × n
│           ├── OfferBadge
│           └── Price
├── LearnSection
│   ├── LearnMethods
│   └── LearnDemo
├── CartPanel
└── Footer
    └── FooterBottom
```
 
## 4. Data (types.ts)
Product, Category, Stock, Offer, Cart, CartState, Theme, ThemeState
 
## 5. Where does each piece live? (System Level)
- **Server:** Product information, Category information, Stock information, Promotional offers
- **Client state:** Current search query, Selected category, Shopping cart, Product quantities, UI Theme, Cart panel visibility
- **localStorage:** Shopping cart data, Theme preference (dark/light)
- **URL:** Current category filter
## 6. Where does State live? (React Architecture)
 
| State | کامپوننت صاحب (Owner) | چه کسی عوضش می‌کند (Updater) | کجا ذخیره می‌شود (Storage) |
| :--- | :--- | :--- | :--- |
| `products`, `categories`, `stock`, `offers` | `useCatalog` (هوک در `hooks/`) | `useCatalog` (پس از دریافت پاسخ از API در زمان بارگذاری اولیه) | React State (در حافظه) |
| `status` (`loading` / `success` / `error`) | `useCatalog` | `useCatalog` (در طول چرخه درخواست‌های `fetch` و نمایش در `Status`) | React State (در حافظه) |
| `selectedCategory` | `App` | `CategoryNav` و `CategoryCards` (از طریق Prop Callback هنگام انتخاب دسته‌بندی) | React State + URL Query/Hash |
| `searchQuery` | `App` | `SearchBox` (از طریق Prop Callback هنگام تایپ کاربر) | React State (در حافظه) |
| `cart` (آیتم‌ها و تعدادشان) | `useCartStore` (Zustand، بیرون از React) | `ProductCard` (`add`) و `CartPanel` (`remove`) | Zustand store + `localStorage` (فقط از طریق `storage/cart.ts`) |
| `isCartOpen` | `App` | `TopBar` / `Header` (باز کردن پنل) و `CartPanel` (بستن پنل) | React State (در حافظه) |
| `theme` (`light` / `dark`) | `useThemeStore` (Zustand) | `ThemeToggle` (`toggle`) | Zustand `persist` + `localStorage` (کلید `rate-limit-theme`) |
| `timeLeft` (تایمر تخفیف ویژه) | `SaleCountdown` | `SaleCountdown` (به‌روزرسانی ثانیه‌شمار در `useEffect`) | Local React State |
| `scrollIndex` / `activeSlide` | `Carousel` | `Carousel` (دکمه‌های قبلی و بعدی اسلایدر) | Local React State |
 
### مقادیر حساب‌شده (Derived Values — چرا State نیستند؟)
- **مجموع تعداد آیتم‌های سبد (`cartCount` برای نمایش در `TopBar`/`Header`):** با selector از روی `cart` در Store محاسبه می‌شود (`useCartStore((s) => countItems(s.cart))`)؛ نگهداری آن به عنوان State جداگانه باعث ناهماهنگی (Out of sync) بین لیست سبد و عدد روی آیکون می‌شود.
- **مبلغ کل سبد خرید (`totalPrice` در `CartPanel`):** حاصل جمع `(قیمت محصول × تعداد)` با اعمال تخفیف‌های `offers` است؛ چون مستقیماً از `cart`، `products` و `offers` به دست می‌آید، در زمان رندر محاسبه می‌شود.
- **لیست محصولات فیلترشده (`filteredProducts` برای `Catalog` و `ProductGrid`):** از ترکیب `products` با `selectedCategory` و `searchQuery` به دست می‌آید؛ ذخیره آن در State باعث تکرار داده‌های اصلی و پیچیدگی در همگام‌سازی می‌شد.
- **قیمت نهایی پس از تخفیف و درصد تخفیف (`finalPrice` و `discountPercent` در `Price` و `OfferBadge`):** با تطبیق شناسه محصول با آرایه `offers` محاسبه می‌شود و نیازی به ذخیره مجزا ندارد.
- **وضعیت موجودی هر کارت (`isAvailable` و `remainingStock` در `ProductCard`):** از تفاضل موجودی کل در `stock` و تعداد موجود در `cart` به دست می‌آید.
## 7. API (what we fetch, and when)
- `GET /api/products.json` → on start
- `GET /api/stock.json` → on start
- `GET /api/categories.json` → on start
- `GET /api/offers.json` → on start
## 8. States of each screen
loading · success · empty · error
 
## 9. Folders
```text
src/
├── api/
├── cart/
├── catalog/
├── data/
├── format/
├── storage/
├── hooks/
│   ├── useCartStore.ts
│   ├── useCatalog.ts
│   └── useThemeStore.ts
├── components/
│   ├── AdBanner.tsx
│   ├── AnnouncementBar.tsx
│   ├── Carousel.tsx
│   ├── CartPanel.tsx
│   ├── Catalog.tsx
│   ├── CategoryCards.tsx
│   ├── CategoryCarousel.tsx
│   ├── CategoryNav.tsx
│   ├── Footer.tsx
│   ├── FooterBottom.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── LearnDemo.tsx
│   ├── LearnMethods.tsx
│   ├── LearnSection.tsx
│   ├── Logo.tsx
│   ├── OfferBadge.tsx
│   ├── Price.tsx
│   ├── ProductCard.tsx
│   ├── ProductGrid.tsx
│   ├── SaleCountdown.tsx
│   ├── SearchBox.tsx
│   ├── Status.tsx
│   ├── ThemeToggle.tsx
│   └── TopBar.tsx
├── types.ts
├── App.tsx
└── main.tsx
```
## 10. Decision: shared cart with Zustand (Step 2, Option A)
**Problem:** `Header` (count), `ProductCard` (add) and `CartPanel` (list, remove) all need the cart. While it lived in `App`, `cart`, `onAdd`, `onRemove` and `count` had to pass through `TopBar`, `Catalog`, `ProductGrid` and `CategoryCarousel`, which never use them.
 
**Chosen:** a Zustand store, `src/hooks/useCartStore.ts`, instead of `useReducer` + `useContext`.
- **Less code:** no `Provider`, no action union, no extra `useCart.ts` / `CartProvider.tsx` files.
- **Fewer re-renders:** each component reads only its slice with a selector. `Header` re-renders only when the count changes; `ProductCard` reads only `add` (a stable function), so it does not re-render when the cart changes. With Context, every consumer re-renders on every change.
- **Existing logic is reused:** the pure functions `addItem`, `removeLine`, `countItems` and `cartTotal` are unchanged. Storage stays only in `storage/`: `loadCart` when the store is created, `saveCart` in `subscribe` after every change.
- **Consistent:** the theme store (Step 1) uses the same approach.
**Rules:** count and total are derived (selector or render), never stored. A selector must return a primitive or an existing reference, never a new array or object (e.g. `Object.values`); compute those in the component.
 
**Trade-off:** the store is a module-level singleton, so tests must reset its state between runs.
 
## 11. Data hook (Step 3)
- `useCatalog()` in `src/hooks/useCatalog.ts` owns the `Effect` that loads the catalog (with the `ignore` flag) and returns `LoadState<Catalog>`. `Catalog` holds `items`, `specials` (offers), `categories` and `shop`.
- Which products a carousel shows is a pure function, `carouselProducts(catalog, carouselId)` in `catalog/group.ts`: `"offers"` -> discounted products, a category slug -> products of that category, anything else -> `null`. Components do not compute it themselves.
- A failed load returns an `error` state with a `retry` function.
 