YAGNI Shop — Design on one page

1. What must it do? (requirements)

- Display the shop homepage using data loaded from the configured API.
- Let customers browse products grouped by category.
- Display product names, emojis, units, prices, tags, and applicable discounts.
- Display a special-offers section containing products with discounts.
- Let customers search products by name or tag.
- Let customers add products to the cart and increase or decrease item quantities.
- Remove a cart item when its quantity is reduced to zero.
- Display the cart item count and total price.
- Persist the cart in localStorage so it can be restored after a page reload.
- Display the shop's name, description, address, phone number, schedule, help links, and category links.
- Display the homepage hero/side banners and promotional sections.
- Display a loading state while the initial data is being fetched.
- Display an empty-products message when the products response contains no products.
- Display an error message and a retry action when initial data loading fails.
- Validate API responses and saved cart data before using them.
- Prevent out-of-stock products from being added when stock information is supplied to product-card data.

2. Screens and parts
   The application is a single-page React shop. Its main composition is in src/App.tsx.

- Header (Header): Shop branding, product search form, cart item count, cart total, and a button to open the cart.
- Category navigation (CategoryNav): Navigation links generated from the category data, including a dropdown.
- Hero banners (Banner): Displays the hero and side slides supplied by the homepage data.
- Category grid (CategoryGrid): Displays category cards linking to their product sections.
- Special offers (ProductGrid): Displays products that have a discount.
- Product sections (ProductGrid): Displays products grouped by category.
- Product card (ProductCard): Displays product emoji, name, unit, current price, optional original price and discount, tags, stock message, and add-to-cart button.
- Promotional sections: Displays the promotional items supplied by the homepage data.
- Store support (StoreSupport): Displays the shop's service/support highlights.
- Store footer (StoreFooter): Displays shop information, contact details, schedule, category links, help links, and copyright.
- Cart panel (CartPanel): A dialog showing cart items, quantity controls, the cart total, and a checkout button. It is rendered only while the panel is open.
- Loading, empty, and error UI: App renders the appropriate catalog view based on LoadState.

3. Data and types
   Shared application types are defined in src/types.ts.

- Product: Product id, category id, name, emoji, unit, base price, and tags.
- Category / Categories: Category identity, slug, name, emoji, and color.
- Offer / Offers: Product id, discount percentage, and offer label.
- Stock: Stock update timestamp and a record of quantities keyed by product id.
- CartItem / Cart: Product id, product name, stored unit price, and quantity; a cart is an array of cart items.
- Shop: Shop identity, owner, location/contact details, opening hours, delivery settings, description, schedule, menu/help links, and copyright.
- Home: Hero and side slides, promotional items, and carousel configuration.
- ProductData: Products and offers.
- SuggestionsData: Products, stock, and offers.
- ShopData: Shop information and categories.
- ProductCardData: A product plus its calculated display price and optional original price, discount percentage, and stock status.
- LoadState: A discriminated union representing loading, success (with products), empty, or error (with a message).
  API responses are initially treated as unknown. Runtime guards in src/api/guards-\*.ts validate the data before it is used by the application. Cart data read from localStorage is also validated in src/storage/cart-storage.ts.

4. Where does state live?
   React state is owned by App (src/App.tsx). Child components receive the data they need through props and notify App about user actions through callback props. The cart is additionally persisted in localStorage.
   State Owning Component Who updates it Where it is stored
   cart App Initialized from readCart(); updated by add-to-cart and quantity-change handlers in App React state; persisted to localStorage under yagni-cart by writeCart()
   isCartOpen App Header's open-cart callback and CartPanel's close callback React state only; not persisted
   searchQuery App Header calls onSearch when the search form is submitted React state only; the input itself is an uncontrolled form field
   loadState App Initial Promise.all data-loading effect sets loading, success, empty, or error React state only; success contains the fetched products
   categories App Set after fetchShop() resolves successfully React state; source is the categories API response
   offers App Set after fetchSuggestions() resolves successfully React state; source is the offers API response
   stock App Set after fetchSuggestions() resolves successfully React state; source is the stock API response
   home App Set after fetchHome() resolves successfully React state; source is the homepage API response; initially null
   shop App Set after fetchShop() resolves successfully React state; source is the shop API response; initially null

Derived/calculated values — not separate state
These values are calculated from existing state or props. They should not be stored in additional React state because doing so would duplicate information and could become inconsistent with its source.
Derived value Calculated from Why it is not state
products loadState It is the products array when loadState.status === "success", otherwise an empty array. It is already represented by loadState.
filteredProducts products and searchQuery It is calculated with visibleProducts() inside useMemo; it changes whenever its source values change.
cards / product-card data filteredProducts, offers, and stock.items toCard() calculates display data such as discounted price and stock status. The source data is the state; the card data is derived.
Offer cards cards The offers section filters cards whose discountPercent is defined. This is a render-time calculation, not independent state.
Products shown in each category cards and the category id Each category's ProductGrid receives the cards filtered by product.categoryId.
Cart item count (cartCount) cart countCartItems(cart) sums item quantities. Header receives the result as a prop.
Cart total (totalPrice / total) cart totalCartPrice(cart) or the equivalent reduction in CartPanel calculates price \* quantity for each item. Storing it separately could make it disagree with the cart.
Document title count cart The effect calculates the item count from the cart to update document.title; the count is not independently stored.
Repeated banner slides slides prop Banner creates a repeated array for its visual track. It is presentation data, not application state.

