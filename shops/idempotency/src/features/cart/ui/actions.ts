
export type CartAction =
  | "increase"
  | "decrease"
  | "remove";

export function setupCartActions(
  onAction: (
    action: CartAction,
    productId: number,
  ) => void,
  onClear: () => void,
): void {
  const container = document.querySelector<HTMLElement>(
    "#cart-popover-items",
  );

  const clearButton = document.querySelector<HTMLButtonElement>(
    "#cart-clear",
  );

  if (!container || !clearButton) {
    throw new Error("Cart action elements are missing.");
  }

  container.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    const button = target.closest<HTMLButtonElement>(
      "button[data-cart-action]",
    );

    if (!button || !container.contains(button)) {
      return;
    }

    const action = button.dataset.cartAction;
    const productId = Number(button.dataset.productId);

    if (
      !Number.isSafeInteger(productId) ||
      productId <= 0
    ) {
      return;
    }

    if (
      action === "increase" ||
      action === "decrease" ||
      action === "remove"
    ) {
      onAction(action, productId);
    }
  });

  clearButton.addEventListener("click", onClear);
}
