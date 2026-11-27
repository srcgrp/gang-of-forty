# گزارش Lighthouse

**تاریخ:** 2026-11-27  
**آدرس بررسی‌شده:** https://gang-of-forty-fail-fast.vercel.app/  
**محیط:** Lighthouse 13.6.0، Chrome 158، شبیه‌سازی موبایل (412×823)  
**نوع گزارش:** اجرای موبایل Lighthouse با دسته‌بندی‌های Performance، Accessibility، Best Practices و SEO

## امتیازها

| دسته‌بندی | امتیاز |
| --- | ---: |
| Performance | 58 |
| Accessibility | 87 |
| Best Practices | 100 |
| SEO | 92 |

## شاخص‌های اصلی

| شاخص | نتیجه |
| --- | ---: |
| First Contentful Paint (FCP) | 4.9 s |
| Largest Contentful Paint (LCP) | 6.2 s |
| Speed Index | 51.3 s |
| Total Blocking Time (TBT) | 90 ms |
| Cumulative Layout Shift (CLS) | 0 |

## موارد برجسته برای بهبود

- بهینه‌سازی تصویر اصلی و زمان نمایش محتوای بزرگ (LCP)؛ Speed Index در این اجرا بسیار بالا بود.
- بررسی کنتراست رنگ، اندازه و فاصله‌ی کنترل‌های لمسی، و نام دسترس‌پذیر کنترل‌ها.
- اصلاح لینک پرش به محتوا و پاسخ `robots.txt`.

فایل‌های [گزارش کامل HTML](lighthouse-report.report.html) و [داده‌ی خام JSON](lighthouse-report.report.json) جزئیات auditها را دارند.

> این سنجش روی آدرس عمومی Vercel انجام شد. چون PR شاخه‌ی تمرین هنوز deploy نشده، نتیجه‌ها وضعیت deployment فعلی را نشان می‌دهند و ممکن است با نسخه‌ی داخل PR تفاوت داشته باشند.
