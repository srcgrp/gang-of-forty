import type { Product, Offer, StockData, Shop, Category, Home } from './types';
import { isRecord } from './utils';

// Product 
function isProduct(v: unknown): v is Product {
  return (
    isRecord(v) &&
    typeof v.id === 'number' &&
    typeof v.categoryId === 'number' &&
    typeof v.name === 'string' &&
    typeof v.emoji === 'string' &&
    typeof v.unit === 'string' &&
    typeof v.price === 'number' &&
    Array.isArray(v.tags) &&
    v.tags.every((t): t is string => typeof t === 'string')
  );
}

// Offer 
function isOffer(v: unknown): v is Offer {
  return (
    isRecord(v) &&
    typeof v.productId === 'number' &&
    typeof v.percent === 'number'
  );
}

// Stock 
function isStockData(v: unknown): v is StockData {
  return isRecord(v) && isRecord(v.items);
}

// Category 
function isCategory(v: unknown): v is Category {
  return (
    isRecord(v) &&
    typeof v.id === 'number' &&
    typeof v.slug === 'string' &&
    typeof v.name === 'string' &&
    typeof v.emoji === 'string'
  );
}

// Shop 
// The API only guarantees `name` and `slogan`.
// Everything else is filled by SHOP_OVERRIDES via enrichShop().
function isShop(v: unknown): v is Shop {
  return (
    isRecord(v) &&
    typeof v.name === 'string' &&
    typeof v.slogan === 'string'
  );
}

// Home 
// The API only guarantees an object; carousels/banners/hero
// are filled by HOME_OVERRIDES via enrichHome().
function isHome(v: unknown): v is Home {
  return isRecord(v);
}

// Array wrappers 
export function isProductArray(v: unknown): v is Product[] {
  return Array.isArray(v) && v.every(isProduct);
}

export function isOfferArray(v: unknown): v is Offer[] {
  return Array.isArray(v) && v.every(isOffer);
}

export function isCategoryArray(v: unknown): v is Category[] {
  return Array.isArray(v) && v.every(isCategory);
}

export { isStockData, isShop, isHome };