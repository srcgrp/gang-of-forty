# Changelog

## [1.0.0] - 2026-11-24

### Added

- Clean Market, a Persian RTL grocery shop
- Home page with a hero, promos, category rows, and a sale countdown
- Search that filters the products
- Product list with sort, and a product page
- Hash routes for home, the product list, a product, checkout, and an unknown page
- A cart saved in localStorage. The cart panel links to the checkout route; the form on that page checks the fields and then clears the cart
- Light and dark theme
- Loading, empty, and error states, with retry

### Deployment

- A Docker image that builds the shop and serves it with nginx
- A Vercel deploy for the production site
