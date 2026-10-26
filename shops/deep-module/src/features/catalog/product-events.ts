import type { Product } from "../../shared/types";

export function attachProductEvents(
  container: HTMLElement | null,
  products: Product[],
  onAdd: (product: Product) => boolean,
): void {
  if (!container) return;
  container.querySelectorAll<HTMLElement>(".product-card").forEach((card) => {
    const id = Number(card.dataset.id);
    if (!id) return;
    const product = products.find((p) => p.id === id);
    if (!product) return;

    const addBtn = card.querySelector<HTMLButtonElement>(".btn-add");
    if (!addBtn || addBtn.disabled) return;

    addBtn.addEventListener("click", (e: MouseEvent) => {
      e.stopPropagation();
      if (!onAdd(product)) return;
      addBtn.classList.add("btn-add--added");
      addBtn.textContent = "✓";
      setTimeout(() => {
        if (addBtn.isConnected) {
          addBtn.classList.remove("btn-add--added");
          addBtn.textContent = "+";
        }
      }, 800);
    });
  });
}