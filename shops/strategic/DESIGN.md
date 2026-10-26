# <Shop name> — design on one page

## 1. What must it do? (requirements)
- A customer can …
- A customer can …
- Not now: …

## 2. Screens and parts
Header (logo, search, cart count) · Category list · Product grid · Product card · Cart

## 3. Data (types.ts)
Product, Category, Stock, Offer, Cart

## 4. Where does each piece live?
Server: …   Client state: …   localStorage: …   URL: …

## 5. API (what we fetch, and when)
GET /api/products.json  → on start
GET /api/stock.json     → on start

## 6. States of each screen
loading · success · empty · error

## 7. Folders
src/types.ts · src/api/ · src/cart/ · src/ui/ · src/main.ts