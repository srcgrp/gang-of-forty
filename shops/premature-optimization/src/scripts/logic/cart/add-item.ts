import type { Cart } from "../../types";

export function addItem(cart: Cart, id: string): Cart {
  return { ...cart, [id]: (cart[id] ?? 0) + 1 };
}
