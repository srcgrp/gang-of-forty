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
- Customers can open a separate product listing page for each carousel.
- Each homepage carousel shows a preview of up to 6 products, with a "View All" link to the full list.
- Customers can use browser Back and Forward, and refresh a product listing page without losing the current route.

## 2. Screens and parts

The website has two main types of pages: Home and Product Listing Page (PLP).

The Home page shows the hero, promotional banners, categories, and product carousels. Each carousel shows up to 6 products and has a "View All" link.

The PLP page shows all products from the selected carousel, including the title, product count, and a link back to Home.

The same ProductCard component is used on both pages.

Unknown carousel IDs show a "List not found" message. Other unknown URLs show a NotFound page.

Navigation uses TanStack Router with hash-based URLs.

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

The API provides products, categories, offers, stock, homepage data, and shop information.

The `useCatalog` hook loads this data and manages the loading, success, empty, and error states. It also provides a retry function.

Each page uses `useCatalog` to get the data it needs.

The shopping cart is managed by a shared Zustand store in `src/hooks/useCartStore.ts`. It keeps the cart items and provides actions to add, update, remove, and clear items.

Cart items are saved in localStorage using the existing storage functions, so they remain available after refreshing the page.

The light and dark theme is managed by `src/hooks/useThemeStore.ts`. Zustand persist saves the selected theme.

The HomePage component manages the selected category and search text using React State. PlpPage also has its own search text.

Other UI states, such as opening the cart, the active hero slide, and the countdown, are managed by their own components.

TanStack Router controls which page is shown. Users can also use the browser's Back and Forward buttons.

Fuse.js helps users find products and shows search suggestions.

The API URL is set in the environment files.

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
The `useCatalog` hook calls the API loading function and shares the result with the page that uses it.

The API base URL comes from `import.meta.env.VITE_API_URL`.

In Vite, `base: "./"` is used so the built files can work when the website is placed inside `/shops/idempotency/`.

## 5. UI states

- Loading: Show product skeletons while data is being fetched.
- Success: Show the loaded data on the current page. Home displays categories and product carousels, while PLP displays all products from the selected carousel.
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
├── hooks/
│   ├── useCatalog.ts
│   ├── useCartStore.ts
│   └── useThemeStore.ts
├── components/
│   ├── Layout.tsx
│   ├── Header.tsx
│   ├── ProductCard.tsx
│   ├── ProductGrid.tsx
│   ├── PlpProducts.tsx
│   ├── StorePage.tsx
│   ├── StoreBody.tsx
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── PlpPage.tsx
│   │   └── NotFound.tsx
│   └── ...
├── features/
│   ├── cart/
│   │   ├── hooks/
│   │   ├── logic/
│   │   ├── storage/
│   │   └── ui/
│   └── products/
│       ├── api/
│       ├── logic/
│       ├── storage/
│       ├── ui/
│       └── data.ts
└── shared/
    ├── api/
    ├── types/
    ├── ui/
    └── validation/
