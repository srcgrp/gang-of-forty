# تازه‌خانه (idempotency) — Design on One Page

This document explains how the project works and how the code is organized.

## 1. What must it do? (requirements)

- Customers can see products and filter them by category.
- Customers can see product prices, offers, and availability.
- Customers can see product carousels and promotional banners.
- Customers can add products to the cart and change their quantities.
- Customers can see the products inside their cart.
- Cart items stay saved after refreshing the page.
- Customers can switch between light and dark themes.
- Customers can search products using Fuse.js.
- Search suggestions appear below the search box.
- Customers can retry loading data if the API fails.
- Customers can see, close, and reopen a sale countdown.
- Search text and selected category are not saved in the URL yet.
- Not now: login, online payment, checkout, and order tracking.

## 2. Screens and parts

The website has one main page.

The header contains the logo, search box, cart count, and theme buttons.
The search box shows product suggestions while typing.

The navigation menu has links to different sections of the page.

The hero section shows promotional slides that change every 5 seconds.

There are promotional banners for breakfast, bakery, and dairy products.

The special offer carousel shows discounted products. Clicking on the special offer section can also show a confetti effect.

The categories section shows product categories. Users can select a category to filter the products.

Product carousels show products based on the selected category and search text.

A sale countdown appears below the special offer title.
Users can close and reopen it.

Product cards show the product name, price, discount, availability, and add-to-cart button.

The footer shows shop information and useful links.

## 3. Data ownership

The API gives products, categories, offers, stock,
homepage data, and shop information.

React keeps the selected category in App State.

The cart is also stored in App State.
LocalStorage saves the cart items and their quantities,
so the cart stays saved after refreshing the page.

Other UI states, like the open cart and active hero slide,
are managed by their own React components.

URL fragments are used to navigate to different
sections of the page.

The search text is stored in App State.

Fuse.js uses the search text to find matching products
and show search suggestions.

Search text and category filters are not saved in the URL yet.

Environment variables define the API URL
for development and production.

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
- Empty: Show a message when there are no products to display.
- Error: Show an error message and a Retry button if the API request fails.
  Clicking Retry starts a new API request and shows the loading state again.
  The cart count and theme buttons can work without waiting for API data.

## 6. Folders and responsibilities

```text
src/
├── main.tsx
├── App.tsx
├── store-cart.ts
├── components/
│
├── features/
│   ├── cart/
│   │   ├── hooks/
│   │   ├── logic/
│   │   ├── storage/
│   │   └── ui/
│   │
│   └── products/
│       ├── api/
│       ├── hooks/
│       ├── logic/
│       ├── storage/
│       ├── ui/
│       └── data.ts
│
└── shared/
    ├── api/
    ├── types/
    ├── ui/
    └── validation/
```

The project uses React and is organized by features.

### Main files

- `main.tsx` starts the React application.
- `App.tsx` manages the cart and selected category.
- `store-cart.ts` connects cart actions with product data.
- `components/` contains the React components for the page.

### Cart feature

`features/cart/` contains the cart-related code.

- `hooks/` saves cart changes and updates the page title.
- `logic/` handles cart items, quantities, and totals.
- `storage/` reads and saves the cart in localStorage.
- `ui/` contains helpers such as cart notifications.

### Products feature

`features/products/` contains product-related code.

- `api/` fetches and checks API data.
- `hooks/` loads store data using React.
- `logic/` prepares products, offers, and carousels.
- `storage/` contains URL filter helpers.
- `ui/` contains product UI helpers, including older DOM code.
- `data.ts` contains product and category image paths.

### Shared files

`shared/` contains code used by different parts of the project.

- `api/` contains general API functions.
- `types/` contains TypeScript types.
- `ui/` contains shared UI helpers.
- `validation/` contains common validation functions.

### How the parts work together

App manages the main State and passes data and callbacks
to React components.

Components display the data and handle user actions.

Feature files keep the API, cart, and product logic separate
from the React components.

Some helper files from the old DOM version are still present,
but the current page is rendered using React.

## 7. Security

- Frontend code, API responses, and localStorage data can be seen by users in the browser.
- Environment variables starting with `VITE_` are included in the frontend bundle, so they should not contain passwords or secret keys.
- API data is checked before being used.
- Users can change cart data and prices in their own browser.
- The server must calculate the final cart price using trusted product prices and discounts.
- Frontend values should not be trusted for payment calculations.

## 8. React Component Tree

We use React components instead of manually creating
and updating DOM elements.

```text
App
└── StorePage
    ├── Header
    │   ├── Brand
    │   ├── MobileNav
    │   ├── CategoryNav
    │   ├── SearchBox
    │   ├── ThemeToggle
    │   └── CartPanel
    │       └── CartPopover
    │           └── CartPanelItems
    │               └── CartItemRow
    │                   └── CartItemStepper
    │
    └── StoreBody
        ├── Hero
        ├── HomeBanners
        ├── CategoryGrid / CategoryFallback
        ├── ProductSections
        │   └── ProductGrid × n
        │       ├── SaleCountdown (offers only)
        │       │   └── CountdownTimer
        │       ├── ProductCard × n
        │       └── CarouselControls
        ├── LoadingProductSections / LoadStatus
        └── Footer
            ├── FooterAbout
            ├── FooterLinks
            └── FooterContact
```

App manages the cart, selected category, and search text.

StorePage passes data and callbacks to its children.

Components use props to receive data and report user actions.

Product search, cart actions, and API loading use
separate functions and hooks.

## 9. State Ownership

| State       | Owner          | Updated by              | Persistence             |
| ----------- | -------------- | ----------------------- | ----------------------- |
| cart        | App            | Cart actions            | localStorage            |
| categoryId  | App            | Category selection      | React memory            |
| query       | App            | Search input            | React memory            |
| storeData   | useStoreData   | API response            | React memory            |
| loadState   | useStoreData   | Loading, success, error | React memory            |
| attempt     | useStoreData   | Retry button            | React memory            |
| isOpen      | CartPanel      | Mouse and click events  | React memory            |
| open        | SearchBox      | Focus and input events  | React memory            |
| activeSlide | Hero           | Slider interval         | React memory            |
| theme       | ThemeToggle    | Theme button            | React memory / document |
| visible     | SaleCountdown  | Close and reopen        | React memory            |
| left        | CountdownTimer | Timer interval          | React memory            |

### Derived Values

Some values are calculated from existing data
instead of being stored as separate State.

For example:

- Cart count and total price are calculated from the cart.
- Product sections are created using the loaded products and selected category.
- Search results are calculated from the products and search text.
- Search suggestions are calculated using Fuse.js.

We don't need extra State for these values because
we can calculate them from the data we already have.

## 10. Bonus Features

### Product Search

Customers can search for products using Fuse.js.

The search text is stored in App State. The matching products are calculated from the loaded data and selected category.

The search box also shows product suggestions.

### Retry Button

If loading the API data fails, the page shows a Retry button.

Clicking the button starts a new request without refreshing the page.

### Sale Countdown

The special offer section has a two-minute countdown.

The timer uses useEffect and setInterval to update every second.

Users can close and reopen the timer. When the timer is closed, the cleanup function stops the interval.
