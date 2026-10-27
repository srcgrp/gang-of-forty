# تازه‌خانه (idempotency)— Design on One Page

This document describes the planned architecture of the project.
Some parts will be implemented.

## 1. What must it do? (requirements)
- A customer can browse products and categories.
- A customer can search for products.
- A customer can view product prices and offers.
- A customer can browse product carousels and promotional banners.
- A customer can add products to the cart and see the cart count.
- A customer can switch between light and dark themes.
- Not now: login, online payment, checkout, order tracking, being able to access the items in the cart.

## 2. Screens and parts
The website has one main page.
The header contains the logo, search input, cart count, and toggle theme buttons.
The navigation provides links to different sections of the page.
The hero section displays the main promotion and works as sliders that changes every 5 seconds.
Promotional banners highlight special offers in 3 different sections -> bread-breakfast-dairy discount.
The special offer carousel displays products with offers and when you click on special offer in menu or categories section you will see confetti on "special offer" title.
The categories section displays links to product categories.
Each category has a product carousel.
Product cards display product information, prices, offers, and add-to-cart buttons.
The footer displays shop information and useful links.

## 3. Data ownership
The API provides products, categories, offers, stock, home page content, and shop information.
The frontend keeps the current search query and UI interaction state in memory.
LocalStorage stores the cart count so it remains available after refreshing the page.
URL fragments identify sections of the page for navigation.
Environment variables store the API base URL for different environments.

## 4. API contract
The frontend fetches products.json to get product information (Product[]).
It fetches categories.json to get product categories (Category[]).
It fetches offers.json to get product discounts (Offer[]).
It fetches stock.json to get product availability (Stock).
It fetches home.json to get homepage banners and carousel settings (Home).
It fetches shop.json to get shop information, navigation links, and footer content (Shop).
These files are fetched when the page loads.
API responses are validated before being used by the application.

## 5. UI states
Loading: Show product-card skeletons while API data is being fetched.
category, and homepage data is being fetched.
Success: Display the homepage sections, categories, and product carousels with the loaded data.
Empty: Show a "No products found" message when a search or category has no matching products.
Error: Show an error message when API data cannot be loaded or is invalid.
The cart count and theme controls use local UI state and do not need API loading messages.


## 6. Folders and responsibilities

```text
src/
├── types/
├── api/
│   └── validation/
├── storage/
├── cart/
├── catalog/
├── hero/
├── ui/
├── data.ts
└── main.ts
```

- `types/` defines shared TypeScript types, including API types, UI view models, and loading states.
- `api/` handles HTTP requests and validates external data before returning it to the application.
- `storage/` handles localStorage access.
- `cart/` contains pure cart calculations.
- `catalog/` contains product selection, discount calculations, carousel preparation, and search logic.
- `hero/` prepares hero slider data without accessing the DOM.
- `ui/` creates and updates DOM elements using data received through function parameters.
- `data.ts` defines the static image paths for products and categories.
- `main.ts` is the application entry point. It connects the layers, manages state, sets up events, and starts the application.

## 7. Security
- Frontend code, API responses, and localStorage data are visible to users in the browser.
- Environment variables starting with `VITE_` are also included in the frontend code, so they must not contain secrets.
- Users can change prices and cart data in their browser.
- The server must calculate the final cart total using trusted product prices and discounts.
- The frontend should not be trusted for payment calculations.