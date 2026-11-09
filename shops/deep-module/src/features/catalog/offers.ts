import type { Offer, Product, StockData } from "../../shared/types";
import { createProductCard } from "./product-card";
import { attachProductEvents } from "./product-events";
import { renderEmpty } from "../../shared/ui/empty-state";

export function renderSpecialOffers(
  products: Product[],
  offers: Offer[],
  stock: StockData,
  onAdd: (product: Product) => boolean,
): void {
  const track = document.getElementById("special-track");
  if (!track) return;
  if (offers.length === 0) {
    renderEmpty(track, { icon: "🔥", title: "پیشنهاد ویژه‌ای موجود نیست", text: "به‌زودی اضافه می‌شود." });
    return;
  }
  track.replaceChildren();
  const frag = document.createDocumentFragment();
  for (const offer of offers) {
    const product = products.find((p) => p.id === offer.productId);
    if (!product) continue;
    frag.appendChild(createProductCard(product, offer, stock));
  }
  track.appendChild(frag);
  attachProductEvents(track, products, onAdd);
}