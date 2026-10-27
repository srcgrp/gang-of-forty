# 📐 DESIGN.md — معماری و طراحی فروشگاه سبزکاله

این سند، تصمیمات معماری، قوانین وابستگی و ساختار پروژه هفته چهارم را مستند می‌کند.

---

## ۱. معماری کلی (Layered Architecture)

پروژه به **۷ لایه با وابستگی یک‌طرفه** تقسیم شده است:

```text
┌──────────────────────────────────────┐
│    main.ts  /  boot.ts               │  ← ورودی و راه‌اندازی
├──────────────────────────────────────┤
│    main-render.ts                    │  ← اتصال State به UI
├──────────────────────────────────────┤
│    features/                         │  ← منطق دامنه (Domain Logic)
│    (cart, catalog, filter, theme)    │
├──────────────────────────────────────┤
│    shared/ui/                        │  ← کامپوننت‌های عمومی UI
├──────────────────────────────────────┤
│    shared/api/                       │  ← ارتباط با سرور (fetch)
├──────────────────────────────────────┤
│    shared/types.ts                   │  ← قرارداد داده‌ها
└──────────────────────────────────────┘
```

---

## ۲. قانون وابستگی (Dependency Rule)

**قانون طلایی:** هیچ لایه‌ای نباید به لایه‌ی بالاتر از خودش وابسته باشد.

- **`shared/types.ts`**: هیچ `import`ی ندارد — تنها منبع حقیقت (Single Source of Truth) برای Typeها.
- **`shared/api/`**: تنها لایه‌ای که `fetch` دارد و فقط `types` را می‌شناسد.
- **`shared/ui/`**: فقط DOM می‌سازد و داده را به‌عنوان پارامتر می‌گیرد.
- **`features/cart`, `features/catalog`, `features/filter`, `features/theme`**: منطق دامنه (بدون دسترسی به `main.ts` یا `main-render.ts`).
- **`main-render.ts`**: State را از بالا می‌گیرد و به Componentهای UI پاس می‌دهد.
- **`main.ts` و `boot.ts`**: تمام لایه‌ها را به هم وصل می‌کنند (Orchestration).

**اعتبارسنجی خودکار:** اسکریپت `check-arch.mjs` این قانون را با ساخت گراف وابستگی‌ها بررسی می‌کند. خروجی باید همیشه `✓ All layer imports are valid` باشد.

---

## ۳. جریان داده (Data Flow)

```text
[API] → shared/api (fetch + guards) → LoadState<AppData>
                                            ↓
                                   boot.ts (اورکستراسیون)
                                            ↓
                                    State (AppState)
                                            ↓
                              main-render.ts (توزیع State)
                                            ↓
                              shared/ui + features (رندر DOM)
                                            ↓
                                         کاربر
                                            ↓
                              (رویداد: کلیک، تایپ، …)
                                            ↓
                              features (به‌روزرسانی منطق)
                                            ↓
                              State (تغییر) → re-render
```

**قانون:** داده‌ها همیشه یک‌طرفه از بالا به پایین جریان دارند. آپدیت State فقط از طریق توابع pure در `features/` انجام می‌شود.

---

## ۴. قرارداد UI (UI Contract)

هر Component UI باید این قرارداد را رعایت کند:

- **ورودی:** فقط داده (State/Model) به‌عنوان پارامتر.
- **خروجی:** یک `HTMLElement` یا `void` (در صورت side-effect مثل `renderX`).
- **بدون State داخلی:** هیچ Componentی نباید State مستقل داشته باشد.
- **بدون دسترسی به API:** فقط `main.ts` و `boot.ts` حق صدا زدن API را دارند.
- **همیشه A11y:** هر Component باید `aria-label`، `role` و `focus-visible` مناسب داشته باشد.

**مثال درست:**

```typescript
export function createProductCard(
  product: Product,
  offer: Offer | null,
  stock: StockData,
): HTMLLIElement {
  // ...
}
```

**مثال اشتباه:**

```typescript
export function createProductCard() {
  const product = fetch("/api/products.json"); // ❌ نقض قانون
}
```

---

## ۵. قوانین کدنویسی

- **حداکثر ۷۰ خط در هر فایل**: هر فایل باید فقط یک مسئولیت داشته باشد.
- **بدون `any`, `as` (برای ساکت کردن خطا), `@ts-ignore`**.
- **همه‌ی تایپ‌های داده خارجی با `unknown` + Type Guard** اعتبارسنجی شوند.
- **همه‌ی متن‌های کاربر با `textContent`** (نه `innerHTML`) درج شوند — ضد XSS.
- **همه‌ی فایل‌های `localStorage` فقط در `features/*/[name]-storage.ts`**.
- **همه‌ی فایل‌های `fetch` فقط در `shared/api/client.ts`**.

