/**
 * Type guard for Product.
 */

import type { Product } from "../../types"
import { isNumber, isString, isStringArray } from "./primitives"

export function isProduct(x: unknown): x is Product {
  if (typeof x !== "object" || x === null) {
    return false
  }

  const obj = x as Record<string, unknown>

  if (!isNumber(obj.id)) return false
  if (!isString(obj.name)) return false
  if (!isNumber(obj.categoryId)) return false
  if (!isNumber(obj.price)) return false
  if (!isString(obj.unit)) return false
  if (!isString(obj.emoji)) return false

  if ("tags" in obj && obj.tags !== undefined) {
    if (!isStringArray(obj.tags)) return false
  }

  return true
}
