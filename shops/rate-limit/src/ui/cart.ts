import type { CartAddDetail } from "../types";

export function showCartCount(text: string): void {
  const badge = document.querySelector<HTMLElement>(".cart-count");
  if (badge) badge.textContent = text;
}

export function emitCartAdd(detail: CartAddDetail): void {
  document.dispatchEvent(new CustomEvent<CartAddDetail>("cart:add", { detail }));
}

export function playAdded(button: HTMLButtonElement): void {
  button.classList.remove("is-added");
  void button.offsetWidth;
  button.classList.add("is-added");
}

export function lockButton(button: HTMLButtonElement, label: string): void {
  button.disabled = true;
  button.setAttribute("aria-label", label);
}
