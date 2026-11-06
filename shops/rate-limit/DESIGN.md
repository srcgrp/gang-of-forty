# <Rate Limit> — design on one page

## 1. What must it do? (requirements)
- A customer can browse all available products.
- A customer can browse products by category.
- A customer can view product details, prices, and availability.

- Not now: Online payment, Delivery address managment, Serach items, Check cart and remove items

## 2. Screens and parts
Header (logo, search, cart count) · Category list · Product grid · Product card · Cart

## 3. Data (types.ts)
Product, Category, Stock, Offer, Cart

## 4. Where does each piece live?
Server: Product information, Category information, Stock information, Promotional offers
Client state: Current search query, Selected category, Shopping cart, Product quantities
localStorage: Shopping cart data, Cart persistence between page refreshes
URL: Current category filter

## 5. API (what we fetch, and when)
GET /api/products.json  → on start
GET /api/stock.json     → on start
GET /api/categories.json     → on start
GET /api/offers.json     → on start

## 6. States of each screen
loading · success · empty · error

## 7. Folders
src/types.ts · src/api/ · src/cart/ · src/ui/ · src/main.ts
