# Clean Market — design on one page

## 1. What must it do? (requirements)

- A customer can see the groceries, grouped by category, with the unit, the price, how many are left, and a discount when there is one.
- A customer can search by name, add an available product to the cart, see the cart count, and empty the cart.
- Not now: login, payment, checkout, and choosing a delivery time.

## 2. Page sections

One page, from top to bottom:

- Banner: the delivery notice
- Header: logo, slogan, search, cart count, menu
- Status line (`#status`)
- Hero and the side promo
- Category list, starting with All
- Featured rows: today's offers, plus the category named in `home.json`
- Promo strips
- One row for every other category
- Cart: the lines (name and qty), the discounted total, and a button that empties it
- Footer: about, address, phone, categories, help, hours, copyright

A product card shows the emoji, the name, the unit, the stock, the price, a discount badge when there is an offer, and the add button. An out-of-stock product is gray and its button is disabled.

## 3. Data and its owner

- Price, name, unit, and category: server (`products.json`, `categories.json`)
- Discount percent: server (`offers.json`). The browser computes the discounted price
- Stock left: server (`stock.json`)
- Banner, slogan, address, phone, menu, and footer: server (`shop.json`)
- Hero, promo strips, and the list of rows: server (`home.json`)
- Search text and selected category: URL (`?category=` and `?q=`), read and written only in `storage/url-filters.ts`
- Cart: `localStorage`, key `cart` (list of `{ productId, qty }`)
- Jumps such as `#dairy` and `#cart`: URL.
- API address prefix: `.env`, variable `VITE_API_URL`

## 4. API contract

All six files are read once, together, when the page starts:

- `products.json` → `Product[]`: `id`, `categoryId`, `name`, `emoji`, `unit`, `price`, `tags`
- `categories.json` → `Category[]`: `id`, `slug`, `name`, `emoji`, `color`
- `offers.json` → `Offer[]`: `productId`, `percent`, `label`
- `stock.json` → `Stock`: `updatedAt`, `items` (product id → how many are left)
- `shop.json` → `Shop`: notice, slogan, about, address, phone, schedule, menu, help, copyright
- `home.json` → `Home`: hero, side, promos, carousels

Joins: `product.id` matches `stock.items` and `offer.productId`. `product.categoryId` matches `category.id`.

## 5. States

- loading: `#status` says the page is loading. Header and footer stay as an empty shell. Product rows, categories, hero, and promos are not filled yet. The cart can already show the saved lines.
- success: `#status` is cleared and hidden. Banner, hero, categories, rows, and footer show the server data. Cards show price, stock, and the add button.
- empty: a search with no match hides those cards, and hides a row whose cards are all hidden. The cart section still shows its lines and total. If the server returns no products, `#status` says nothing was found.
- error: `#status` stays visible and asks the customer to refresh. Rows stay empty. `broken.json` and `missing.json` use this same message. The page does not crash.

## 6. Folders

```
src/
  types/        types layer    Product, Shop, Home, LoadState
  api/          data layer     reading JSON with fetch
  storage/      data layer     cart in localStorage; URL filters in url-filters.ts
  features/cart      cart rules: add, remove, count, rows, total
  features/products  product rules: offers on the card, card prices
  shared/            findOffer and finalPrice; both features may use this
  ui/                ui layer       the page; boot.ts paints the shop after load
  main.ts            main layer     wires the two features together
```

## 7. Security

Everything on the page and in the JavaScript bundle is public: prices, discounts, and the value of `VITE_API_URL`. `.env` holds no password or private key, because every `VITE_` variable is copied into the file the browser downloads. The cart in `localStorage` can also be edited on that device.

The server must be the one that calculates the final cart total. A customer can change a price or a quantity in the browser tools. The server must add the total again from the product ids and its own prices, not from a number the page sends.
