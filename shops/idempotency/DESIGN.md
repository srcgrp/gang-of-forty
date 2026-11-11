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
- Product search and URL filters will be added later.
- Not now: login, online payment, checkout, and order tracking.

## 2. Screens and parts

The website has one main page.

The header contains the logo, search input, cart count, and theme buttons.

The navigation menu has links to different sections of the page.

The hero section shows promotional slides that change every 5 seconds.

There are promotional banners for breakfast, bakery, and dairy products.

The special offer carousel shows discounted products. Clicking on the special offer section can also show a confetti effect.

The categories section shows product categories. Users can select a category to filter the products.
Product carousels show products based on the selected category.

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

Product search and saving filters in the URL
are not connected to React yet.

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
- Error: Show an error message if the API request fails or the returned data is invalid.

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

We uses React components instead of manually
creating and updating DOM elements.

```text
App
└── StorePage
    ├── Header
    │   ├── Brand
    │   ├── MobileNav
    │   ├── CategoryNav
    │   ├── HeaderSearch
    │   ├── ThemeToggle
    │   └── CartPanel
    │       └── CartPopover
    │           └── CartPanelItems
    │               └── CartItemRow
    │                   └── CartItemStepper
    └── StoreBody
        ├── Hero
        ├── HomeBanners
        ├── CategoryGrid
        ├── ProductSections
        │   └── ProductGrid × n
        │       ├── ProductCard × n
        │       └── CarouselControls
        ├── LoadingProductSections / LoadStatus
        └── Footer
            ├── FooterAbout
            ├── FooterLinks
            └── FooterContact
```

App owns the shared cart and selected category states.
StorePage passes data and event callbacks to its children.
Product and cart components receive typed props.
User interactions are handled through callbacks.

## 9. State Ownership

| State       | Owner        | Updated by                              | Persistence               |
| ----------- | ------------ | --------------------------------------- | ------------------------- |
| cart        | App          | Add, remove, quantity and clear actions | localStorage              |
| categoryId  | App          | Category selection callbacks            | React memory              |
| storeData   | useStoreData | API response                            | React memory              |
| loadState   | useStoreData | API loading and error handling          | React memory              |
| isOpen      | CartPanel    | Mouse and click events                  | React memory              |
| activeSlide | Hero         | Slider interval                         | React memory              |
| theme       | ThemeToggle  | Theme button                            | Applied to document theme |

### Derived Values

Some values are calculated from existing data instead of being stored as separate State.

For example:

- Cart count and total price are calculated from the cart.
- Product sections are created using the loaded products and selected category.

We don't need extra State for these values because we can calculate them from the data we already have.