---

## ۶. ساختار پوشه‌ها

```text
shops/deep-module/
├── index.html
├── style.css
├── DESIGN.md                    ← این سند
├── README.md
├── package.json
├── tsconfig.json
├── vite.config.ts
├── .env.development
├── .env.production
├── check-arch.mjs
│
└── src/
    ├── types.ts                 ← Interfaceها (بدون Import)
    ├── main.ts                  ← نقطه ورود
    ├── boot.ts                  ← راه‌اندازی و fetch
    ├── main-render.ts           ← رندر State
    │
    ├── shared/
    │   ├── types.ts
    │   ├── api/
    │   │   ├── client.ts        ← fetch + timeout + retry
    │   │   ├── guards.ts        ← Type Guardها
    │   │   └── load.ts          ← loadAll + LoadState
    │   └── ui/
    │       ├── dom.ts
    │       ├── format.ts
    │       ├── loading.ts       ← لودر سراسری
    │       ├── banner.ts        ← آفلاین + Retry Toast
    │       ├── modal.ts
    │       ├── toast.ts
    │       ├── skeleton.ts
    │       ├── error-state.ts
    │       ├── empty-state.ts
    │       ├── header.ts
    │       ├── hero.ts
    │       ├── banners.ts
    │       ├── footer.ts
    │       ├── global-events.ts
    │       └── animate.ts
    │
    └── features/
        ├── cart/
        │   ├── cart.ts          ← توابع خالص سبد
        │   ├── parse.ts         ← اعتبارسنجی CartItem
        │   ├── cart-storage.ts  ← localStorage
        │   ├── cart-view.ts
        │   ├── cart-item.ts
        │   └── cart-controller.ts
        │
        ├── catalog/
        │   ├── filter.ts
        │   ├── search.ts
        │   ├── stock.ts
        │   ├── stock-storage.ts
        │   ├── url.ts           ← State در URL
        │   ├── search-init.ts
        │   ├── search-events.ts
        │   ├── search-actions.ts
        │   ├── search-form.ts
        │   ├── search-keyboard.ts
        │   ├── search-render.ts
        │   ├── product-card.ts
        │   ├── product-events.ts
        │   ├── detail.ts
        │   ├── categories.ts
        │   ├── offers.ts
        │   ├── all-products.ts
        │   ├── category-sections.ts
        │   └── setup-filter-search.ts
        │
        ├── filter/
        │   ├── filter-modal.ts
        │   └── filter-render.ts
        │
        └── theme/
            ├── theme.ts
            └── theme-storage.ts
```

---

## ۷. انتشار (Deployment)

### متغیرهای محیطی

```bash
# .env.development (npm run dev)
VITE_API_URL=/api
```

درخواست‌ها به پروکسی ویت (`vite.config.ts`) می‌روند و به `gof.zzb.cx` متصل می‌شوند. این کار مشکل CORS را در توسعه حل می‌کند.

```bash
# .env.production (npm run build)
VITE_API_URL=../../api
```

چون سایت در زیرپوشه `shops/<slug>/` منتشر می‌شود، آدرس نسبت به موقعیت `index.html` تنظیم می‌شود تا روی هر سروری (حتی GitHub Pages یا زیرپوشه‌های عمیق) کار کند.

### تنظیمات `vite.config.ts`

```typescript
export default defineConfig({
  base: "./",
  server: {
    proxy: {
      "/api": { target: "https://gof.zzb.cx", changeOrigin: true },
    },
  },
  preview: {
    proxy: {
      "/api": { target: "https://gof.zzb.cx", changeOrigin: true },
    },
  },
});
```

- `base: "./"`: تمام assetها با مسیر نسبی ساخته می‌شوند، نه با `/` که فقط روی دامنه‌ی ریشه کار می‌کند.

### بررسی قبل از انتشار

```bash
npm run check                              # TypeScript
node check-arch.mjs src --shop             # معماری
npm run build                              # dist/
npm run preview                            # http://localhost:4173/
```

در حالت `preview`، تب **Network** در DevTools باید همه‌ی فایل‌ها را با کد **۲۰۰** نشان دهد و Console هیچ خطایی نداشته باشد.
