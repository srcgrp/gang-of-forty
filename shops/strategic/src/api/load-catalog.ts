/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { Category, Offer, Product, StockData } from '../types';
import { isArrayOf } from './basic-guards';
import { isCategory, isOffer, isProduct, isStock } from './guards-catalog';
import { ApiError, getChecked, getJSON } from './http';

export async function loadProducts(signal?: AbortSignal): Promise<Product[]> {
  const data = await getJSON('products.json', signal);
  if (!Array.isArray(data)) throw new ApiError('shape', 'products.json');

  const products = data.filter(isProduct);
  const rejected = data.length - products.length;
  if (rejected > 0) console.warn(`[API] ${rejected} invalid product(s) removed from products.json`);
  return products;
}

export const loadCategories = (signal?: AbortSignal): Promise<Category[]> =>
  getChecked('categories.json', isArrayOf(isCategory), signal);

export const loadOffers = (signal?: AbortSignal): Promise<Offer[]> =>
  getChecked('offers.json', isArrayOf(isOffer), signal);

export const loadStock = (signal?: AbortSignal): Promise<StockData> =>
  getChecked('stock.json', isStock, signal);