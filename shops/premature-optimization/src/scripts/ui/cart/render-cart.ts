import type { CartLine } from "../../types";
import { makeElement } from "../shared/make-element";

const format = new Intl.NumberFormat("fa-IR");
export function renderCart(count: number, lines: CartLine[]): void {
  const badge = document.querySelector<HTMLSpanElement>("#cart-count");
  if (badge) badge.textContent = format.format(count);
  const container = document.querySelector<HTMLDivElement>(
    "#cart-dropdown-items",
  );
  if (!container) return;
  container.replaceChildren();
  if (!lines.length) {
    container.append(makeElement("p", "cart-empty", "سبد خرید شما خالی است"));
    return;
  }
  lines.forEach((line) => {
    const row = makeElement("div", "cart-dropdown-item"),
      details = makeElement("div", "cart-dropdown-details");
    details.append(
      makeElement("span", "cart-dropdown-name", line.name),
      makeElement(
        "span",
        "cart-dropdown-quantity",
        `تعداد: ${format.format(line.quantity)}`,
      ),
    );
    const remove = makeElement("button", "cart-remove-button", "❌");
    remove.type = "button";
    remove.dataset.cartRemoveId = String(line.id);
    remove.setAttribute("aria-label", `حذف ${line.name} از سبد خرید`);
    row.append(details, remove);
    container.append(row);
  });
}
