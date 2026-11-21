/**
 * Type guard for Offer.
 */

import type { Offer } from "../../types"
import { isNumber, isString } from "./primitives"

export function isOffer(x: unknown): x is Offer {
  if (typeof x !== "object" || x === null) {
    return false
  }

  const obj = x as Record<string, unknown>

  if (!isNumber(obj.productId)) return false
  if (!isNumber(obj.percent)) return false

  if ("label" in obj && obj.label !== undefined) {
    if (!isString(obj.label)) return false
  }

  return true
}
