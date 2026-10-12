# 🛒 Supermarket API (shared, read-only)

Static JSON files that act like a small shop API for Week 2 (`fetch`, Promise, `async`/`await`).
**Do not edit this folder:** it is shared by all 40 shops, and CI only accepts changes inside `shops/<your-slug>/`.

| File | What it is |
|---|---|
| `shop.json` | Sample shop: name, slogan, notice bar, menu, about, address, phone, schedule, help links, copyright |
| `categories.json` | 7 categories (`id`, `slug`, `name`, `emoji`, `color`); `slug` is the section fragment, e.g. `#dairy` |
| `products.json` | 43 products, at least 6 per category (`id`, `categoryId`, `name`, `emoji`, `unit`, `price` in Toman, `tags`) |
| `stock.json` | `items` = stock per product id (some are `0`: out of stock) |
| `offers.json` | 10 discounts: `productId`, `percent`, `label` |
| `home.json` | Home page: `hero` and `side` banners, `promos`, and the `carousels` list (title, fragment id, source) |
| `broken.json` | Broken **on purpose**: `.json()` must fail |
| `missing.json` | Does **not** exist on purpose: you get a 404 |

Join by id: `product.id` ↔ `stock.items[product.id]` ↔ `offer.productId`, and `product.categoryId` ↔ `category.id`.

## Where to load it from

| Your page | URL |
|---|---|
| `shops/<your-slug>/index.html` (online **and** on your machine) | `../../api/products.json` |
| Anywhere else (the in-class starter on the syllabus site) | `https://gof.zzb.cx/api/products.json` |

On your machine, serve the **repo root** over http (VS Code Live Server, or `python3 -m http.server`).
Opened as `file://`, the browser blocks `fetch` to relative paths.