State ownership rule: App owns the shared application state. Components such as Header, ProductGrid, ProductCard, CartPanel, CategoryGrid, and StoreFooter receive values through props. User actions are sent back to App through callback props such as onSearch, onAdd, onOpenCart, onClose, and onUpdateQuantity. 5. API (what we fetch, and when)
The API base URL is read from VITE_API_URL (configured through the Vite environment files). API access and response validation live under src/api/.

On initial application load, App runs fetchSuggestions(), fetchShop(), and fetchHome() together with Promise.all().
Request API module Data used for
GET {VITE_API_URL}/products.json src/api/products.ts Product catalog and product sections
GET {VITE_API_URL}/offers.json src/api/products.ts Discount calculations and special-offer cards
GET {VITE_API_URL}/stock.json src/api/products.ts Stock information returned with suggestions
GET {VITE_API_URL}/shop.json src/api/shop.ts Shop details used by the footer
GET {VITE_API_URL}/categories.json src/api/categories.ts (called by fetchShop) Category navigation, category grid, and product grouping
GET {VITE_API_URL}/home.json src/api/home.ts Hero/side banners and promotional sections

Implementation notes:

- src/api/request.ts provides getJson(), which returns Promise<unknown> and caches in-flight/successful requests in a Map<string, Promise<unknown>>.
- Failed requests are removed from the cache so a later attempt can retry.
- API modules validate responses with guards from src/api/guards-base.ts, guards-products.ts, guards-shop.ts, and guards-home.ts.
- fetchSuggestions() requests products, offers, and stock in parallel.
- fetchShop() requests shop data and categories in parallel.
- App uses an ignore flag in the effect cleanup to avoid setting state after the effect has been cleaned up (including React StrictMode's development effect cycle).
- If any of the initial Promise.all() operations rejects, App sets the catalog load state to error. The retry button currently reloads the page.

6. States of each screen
   The catalog's visible state is controlled by the LoadState discriminated union in src/types.ts and rendered by the renderCatalog() switch in src/App.tsx.

- Loading: While the initial requests are pending, the catalog displays product skeletons.
- Success: When the requests succeed and at least one product is available, the app renders the special-offers section and product sections grouped by category.
- Empty: When the products response is valid but contains no products, the catalog displays an empty-products message.
- Error: If one of the initial data-loading requests fails or required response validation fails, the catalog displays an error message and a retry button. The retry action reloads the page.
- Search with results: visibleProducts() filters products by name or tag using the submitted search query. The displayed cards and category sections are based on the filtered list.
- Search without results: ProductGrid displays its empty message when it receives an empty list. The same component is used for an empty offers list or an empty category result.
- Cart closed/open: isCartOpen controls whether CartPanel is rendered. The panel can be opened from the header and closed using its close button or by clicking the overlay.
- Cart empty/filled: CartPanel displays an empty-cart message when there are no items; otherwise it displays the items and quantity controls.
- Cart updated: Adding a product or changing its quantity creates a new cart array, updates React state, and attempts to persist it to localStorage.
- Cart restored: The initial cart state is read lazily from localStorage through readCart(). Invalid, missing, or unreadable data falls back to an empty cart.
- Storage unavailable: If writeCart() fails, App displays a browser alert. The in-memory React cart has already been updated.
- Out of stock: ProductCard disables its add button and displays an out-of-stock message when its ProductCardData has outOfStock: true. The current App catalog mapping passes stock.items to toCard().

7. Project structure
   yagni/
   ├── public/ # Public static assets (for example, favicon)
   ├── fonts/ # Font files
   ├── src/
   │ ├── api/ # Fetching and runtime validation of API responses
   │ │ ├── guards-base.ts
   │ │ ├── guards-home.ts
   │ │ ├── guards-products.ts
   │ │ ├── guards-shop.ts
   │ │ ├── request.ts
   │ │ ├── categories.ts
   │ │ ├── home.ts
   │ │ ├── products.ts
   │ │ └── shop.ts
   │ ├── cart/ # Pure cart operations and calculations
   │ │ └── cart-logic.ts
   │ ├── catalog/ # Pure product filtering and card-data calculations
   │ │ └── catalog-logic.ts
   │ ├── components/ # React UI components
   │ │ ├── Banner.tsx
   │ │ ├── CartPanel.tsx
   │ │ ├── CategoryGrid.tsx
   │ │ ├── CategoryNav.tsx
   │ │ ├── Header.tsx
   │ │ ├── ProductCard.tsx
   │ │ ├── ProductGrid.tsx
   │ │ ├── StoreFooter.tsx
   │ │ └── StoreSupport.tsx
   │ ├── storage/ # Cart persistence and validation
   │ │ └── cart-storage.ts
   │ ├── App.tsx # Main app composition and shared React state
   │ ├── main.tsx # React entry point; renders App inside StrictMode
   │ └── types.ts # Shared TypeScript types
   ├── styles/ # Application CSS files
   ├── index.html # Vite HTML entry point and root element
   ├── sprite.svg # SVG icon sprite
   ├── vite.config.ts # Vite configuration
   ├── tsconfig.json # TypeScript configuration
   ├── oxlintrc.json # Oxlint configuration
   ├── package.json # Scripts and dependencies
   ├── package-lock.json # Locked dependency versions
   ├── .env.development # Development environment variables
   ├── .env.production # Production environment variables
   ├── .gitignore
   └── DESIGN.md # This design document
   dist/ is generated by the production build and node_modules/ contains installed dependencies; neither is source code that should be documented as part of the application architecture.
