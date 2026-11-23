import type { CartItem, StockData } from "../../shared/types";
import { availableStock, stockLabel } from "../catalog/stock";
import { h } from "../../shared/ui/dom";
import { formatPrice, faNum } from "../../shared/ui/format";

export interface CartItemCallbacks {
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
}

export function makeCartItem(
  item: CartItem,
  stock: StockData,
  cb: CartItemCallbacks,
): HTMLElement {
  const el = h("div", "cart-item");
  el.dataset.id = String(item.id);

  const media = h("div", "cart-item__media", item.emoji ?? "");
  const info = h("div", "cart-item__info");
  info.append(
    h("h4", "cart-item__name", item.name),
    h("p", "cart-item__unit", item.unit ?? ""),
  );

  const label = stockLabel(stock, item.id);
  if (label.type !== "unknown") {
    info.appendChild(h("p", `cart-item__stock cart-item__stock--${label.type}`, label.text));
  }

  const controls = h("div", "cart-item__controls");
  const minus = h("button", "cart-item__btn", "−");
  minus.type = "button";
  minus.setAttribute("aria-label", "کم کردن");
  minus.addEventListener("click", () => cb.onDecrease(item.id));

  const qty = h("span", "cart-item__qty", faNum(item.quantity));

  const plus = h("button", "cart-item__btn", "+");
  plus.type = "button";
  plus.setAttribute("aria-label", "زیاد کردن");
  plus.addEventListener("click", () => cb.onIncrease(item.id));

  const max = availableStock(stock, item.id);
  if (max !== Number.POSITIVE_INFINITY && item.quantity >= max) {
    plus.disabled = true;
    plus.title = `فقط ${faNum(max)} عدد در انبار`;
  }
  controls.append(minus, qty, plus);

  const price = h("div", "cart-item__price", formatPrice(item.price * item.quantity));
  const removeBtn = h("button", "cart-item__remove", "✕");
  removeBtn.type = "button";
  removeBtn.setAttribute("aria-label", "حذف");
  removeBtn.addEventListener("click", () => cb.onRemove(item.id));

  el.append(media, info, controls, price, removeBtn);
  return el;
}