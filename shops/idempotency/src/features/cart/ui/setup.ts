import { setupAddToCartClick } from "./events";
import { updateCartCount } from "./count";
import { showCartToast } from "./toast";

export function setupCartView(
  initialCount: number,
  onAdd: () => number,
): void {
  updateCartCount(initialCount);
  setupAddToCartClick(() => {
    updateCartCount(onAdd());
    showCartToast();
  });
}
