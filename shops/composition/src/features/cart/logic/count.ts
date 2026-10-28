import type { CartItem } from "../../../shared/types";
export function addToCart(count: number, item: CartItem): number {
  return count + item.quantity;
}
