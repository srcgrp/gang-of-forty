<div align="center">

# 🛒 Deep Module Supermarket

### یه سوپرمارکت آنلاین، فقط با HTML و CSS — بدون یه خط JavaScript

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![No JavaScript](https://img.shields.io/badge/JavaScript-0_lines-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](#)
[![RTL](https://img.shields.io/badge/RTL-Persian-2ea44f?style=for-the-badge)](https://en.wikipedia.org/wiki/Right-to-left_script)
[![Accessibility](https://img.shields.io/badge/A11y-WCAG_AA-blueviolet?style=for-the-badge)](#-دسترسپذیری)

<br>

<img src="assets/preview-desktop.png" alt="پیش‌نمایش دسکتاپ" width="720">

<br>
<br>

**Week 1 Project · Gang of Forty · Deep Module Shop**

</div>

---

## ✨ درباره پروژه

**Deep Module Supermarket** صفحه‌ی اصلی یک فروشگاه آنلاین واقعیه که **فقط با HTML و CSS** ساخته شده. نه JavaScript، نه فریم‌ورک، نه کتابخانه.

همه‌ی تعامل‌های صفحه — از باز شدن منو و کاروسل، تا حرکت بین بخش‌ها و منوی موبایل — با تکنیک‌های خالص CSS پیاده‌سازی شدن.

> 🧠 این پروژه یه تمرین عملی از درس **Gang of Forty** و مخصوص هفته‌ی اوله، برای تسلط روی HTML سمنتیک، SVG، CSS مدرن، دسترس‌پذیری و Reflow.

---

## 🎬 دموی زنده

🔗 **نسخه آنلاین:** [`deep-module-supermarket`](https://ArmanGhM.github.io/gang-of-fourty/shops/deep-module/) _(بعد از deploy فعال می‌شه)_

---

## 🖼 پیش‌نمایش

<div align="center">

### 🖥 دسکتاپ

<img src="assets/preview-desktop.png" alt="دسکتاپ" width="700">

### 📱 موبایل

<img src="assets/preview-mobile.png" alt="موبایل" width="280">

</div>

---

## 🚀 ویژگی‌ها

<table>
<tr>
<td width="50%" valign="top">

### 🎨 طراحی و ظاهر

- ✅ لوگوی اختصاصی با **SVG** (بدون تصویر خارجی)
- ✅ پالت رنگی سبز-نارنجی الهام‌گرفته از سوپرمارکت واقعی
- ✅ فونت **Vazirmatn** به‌صورت local (بدون CDN)
- ✅ طراحی **Responsive** از 320px تا 4K
- ✅ **Dark Mode** با `prefers-color-scheme`
- ✅ احترام به `prefers-reduced-motion`

</td>
<td width="50%" valign="top">

### ⚡ تعامل‌های بدون JS

- ✅ منوی «همه دسته‌ها» با `:hover` و `:focus-within`
- ✅ کاروسل با `scroll-snap-type`
- ✅ حرکت نرم بین بخش‌ها با `scroll-behavior: smooth`
- ✅ منوی موبایل با `checkbox hack`
- ✅ Hover و Focus کارت‌های محصول
- ✅ Skip-to-content link

</td>
</tr>
</table>

---

## 🧩 ساختار صفحه

```text
┌──────────────────────────────────────┐
│  📢  نوار اطلاع‌رسانی (ارسال رایگان)   │
├──────────────────────────────────────┤
│  🏪  Header (لوگو + جستجو + سبد)      │
├──────────────────────────────────────┤
│  📂  منوی اصلی (همه دسته‌ها Dropdown)  │
├──────────────────────────────────────┤
│  🎯  Banner تبلیغاتی                  │
├──────────────────────────────────────┤
│  🍎  ۶ دسته‌بندی اصلی                 │
├──────────────────────────────────────┤
│  🔥  کاروسل «پیشنهاد ویژه امروز»      │
├──────────────────────────────────────┤
│  🥖  کاروسل «لبنیات»                  │
├──────────────────────────────────────┤
│  🦶  Footer (راهنما، ساعت کاری، تماس) │
└──────────────────────────────────────┘
```
