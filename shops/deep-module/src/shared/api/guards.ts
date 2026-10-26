import type { Category, Home, Offer, Product, Shop, StockData } from "../types";

export function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

export function isProduct(v: unknown): v is Product {
  if (!isRecord(v)) return false;
  return (
    typeof v.id === "number" &&
    Number.isInteger(v.id) &&
    v.id > 0 &&
    typeof v.name === "string" &&
    v.name.length > 0 &&
    typeof v.price === "number" &&
    Number.isFinite(v.price) &&
    v.price >= 0
  );
}

export function isCategory(v: unknown): v is Category {
  if (!isRecord(v)) return false;
  return (
    typeof v.id === "number" &&
    Number.isInteger(v.id) &&
    v.id > 0 &&
    typeof v.name === "string" &&
    v.name.length > 0
  );
}

export function isOffer(v: unknown): v is Offer {
  if (!isRecord(v)) return false;
  return (
    typeof v.productId === "number" &&
    Number.isInteger(v.productId) &&
    v.productId > 0 &&
    typeof v.percent === "number" &&
    Number.isFinite(v.percent) &&
    v.percent > 0 &&
    v.percent < 100
  );
}

export function isStock(v: unknown): v is StockData {
  if (!isRecord(v) || !isRecord(v.items)) return false;
  return Object.values(v.items).every(
    (item) => typeof item === "number" && Number.isFinite(item) && item >= 0,
  );
}

export function isShop(v: unknown): v is Shop {
  return isRecord(v);
}

export function isHome(v: unknown): v is Home {
  return isRecord(v);
}

export function arrayOf<T>(
  value: unknown,
  guard: (item: unknown) => item is T,
): T[] {
  if (!Array.isArray(value)) return [];
  const result: T[] = [];
  for (const item of value) if (guard(item)) result.push(item);
  return result;
}