/**
 * Pure cart utility functions.
 * No side effects - all functions return new arrays.
 */

import type { CartLine, Product } from './types'

/**
 * Add a product to the cart.
 * If the product already exists, increment its quantity.
 * Otherwise, add a new line with quantity 1.
 */
export function addToCart(lines: CartLine[], productId: number): CartLine[] {
  const existingLine = lines.find((line) => line.productId === productId)

  if (existingLine) {
    return lines.map((line) =>
      line.productId === productId
        ? { ...line, quantity: line.quantity + 1 }
        : line
    )
  }

  return [...lines, { productId, quantity: 1 }]
}

/**
 * Remove a product from the cart entirely.
 */
export function removeFromCart(lines: CartLine[], productId: number): CartLine[] {
  return lines.filter((line) => line.productId !== productId)
}

/**
 * Calculate the total number of items in the cart.
 */
export function getCartItemCount(lines: CartLine[]): number {
  return lines.reduce((total, line) => total + line.quantity, 0)
}

/**
 * Calculate the total price of all items in the cart.
 */
export function getCartTotal(lines: CartLine[], products: Product[]): number {
  return lines.reduce((total, line) => {
    const product = products.find((p) => p.id === line.productId)
    if (!product) return total
    return total + product.price * line.quantity
  }, 0)
}
