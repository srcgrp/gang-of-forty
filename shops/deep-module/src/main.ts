import type { AppState, Product } from "./types";
import confetti from "canvas-confetti";
import { loadAll } from "./api/load";
import { readCartRaw, writeCartRaw } from "./storage/cart-storage";
import { readConsumedStock, writeConsumedStock } from "./storage/stock-storage";
import { readUrlState, writeUrlState } from "./catalog/url";
import {
  addProduct,
  cartCount,
  decreaseQuantity,
  removeItem,
} from "./cart/cart";
import { parseCart } from "./cart/parse";
import { initSearch, searchProducts } from "./catalog/search";
import { mergeStock } from "./catalog/stock";
import {
  renderSkeletonCategories,
  renderSkeletonProducts,
} from "./ui/skeleton";
import { showOfflineBanner, hideOfflineBanner } from "./ui/banner";
import { toast } from "./ui/toast";
import { closeAllModals, closeModal, openModal } from "./ui/modal";
import { initTheme } from "./ui/theme";
import { setupAutoAnimate } from "./ui/animate";
import { renderError } from "./ui/error-state";
import { renderCartModal } from "./ui/cart-view";
import { initFilterModal } from "./ui/filter-modal";
import { initSearchUI } from "./ui/search-init";
import { renderApp } from "./main-render";

// ===== State =====
const urlState = readUrlState();

const state: AppState = {
  data: null,
  cart: parseCart(readCartRaw()),
  filters: {
    categoryId: urlState.categoryId,
    stock: urlState.stock,
    discount: urlState.discount,
    sort: urlState.sort,
  },
  searchIds: null,
  searchQuery: urlState.query,
};

// ===== Cart =====
export function addToCart(product: Product): boolean {
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

function decCartItem(id: number): void {
  state.cart = decreaseQuantity(state.cart, id);
  writeCartRaw(state.cart);
  updateCartBadge();
  renderCartView();
}

function removeCartItem(id: number): void {
  state.cart = removeItem(state.cart, id);
  writeCartRaw(state.cart);
  updateCartBadge();
  renderCartView();
}

function checkout(): void {
  if (!state.data || state.cart.length === 0) return;
  const consumed = readConsumedStock();
  for (const item of state.cart) {
    const current = state.data.stock.items[item.id];
    if (typeof current === "number") {
      state.data.stock.items[item.id] = Math.max(0, current - item.quantity);
    }
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
  renderApp({ state, onAdd: addToCart });
  toast.success("سفارش شما با موفقیت ثبت شد! 🎉");
}

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
    onDecrease: decCartItem,
    onRemove: removeCartItem,
    onCheckout: checkout,
  });
}

// ===== Boot =====
async function boot(): Promise<void> {
  initTheme();
  setupAutoAnimate();
  renderSkeletonCategories(document.getElementById("categories-grid"), 7);
  renderSkeletonProducts(document.getElementById("special-track"), 4);
  renderSkeletonProducts(document.getElementById("all-track"), 8);

  const result = await loadAll();
  if (result.status !== "success") {
    showLoadError(result.status === "error" ? result.message : "خطای نامشخص");
    return;
  }

  state.data = {
    ...result.data,
    stock: mergeStock(result.data.stock, readConsumedStock()),
  };

  initSearch(state.data.products);
  renderApp({ state, onAdd: addToCart });
  updateCartBadge();
  renderCartView();
  setupFilterAndSearch();
}

function setupFilterAndSearch(): void {
  if (!state.data) return;

  initFilterModal({
    categories: state.data.categories,
    state: state.filters,
    onApply: () => {
      writeUrlState({
        query: state.searchQuery,
        categoryId: state.filters.categoryId,
        stock: state.filters.stock,
        discount: state.filters.discount,
        sort: state.filters.sort,
      });
      renderApp({ state, onAdd: addToCart });
    },
  });

  initSearchUI({
    getProducts: () => state.data!.products,
    getStock: () => state.data!.stock,
    onAdd: addToCart,
    onFilter: (ids, query) => {
      state.searchIds = ids;
      state.searchQuery = query;
      writeUrlState({
        query,
        categoryId: state.filters.categoryId,
        stock: state.filters.stock,
        discount: state.filters.discount,
        sort: state.filters.sort,
      });
      renderApp({ state, onAdd: addToCart });
    },
  });

  // اگه از قبل توی URL چیزی سرچ شده بود، همون اول اعمالش کن
  if (urlState.query) {
    const results = searchProducts(state.data.products, urlState.query);
    state.searchIds = new Set(results.map((p) => p.id));
    renderApp({ state, onAdd: addToCart });

    // همچنین متن داخل input جستجو رو هم پر کن
    const searchInput = document.getElementById(
      "site-search",
    ) as HTMLInputElement;
    if (searchInput) searchInput.value = urlState.query;
  }
}

function showLoadError(message: string): void {
  for (const id of ["categories-grid", "special-track", "all-track"]) {
    renderError(document.getElementById(id), {
      title: "خطا در دریافت اطلاعات",
      text: message,
      onRetry: () => boot(),
    });
  }
}

// ===== Events =====
document.addEventListener("click", (e: MouseEvent) => {
  if (!(e.target instanceof Element)) return;
  if (e.target.closest("#cart-btn")) {
    e.preventDefault();
    openModal("cart-modal");
    renderCartView();
    return;
  }
  const closeEl = e.target.closest<HTMLElement>("[data-close]");
  if (closeEl) {
    e.preventDefault();
    const id = closeEl.dataset.close;
    if (id) closeModal(id);
    return;
  }
  if (e.target.classList.contains("modal__overlay")) {
    const modal = e.target.closest<HTMLElement>(".modal");
    if (modal) closeModal(modal.id);
  }
});

document.addEventListener("keydown", (e: KeyboardEvent) => {
  if (e.key === "Escape") closeAllModals();
});

window.addEventListener("offline", () => showOfflineBanner());
window.addEventListener("online", () => {
  hideOfflineBanner();
  if (!state.data) void boot();
});

if (!navigator.onLine) showOfflineBanner();

void boot();
