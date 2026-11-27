/**
 * Filter functions for validating arrays of data.
 */

import type { Product, Offer } from "../../types"
import { isProduct } from "./product"
import { isOffer } from "./offer"

export function filterValidProducts(data: unknown): Product[] {
  if (!Array.isArray(data)) {
    console.warn("filterValidProducts: expected array, got", typeof data)
    return []
  }

  const valid: Product[] = []
  let rejected = 0

  for (const item of data) {
    if (isProduct(item)) {
      valid.push(item)
    } else {
      rejected++
    }
  }

  if (rejected > 0) {
    console.warn(`filterValidProducts: rejected ${rejected} invalid records`)
  }

  return valid
}

export function filterValidOffers(data: unknown): Offer[] {
  if (!Array.isArray(data)) {
    console.warn("filterValidOffers: expected array, got", typeof data)
    return []
  }

  const valid: Offer[] = []
  let rejected = 0

  for (const item of data) {
    if (isOffer(item)) {
      valid.push(item)
    } else {
      rejected++
    }
  }

  if (rejected > 0) {
    console.warn(`filterValidOffers: rejected ${rejected} invalid records`)
  }

  return valid
}
