import { incrementCartCount } from "./logic/count";
import { loadCartCount, saveCartCount } from "./storage/cart";
import { setupCartView } from "./ui/setup";

export function setupCart(): void {
  let count = loadCartCount();

  setupCartView(count, () => {
    count = incrementCartCount(count);
    saveCartCount(count);
    return count;
  });
}