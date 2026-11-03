import type { AppState, Product } from "../../shared/types";
import confetti from "canvas-confetti";
import {
  readConsumedStock,
  writeConsumedStock,
} from "../catalog/stock-storage";
import { writeCartRaw } from "./cart-storage";
import { addProduct, cartCount, decreaseQuantity, removeItem } from "./cart";
import { renderCartModal } from "./cart-view";
import { toast } from "../../shared/ui/toast";
import { closeModal } from "../../shared/ui/modal";

export function createCartController(
  state: AppState,
  renderAppCallback: () => void,
) {
  function updateCartBadge(): void {
    const badge = document.getElementById("cart-count");
    if (!badge) return;
    const count = cartCount(state.cart);
    badge.textContent = count.toLocaleString("fa-IR");
    badge.style.display = count > 0 ? "grid" : "none";
  }

  function renderCartView(): void {
    if (!state.data) return;
    renderCartModal({
      cart: state.cart,
      stock: state.data.stock,
      onIncrease: (id) => {
        const item = state.cart.find((i) => i.id === id);
        if (item) addToCart(item);
      },
      onDecrease: (id) => {
        state.cart = decreaseQuantity(state.cart, id);
        writeCartRaw(state.cart);
        updateCartBadge();
        renderCartView();
      },
      onRemove: (id) => {
        state.cart = removeItem(state.cart, id);
        writeCartRaw(state.cart);
        updateCartBadge();
        renderCartView();
      },
      onCheckout: () => {
        if (!state.data || state.cart.length === 0) return;
        const consumed = readConsumedStock();
        for (const item of state.cart) {
          const current = state.data.stock.items[item.id];
          if (typeof current === "number")
            state.data.stock.items[item.id] = Math.max(
              0,
              current - item.quantity,
            );
          consumed[item.id] = (consumed[item.id] ?? 0) + item.quantity;
        }
        writeConsumedStock(consumed);
        state.cart = [];
        writeCartRaw(state.cart);
        updateCartBadge();
        renderCartView();
        closeModal("cart-modal");
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#d7ff00", "#b8dc00", "#111318", "#4da3ff"],
        });
        renderAppCallback();
        toast.success("سفارش شما با موفقیت ثبت شد! 🎉");
      },
    });
  }

  function addToCart(product: Product): boolean {
    if (!state.data) return false;
    const available =
      state.data.stock.items[product.id] ?? Number.POSITIVE_INFINITY;
    const result = addProduct(state.cart, product, available);
    if (!result.added) {
      toast.error(
        available === 0 ? `${product.name} موجود نیست` : "موجودی کافی نیست",
      );
      return false;
    }
    state.cart = result.cart;
    writeCartRaw(state.cart);
    updateCartBadge();
    renderCartView();
    toast.success(`${product.name} به سبد اضافه شد`);
    return true;
  }

  return { addToCart, renderCartView, updateCartBadge };
}
