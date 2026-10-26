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
Loading: Show a loading message while product, category, and homepage data is being fetched.
Success: Display the homepage sections, categories, and product carousels with the loaded data.
Empty: Show a "No products found" message when a search or category has no matching products.
Error: Show an error message when API data cannot be loaded or is invalid.
The cart count and theme controls use local UI state and do not need API loading messages.

## 6. Folders and responsibilities

```text
src/
├── types.ts
├── api/
├── storage/
├── cart/
├── ui/
└── main.ts
```

- `types.ts` defines shared TypeScript types.
- `api/` is the data layer and handles API requests and response validation.
- `storage/` is the data layer and handles localStorage access.
- `cart/` contains cart calculations and business logic without changing the DOM.
- `ui/` is the UI layer and handles DOM elements, rendering, and user interface updates.
- `main.ts` connects the layers, manages application state, and handles user interactions.

## 7. Security
- Frontend code, API responses, and localStorage data are visible to users in the browser.
- Environment variables starting with `VITE_` are also included in the frontend code, so they must not contain secrets.
- Users can change prices and cart data in their browser.
- The server must calculate the final cart total using trusted product prices and discounts.
- The frontend should not be trusted for payment calculations.