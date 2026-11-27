/**
 * Type guard for Stock.
 */

import type { Stock } from "../../types"
import { isNumber, isString } from "./primitives"

export function isStock(x: unknown): x is Stock {
  if (typeof x !== "object" || x === null) {
    return false
  }

  const obj = x as Record<string, unknown>

  if ("updatedAt" in obj && obj.updatedAt !== undefined) {
    if (!isString(obj.updatedAt)) return false
  }

  if (!("items" in obj)) return false
  if (typeof obj.items !== "object" || obj.items === null) {
    return false
  }

  const items = obj.items as Record<string, unknown>
  for (const value of Object.values(items)) {
    if (!isNumber(value)) return false
  }

  return true
}
