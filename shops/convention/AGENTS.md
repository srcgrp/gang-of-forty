# فروشگاه Convention

Convention فروشگاه فارسی و راست‌به‌چپ من در پروژهٔ Gang of Forty است و با React، TypeScript و Vite ساخته شده است.

## اجرای پروژه

- دستورها را از پوشهٔ `shops/convention` اجرا کن. برای نصب وابستگی‌ها از `npm ci` استفاده کن.
- `npm run dev` فروشگاه را در `http://localhost:5173` بالا می‌آورد.
- قبل از هر کامیت `npm run ci` باید موفق شود. این دستور lint، بررسی TypeScript، تست‌ها و build را اجرا می‌کند.

## پوشه‌ها و قواعد import

- `src/types.ts` فقط برای تعریف نوع‌های مشترک است. آن‌ها را با `import type` وارد کن.
- `fetch` فقط در `src/api/` مجاز است. درخواست‌های JSON از `getJSON` رد می‌شوند و لایهٔ API ساختار پاسخ را بررسی می‌کند.
- `useCatalog` در `src/hooks/` داده را از `src/api/` می‌گیرد. صفحه‌ها و کامپوننت‌ها داده و وضعیت بارگذاری را از همین هوک بگیرند.
- برای منطق فیلتر و مرتب‌سازی از `src/catalog/` و برای منطق سبد از `src/cart/` استفاده کن. این توابع مستقل از React هستند.
- `useCartStore` برای خواندن و ذخیرهٔ سبد از `src/storage/cart-storage.ts` استفاده می‌کند.
- صفحه‌ها در `src/components/pages/` می‌توانند کامپوننت‌های مشترک و هوک‌ها را وارد کنند. هر کامپوننت را حداکثر ۷۰ خط نگه دار.
- `src/App.tsx` صفحه‌ها را برای تعریف مسیرها وارد می‌کند. صفحه‌ها پارامتر مسیر را با `useParams` بگیرند و `App.tsx` را وارد نکنند.

## موارد ممنوع

- تغییر فایل‌های بیرون از `shops/convention`، از جمله API مشترک در ریشهٔ مخزن.
- استفاده از `any`، تبدیل نوع با `as` به‌جز `as const`، علامت `!` برای حذف احتمال `null`، `@ts-ignore` و خاموش‌کردن lint.
- کامیت کردن `node_modules/`، `dist/`، `.vercel/`، فایل‌های `.env*` و توکن‌ها.

For a release, follow .claude/skills/release/SKILL.md step by step.
