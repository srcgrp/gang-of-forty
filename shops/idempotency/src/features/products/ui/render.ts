import type { ProductCardView } from "../../../shared/types/catalog";
import { createProductCard } from "./card";

export function renderProductCarousel(
  container: HTMLElement,
  cards: ProductCardView[],
): void {
  container.replaceChildren(...cards.map(createProductCard));
  container.setAttribute("aria-busy", "false");
}