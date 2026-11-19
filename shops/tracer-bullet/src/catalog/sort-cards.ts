import type { CardProduct, PlpSort } from "../types";

export function sortCards(cards: CardProduct[], sort: PlpSort): CardProduct[] {
  if (sort === "default") {
    return cards;
  }

  return [...cards].sort(
    (a, b) => (a.newPrice ?? a.price) - (b.newPrice ?? b.price),
  );
}