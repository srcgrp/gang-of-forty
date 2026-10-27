import type { CartItem } from "../types";
export function addToCart(count: number, item: CartItem): number {
  return count + item.quantity;
}
