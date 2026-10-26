/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { Category, Offer, Product, StockData } from '../types';
import { isArrayOf, isFiniteNumber, isOptional, isRecord, isString } from './basic-guards';

export function isProduct(value: unknown): value is Product {
  return (
    isRecord(value) &&
    isFiniteNumber(value.id) &&
    isFiniteNumber(value.categoryId) &&
    isString(value.name) &&
    isString(value.unit) &&
    isFiniteNumber(value.price) &&
    isOptional(isString)(value.emoji) &&
    isOptional(isArrayOf(isString))(value.tags)
  );
}

export function isCategory(value: unknown): value is Category {
  return (
    isRecord(value) &&
    isFiniteNumber(value.id) &&
    isString(value.slug) &&
    isString(value.name) &&
    isOptional(isString)(value.color)
  );
}

export function isOffer(value: unknown): value is Offer {
  return isRecord(value) && isFiniteNumber(value.productId) && isFiniteNumber(value.percent);
}

const isStockAmount = (quantity: unknown): boolean =>
  isFiniteNumber(quantity) || (isString(quantity) && quantity.trim() !== '' && Number.isFinite(Number(quantity)));

export function isStock(value: unknown): value is StockData {
  return isRecord(value) && isRecord(value.items) && Object.values(value.items).every(isStockAmount);
}