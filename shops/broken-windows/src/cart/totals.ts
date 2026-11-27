import type { CartLine } from "../types"; // import only the type

// Total price of the cart (price * qty for every line)
export function cartTotal(cart: CartLine[]): number {
  // reduce folds the array into one number, starting from 0
  return cart.reduce((sum, line) => sum + line.price * line.qty, 0);
}

// Total number of items in the cart (sum of all quantities)
export function cartCount(cart: CartLine[]): number {
  // reduce folds the array into one number, starting from 0
  return cart.reduce((sum, line) => sum + line.qty, 0);
}