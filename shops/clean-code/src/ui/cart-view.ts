export function renderCart(count: number, faNumber: Intl.NumberFormat): void {
  const countEl = document.querySelector<HTMLSpanElement>(".cart-count");
  const cartText = document.querySelector<HTMLParagraphElement>("#cart-text");

  if (!countEl || !cartText)
    throw new Error("index.html is missing an element");
  countEl.textContent = faNumber.format(count);
  if (count === 0) {
    cartText.textContent = "سبد خالی است.";
  } else {
    cartText.textContent = "تعداد کالا در سبد: " + faNumber.format(count);
  }
}
