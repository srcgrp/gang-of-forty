# Open-Closed Shop — Design on One Page

## 1. What must it do? (Requirements)

- A customer can view the products available in the shop.
- A customer can browse products by category.
- A customer can search for products by name.
- A customer can see product names, prices, units, tags, and available stock.
- A customer can see product offers and discount percentages.
- A customer can add products to the cart.
- A customer can increase or decrease product quantities.
- A customer can remove products from the cart.
- A customer can see the cart subtotal and total quantity.
- A customer can see the shop's delivery fee and free-delivery threshold.
- The cart is saved in `localStorage` and restored after refreshing the page.

Not now:
- User registration and login.
- Online payment and order submission.
- Server-side inventory updates.
- Product management for administrators.
- Advanced sorting and filtering.
- Search filtering (the search box is rendered, but it does not filter yet).

## 2. Screens and Parts

- **Header:** Shop name, search input, main menu, and cart count.
- **Category list:** Available categories with their names and emojis.
- **Product grid:** Products matching the selected category.
- **Product card:** Product name, emoji, unit, price, badge, stock status, and add-to-cart button.
- **Cart:** Cart items, remove buttons, subtotal, and total quantity.
- **Status messages:** Loading skeletons, empty-state messages, and readable error messages.

## 3. Data (`types.ts`)

- **Product:** `id`, `categoryId`, `name`, `emoji`, `unit`, `price`, and `tags`.
- **Category:** `id`, `slug`, `name`, `emoji`, and `color`.
- **Stock:** `updatedAt` and `items`, mapping product IDs to stock quantities.
- **Offer:** `productId`, `percent`, and `label`.
- **Shop:** Shop name, slogan, delivery fee, free-delivery threshold, currency, and other shop information.
- **CartItem / Cart:** A product ID with a quantity, and the list of those items.
- **LoadState:** A union of `loading`, `success`, `empty`, and `error`.

The TypeScript types describe the expected JSON structures. API responses are also checked at runtime (`api/guards.ts`) because TypeScript types alone cannot validate incoming JSON.

## 4. Where Does Each Piece Live?

- **Server/API data:** Products come from `products.json`. The other JSON files exist but are not used yet.
- **Client state:** Load status and products, selected category, and the current cart. All of it lives in `App`.
- **`localStorage`:** Cart items and quantities, read once at startup and written whenever the cart changes.
- **URL:** No persistent search or category-filter state.
- **Environment variables:** `VITE_API_URL` selects the API base URL. No secrets belong in frontend environment variables.

## 5. API (What We Fetch, and When)

When the application starts, one Effect in `App` fetches:

- `GET /api/products.json` → Product data.

The response is validated item by item. Invalid items are skipped with a warning. If the file is missing, invalid, or unreachable, the screen shows a readable error.

## 6. States of Each Screen

- **Loading:** Skeleton cards and a loading message.
- **Success:** The products of the selected category.
- **Empty:** A message when there are no products at all, or none in the selected category.
- **Error:** A readable message when the data cannot be fetched or validated.
- **Empty cart:** A message that invites the customer to add products.

## 7. Folders

- `src/types.ts` → Shared data types.
- `src/api/` → Fetching API data and validating external responses.
- `src/storage/` → Reading and writing `localStorage`.
- `src/cart/` → Pure cart rules and calculations.
- `src/lib/` → Formatting, error messages, and status text.
- `src/components/` → React components (one per file).
- `src/App.tsx` → State, Effects, and event handlers.
- `src/main.tsx` → Mounts `App` into the page.

`App` coordinates the application. API access, storage, and cart logic stay in their own modules and know nothing about React. Shared types do not depend on those modules.

## 8. Component Tree

```
App
├─ Header
│  ├─ SearchBox
│  └─ MainNav
├─ Hero
├─ CategoryNav
├─ ProductGrid
│  ├─ Skeleton × 6        (only while loading)
│  └─ ProductCard × n
│     └─ Price
├─ CartPanel
├─ Banners
└─ Footer
```

Data flows down through props. Events flow up through callback props (`onPick`, `onAdd`, `onRemove`).

## 9. Where Does State Live?

| State | Owner component | Who changes it | Where it is saved |
|---|---|---|---|
| `state` (`LoadState`) | `App` | An Effect after `fetchProducts()` finishes | Not saved (comes from the server) |
| `categoryId` | `App` | `CategoryNav` through `onPick` | Not saved |
| `cart` | `App` | `ProductGrid`/`ProductCard` through `onAdd`, `CartPanel` through `onRemove` | `localStorage`, through `storage/cart.ts` |

Values that are computed during render and are **not** State:

- **Total quantity and subtotal:** They can always be calculated from `cart` and the products. A separate State could disagree with the cart.
- **Visible products:** They are calculated from the loaded products and `categoryId`.
- **Cart lines:** They combine `cart` with the loaded products.
- **Page title:** It is a side effect of the cart count, set in an Effect.

## 10. Security

- Everything delivered to the browser is public and can be inspected or modified.
- TypeScript types do not validate API responses at runtime.
- Client-side prices and stock information must not be treated as authoritative during a real purchase.
- In a real checkout, the server must verify product prices, stock availability, and quantities, then calculate the final order total.
- No secrets or private API keys belong in frontend code or `VITE_` environment variables.
