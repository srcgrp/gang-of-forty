import { useEffect } from "react";
import type { CartItem } from "../../../shared/types/products";
import { saveCart } from "../storage/items";

export function useCartEffects(cart: CartItem[]): void {
  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  useEffect(() => {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);

    document.title =
      count > 0
        ? `سبد خرید (${count.toLocaleString("fa-IR")}) | تازه‌خانه`
        : "سوپر مارکت آنلاین | تازه خانه";
  }, [cart]);
}
