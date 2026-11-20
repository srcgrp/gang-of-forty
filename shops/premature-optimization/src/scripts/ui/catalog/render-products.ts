import type { OptionsForProduct, Product } from "../../types";
import { makeProductCard } from "./product-card";
import { animateProductCards } from "../shared/animations";
export function renderProducts(
  container: HTMLElement,
  products: Product[],
  options: OptionsForProduct,
): void {
  const fragment = document.createDocumentFragment();
  products.forEach((product) =>
    fragment.append(makeProductCard(product, options(product))),
  );
  container.replaceChildren(fragment);
  animateProductCards(container);
}
export function updateProductStockUI(
  productId: string,
  quantity: number,
): void {
  document
    .querySelectorAll<HTMLButtonElement>(
      `.buy-button[data-product-id="${CSS.escape(productId)}"]`,
    )
    .forEach((button) => {
      const card = button.closest<HTMLElement>(".product-item");
      if (!card) return;
      button.disabled = quantity <= 0;
      button.title =
        quantity <= 0
          ? "موجودی این محصول تمام شده است"
          : "افزودن محصول به سبد خرید";
      card.classList.toggle("product-item--unavailable", quantity <= 0);
    });
}
