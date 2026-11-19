import { addToCart, removeFromCart } from "../features/cart/count";
import type { CartLine } from "../types/product";

export type CartAction =
  | { type: "add"; id: number; stock: number }
  | { type: "clear" };

export function cartReducer(lines: CartLine[], action: CartAction): CartLine[] {
  if (action.type === "add") {
    return addToCart(lines, action.id, action.stock);
  }
  if (action.type === "clear") {
    return removeFromCart();
  }
  return lines;
}
