import { pulseCart } from "./animation.ts";
import { flyToCart } from "./flyToCart.ts";
import { notify } from "./notify.ts";

export function addedFeedback(button: HTMLButtonElement): void {
  flyToCart(button);
  notify.success("محصول به سبد خرید اضافه شد");
}

export function removedFeedback(): void {
  pulseCart();
  notify.success("محصول از سبد خرید حذف شد");
}

export function saveFailedFeedback(): void {
  notify.error("تغییرات سبد خرید ذخیره نشد.");
}
