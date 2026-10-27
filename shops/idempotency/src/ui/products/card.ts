import type { ProductCardView } from "../../types/catalog";
import { createProductMedia } from "./media";
import { createProductPrice } from "./price";

const numberFormatter = new Intl.NumberFormat("fa-IR");

export function createProductCard(
  data: ProductCardView,
): HTMLElement {
  const card = document.createElement("article");
  card.className = "product-card";
  card.dataset.apiProduct = String(data.id);

  if (data.offerPercent !== undefined) {
    card.classList.add("product-card-discount");

    const badge = document.createElement("span");
    badge.className = "discount-badge";
    badge.textContent = `${numberFormatter.format(data.offerPercent)}٪`;
    badge.title = data.offerLabel ?? "";

    card.append(badge);
  }

  if (!data.isAvailable) {
    card.classList.add("product-card-unavailable");

    const badge = document.createElement("span");
    badge.className = "unavailable-badge";
    badge.textContent = "ناموجود";

    card.append(badge);
  }

  const name = document.createElement("h3");
  name.textContent = data.name;

  const unit = document.createElement("p");
  unit.className = "product-meta";
  unit.textContent = data.unit;

  const button = document.createElement("button");
  button.type = "button";
  button.textContent = data.isAvailable
    ? "افزودن به سبد"
    : "ناموجود";
  button.disabled = !data.isAvailable;

  card.append(
    createProductMedia(data),
    name,
    unit,
    createProductPrice(data),
    button,
  );

  return card;
}