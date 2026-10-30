import type { CartItem, StockData } from "../../shared/types";
import { cartTotal } from "./cart";
import { h } from "../../shared/ui/dom";
import { formatPrice } from "../../shared/ui/format";
import { makeCartItem, type CartItemCallbacks } from "./cart-item";

export interface CartViewOptions extends CartItemCallbacks {
  cart: CartItem[];
  stock: StockData;
  onCheckout: () => void;
}

export function renderCartModal(options: CartViewOptions): void {
  const body = document.getElementById("cart-body");
  const footer = document.getElementById("cart-footer");
  if (!body || !footer) return;

  body.replaceChildren();
  footer.replaceChildren();

  if (options.cart.length === 0) {
    body.appendChild(makeEmptyCart());
    return;
  }

  for (const item of options.cart) {
    body.appendChild(makeCartItem(item, options.stock, options));
  }

  footer.append(makeTotal(options.cart), makeCheckoutButton(options.onCheckout));
}

function makeEmptyCart(): HTMLElement {
  const empty = h("div", "cart-empty");
  const icon = h("span", "cart-empty__icon", "🛒");
  icon.setAttribute("aria-hidden", "true");
  empty.append(
    icon,
    h("p", "cart-empty__text", "سبد خرید شما خالی است"),
    h("p", "cart-empty__hint", "محصولی به سبد اضافه کنید"),
  );
  return empty;
}

function makeTotal(cart: CartItem[]): HTMLElement {
  const box = h("div", "cart-total");
  box.append(
    h("span", "cart-total__label", "جمع کل:"),
    h("span", "cart-total__value", formatPrice(cartTotal(cart))),
  );
  return box;
}

function makeCheckoutButton(onCheckout: () => void): HTMLElement {
  const btn = h("button", "btn btn--primary", "تسویه حساب");
  btn.type = "button";
  btn.addEventListener("click", onCheckout);
  return btn;
}