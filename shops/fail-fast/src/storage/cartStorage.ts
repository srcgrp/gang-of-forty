/**
 * Pure localStorage functions for cart persistence.
 * Handles missing data and invalid JSON safely.
 */

import type { CartLine } from '../types'

const CART_KEY = 'space-market-cart'

/**
 * Check if a value is a valid CartLine
 */
function isCartLine(value: unknown): value is CartLine {
  return (
    typeof value === 'object' &&
    value !== null &&
    'productId' in value &&
    'quantity' in value &&
    typeof (value as CartLine).productId === 'number' &&
    typeof (value as CartLine).quantity === 'number' &&
    Number.isInteger((value as CartLine).productId) &&
    Number.isInteger((value as CartLine).quantity) &&
    (value as CartLine).quantity > 0
  )
}

/**
 * Check if a value is a valid CartLine array
 */
function isCartLineArray(value: unknown): value is CartLine[] {
  return Array.isArray(value) && value.every(isCartLine)
}

/**
 * Load cart from localStorage.
 * Returns empty array if no data or invalid data.
 */
export function loadCart(): CartLine[] {
  try {
    const stored = localStorage.getItem(CART_KEY)
    if (!stored) {
      return []
    }

    const parsed: unknown = JSON.parse(stored)

    if (isCartLineArray(parsed)) {
      return parsed
    }

    // Invalid data - return empty array
    return []
  } catch {
    // JSON parse error or localStorage error
    return []
  }
}

/**
 * Save cart to localStorage.
 */
export function saveCart(cart: CartLine[]): void {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
  } catch {
    // localStorage error (quota exceeded, etc.)
    // Silently fail - cart will work in-memory only
  }
}
