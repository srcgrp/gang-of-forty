# Mina Store --- Technical Design

## 1. Goal and Scope

Describe the goal of the Mina Store application and the scope of the
implementation.

## 2. Component Tree

Document the React component hierarchy and how the main components are
composed.

``` text
App
├── Header
├── CategoryNav
├── ProductGrid
│   └── ProductCard
└── CartPanel
```

## 3. State Ownership

Describe which component owns each piece of state and how that state is
shared with child components.

  -----------------------------------------------------------------------
  State                   Owner                   Purpose
  ----------------------- ----------------------- -----------------------
  Selected category       `App`                   Tracks the currently
                                                  selected product
                                                  category.

  Cart                    `App`                   Stores the products
                                                  added to the shopping
                                                  cart.
  -----------------------------------------------------------------------

## 4. Derived Values

Values that can be calculated from existing state should be derived
during rendering rather than stored as separate state.

  -----------------------------------------------------------------------
  Derived value                       Calculation
  ----------------------------------- -----------------------------------
  Cart item count                     Calculated from the cart contents.

  Cart total                          Calculated from the quantities and
                                      prices in the cart.

  Visible products                    Filtered using the selected
                                      category and search query.
  -----------------------------------------------------------------------

## 5. API and Validation

Describe the API layer, data loading, and validation behavior.

-   Keep API requests in the API layer.
-   Represent loading, success, and error states with the `LoadState`
    discriminated union.
-   Handle each loading state explicitly with a `switch` statement.
-   Provide understandable error messages when the requested data is
    missing or the request fails.

## 6. UI Behavior and Effects

Document the main user interactions and side effects.

-   Selecting a category updates the selected category state.
-   Searching filters the products displayed in the product grid.
-   Adding or removing products updates the cart.
-   Persist the cart using the storage layer.
-   Update the browser document title with the store name and cart item
    count.
-   Clean up timers and other effects when their component is removed.

## 7. Folder Structure

Document the responsibilities of the main source folders.

``` text
src/
├── api/        # API requests and data loading
├── cart/       # Pure cart-related logic
├── components/ # Reusable React components
├── storage/    # Persistent browser storage
├── types.ts    # Shared TypeScript types
├── App.tsx     # Application state, effects, and event handlers
└── main.tsx    # React application entry point
```
