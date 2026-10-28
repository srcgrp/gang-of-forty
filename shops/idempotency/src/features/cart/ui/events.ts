export function setupAddToCartClick(
  onAddToCart: () => void,
): void {
  document.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    const button = target.closest<HTMLButtonElement>(
      ".product-card button",
    );

    if (button && !button.disabled) {
      onAddToCart();
    }
  });
}