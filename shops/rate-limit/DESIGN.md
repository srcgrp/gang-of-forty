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
App (RouterProvider + routes)
└── Layout (theme div)
    ├── TopBar
    │   ├── AnnouncementBar
    │   ├── Header (Logo, SearchBox, ThemeToggle)
    │   └── CategoryNav
    ├── <Outlet />
    │   ├── HomePage  (/)
    │   │   ├── Hero
    │   │   ├── CategoryCards
    │   │   ├── SaleCountdown
    │   │   ├── ProductGrid (offers) · CategoryCarousel × n
    │   │   │   └── Carousel → ProductCard × n (OfferBadge, Price)
    │   │   ├── AdBanner
    │   │   └── LearnSection (LearnMethods, LearnDemo)
    │   ├── PlpPage   (/plp/$carouselId) → ProductCard × n
    │   └── NotFound  (any other URL)
    ├── Footer (FooterBottom)
    └── CartPanel
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
| `carouselId` (دسته یا لیست انتخاب‌شده) | Router (`/plp/$carouselId`) | `Link` در `CategoryNav`، `CategoryCards` و کروسل‌ها | URL (hash) |
| `searchQuery` | `useSearchStore` (Zustand) | `SearchBox` در `Header` (`setQuery`) | Zustand store (در حافظه) |
| `cart` (آیتم‌ها و تعدادشان) | `useCartStore` (Zustand، بیرون از React) | `ProductCard` (`add`) و `CartPanel` (`remove`) | Zustand store + `localStorage` (فقط از طریق `storage/cart.ts`) |
| `isCartOpen` | `Layout` | `TopBar` / `Header` (باز کردن پنل) و `CartPanel` (بستن پنل) | React State (در حافظه) |
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
App (RouterProvider + routes)
└── Layout (theme div)
    ├── TopBar
    │   ├── AnnouncementBar
    │   ├── Header (Logo, SearchBox, ThemeToggle)
    │   └── CategoryNav
    ├── <Outlet />
    │   ├── HomePage  (/)
    │   │   ├── Hero
    │   │   ├── CategoryCards
    │   │   ├── SaleCountdown
    │   │   ├── ProductGrid (offers) · CategoryCarousel × n
    │   │   │   └── Carousel → ProductCard × n (OfferBadge, Price)
    │   │   ├── AdBanner
    │   │   └── LearnSection (LearnMethods, LearnDemo)
    │   ├── PlpPage   (/plp/$carouselId) → ProductCard × n
    │   └── NotFound  (any other URL)
    ├── Footer (FooterBottom)
    └── CartPanel
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
| `carouselId` (دسته یا لیست انتخاب‌شده) | Router (`/plp/$carouselId`) | `Link` در `CategoryNav`، `CategoryCards` و کروسل‌ها | URL (hash) |
| `searchQuery` | `useSearchStore` (Zustand) | `SearchBox` در `Header` (`setQuery`) | Zustand store (در حافظه) |
| `cart` (آیتم‌ها و تعدادشان) | `useCartStore` (Zustand، بیرون از React) | `ProductCard` (`add`) و `CartPanel` (`remove`) | Zustand store + `localStorage` (فقط از طریق `storage/cart.ts`) |
| `isCartOpen` | `Layout` | `TopBar` / `Header` (باز کردن پنل) و `CartPanel` (بستن پنل) | React State (در حافظه) |
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
│   ├── guards
│   │   ├── basic.ts
│   │   ├── catalog.ts
│   │   ├── shop.ts
│   ├── catalog.ts
│   ├── endpoint.ts
│   ├── errors.ts
│   ├── http.ts
│   ├── load.ts
├── cart/
│   ├── cartLines.ts
│   ├── rules.ts
├── catalog/
│   ├── build.ts
│   ├── carousels.ts
│   ├── filter.ts
│   ├── group.ts
│   ├── loadCatalog.ts
│   ├── sort.ts
│   ├── state.ts
├── data/
│   ├── categories.ts
├── format/
│   ├── card.ts
│   ├── categories.ts
│   ├── price.ts
│   ├── title.ts
├── storage/
│   ├── cart.ts
│   ├── cartGuard.ts
├── hooks/
│   ├── useCartStore.ts
│   ├── useCatalog.ts
│   ├── useSearchStore.ts
│   ├── useThemeStore.ts
├── components/
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── NotFound.tsx
│   │   └── PlpPage.tsx
│   ├── Adbanner.tsx
│   ├── Announcementbar.tsx
│   ├── Carousel.tsx
│   ├── CartPanel.tsx
│   ├── Categorycards.tsx
│   ├── CategoryCarousel.tsx
│   ├── Categorynav.tsx
│   ├── Footer.tsx
│   ├── FooterBottom.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Layout.tsx
│   ├── LearnDemo.tsx
│   ├── LearnMethods.tsx
│   ├── Learnsection.tsx
│   ├── Logo.tsx
│   ├── Offerbadge.tsx
│   ├── Price.tsx
│   ├── Productcard.tsx
│   ├── Productgrid.tsx
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
## 12. Routes
Router: TanStack Router with `createHashHistory` (static hosting: URLs look like `#/plp/dairy` and Refresh works everywhere). Routes are defined in `App.tsx`, the only file (with `main.tsx`) that imports pages.
 
