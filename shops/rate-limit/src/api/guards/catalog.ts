import type { Category, Offer, Product, Stock } from "../../types";
import { isArrayOf, isNumber, isPercent, isPrice, isRecord, isString } from "./basic";

export function isProduct(x: unknown): x is Product {
  return (
    isRecord(x) &&
    isNumber(x.id) &&
    isNumber(x.categoryId) &&
    isString(x.name) &&
    isString(x.emoji) &&
    isString(x.unit) &&
    isPrice(x.price) &&
    isArrayOf(x.tags, isString)
  );
}

export function isCategory(x: unknown): x is Category {
  return (
    isRecord(x) &&
    isNumber(x.id) &&
    isString(x.slug) &&
    isString(x.name) &&
    isString(x.emoji) &&
    isString(x.color)
  );
}

export function isOffer(x: unknown): x is Offer {
  return (
    isRecord(x) &&
    isNumber(x.productId) &&
    isPercent(x.percent) &&
    isString(x.label)
  );
}

export function isStock(x: unknown): x is Stock {
  return (
    isRecord(x) &&
    isString(x.updatedAt) &&
    isRecord(x.items) &&
    Object.values(x.items).every(isNumber)
  );
}
