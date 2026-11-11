import { setupAddToCartClick } from "./events";
import { updateCartCount } from "./count";
import { showCartToast } from "./toast";

export function setupCartView(
  initialCount: number,
  onAdd: (productId: number) => number | null,
): void {
  updateCartCount(initialCount);

  setupAddToCartClick((productId) => {
    const nextCount = onAdd(productId);

    if (nextCount !== null) {
      updateCartCount(nextCount);
      showCartToast();
    }
  });
}