# Changelog

## [1.0.0] - 2026-11-26

### Added

- فروشگاه React هفته پنجم: جست‌وجو، فیلتر دسته، سبد خرید با `localStorage`، شمارش معکوس فروش
- انتشار هفته هفتم: `AGENTS.md` / `CLAUDE.md`، `Dockerfile` دو مرحله‌ای با `nginx` و پروکسی `/api/`
- خط لوله `deploy.yml` با سه کار `check`، `docker` و `deploy` و `vercel.json` با بازنویسی `/api/`
- مهارت انتشار `.claude/skills/release/SKILL.md` و این `CHANGELOG.md`

### Changed

- `shop.json` به `{ "week": 7, "liveUrl": "" }` و اسکریپت `ci` به `package.json` اضافه شد
- عنوان تب مرورگر تعداد سبد را با ارقام فارسی نشان می‌دهد

### Fixed

- حالت خطای `API` به‌جای صفحه سفید پیام فارسی نشان می‌دهد؛ دکمه «تلاش دوباره» بارگذاری را تکرار می‌کند
