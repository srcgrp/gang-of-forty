export function makePrice(
  oldLabel: string,
  nowLabel: string | null,
): HTMLParagraphElement {
  const price: HTMLParagraphElement = document.createElement("p");
  price.className = "price";
  if (nowLabel) {
    const oldPrice: HTMLElement = document.createElement("s");
    oldPrice.textContent = oldLabel;
    price.appendChild(oldPrice);
    const now: HTMLSpanElement = document.createElement("span");
    now.textContent = nowLabel;
    price.appendChild(now);
  } else {
    price.textContent = oldLabel;
  }
  return price;
}

export function makeButton(
  available: boolean,
  onAdd: () => void,
): HTMLButtonElement {
  const btn: HTMLButtonElement = document.createElement("button");
  btn.type = "button";
  if (!available) {
    btn.textContent = "ناموجود";
    btn.disabled = true;
  } else {
    btn.textContent = "افزودن به سبد";
    btn.addEventListener("click", onAdd);
  }
  return btn;
}
