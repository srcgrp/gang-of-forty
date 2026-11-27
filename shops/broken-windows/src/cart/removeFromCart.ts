import type { CartLine } from "../types"; // import only the type

// Removes the whole line of a product from the cart
export function removeFromCart(cart: CartLine[], id: number): CartLine[] {
  // filter returns a NEW array that keeps every line except the one with this id
  return cart.filter((line) => line.id !== id);
}