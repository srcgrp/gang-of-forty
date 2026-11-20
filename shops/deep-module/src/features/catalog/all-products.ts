import type { AppState, Offer, Product, StockData } from "../../shared/types";
import { filterProducts } from "./filter";
import { createProductCard } from "./product-card";
import { attachProductEvents } from "./product-events";
import { h } from "../../shared/ui/dom";

export function renderAllProducts(
  state: AppState,
  products: Product[],
  offers: Offer[],
  stock: StockData,
  onAdd: (product: Product) => boolean,
): void {
  const track = document.getElementById("all-track");
  const countEl = document.getElementById("all-count");
  if (!track) return;

  const filtered = filterProducts(products, state.filters, stock, offers, state.searchIds);
  track.replaceChildren();

  if (filtered.length === 0) {
    const empty = h("li", "products-empty");
    empty.append(
      h("span", "products-empty__icon", "🔍"),
      h("p", "products-empty__text", state.searchIds ? "نتیجه‌ای پیدا نشد" : "محصولی پیدا نشد"),
      h("p", "products-empty__hint", state.searchIds ? "عبارت دیگری امتحان کنید" : "فیلترها را تغییر دهید"),
    );
    track.appendChild(empty);
  } else {
    for (const p of filtered) {
      const offer = offers.find((o) => o.productId === p.id) ?? null;
      track.appendChild(createProductCard(p, offer, stock));
    }
    attachProductEvents(track, products, onAdd);
  }

  if (countEl) countEl.textContent = `${filtered.length.toLocaleString("fa-IR")} کالا`;

  const activeCount = [
    state.filters.categoryId !== "all",
    state.filters.stock !== "all",
    state.filters.discount !== "all",
    state.filters.sort !== "default",
  ].filter(Boolean).length;
  
  const badge = document.getElementById("filter-badge");
  if (badge) {
    badge.hidden = activeCount === 0;
    if (activeCount > 0) badge.textContent = activeCount.toLocaleString("fa-IR");
  }
}