# Open-Closed Shop — Design on One Page

## 1. What must it do? (Requirements)

- A customer can view the products available in the shop.
- A customer can browse products through carousels (special offers, dairy).
- A customer can open a full product list (PLP) for each carousel.
- A customer can see product names, prices, units, and tags.
- A customer can add products to the cart.
- A customer can remove products from the cart.
- A customer can see the cart subtotal and total quantity.
- A customer can switch between a light and a dark theme, and the theme is remembered.
- The cart is saved in `localStorage` and restored after refreshing the page.
- Every page keeps working after Refresh, and Back / Forward work.

Not now:
- User registration and login.
- Online payment and order submission.
- Server-side inventory updates.
- Product management for administrators.
- Advanced sorting and filtering.
- Search filtering (the search box is rendered, but it does not filter yet).
- Product detail page, checkout form, and sort order in the URL.

## 2. Screens and Parts

- **Header:** Shop name, theme toggle, cart count, search input, and main menu.
- **Home page:** Hero, carousel rows (up to 10 products each, with a "view all" link), cart, and banners.
- **PLP page:** Title and count of one carousel, all of its products, a link back home, and the cart.
- **Not found page:** A readable message and a link back home.
- **Product card:** Product name, emoji, unit, price, badge, and add-to-cart button.
- **Cart:** Cart items, remove buttons, subtotal, and total quantity.
- **Theme toggle:** A button that switches between light and dark.
- **Status messages:** Loading skeletons, empty-state messages, and readable error messages.

## 3. Data (`types.ts`)

- **Product:** `id`, `categoryId`, `name`, `emoji`, `unit`, `price`, and `tags`.
- **Offer:** `productId`, `percent`, and `label`.
- **Carousel:** `id`, `title`, `emoji`, and either `source: 'offers'` or a `categoryId`.
- **Catalog:** `products`, `offers`, and `carousels`, loaded together.
- **CartItem / Cart:** A product ID with a quantity, and the list of those items.
- **Theme:** `'light'` or `'dark'`.
- **LoadState&lt;T&gt;:** A union of `loading`, `success` (with `data: T`), `empty`, and `error`. It is generic, so it can describe any loaded data.
- **Category, Stock, Shop:** Described by types, but their JSON files are not used yet.

The TypeScript types describe the expected JSON structures. API responses are also checked at runtime (`api/guards.ts`) because TypeScript types alone cannot validate incoming JSON.

## 4. Where Does Each Piece Live?

- **Server/API data:** Products, offers, and carousels come from `products.json`, `offers.json`, and `home.json`. The other JSON files exist but are not used yet.
- **Shared client state (Zustand stores):** The theme and the cart. Components read them directly, so nothing is passed through `App` or through middle components.
- **Local client state:** The load status of the catalog lives inside the `useCatalog` hook.
- **`localStorage`:** The cart (through `storage/cart.ts`) and the theme (through Zustand `persist`).
- **URL:** The current page and the carousel ID (`#/plp/dairy`).
- **Environment variables:** `VITE_API_URL` selects the API base URL. No secrets belong in frontend environment variables.
- **`App`:** It has no state and no Effects. It only defines the routes.

## 5. API (What We Fetch, and When)

`useCatalog` runs one Effect when a page that needs data is mounted. It calls `fetchCatalog`, which uses `Promise.all` to fetch:

- `GET /api/products.json` → Product data.
- `GET /api/offers.json` → Offer data.
- `GET /api/home.json` → The `carousels` list.

Every response is validated item by item. Invalid items are skipped with a warning. If a file is missing, invalid, or unreachable, the screen shows a readable error. A flag (`ignore`) stops a late response from updating a page that has already gone away.

## 6. States of Each Screen

- **Loading:** Skeleton cards and a loading message.
- **Success:** Carousels (home) or the products of one carousel (PLP).
- **Empty:** A message when there are no products at all, or none in a carousel.
- **Error:** A readable message when the data cannot be fetched or validated.
- **Unknown carousel ID:** A "list not found" message with a link home (not a blank page).
- **Unknown URL:** The not-found page.
- **Empty cart:** A message that invites the customer to add products.

## 7. Folders

