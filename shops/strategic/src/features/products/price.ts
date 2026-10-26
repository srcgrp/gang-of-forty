/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import { isBetween } from '../../shared/range';

export const finalPrice = (price: number, percent: number): number =>
  Math.min(price, Math.round((price * (100 - percent)) / 100 / 1000) * 1000);

export const validPercent = (percent: number | undefined): number =>
  percent !== undefined && isBetween(percent, 0, 100) ? percent : 0;

export const inStock = (stock: number): boolean => stock > 0;