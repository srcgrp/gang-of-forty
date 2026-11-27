export function setupAddToCartClick(
  onAddToCart: (productId: number) => void,
): void {
  document.addEventListener("click", (event) => {
    const target = event.target;

    if (target instanceof Element) {
      const button = target.closest<HTMLButtonElement>(
        ".product-card button",
      );

      const card = button?.closest<HTMLElement>(".product-card");
      const productId = Number(card?.dataset.apiProduct);

      if (
        button &&
        !button.disabled &&
        Number.isSafeInteger(productId) &&
        productId > 0
      ) {
        onAddToCart(productId);
      }
    }
  });
}