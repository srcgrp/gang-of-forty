import type { CardView, CartItem } from "../types";
import { createElement } from "./elements";
import { createProductImage } from "./product-image";
export function createProductCard(card: CardView, onAdd: (item: CartItem) => void): HTMLElement {
  const article = createElement("article", "product-card", "");
  const image = createProductImage(card.emoji);
  article.appendChild(image);
  article.appendChild(createElement("h3", "", card.name));
  article.appendChild(createElement("p", "unit", card.unit));
  if (card.badge) article.appendChild(createElement("span", "discount-badge", card.badge));
  const price = createElement("div", "price", "");
  if (card.oldPrice) price.appendChild(createElement("del", "", card.oldPrice));
  price.appendChild(createElement("strong", "", card.price));
  article.appendChild(price);
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "افزودن به سبد";
  button.setAttribute("aria-label", "افزودن " + card.name + " به سبد");
  if (!card.available) {
    article.classList.add("is-unavailable");
    image.after(createElement("span", "stock-badge", "ناموجود"));
    button.disabled = true;
    button.textContent = "ناموجود";
    button.setAttribute("aria-label", card.name + "؛ ناموجود");
  }
  button.addEventListener("click", () => onAdd(card.item));
  article.appendChild(button);
  return article;
}
