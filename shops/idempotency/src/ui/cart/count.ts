const priceFormatter = new Intl.NumberFormat("fa-IR");

export function updateCartCount(count: number): void {
  const cartCountElement = document.querySelector("#cart-count");

  if (!cartCountElement) {
    throw new Error("Cart count element is missing from the DOM.");
  }

  cartCountElement.textContent = priceFormatter.format(count);
}