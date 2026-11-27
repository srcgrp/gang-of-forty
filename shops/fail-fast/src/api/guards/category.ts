/**
 * Type guard for Category.
 */

import type { Category } from "../../types"
import { isNumber, isString } from "./primitives"

export function isCategory(x: unknown): x is Category {
  if (typeof x !== "object" || x === null) {
    return false
  }

  const obj = x as Record<string, unknown>

  if (!isNumber(obj.id)) return false
  if (!isString(obj.slug)) return false
  if (!isString(obj.name)) return false
  if (!isString(obj.emoji)) return false
  if (!isString(obj.color)) return false

  return true
}
