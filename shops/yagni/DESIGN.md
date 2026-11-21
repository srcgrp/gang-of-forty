# YAGNI Shop — Design on one page

## 1. What must it do? (requirements)

- A customer can browse products organized by category.
- A customer can view product prices, discounts, and offer labels.
- A customer can see suggested products and whether they are in stock.
- A customer can add products to the cart.
- A customer can see the cart item count and total price.
- A customer can reload the page without losing the saved cart.
- A customer can view shop information, opening hours, navigation links, and contact details.
- A customer can view homepage banners and promotional advertisements.
- A customer can see loading skeletons and error messages with retry buttons when data fetching fails.
- The application validates API responses and saved cart data before using them.

## 2. Screens and parts

- **Header:** Shop name, slogan, search input, navigation, cart count, and cart total.
- **Category list:** Category cards generated from category data.
- **Product grid/carousels:** Product cards grouped by category.
- **Product card:** Emoji, name, unit, price, discount badge, tags, and add-to-cart button.
- **Suggestions/offers:** Discounted products, stock availability, and disabled add-to-cart buttons for out-of-stock products.
- **Homepage:** Hero banners, secondary banner, and promotional advertisements.
- **Footer:** Shop information, address, phone, schedule, category links, help links, and copyright.
- **Cart summary:** Item count and total price, with cart data persisted in localStorage.
- **Feedback:** Notyf notifications, confetti after adding a product, loading skeletons, and error/retry UI.

## 3. Data (currently defined in script.ts)

- `Product`: Product id, category id, name, emoji, unit, price, and tags.
- `Category`: Category id, slug, name, emoji, and color.
- `Stock`: Last update time and product quantities.
- `Offer`: Product id, discount percentage, and label.
- `CartItem`: Product id, name, price, and quantity.
- `Cart`: An array of `CartItem`.
- `Shop`: Shop details, contact information, opening hours, delivery settings, schedule, menu, help links, and copyright.
- `Home`: Hero and secondary slides, promotions, and carousel configuration.
- `ProductData`: Products and offers.
- `SuggestionsData`: Products, stock, and offers.
- `ShopData`: Shop information and categories.

Runtime validation uses `unknown`, `isRecord`, and specific type guards such as `isProduct`, `isStock`, `isShop`, `isHome`, and `isCart`.

## 4. Where does each piece live?

- **Server/static data:** JSON files in the shared `api/` folder. Vite serves the files; the TypeScript code fetches them.
- **Client logic and UI:** `shops/yagni/script.ts` currently contains types, validation, fetching, rendering, and event handlers in one file.
- **Client state:** Products and other fetched data are used within rendering functions. Cart operations read and update cart data through `getCart`, `addToCart`, and `saveCart`.
- **localStorage:** The cart is saved under the key `yagni-cart`. `getCart()` reads and validates it, and `saveCart()` persists updates.
- **URL:** `index.html` is the page entry point. Category links and product-section anchors use URL fragments such as `#offers-start` and category slugs.
- **Styling:** `shops/yagni/styles/main.css`.
- **Dependencies:** `canvas-confetti` and `notyf` are imported in `script.ts`.

## 5. API (what we fetch, and when)

All paths below are relative to `shops/yagni/`.

- `GET ../../api/products.json` → when product carousels or suggestions load.
- `GET ../../api/offers.json` → together with products for product cards and suggestions.
- `GET ../../api/stock.json` → when suggestions load, to display availability.
- `GET ../../api/categories.json` → when categories load and when shop data is fetched.
- `GET ../../api/shop.json` → when shop/header/footer information loads.
- `GET ../../api/home.json` → when homepage banners and promotions load.

`getJson()` caches in-flight and successful requests using a `Map<string, Promise<unknown>>`. Failed requests are removed from the cache so they can be retried. API data is validated before being used.

## 6. States of each screen

- **Loading:** Product, category, banner, and promotion skeletons are displayed while data loads.
- **Success:** Valid data is rendered into the relevant page sections.
- **Empty:** A category or search may have no matching products. An explicit empty-state message is not confirmed in the supplied code.
- **Error:** `renderError()` displays an error message and a retry button when a data-loading operation fails.
- **Out of stock:** Suggestion cards show a “ناموجود” message and disable the add-to-cart button when stock is zero.
- **Cart restored:** The cart is loaded from localStorage when needed; invalid or unavailable stored data falls back to an empty cart.
- **Cart updated:** The cart count and total are recalculated after adding an item.
- **Storage error:** A Notyf error notification appears if saving the cart fails.

## 7. Folders

yagni/
├── dist/ # Production build output generated by Vite
├── fonts/ # Font assets used by the shop
├── node_modules/ # Installed dependencies (not committed to Git)
├── public/ #favicon
├── src/
│ ├── api/ # API requests and response validation
│ ├── cart/ # Shopping cart types and cart-related logic
│ ├── catalog/ # Product/category catalog logic
│ ├── storage/ # Local storage access and persistence
│ ├── ui/ # DOM rendering and UI updates
│ ├── main.ts # Application entry point and initialization
│ └── types.ts # Shared TypeScript types
├── styles/ # CSS styles
├── .env.development # Environment variables for development
├── .env.production # Environment variables for production
├── .gitignore # Files and folders Git should ignore
├── check-arch.mjs # Script for checking project architecture rules
├── DESIGN.md # Project design and architecture documentation
├── index.html # HTML entry page
├── package-lock.json # Exact dependency versions
├── package.json # Project metadata, dependencies, and npm scripts
├── sprite.svg # SVG sprite containing reusable icons
├── tsconfig.json # TypeScript compiler configuration
├── tsconfig.tsbuildinfo # TypeScript incremental-build information
└── vite.config.ts # Vite configuration
