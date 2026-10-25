import type { Product, Category, Offer, Stock } from '../types';
import { isRecord, isString, isNonEmptyString, isFiniteNumber, isNonNegativeNumber, isPositiveInteger, isStringArray } from './guards-base';
export function isProduct(value: unknown): value is Product {
  return isRecord(value) && isPositiveInteger(value.id) && isPositiveInteger(value.categoryId) && isNonEmptyString(value.name) && isString(value.emoji) && isNonEmptyString(value.unit) && isNonNegativeNumber(value.price) && isStringArray(value.tags);
}
export function isCategory(value: unknown): value is Category {
  return isRecord(value) && isPositiveInteger(value.id) && isNonEmptyString(value.slug) && isNonEmptyString(value.name) && isString(value.emoji) && isString(value.color);
}
export function isOffer(value: unknown): value is Offer {
  return isRecord(value) && isPositiveInteger(value.productId) && isFiniteNumber(value.percent) && value.percent >= 0 && value.percent <= 100 && isNonEmptyString(value.label);
}
export function isStock(value: unknown): value is Stock {
  if (!isRecord(value) || typeof value.updatedAt !== 'string' || !isRecord(value.items)) return false;
  return Object.entries(value.items).every(([id, quantity]) => /^\d+$/.test(id) && Number(id) > 0 && isFiniteNumber(quantity) && Number.isInteger(quantity) && quantity >= 0);
}
