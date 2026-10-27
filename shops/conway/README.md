# معیار انجام (Definition of Done) — هفته سوم

سوپرمارکت گلرخ با npm و TypeScript. این چک‌لیست از صفحه ۱۰ فایل تمرین هفته سوم کپی شده است.
فقط **سطح قبولی** را انجام دادم. هر مورد را خودم بررسی کردم و زیرش نوشتم چطور.

## سطح قبولی

- [x] `package.json` با `"private": true`، `"type": "module"` و اسکریپت‌های `dev`، `build`، `preview` و `check`
  - هر چهار اسکریپت در `package.json` هست: `vite`، `tsc --noEmit && vite build`، `vite preview` و `tsc --noEmit`.
- [x] `typescript` و `vite` در `devDependencies`؛ `package-lock.json` Commit شده؛ `node_modules/` و `dist/` Commit نشده‌اند
  - `typescript` 7.0.2 و `vite` 8.3.4 در `devDependencies` هستند. فایل `.gitignore` دو خط `dist/` و `node_modules/` دارد.
- [x] `tsconfig.json` با `"strict": true` و `vite.config.ts` در پوشه خودتان
  - هر دو فایل کنار `index.html` هستند.
- [x] `script.js` حذف شده، `script.ts` وجود دارد و `index.html` آن را با `type="module"` بارگذاری می‌کند
  - خط آخر `index.html`: `<script type="module" src="./script.ts"></script>`
- [x] همه `querySelector`ها نوع دقیق دارند (`querySelector<HTMLUListElement>(…)`) و حالت `null` بررسی شده است
  - سه `querySelector<HTMLElement>` بالای `script.ts` هست و یک `if (...) throw new Error(...)` اگر یکی از آن‌ها نبود، کار را قطع می‌کند.
- [x] همه عنصرهای ساخته‌شده با `createElement` و همه پارامترهای رویداد نوع دارند
  - مثلاً `const card: HTMLElement = document.createElement("article")` و `(e: MouseEvent) => { ... }`.
- [x] حداقل دو پکیج در `dependencies` که در `script.ts` استفاده شده‌اند و اثرشان در صفحه دیده می‌شود
  - `notyf` (پیام «... به سبد اضافه شد») و `canvas-confetti` (ریزش confetti) با هر کلیک روی دکمه +.
- [x] `npm run check` بدون خطا و `npm run build` موفق
  - `npm run check` هیچ خطایی چاپ نکرد و `npm run build` پوشه `dist/` را ساخت.
- [x] صفحه در `npm run dev` و `npm run preview` درست کار می‌کند و Console خطا ندارد
  - در هر دو: ۶ کارت لبنیات آمد، با دو کلیک سبد ۲ شد، پیام notyf و confetti دیده شد و Console خطا و هشدار نداشت.
- [x] بدون `!` و `as` برای ساکت کردن خطا
  - در `script.ts` هیچ `!` بعد از اسم متغیر و هیچ `as` نیست (`!` فقط برای «نه» در `if` به کار رفته است).

## امتیاز اضافه (انجام نشده)

- [ ] خط `"noImplicitAny": false` پاک شده و `npm run check` همچنان بدون خطاست
- [ ] برای داده‌های API `type` نوشته شده و توابع `fetch` نوع خروجی `Promise<…>` دارند
- [ ] همه متغیرها، پارامترها و مقدارهای بازگشتی نوع دارند
- [ ] هیچ `any` در کد نیست و `catch` از `unknown` استفاده می‌کند

**چالش اختیاری** (انجام نشده): کد را به چند ماژول تقسیم کنید: `types.ts` (همه typeها)، `api.ts` (توابع fetch) و `script.ts` (DOM و رویدادها). از `import type { Product } from './types'` استفاده کنید. یا آدرس API را در فایل `.env.development` با `VITE_API_URL` قرار دهید و در کد از `import.meta.env.VITE_API_URL` بخوانید.