| آدرس (Route) | صفحه (Page) | داده از کجا (Data from where) |
| :--- | :--- | :--- |
| (root) | `Layout` | `useCatalog` (categories for `CategoryNav` and `Footer`, shop name for the page title) |
| `/` | `HomePage` | `useCatalog` + `carouselProducts` for `offers` and for each category slug; filtered by the query in `useSearchStore` |
| `/plp/$carouselId` | `PlpPage` | `useParams` (`carouselId`) + `useCatalog` + `carouselProducts` + `carouselTitle`; an unknown id gives `null` and the page shows "this list was not found" |
| any other URL | `NotFound` | none (root `notFoundComponent`) |
 
Notes:
- There is no `home.json`: the carousels are `offers` plus one per category, and `carouselId` is `"offers"` or a category `slug`.
- A plain `href="#x"` changes the route under hash history, so anchors were replaced by `Link` or scroll handlers. `Link` params are typed against the registered routes.
## 13. Stores (Zustand, in `src/hooks/`)
 
| Store | Defined in | What it holds | Who changes it | Where it is persisted |
| :--- | :--- | :--- | :--- | :--- |
| Theme | `useThemeStore.ts` | `theme` (`light` / `dark`), `toggle` | `ThemeToggle` (`toggle`); read by `Layout` (`data-theme`) | Zustand `persist` middleware, `localStorage` key `rate-limit-theme` |
| Cart | `useCartStore.ts` | `cart` (id → line), `add(item)`, `remove(id)` | `ProductCard` (`add`), `CartPanel` (`remove`); read by `Header` (count), `CartPanel` | `localStorage` only through `storage/cart.ts`: `loadCart` when the store is created, `saveCart` in `subscribe` after every change |
| Search | `useSearchStore.ts` | `query`, `setQuery` | `SearchBox` in `Header`; read by `HomePage` | not persisted (memory only) |
 
**Cart approach: Zustand, not `context + reducer`.**
- No `Provider`, no action union and no extra `useCart.ts` / `CartProvider.tsx` files.
- Each component reads one slice with a selector. `Header` re-renders only when the count changes, and `ProductCard` reads only `add` (a stable function), so cards do not re-render when the cart changes. With Context, every consumer re-renders on every change.
- The pure functions in `cart/` (`addItem`, `removeLine`, `countItems`, `cartTotal`) and the storage in `storage/` are reused unchanged.
- Count and total are derived by a selector or at render time, never stored. A selector returns a primitive or an existing reference, never a new array or object.
- Trade-off: the store is a module-level singleton, so tests must reset it between runs.
## 14. Component tree for each page
```text
Layout
├── TopBar
│   ├── AnnouncementBar
│   ├── Header (Logo, SearchBox, ThemeToggle, cart count)
│   └── CategoryNav
├── Outlet  ← the page
├── Footer (FooterBottom)
└── CartPanel
 
HomePage (/)
├── Hero
├── CategoryCards
├── SaleCountdown
├── ProductGrid (offers) → Carousel → ProductCard × n (OfferBadge, Price)
├── CategoryCarousel × n → Carousel → ProductCard × n (OfferBadge, Price)
├── AdBanner
└── LearnSection (LearnMethods, LearnDemo)
 
PlpPage (/plp/$carouselId)
├── Status (loading / empty / error)
└── ProductCard × n (OfferBadge, Price)
 
NotFound
└── Link back to /
```
 
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
## 12. Routes (Step 4)
- **Router:** TanStack Router with `createHashHistory`. The store is a static site, so URLs look like `#/plp/dairy` and Refresh works on every page. Routes are defined in `App.tsx`, the only file (with `main.tsx`) that imports pages.
- **Routes:** `/` (HomePage), `/plp/$carouselId` (PlpPage), and `notFoundComponent` (NotFound) for any other URL.
- **Carousels:** there is no `home.json`; the carousels are `offers` plus one per category, and `carouselId` is `"offers"` or a category `slug`. `carouselProducts` returns `null` for an unknown id, and PlpPage then shows "this list was not found" instead of a blank page.
- **Layout** holds the theme div, the top bar, the `<Outlet />`, the footer and the cart panel. `cartOpen` and `menuOpen` live there; `App` has no state.
- **Search:** the box is in `Header`; its text lives in `useSearchStore`, and only `HomePage` filters by it.
- **Hash history:** a plain `href="#x"` changes the route, so anchors were replaced by `Link` or by scroll handlers.
- **Typed links:** `Link` params are checked against the registered routes, so `to="/plp/$carouselID"` fails `npm run check`.
 