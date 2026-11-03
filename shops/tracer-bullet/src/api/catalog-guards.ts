import type {
  Product,
  Offer,
  Category,
  Stock,
} from "../types";
import { isRecord, isStringArray } from "./guard-basics";

export function isProduct(x: unknown): x is Product {
  if (!isRecord(x)) return false;

  return (
    typeof x.id === "number" &&
    Number.isFinite(x.id) &&
    typeof x.categoryId === "number" &&
    Number.isFinite(x.categoryId) &&
    typeof x.name === "string" &&
    typeof x.emoji === "string" &&
    typeof x.unit === "string" &&
    typeof x.price === "number" &&
    Number.isFinite(x.price) &&
    isStringArray(x.tags)
  );
}

export function isOffer(x: unknown): x is Offer {
  if (!isRecord(x)) return false;

  return (
    typeof x.productId === "number" &&
    Number.isFinite(x.productId) &&
    typeof x.percent === "number" &&
    Number.isFinite(x.percent) &&
    typeof x.label === "string"
  );
}

export function isCategory(x: unknown): x is Category {
  if (!isRecord(x)) return false;

  return (
    typeof x.id === "number" &&
    Number.isFinite(x.id) &&
    typeof x.slug === "string" &&
    typeof x.name === "string" &&
    typeof x.emoji === "string" &&
    typeof x.color === "string"
  );
}

export function isStock(x: unknown): x is Stock {
  if (!isRecord(x) || !isRecord(x.items)) return false;

  return (
    typeof x.updatedAt === "string" &&
    Object.values(x.items).every(
      (value) =>
        typeof value === "number" &&
        Number.isFinite(value)
    )
  );
}