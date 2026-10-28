/**
 * Runtime Type Guards for API data validation.
 * All external data must be validated through these guards.
 */

import type { Product, Offer, Stock, Category } from "../types.js";

/**
 * Validates that a value is a string.
 */
function isString(value: unknown): value is string {
  return typeof value === "string";
}

/**
 * Validates that a value is a number.
 */
function isNumber(value: unknown): value is number {
  return typeof value === "number" && !Number.isNaN(value);
}

/**
 * Validates that a value is an array of strings.
 */
function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(isString);
}

/**
 * Type guard for Product.
 * Validates all required fields and optional fields when present.
 */
export function isProduct(x: unknown): x is Product {
  if (typeof x !== "object" || x === null) {
    return false;
  }

  const obj = x as Record<string, unknown>;

  // Required fields
  if (!isNumber(obj.id)) return false;
  if (!isString(obj.name)) return false;
  if (!isNumber(obj.categoryId)) return false;
  if (!isNumber(obj.price)) return false;
  if (!isString(obj.unit)) return false;
  if (!isString(obj.emoji)) return false;

  // Optional field: tags
  if ("tags" in obj && obj.tags !== undefined) {
    if (!isStringArray(obj.tags)) return false;
  }

  return true;
}

/**
 * Type guard for Offer.
 * Validates all required fields and optional fields when present.
 */
export function isOffer(x: unknown): x is Offer {
  if (typeof x !== "object" || x === null) {
    return false;
  }

  const obj = x as Record<string, unknown>;

  // Required fields
  if (!isNumber(obj.productId)) return false;
  if (!isNumber(obj.percent)) return false;

  // Optional field: label
  if ("label" in obj && obj.label !== undefined) {
    if (!isString(obj.label)) return false;
  }

  return true;
}

/**
 * Type guard for Category.
 * Validates all required fields.
 */
export function isCategory(x: unknown): x is Category {
  if (typeof x !== "object" || x === null) {
    return false;
  }

  const obj = x as Record<string, unknown>;

  // Required fields
  if (!isNumber(obj.id)) return false;
  if (!isString(obj.slug)) return false;
  if (!isString(obj.name)) return false;
  if (!isString(obj.emoji)) return false;
  if (!isString(obj.color)) return false;

  return true;
}

/**
 * Type guard for Stock.
 * Validates that items is a non-null object with number values.
 */
export function isStock(x: unknown): x is Stock {
  if (typeof x !== "object" || x === null) {
    return false;
  }

  const obj = x as Record<string, unknown>;

  // Optional field: updatedAt
  if ("updatedAt" in obj && obj.updatedAt !== undefined) {
    if (!isString(obj.updatedAt)) return false;
  }

  // Required field: items
  if (!("items" in obj)) return false;
  if (typeof obj.items !== "object" || obj.items === null) {
    return false;
  }

  // Validate that all values in items are numbers
  const items = obj.items as Record<string, unknown>;
  for (const value of Object.values(items)) {
    if (!isNumber(value)) return false;
  }

  return true;
}

/**
 * Filters valid products from an unknown array.
 * Returns empty array for non-array input.
 * Logs the count of rejected invalid records.
 */
export function filterValidProducts(data: unknown): Product[] {
  if (!Array.isArray(data)) {
    console.warn("filterValidProducts: expected array, got", typeof data);
    return [];
  }

  const valid: Product[] = [];
  let rejected = 0;

  for (const item of data) {
    if (isProduct(item)) {
      valid.push(item);
    } else {
      rejected++;
    }
  }

  if (rejected > 0) {
    console.warn(`filterValidProducts: rejected ${rejected} invalid product records`);
  }

  return valid;
}
