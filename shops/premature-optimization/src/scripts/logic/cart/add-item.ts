import type { Cart } from "../../types";
import { toCartKey } from "./cart-key.ts";

export function addItem(cart: Cart, productId: number): Cart {
  const key = toCartKey(productId);
  return { ...cart, [key]: (cart[key] ?? 0) + 1 };
}
