import flatbreadIcon from "../../../../icons/flatbread.svg";
import beansIcon from "../../../../icons/beans.svg";
import { createElement } from "../../../shared/ui/elements";
export function createProductImage(emoji: string): HTMLElement {
  const image = createElement("div", "product-image product-emoji", "");
  if (emoji === "🫓" || emoji === "🫘") {
    const icon = document.createElement("img");
    icon.src = emoji === "🫓" ? flatbreadIcon : beansIcon;
    icon.alt = "";
    image.appendChild(icon);
  } else { image.textContent = emoji; }
  image.setAttribute("aria-hidden", "true");
  return image;
}
