import type { ProductCardData } from "../types";
export function createProductCard(data: ProductCardData): HTMLElement {
  const { product, price, originalPrice, discountPercent, outOfStock } = data;
  const card = document.createElement("div");
  card.className = "product-card";
  if (outOfStock) card.classList.add("product-card--out-of-stock");
  const badges = document.createElement("div");
  badges.className = "product-badges";
  if (discountPercent !== undefined) {
    const badge = document.createElement("span");
    badge.className = "badge-discount";
    badge.textContent = `${discountPercent.toLocaleString("fa-IR")}٪`;
    badges.append(badge);
  }
  if (product.tags.length) {
    const tags = document.createElement("div");
    tags.className = "product-tags";
    product.tags.forEach((tag) => {
      const badge = document.createElement("span");
      badge.className = "badge-offer-label";
      badge.textContent = tag;
      tags.append(badge);
    });
    badges.append(tags);
  }
  const thumb = document.createElement("div");
  thumb.className = "product-thumb";
  const emoji = document.createElement("span");
  emoji.className = "product-emoji";
  emoji.textContent = product.emoji;
  emoji.setAttribute("role", "img");
  emoji.setAttribute("aria-label", product.name);
  thumb.append(emoji);
  const info = document.createElement("div");
  info.className = "product-info";
  const name = document.createElement("span");
  name.className = "product-name";
  name.textContent = product.name;
  const unit = document.createElement("span");
  unit.className = "product-unit";
  unit.textContent = product.unit;
  info.append(name, unit);
  if (outOfStock) {
    const stock = document.createElement("span");
    stock.className = "stock-message";
    stock.textContent = "ناموجود";
    info.append(stock);
  }
  const footer = document.createElement("div");
  footer.className = "product-footer";
  const pricing = document.createElement("div");
  pricing.className = "product-pricing";
  if (originalPrice !== undefined) {
    const old = document.createElement("span");
    old.className = "old-price";
    old.textContent = `${originalPrice.toLocaleString("fa-IR")} تومان`;
    pricing.append(old);
  }
  const current = document.createElement("span");
  current.className = "current-price";
  current.textContent = `${price.toLocaleString("fa-IR")} تومان`;
  pricing.append(current);
  const button = document.createElement("button");
  button.className = "add-btn";
  button.type = "button";
  button.dataset.productId = String(product.id);
  button.dataset.price = String(price);
  button.setAttribute("aria-label", `افزودن ${product.name} به سبد`);
  button.textContent = "+";
  button.disabled = Boolean(outOfStock);
  footer.append(pricing, button);
  card.append(badges, thumb, info, footer);
  return card;
}
