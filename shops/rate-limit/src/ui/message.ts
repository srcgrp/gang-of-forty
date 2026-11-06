import { el } from "./dom";

export function showMessage(target: HTMLElement, text: string, onRetry?: () => void): void {
  const box = el("div", "offer-message");
  box.append(el("p", null, text));
  if (onRetry) {
    const btn = el("button", "offer-retry", "تلاش دوباره");
    btn.type = "button";
    btn.addEventListener("click", onRetry);
    box.append(btn);
  }
  target.replaceChildren(box);
}
