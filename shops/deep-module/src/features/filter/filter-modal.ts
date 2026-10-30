import type { Category, FilterState } from "../../shared/types";
import { openModal, closeModal } from "../../shared/ui/modal";
import { renderFilterCategories, applyChipToState } from "./filter-render";

let filterInitialized = false;

export interface FilterModalOptions {
  categories: Category[];
  state: FilterState;
  onApply: (state: FilterState) => void;
}

export function initFilterModal(opts: FilterModalOptions): void {
  const box = document.getElementById("filter-categories");
  if (box) renderFilterCategories(box, opts.categories);

  if (filterInitialized) return;
  filterInitialized = true;
  const modal = document.getElementById("filter-modal");
  if (!modal) return;

  modal.addEventListener("click", (e: MouseEvent) => {
    if (!(e.target instanceof Element)) return;
    const chip = e.target.closest<HTMLElement>(".filter-chip");
    if (!chip) return;
    const parent = chip.parentElement;
    if (!parent) return;
    parent
      .querySelectorAll<HTMLElement>(".filter-chip")
      .forEach((c) => c.classList.remove("filter-chip--active"));
    chip.classList.add("filter-chip--active");
    applyChipToState(chip, opts.state);
  });

  document.getElementById("filter-apply")?.addEventListener("click", () => {
    opts.onApply({ ...opts.state });
    closeModal("filter-modal");
  });

  document.getElementById("filter-reset")?.addEventListener("click", () => {
    opts.state.categoryId = "all";
    opts.state.stock = "all";
    opts.state.discount = "all";
    opts.state.sort = "default";
    modal.querySelectorAll<HTMLElement>(".filter-chips").forEach((b) => {
      b.querySelectorAll<HTMLElement>(".filter-chip").forEach((c, i) =>
        c.classList.toggle("filter-chip--active", i === 0),
      );
    });
  });

  document.getElementById("filter-btn")?.addEventListener("click", () => {
    openModal("filter-modal");
  });
}
