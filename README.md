# 🧺 دار و دسته چهل‌نفره — Gang of Forty

A Persian online grocery built by 40 bootcamp learners over 6 weeks.
Each learner owns **one supermarket** under `shops/<slug>/` and grows it every week,
from a hello-world page in Week 1 to a shop that can sell its groceries by Week 6.

یک سوپرمارکت آنلاین فارسی که ۴۰ شرکت‌کننده بوت‌کمپ در ۶ هفته می‌سازند.
هر نفر صاحب **یک سوپرمارکت** در پوشه `shops/<slug>/` است و هر هفته آن را کامل‌تر می‌کند.

## Rules / قوانین

1. **Only edit your own folder:** `shops/<your-slug>/`. CI rejects PRs that touch anything else.
   فقط فایل‌های پوشه خودت را تغییر بده.
2. **Never push to `main`.** Always use a branch and a Pull Request.
3. **Your HTML must pass the validator.** CI runs it on the files you change.
4. Keep your slug for all 6 weeks. / اسم (slug) خودت را تا آخر نگه دار.

## Week 1: claim your shop / هفته اول: غرفه‌ات را بگیر

Pick a free shop from the table below (the landing page shows which ones are taken), then:

```bash
git clone <this-repo-url>
cd gang-of-forty
git checkout -b feat/<slug>-w1
```

Open `shops/<slug>/index.html` and put your name in the author tag:

```html
<meta name="author" content="Your first name">
```

Use a first name or a nickname: everyone who visits the site can see it.

```bash
git add shops/<slug>
git commit -m "Claim <slug> shop"
git push -u origin feat/<slug>-w1
```

Open a Pull Request, write a short description in Markdown, and ask your mentor for a review.
Once it's merged, your name appears on the landing page. 🎉

## Every week after / هفته‌های بعد

```bash
git switch main
git pull
git checkout -b feat/<slug>-w<week>
# work only inside shops/<slug>/
```

## Preview locally / دیدن روی سیستم خودت

- Double-click `index.html` to open the landing page.
- To use `fetch` (`api/*.json`), serve the folder over http: VS Code **Live Server**,
  or `python3 -m http.server` and open http://localhost:8000

## What the landing card shows

Mentors copy these from your page into `api/shops.json` (you never edit it):

| From your `shops/<slug>/index.html` | Shown on the landing card |
|---|---|
| `<title>` | shop name |
| `<meta name="description">` | tagline |
| `<meta name="author">` | owner (empty = free shop) |

## The 40 shops / ۴۰ سوپرمارکت

| # | | Name | slug |
|---|---|---|---|
| 1 | 🔁 | DRY | `dry` |
| 2 | 🪶 | KISS | `kiss` |
| 3 | ✂️ | YAGNI | `yagni` |
| 4 | 🧩 | ترکیب به جای وراثت | `composition` |
| 5 | ✅ | TDD | `tdd` |
| 6 | 🧼 | کد تمیز | `clean-code` |
| 7 | 🛠️ | ریفکتور | `refactor` |
| 8 | 👃 | بوی کد | `code-smell` |
| 9 | ⛺ | قانون پیشاهنگ | `boy-scout` |
| 10 | 📨 | قانون دیمیتر | `demeter` |
| 11 | 🔄 | لیسکوف | `liskov` |
| 12 | 🚪 | باز-بسته | `open-closed` |
| 13 | 💥 | شکست سریع | `fail-fast` |
| 14 | 🦆 | اردک پلاستیکی | `rubber-duck` |
| 15 | 🪟 | پنجره شکسته | `broken-windows` |
| 16 | 🎯 | گلوله رسام | `tracer-bullet` |
| 17 | 📐 | تعامد | `orthogonality` |
| 18 | ⏱️ | بیگ‌او | `big-o` |
| 19 | 🏢 | قانون کانوی | `conway` |
| 20 | 📅 | قانون بروکس | `brooks` |
| 21 | 🗂️ | جداسازی دغدغه‌ها | `separation` |
| 22 | 😮 | کمترین شگفتی | `least-surprise` |
| 23 | 🏎️ | بهینه‌سازی زودرس | `premature-optimization` |
| 24 | 🛤️ | قرارداد به جای پیکربندی | `convention` |
| 25 | 🏷️ | نسخه‌بندی معنایی | `semver` |
| 26 | 🔺 | قضیه CAP | `cap` |
| 27 | 🔂 | خودتوانی | `idempotency` |
| 28 | 🗄️ | کش | `cache` |
| 29 | ⚖️ | متعادل‌کننده بار | `load-balancer` |
| 30 | 🚦 | محدودیت نرخ | `rate-limit` |
| 31 | 🧊 | ماژول عمیق | `deep-module` |
| 32 | 🙈 | پنهان‌سازی اطلاعات | `info-hiding` |
| 33 | 🗺️ | برنامه‌نویسی راهبردی | `strategic` |
| 34 | 🧯 | حذف خطا از ریشه | `define-errors-out` |
| 35 | 🏁 | شرایط رقابتی | `race-condition` |
| 36 | 🔒 | بن‌بست | `deadlock` |
| 37 | 📬 | کارگزار پیام | `message-broker` |
| 38 | 🔌 | قطع‌کننده مدار | `circuit-breaker` |
| 39 | 🧪 | ACID | `acid` |
| 40 | 🍕 | شاردینگ | `sharding` |
