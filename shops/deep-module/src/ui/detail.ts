import type { Product, StockData } from "../types";
import { stockLabel } from "../catalog/stock";
import { h } from "./dom";
import { formatPrice } from "./format";
import { openModal } from "./modal";

export interface DetailCallbacks {
  onAdd: (product: Product) => boolean;
  onAfterAdd: (product: Product) => void;
}

export function openProductDetail(
  product: Product,
  stock: StockData,
  cb: DetailCallbacks,
): void {
  const modal = document.getElementById("product-modal");
  if (!modal) return;
  const body = modal.querySelector<HTMLDivElement>(".modal__body");
  if (!body) return;

  const label = stockLabel(stock, product.id);
  const isOut = label.type === "out";

  const container = h("div", "product-detail");
  const media = h("div", "product-detail__media");
  media.appendChild(h("span", "product-detail__emoji", product.emoji || "📦"));

  const info = h("div", "product-detail__info");
  const badge = h(
    "div",
    `product-detail__stock product-detail__stock--${label.type}`,
  );
  const bIcon = h(
    "span",
    "product-detail__stock-icon",
    isOut ? "❌" : label.type === "low" ? "⚠️" : "✓",
  );
  bIcon.setAttribute("aria-hidden", "true");
  badge.append(bIcon, h("span", "product-detail__stock-text", label.text));
  if (label.type === "unknown") badge.hidden = true;

  const priceDiv = h("div", "product-detail__price");
  priceDiv.appendChild(
    h("span", "product-detail__price-value", formatPrice(product.price)),
  );

  const addBtn = h("button", "btn btn--primary product-detail__add");
  addBtn.type = "button";
  addBtn.dataset.id = String(product.id);
  const btnIcon = h("span", undefined, isOut ? "🚫" : "🛒");
  btnIcon.setAttribute("aria-hidden", "true");
  addBtn.append(btnIcon, isOut ? " ناموجود" : " افزودن به سبد خرید");
  if (isOut) addBtn.disabled = true;

  info.append(
    h("h2", "product-detail__title", product.name),
    h("p", "product-detail__unit", product.unit || ""),
    badge,
    h(
      "p",
      "product-detail__desc",
      "محصول تازه و با کیفیت از فروشگاه سبزکاله. ارسال سریع به سراسر شهر.",
    ),
    priceDiv,
    addBtn,
  );

  container.append(media, info);
  body.replaceChildren(container);

  addBtn.addEventListener("click", () => {
    if (!cb.onAdd(product)) return;
    cb.onAfterAdd(product);
    addBtn.textContent = "✓ اضافه شد";
    addBtn.classList.add("btn--success");

    setTimeout(() => {
      if (!addBtn.isConnected) return;
      addBtn.classList.remove("btn--success");
      addBtn.textContent = " افزودن به سبد خرید";
    }, 1500);
  });
  openModal("product-modal");
}
