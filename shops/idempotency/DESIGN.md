# تازه‌خانه (idempotency) — Design on One Page

This document explains how the project works and how the code is organized.

## 1. What must it do? (requirements)

- Customers can search products and categories.
- Customers can search for products and filter them by category.
- Search text and selected category stay in the URL, even after refreshing or sharing the link.
- Customers can see product prices, offers, and availability.
- Customers can search product carousels and promotional banners.
- Customers can add products to the cart and see the cart count.
- Customers can switch between light and dark themes.
- Not now: login, online payment, checkout, order tracking, and viewing all items inside the cart.

## 2. Screens and parts

The website has one main page.

The header contains the logo, search input, cart count, and theme buttons.

The navigation menu has links to different sections of the page.

The hero section shows promotional slides that change every 5 seconds.

There are promotional banners for breakfast, bakery, and dairy products.

The special offer carousel shows discounted products. Clicking on the special offer section can also show a confetti effect.

The categories section shows product categories. Users can select a category to filter the products.

Product carousels show products based on the selected category and search text.

Product cards show the product name, price, discount, availability, and add-to-cart button.

The footer shows shop information and useful links.

## 3. Data ownership

The API gives products, categories, offers, stock, homepage data, and shop information.

The URL keeps the selected category and search text using `category` and `q`.

The file `src/features/products/storage/filter-url.ts` is responsible for reading and updating these values in the URL. It also handles browser Back and Forward.

When the page loads, the website reads the filters from the URL and shows the matching products. This means refreshing the page or opening the same link in another tab keeps the filters.

Usage of replaceState and pushState:
For search, I used `replaceState` so typing each character doesn't create a new browser history entry. For category changes, I used `pushState` so Back and Forward can work.

Other temporary UI states stay in memory.

LocalStorage saves the cart count so it doesn't disappear after refreshing the page.

URL fragments are used to navigate to different sections of the page.

Environment variables define the API URL for development and production.

## 4. API contract

The frontend gets data from six JSON files:

- `products.json` — product information (`Product[]`).
- `categories.json` — product categories (`Category[]`).
- `offers.json` — product discounts (`Offer[]`).
- `stock.json` — product availability (`Stock`).
- `home.json` — homepage banners and carousel settings (`Home`).
- `shop.json` — shop information, navigation links, and footer content (`Shop`).

These files are fetched when the page loads.

API responses are first treated as `unknown`. Type Guards check the data before the application uses it.

The file `src/features/products/api/store-data.ts` uses `Promise.all` to fetch all six files.

The API base URL comes from `import.meta.env.VITE_API_URL`.

In Vite, `base: "./"` is used so the built files can work when the website is placed inside `/shops/idempotency/`.

## 5. UI states

- Loading: Show product skeletons while data is being fetched.
- Success: Show the homepage, categories, and product carousels with the loaded data.
- Empty: Show a message when there are no products or no products match the selected filters.
- Error: Show an error message if the API request fails or the returned data is invalid.

The cart count and theme buttons can work without waiting for API data.

## 6. Folders and responsibilities

```text
src/
├── features/
│   ├── cart/
│   │   ├── logic/
│   │   ├── storage/
│   │   ├── ui/
│   │   └── setup.ts
│   │
│   └── products/
│       ├── api/
│       │   └── validation/
│       ├── logic/
│       ├── storage/
│       ├── ui/
│       │   ├── carousels/
│       │   ├── categories/
│       │   ├── filters/
│       │   ├── search/
│       │   └── shop/
│       └── data.ts
│
├── shared/
│   ├── api/
│   │   └── validation/
│   ├── types/
│   ├── ui/
│   │   ├── hero/
│   │   └── shop/
│   └── validation/
│
└── main.ts
```

I changed the project structure to Feature-based, so files related to the same feature are kept together.

`features/cart/`

Contains everything related to the cart, including cart count calculations, localStorage, click events, updating the cart count, and showing toast messages.

The Cart feature has its own `setup.ts` file to connect these parts.

`features/products/`

Contains code related to products, categories, searching, filtering, carousels, and product cards.

- `api/` fetches product data and checks the API responses.
- `logic/` handles product selection, search, filtering, discounts, and preparing carousel data.
- `storage/` handles the URL filters.
- `ui/` creates and updates the product-related parts of the page.
- `data.ts` contains image paths for products and categories.

**`shared/`**

Contains code that can be used by different parts of the project.

- `types/` contains TypeScript types.
- `api/` contains general API functions and shop/home data requests.
- `validation/` contains common validation functions.
- `ui/` contains general UI parts like the hero slider, theme, banners, and shop information.

How features work together:
Cart and Products should not directly import files from each other.

Both can use files from `shared/`, but `shared/` should not depend on Cart or Products.

`main.ts` is the entry point of the application. It starts the features and connects the different parts together.

This way, the code for each feature stays in one place, and changing one feature is less likely to affect another one.

## 7. Security

- Frontend code, API responses, and localStorage data can be seen by users in the browser.
- Environment variables starting with `VITE_` are included in the frontend bundle, so they should not contain passwords or secret keys.
- API data is checked before being used.
- Users can change cart data and prices in their own browser.
- The server must calculate the final cart price using trusted product prices and discounts.
- Frontend values should not be trusted for payment calculations.