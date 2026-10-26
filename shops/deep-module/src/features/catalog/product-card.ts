import type { Offer, Product, StockData } from "../../shared/types";
import { stockLabel } from "./stock";
import { h } from "../../shared/ui/dom";
import { formatPrice } from "../../shared/ui/format";

export function createProductCard(
  product: Product,
  offer: Offer | null,
  stock: StockData,
): HTMLLIElement {
  const label = stockLabel(stock, product.id);
  const isOut = label.type === "out";
  const li = h("li", "product-card" + (isOut ? " product-card--unavailable" : ""));
  li.dataset.id = String(product.id);

  if (isOut) {
    li.appendChild(h("span", "badge badge--danger", "ناموجود"));
  } else if (offer && Number.isFinite(offer.percent)) {
    const pct = Math.min(Math.max(offer.percent, 0), 99);
    li.appendChild(h("span", "badge", `${pct}٪`));
  }

  const media = h("div", "product-card__media");
  const emoji = h("span", "product-card__emoji", product.emoji || "📦");
  emoji.setAttribute("aria-hidden", "true");
  media.appendChild(emoji);

  const footer = h("div", "product-card__footer");
  const priceDiv = h("div", "product-card__price");
  if (offer && !isOut && Number.isFinite(offer.percent)) {
    const pct = Math.min(Math.max(offer.percent, 0), 99);
    const finalPrice = Math.round(product.price * (1 - pct / 100));
    priceDiv.append(
      h("del", undefined, formatPrice(product.price)),
      h("ins", undefined, formatPrice(finalPrice)),
    );
  } else {
    priceDiv.appendChild(h("ins", undefined, formatPrice(product.price)));
  }

  const addBtn = h("button", "btn-add", "+");
  addBtn.type = "button";
  addBtn.dataset.id = String(product.id);
  addBtn.setAttribute("aria-label", isOut ? "ناموجود" : `افزودن ${product.name} به سبد`);
  addBtn.disabled = isOut;
  footer.append(priceDiv, addBtn);

  const stockEl = h("p", `product-card__stock product-card__stock--${label.type}`, label.text);
  if (label.type === "unknown") stockEl.hidden = true;

  li.append(
    media,
    h("h3", "product-card__title", product.name),
    h("p", "product-card__meta", product.unit || ""),
    stockEl,
    footer,
  );
  return li;
}