```

The project uses React, TypeScript, TanStack Router, and Zustand. The code is organized into components, hooks, features, and shared utilities.

### Main files

- `main.tsx` starts the React application.
- `App.tsx` defines the routes and creates the TanStack Router.
- `Layout.tsx` provides the theme wrapper and renders the active page using Outlet.
- `components/pages/` contains HomePage, PlpPage, and NotFound.
- `components/` contains shared React components such as Header, ProductCard, and CartPanel.
- `store-cart.ts` calculates cart rows, count, and total from cart and catalog data.

### Shared hooks

- `useCatalog.ts` loads catalog data and manages loading states and retry.
- `useCartStore.ts` manages shared cart State and cart actions using Zustand.
- `useThemeStore.ts` manages the selected theme using Zustand persist.

### Cart feature

`features/cart/` contains cart-related code.

- `hooks/` contains the effect that updates the page title.
- `logic/` handles cart items, quantities, stock limits, and totals.
- `storage/` reads and saves cart items in localStorage.
- `ui/` contains cart notifications and other UI helpers.

### Products feature

`features/products/` contains product-related code.

- `api/` fetches and validates API data.
- `logic/` handles product filtering, searching, offers, and carousel selection.
- `storage/` contains URL filter helpers.
- `ui/` contains product UI helpers, including older DOM code.
- `data.ts` contains product and category image paths.

The `carouselProducts` function returns all products for a selected carousel. The Home page uses a separate preview limit.

### Shared files

`shared/` contains code used across features.

- `api/` contains general API functions.
- `types/` contains TypeScript types.
- `ui/` contains shared UI helpers, including in-page navigation handling.
- `validation/` contains reusable data validation functions.

### How the parts work together

App defines the routes.

Layout uses Outlet to show the current page.

Each page uses useCatalog to get its data.

Zustand manages the cart and theme, so App does not need to store them.

React components show the data and handle user actions.

API, cart, and product logic are kept in separate files.

## 7. Security

- Frontend code, API responses, and localStorage data can be seen by users in the browser.
- Environment variables starting with `VITE_` are included in the frontend bundle, so they should not contain passwords or secret keys.
- API data is checked before being used.
- Users can change cart data and prices in their own browser.
- The server must calculate the final cart price using trusted product prices and discounts.
- Frontend values should not be trusted for payment calculations.

## 8. React Component Tree

The application uses TanStack Router to render different pages.

App creates the router. Layout provides the theme wrapper and uses Outlet to display the active page.

### Home Page

```text
App
└── RouterProvider
    └── Layout
        └── Outlet
            └── HomePage
                └── StorePage
                    ├── Header
                    │   ├── Brand
                    │   ├── MobileNav
                    │   ├── CartPanel
                    │   │   └── CartPopover
                    │   │       └── CartPanelItems
                    │   │           └── CartItemRow
                    │   │               └── CartItemStepper
                    │   ├── ThemeToggle
                    │   ├── SearchBox
                    │   └── CategoryNav
                    └── StoreBody
                        ├── Hero
                        ├── HomeBanners
                        ├── CategoryGrid / CategoryFallback
                        ├── ProductSections
                        │   └── ProductGrid × n
                        │       ├── ProductCard × n
                        │       ├── SaleCountdown (offers only)
                        │       └── CarouselControls
                        ├── LoadingProductSections / LoadStatus
                        └── Footer
```

HomePage keeps the selected category and search text in local React State.

It uses `useCatalog` to load data and passes the required values to StorePage.

ProductGrid shows a preview of up to 6 products for each carousel when no filter or search is active.

### Product Listing Page (PLP)

```text
App
└── RouterProvider
    └── Layout
        └── Outlet
            └── PlpPage
                ├── Header
                │   ├── Brand
                │   ├── MobileNav
                │   ├── CartPanel
                │   │   └── CartPopover
                │   ├── ThemeToggle
                │   ├── SearchBox
                │   └── CategoryNav
                ├── PlpProducts
                │   └── ProductCard × n
                ├── LoadStatus (when needed)
                ├── NotFound (unknown carousel)
                └── Footer
```

PlpPage reads `carouselId` using TanStack Router's `useParams`.

It uses `useCatalog` to load data and `carouselProducts` to get all products for the selected carousel.

PlpProducts shows the carousel title, product count, and product cards.

The same ProductCard is used on Home and PLP.

### NotFound Page

```text
App
└── RouterProvider
    └── Layout
        └── Outlet / NotFound
