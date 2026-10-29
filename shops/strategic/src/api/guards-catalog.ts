/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { Category, Offer, Product, StockData } from '../types';
import { isArrayOf, isFiniteNumber, isId, isNonNegative, isQuantity, isRecord, isString } from './basic-guards';

export function isProduct(value: unknown): value is Product {
  return isRecord(value) && isId(value.id) && isId(value.categoryId) &&
    isString(value.name) && value.name.trim() !== '' && isString(value.unit) && value.unit.trim() !== '' &&
    isNonNegative(value.price) && isString(value.emoji) && isArrayOf(isString)(value.tags);
}
export function isCategory(value: unknown): value is Category {
  return isRecord(value) && isId(value.id) && isString(value.slug) && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.slug) &&
    isString(value.name) && value.name.trim() !== '' && isString(value.emoji) && isString(value.color);
}
export function isOffer(value: unknown): value is Offer {
  return isRecord(value) && isId(value.productId) && isFiniteNumber(value.percent) &&
    value.percent >= 0 && value.percent <= 100 && isString(value.label);
}
export function isStock(value: unknown): value is StockData {
  return isRecord(value) && isString(value.updatedAt) && Number.isFinite(Date.parse(value.updatedAt)) &&
    isRecord(value.items) && Object.entries(value.items).every(([id, amount]) => /^[1-9]\d*$/.test(id) && isId(Number(id)) && isQuantity(amount));
}