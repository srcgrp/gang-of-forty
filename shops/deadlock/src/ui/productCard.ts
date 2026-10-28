import type { ProductCard, Offer } from "../types";
import { calculateDiscountedPrice } from "../catalog/pricing";
export function createProductCard(
  product: ProductCard,
  offer: Offer | undefined,
  stockCount: number,
): HTMLElement {
  const article = document.createElement("article");
  const span = document.createElement("span");
  span.setAttribute("aria-hidden", "true");
  span.classList.add("product-emoji");
  span.textContent = product.emoji;
  const div = document.createElement("div");
  const btn = document.createElement("button");
  btn.textContent = "+";
  btn.classList.add("add-to-cart");
  btn.dataset.title = product.name;

  btn.setAttribute("type", "button");
  btn.setAttribute("aria-label", "افزودن به سبد خرید");
  const p = document.createElement("p");
  p.textContent = product.unit;
  const price = document.createElement("p");

  price.textContent =
    new Intl.NumberFormat("fa-IR").format(product.price) + " تومان";
  article.classList.add("tent-article");
  const h3Item = document.createElement("h3");
  h3Item.textContent = product.name;

  article.append(span);
  article.append(h3Item);
  article.append(p);
  // if product has discount we use this condition
  if (offer) {
    const discountSpan = document.createElement("span");
    discountSpan.classList.add("discount-badge");
    discountSpan.textContent =
      new Intl.NumberFormat("fa-IR").format(offer.percent) + "٪";

    article.append(discountSpan);

    const discountPrice = document.createElement("p");
    discountPrice.classList.add("discount-price");
    discountPrice.textContent =
      new Intl.NumberFormat("fa-IR").format(product.price) + " تومان";
    article.append(discountPrice);

    const newPrice = calculateDiscountedPrice(
    product.price,
    offer.percent,
    );
    price.textContent =
      new Intl.NumberFormat("fa-IR").format(newPrice) + " تومان";
  }
  if (stockCount === 0) {
    article.classList.add("out-of-stock");
    const outOfstock = document.createElement("p");
    outOfstock.classList.add("stock-label");
    outOfstock.textContent = "ناموجود";
    article.append(outOfstock);
    btn.setAttribute("disabled", "true");
    btn.setAttribute("aria-label", "ناموجود");
  }
  article.append(div);
  div.append(price);
  div.append(btn);
  return article;
}