- `src/types.ts` → Shared data types.
- `src/api/` → Fetching API data and validating external responses.
- `src/storage/` → Reading and writing `localStorage`.
- `src/cart/` → Pure cart rules and calculations.
- `src/catalog/` → Pure functions that compute the products of each carousel.
- `src/hooks/` → Zustand stores (`useThemeStore`, `useCartStore`) and custom hooks (`useCatalog`, `useCartTitle`).
- `src/lib/` → Formatting, error messages, and status text.
- `src/components/` → React components (one per file).
- `src/components/pages/` → One file per page (`HomePage`, `PlpPage`, `NotFound`).
- `src/App.tsx` → Only the route definitions.
- `src/main.tsx` → Mounts `App` into the page.

API access, storage, cart logic, and catalog logic stay in their own modules and know nothing about React. Shared types do not depend on those modules.

## 8. Routes

| URL (hash) | Page | Data from |
|---|---|---|
| `#/` | `HomePage` | `useCatalog` + `carouselProducts` (per carousel, max 10 products) |
| `#/plp/$carouselId` | `PlpPage` | `useCatalog` + `findCarousel` + `carouselProducts` |
| any other URL | `NotFound` | none |

- The router lives in `App.tsx`. Pages read the route parameter with `useParams({ from })`, so they never import `App.tsx` (that would be a circular import).
- `createHashHistory` is used because shops are static files on a server: `#/plp/dairy` still works after Refresh.
- `Register` tells every file which routes exist, so a mistyped link path is a TypeScript error.
- An unknown `carouselId` (for example `#/plp/nothing`) shows a readable "list not found" message.
- Jumping inside a page (cart, contact, top) uses `JumpLink`, because a plain `href="#cart"` would collide with the hash router.

## 9. Stores

| Store | Defined in | What it holds | Who changes it | Where it is saved |
|---|---|---|---|---|
| Theme | `hooks/useThemeStore.ts` (Zustand) | `theme` (`light` / `dark`) and `toggle` | `ThemeToggle` calls `toggle` | `localStorage` key `open-closed-theme`, through Zustand `persist` |
| Cart | `hooks/useCartStore.ts` (Zustand) | `cart` (list of product ID + quantity), `add`, `remove` | `ProductCard` calls `add`, `CartPanel` calls `remove` | `localStorage` through `storage/cart.ts`, inside a `subscribe` |

- **Why Zustand for the cart (not `useReducer` + `useContext`):** The pure functions in `cart/` and `storage/` stay unchanged. No `Provider` is needed. Each component reads only the part it needs with a selector (`ProductCard` reads only `add`, `Header` reads only the total quantity), so one change does not re-render every component that reads a context.
- Components always use selectors (`useThemeStore((s) => s.theme)`), never the whole store.
- **Not State** (computed during render): total quantity, subtotal, cart lines, and the products of a carousel. A separate State could disagree with the cart.
- **Load state** (`LoadState<Catalog>`) is local state inside the `useCatalog` hook, not a store. Each page that calls `useCatalog` fetches the data when it is mounted.
- The page title is a side effect of the cart count, set in an Effect inside `useCartTitle`.

## 10. Component Tree per Page

All pages:

```
Layout (theme div with data-theme)
├─ JumpLink (skip link)
├─ Header
│  ├─ Link (logo)
│  ├─ ThemeToggle
│  ├─ JumpLink (cart and count)
│  ├─ SearchBox
│  └─ MainNav
├─ main → Outlet → [the page below]
└─ Footer
```

Home page (`/`):

```
HomePage
├─ Hero
├─ CarouselRow × n         (or LoadStatus while loading, empty, or error)
│  └─ ProductCard × up to 10
│     └─ Price
├─ CartPanel
└─ Banners
```

PLP page (`/plp/$carouselId`):

```
PlpPage
├─ LoadStatus              (while loading, empty, or error)
├─ ProductCard × n         (all products of the carousel)
│  └─ Price
├─ Link (back to home)
└─ CartPanel
```

Not found page:

```
NotFound
└─ Link (back to home)
```

Data flows down through props. Shared state (theme and cart) is read directly from the stores with selectors.

## 11. Security

- Everything delivered to the browser is public and can be inspected or modified.
- TypeScript types do not validate API responses at runtime.
- Client-side prices and stock information must not be treated as authoritative during a real purchase.
- In a real checkout, the server must verify product prices, stock availability, and quantities, then calculate the final order total.
- The cart and theme in `localStorage` can be edited by the user, so they are checked when read (`isCartItem`) and never trusted as authoritative.
- No secrets or private API keys belong in frontend code or `VITE_` environment variables.