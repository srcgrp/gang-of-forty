import type { Cart } from "../../types";
export function removeItem(cart: Cart, id: string): Cart {
  const quantity = cart[id] ?? 0;
  if (quantity <= 1) {
    const next = { ...cart };
    delete next[id];
    return next;
  }
  return { ...cart, [id]: quantity - 1 };
}
