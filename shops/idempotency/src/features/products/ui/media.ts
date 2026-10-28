import type { ProductCardView } from "../../../shared/types/catalog";

export function createProductMedia(
  card: ProductCardView,
): HTMLElement {
  if (card.imagePath) {
    const image = document.createElement("img");
    image.src = card.imagePath;
    image.alt = card.name;
    image.classList.add("product-image");
    image.loading = "lazy";
    return image;
  }

  const emoji = document.createElement("div");
  emoji.classList.add("product-emoji");
  emoji.textContent = card.emoji ?? "";
  emoji.setAttribute("aria-hidden", "true");

  return emoji;
}