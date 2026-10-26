/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { ProductItem } from '../types';

// Discounted price, rounded to the nearest 1000 toman and never above the normal price.
export const finalPrice = (price: number, percent: number): number =>
  Math.min(price, Math.round((price * (100 - percent)) / 100 / 1000) * 1000);

// A discount counts only when the percent is between 1 and 99.
export const validPercent = (percent: number | undefined): number =>
  percent !== undefined && percent > 0 && percent < 100 ? percent : 0;

export const inStock = (item: Pick<ProductItem, 'stock'>): boolean => item.stock > 0;