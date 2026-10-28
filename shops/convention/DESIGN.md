# Convention Store — Architecture Design

## 1. Project Overview

This project is a supermarket storefront built with HTML, CSS, TypeScript, and Vite, without React or another UI framework.

The application displays products, supports adding products to the cart, and persists cart data using localStorage.

## 2. Page Sections

- Header and cart counter
- Product carousel
- Product cards
- Add-to-cart interaction
- Loading, empty, and error messages

## 3. Data Ownership

- `src/api/`: Fetches external JSON data and validates its structure.
- `src/storage/`: Reads and writes persistent browser storage.
- `src/cart/`: Manages cart items and quantities.
- `src/catalog/`: Loads, filters, and prepares product data for display.
- `src/ui/`: Creates and updates DOM elements.
- `src/types.ts`: Defines shared TypeScript types.
- `src/main.ts`: Initializes the application and connects its main components.

## 4. API Contract

API responses are treated as `unknown` until validated.

The API layer checks HTTP responses and validates product, category, offer, and stock data before returning typed values.

Invalid product entries are ignored and reported. Invalid category, offer, or stock responses cause an error.

## 5. Loading States

Product loading uses a discriminated union:

- `loading`: Data is being requested.
- `success`: Products are available.
- `empty`: No products match the selected category.
- `error`: The request failed or the response was invalid.

The UI displays an appropriate message for each state.

## 6. Source Structure

```text
src/
├── api/
│   ├── catalog-data.ts
│   ├── get-json.ts
│   └── products.ts
├── cart/
│   └── cart.ts
├── catalog/
│   ├── products.ts
│   └── render-products.ts
├── storage/
│   └── cart-storage.ts
├── ui/
│   ├── cart-counter.ts
│   ├── messages.ts
│   └── product-card.ts
├── main.ts
└── types.ts
```

## 7. Dependency Rules

- `main.ts` initializes the application.
- UI modules render DOM elements and handle user interactions.
- Catalog modules coordinate product display.
- API modules handle external requests and data validation.
- Storage modules handle localStorage.
- Shared types are defined in `types.ts`.
- Dependencies should flow toward lower-level data and type modules, avoiding circular imports.

## 8. Error Handling

- Failed HTTP responses produce errors.
- Invalid external data is rejected or filtered according to the API function's contract.
- Product loading failures are displayed to the user.
- Cart storage handles invalid or malformed saved JSON.

## 9. Security

- External data must be validated before use.
- User-facing text is inserted with `textContent` rather than interpreted as HTML.
- Environment variables prefixed with `VITE_` are public client-side configuration and must not contain secrets.