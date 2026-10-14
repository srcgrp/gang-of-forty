# 🛒 Supermarket API (shared, read-only)

Static JSON files that act like a small shop API for Week 2 (XHR, Promise, `fetch`, `async`/`await`).
**Do not edit this folder:** it is shared by all 40 shops, and CI only accepts changes inside `shops/<your-slug>/`.

| File | What it is |
|---|---|
| `shop.json` | Sample shop: name, slogan, opening hours, delivery fee |
| `categories.json` | 5 categories (`id`, `slug`, `name`, `emoji`) |
| `products.json` | 16 products (`id`, `categoryId`, `name`, `emoji`, `unit`, `price` in Toman, `tags`) |
| `stock.json` | `items` = stock per product id (some are `0`: out of stock) |
| `offers.json` | Discounts: `productId`, `percent`, `label` |
| `broken.json` | Broken **on purpose**: `.json()` must fail |
| `missing.json` | Does **not** exist on purpose: you get a 404 |
| `starter.html` | The in-class challenges |

Join by id: `product.id` ↔ `stock.items[product.id]` ↔ `offer.productId`, and `product.categoryId` ↔ `category.id`.

## Where to load it from

| Your page | URL |
|---|---|
| `shops/<your-slug>/index.html` (online **and** on your machine) | `../../api/products.json` |
| `api/starter.html` | `./products.json` |
| Anywhere else, online | `https://gof.zzb.cx/api/products.json` |

On your machine, serve the **repo root** over http (VS Code Live Server, or `npx serve .`).
Opened as `file://`, the browser blocks XHR and `fetch`.
