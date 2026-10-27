import type { ProductCardView } from "../../types/catalog";

const priceFormatter = new Intl.NumberFormat("fa-IR");

export function createProductPrice(
  card: ProductCardView,
): HTMLDivElement {
  const box = document.createElement("div");
  box.className = "price-box";

  const price = document.createElement("p");
  price.className = "product-price";

  const format = (amount: number) =>
    `${priceFormatter.format(amount)} تومان`;

  if (card.discountedPrice !== undefined) {
    const oldPrice = document.createElement("p");
    oldPrice.className = "old-price";
    oldPrice.textContent = format(card.price);

    price.textContent = format(card.discountedPrice);
    box.append(oldPrice, price);
  } else {
    price.textContent = format(card.price);
    box.append(price);
  }

  return box;
}