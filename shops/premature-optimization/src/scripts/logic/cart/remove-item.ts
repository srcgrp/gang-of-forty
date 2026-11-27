import type { Cart } from "../../types";
import { toCartKey } from "./cart-key.ts";

export function removeItem(cart: Cart, productId: number): Cart {
  const key = toCartKey(productId);
  const quantity = cart[key] ?? 0;

  if (quantity > 1) return { ...cart, [key]: quantity - 1 };

  const nextCart = { ...cart };
  delete nextCart[key];
  return nextCart;
}
