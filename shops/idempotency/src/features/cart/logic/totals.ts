import type { CartItem } from "../../../shared/types/products";

export function getCartCount(cart: CartItem[]): number {
  return cart.reduce(
    (total, item) => total + item.quantity,
    0,
  );
}

export function getCartSubtotal(cart: CartItem[]): number {
  return cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
}