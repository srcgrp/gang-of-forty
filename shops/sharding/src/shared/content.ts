const ASSET_BASE = `${import.meta.env.BASE_URL}assets/`;

export const BANNER_IMAGES = [
  `${ASSET_BASE}images/banners/banner-1.webp`,
  `${ASSET_BASE}images/banners/banner-2.webp`,
  `${ASSET_BASE}images/banners/banner-3.webp`,
  `${ASSET_BASE}images/banners/banner-4.webp`,
  `${ASSET_BASE}images/banners/banner-5.webp`,
];

export const PRODUCT_IMAGES: Record<number, string> = {
  101: `${ASSET_BASE}images/products/p-apple.webp`,
  102: `${ASSET_BASE}images/products/p-orange.webp`,
  103: `${ASSET_BASE}images/products/p-banana.webp`,
  106: `${ASSET_BASE}images/products/p-grape.webp`,
  108: `${ASSET_BASE}images/products/p-strawberry.webp`,
  109: `${ASSET_BASE}images/products/p-mango.webp`,
  201: `${ASSET_BASE}images/products/p-milk.webp`,
  202: `${ASSET_BASE}images/products/p-cheese.webp`,
  203: `${ASSET_BASE}images/products/p-yogurt.webp`,
  204: `${ASSET_BASE}images/products/p-butter.webp`,
  206: `${ASSET_BASE}images/products/p-egg.webp`,
  207: `${ASSET_BASE}images/products/p-cream.webp`,
  502: `${ASSET_BASE}images/products/p-dough.webp`,
};

export const CATEGORY_IMAGES: Record<string, string> = {
  fruits: `${ASSET_BASE}images/categories/cat-fruits.webp`,
  dairy: `${ASSET_BASE}images/categories/cat-dairy.webp`,
  grocery: `${ASSET_BASE}images/categories/cat-grocery.webp`,
  beverages: `${ASSET_BASE}images/categories/cat-beverages.webp`,
  hygiene: `${ASSET_BASE}images/categories/cat-hygiene.webp`,
  snacks: `${ASSET_BASE}images/categories/cat-snacks.webp`,
  bakery: `${ASSET_BASE}images/categories/cat-grocery.webp`,
  pantry: `${ASSET_BASE}images/categories/cat-grocery.webp`,
  drinks: `${ASSET_BASE}images/categories/cat-beverages.webp`,
  protein: `${ASSET_BASE}images/categories/cat-meat.webp`,
};

export const PROMO_IMAGES: Record<string, string> = {
  fruits: `${ASSET_BASE}images/promos/promo-fruits.webp`,
  dairy: `${ASSET_BASE}images/promos/promo-dairy.webp`,
  bakery: `${ASSET_BASE}images/promos/promo-grocery.webp`,
  pantry: `${ASSET_BASE}images/promos/promo-grocery.webp`,
  drinks: `${ASSET_BASE}images/promos/promo-beverages.webp`,
  snacks: `${ASSET_BASE}images/promos/promo-deals.webp`,
};