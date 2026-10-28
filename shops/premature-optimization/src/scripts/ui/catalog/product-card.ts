import type { Product, ProductCardOptions } from "../../types";
import { makeElement } from "../shared/make-element";
const format = new Intl.NumberFormat("fa-IR");
export function makeProductCard(
  product: Product,
  options: ProductCardOptions,
): HTMLLIElement {
  const { offer, stock, categoryName, finalPrice } = options;
  const card = makeElement("li", "product-item"),
    image = makeElement("div", "product-icon product-emoji"),
    img = makeElement("img");
  img.src = product.image;
  img.alt = product.name;
  image.append(img);
  const tag = makeElement("p", "item-tag", categoryName || "محصول"),
    quantity = stock.items[String(product.id)] ?? 0;
  const discount = makeElement("span", "product-discount"),
    title = makeElement("h3", "item-title", product.name),
    description = makeElement("p", "item-description", product.unit),
    oldPrice = makeElement("p", "item-old-price"),
    row = makeElement("div", "item-buy"),
    price = makeElement("span", "item-price");
  price.textContent = `${format.format(finalPrice)} تومان`;
  if (offer) {
    discount.textContent = `${format.format(offer.percent)}٪`;
    oldPrice.textContent = `${format.format(product.price)} تومان`;
  } else {
    discount.hidden = true;
    oldPrice.hidden = true;
  }
  const button = makeElement("button", "buy-button", "+");
  button.type = "button";
  button.dataset.productId = String(product.id);
  button.disabled = quantity <= 0;
  button.title =
    quantity <= 0
      ? "موجودی این محصول تمام شده است"
      : `افزودن ${product.name} به سبد خرید`;
  if (quantity <= 0) card.classList.add("product-item--unavailable");
  row.append(price, button);
  card.append(image, tag, discount, title, description, oldPrice, row);
  return card;
}
