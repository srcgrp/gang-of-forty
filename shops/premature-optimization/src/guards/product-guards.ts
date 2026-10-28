import type { Product, Offer } from "../scripts/types";

import { isRecord, isString, isFiniteNumber, isArrayOf } from "./common-guards";

export function isProduct(x: unknown): x is Product {
  return (
    isRecord(x) &&
    Number.isInteger(x.id) &&
    Number.isInteger(x.categoryId) &&
    isString(x.name) &&
    x.name.trim() !== "" &&
    isString(x.image) &&
    isString(x.unit) &&
    isFiniteNumber(x.price) &&
    Number.isInteger(x.price) &&
    x.price >= 0 &&
    isArrayOf(x.tags, isString)
  );
}

export function isOffer(x: unknown): x is Offer {
  return (
    isRecord(x) &&
    Number.isInteger(x.productId) &&
    isFiniteNumber(x.percent) &&
    x.percent > 0 &&
    x.percent < 100 &&
    isString(x.label)
  );
}
