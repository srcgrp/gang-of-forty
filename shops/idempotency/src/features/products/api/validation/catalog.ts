import type { Product, Category, Offer } from "../../../../shared/types";
import { isRecord } from "../../../../shared/validation/record";

export function isProduct(x: unknown): x is Product {
  return (
    isRecord(x) &&
    typeof x.id === "number" && Number.isFinite(x.id) &&
    typeof x.name === "string" &&
    typeof x.categoryId === "number" &&
    Number.isFinite(x.categoryId) &&
    typeof x.price === "number" &&
    Number.isFinite(x.price) &&
    typeof x.unit === "string" &&
    (!("emoji" in x) || typeof x.emoji === "string")
  );
}

export function isCategory(x: unknown): x is Category {
  return (
    isRecord(x) &&
    typeof x.id === "number" && Number.isFinite(x.id) &&
    typeof x.name === "string" &&
    typeof x.slug === "string"
  );
}

export function isOffer(x: unknown): x is Offer {
  return (
    isRecord(x) &&
    typeof x.productId === "number" &&
    Number.isFinite(x.productId) &&
    typeof x.percent === "number" &&
    Number.isFinite(x.percent) &&
    typeof x.label === "string"
  );
}