```

Unknown routes display a NotFound message with a link back to Home.

### Shared State

Layout and ThemeToggle use useThemeStore to read the current theme.

CartPanel uses useCartStore to read the cart items.

ProductCard uses the add action from useCartStore.

Zustand lets components read only the State they need.

When a product is added to the cart, the cart components update without rendering the whole product page again.

## 9. State Ownership

The project uses Zustand for shared State and React useState for local component State.

### Shared Zustand Stores

| Store       | Defined in               | State and actions                 | Updated by                      | Persistence                             |
| ----------- | ------------------------ | --------------------------------- | ------------------------------- | --------------------------------------- |
| Theme Store | `hooks/useThemeStore.ts` | `theme`, `toggle`                 | ThemeToggle                     | Zustand persist / localStorage          |
| Cart Store  | `hooks/useCartStore.ts`  | `lines`, `add`, `change`, `clear` | ProductCard and cart components | localStorage via cart storage functions |

We chose Zustand for both the cart and theme.

With Zustand, components can use shared State without passing it through many other components.

CartPanel reads the cart items, and ProductCard uses the add action.

The theme is saved using Zustand persist, so it stays the same after refresh.

Cart items are saved in localStorage using the existing storage functions.

Cart actions use the functions in `features/cart/logic/`.

### Local React State

| State       | Owner              | Updated by                     | Persistence  |
| ----------- | ------------------ | ------------------------------ | ------------ |
| categoryId  | HomePage           | Category selection             | React memory |
| query       | HomePage / PlpPage | Search input                   | React memory |
| catalog     | useCatalog         | API response                   | React memory |
| loadState   | useCatalog         | Loading, success, empty, error | React memory |
| attempt     | useCatalog         | Retry button                   | React memory |
| isOpen      | CartPanel          | Mouse and click events         | React memory |
| open        | SearchBox          | Focus and input events         | React memory |
| activeSlide | Hero               | Slider interval                | React memory |
| visible     | SaleCountdown      | Close and reopen               | React memory |
| left        | CountdownTimer     | Timer interval                 | React memory |

The current route is managed by TanStack Router and stored in the URL.

Search text and category filters are local State and are not saved in the URL.

### Derived Values

Some values are calculated from existing data instead of being saved as new State.

For example:

- Cart count and total price are calculated from cart items.
- Product sections are created using products, categories, and filters.
- Fuse.js finds matching products.
- Stock data shows if a product is available.
- Product prices and offers are used to calculate discounts.
- carouselProducts finds all products for a selected carousel.

This helps us avoid keeping the same data in different places.

## 10. Bonus Features

### Product Search

Users can search for products using Fuse.js.

HomePage and PlpPage keep the search text in their own State.

Fuse.js finds matching products based on the search text.

The search box also shows product suggestions.

### Retry Button

If loading the API data fails, the page shows a Retry button.

Clicking the button starts a new request without refreshing the page.

### Sale Countdown

The special offer section has a two-minute countdown.

The timer uses useEffect and setInterval to update every second.

Users can close and reopen the timer. When the timer is closed, the cleanup function stops the interval.

## 11. Routes and Navigation

The application uses TanStack Router with `createHashHistory`.

Routes are defined in `src/App.tsx`. RouterProvider renders the router, and Layout uses Outlet to display the active page.

### Route Table

| URL                                | Page                           | Data source                                                   |
| ---------------------------------- | ------------------------------ | ------------------------------------------------------------- |
| `#/`                               | HomePage                       | `useCatalog`, home sections, products, categories, and offers |
| `#/plp/$carouselId`                | PlpPage                        | `useCatalog`, `findCarousel`, and `carouselProducts`          |
| `#/plp/nothing`                    | PlpPage with not-found message | Unknown carousel ID returns null                              |
| Unknown route, such as `#/nowhere` | NotFound                       | No API data required                                          |

### Navigation

The project uses TanStack Router with hash-based URLs.

This allows users to refresh a PLP page without losing the current route.

Each "View All" link opens the PLP page for that carousel.

PlpPage gets the carousel ID using useParams:

```tsx
const { carouselId } = useParams({
  from: "/plp/$carouselId",
});
```

The carousel ID is used to find the correct products and title.

If the carousel ID is not found, the page shows a message and a link back to Home.

If the URL is not found, the NotFound page is shown.

Links to sections like offers, categories, and contact still work.

Browser Back and Forward also work.

The cart and theme stay saved after changing pages or refreshing.
