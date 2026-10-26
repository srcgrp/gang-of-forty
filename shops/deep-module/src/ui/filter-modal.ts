import type { Category, FilterState } from "../types";
import { h } from "./dom";
import { openModal, closeModal } from "./modal";

export interface FilterModalOptions {
  categories: Category[];
  state: FilterState;
  onApply: (state: FilterState) => void;
}

export function initFilterModal(opts: FilterModalOptions): void {
  const box = document.getElementById("filter-categories");
  if (box) renderCategories(box, opts.categories);

  const modal = document.getElementById("filter-modal");
  if (!modal) return;

  modal.addEventListener("click", (e: MouseEvent) => {
    if (!(e.target instanceof Element)) return;
    const chip = e.target.closest<HTMLElement>(".filter-chip");
    if (!chip) return;
    const parent = chip.parentElement;
    if (!parent) return;
    parent.querySelectorAll<HTMLElement>(".filter-chip").forEach((c) => c.classList.remove("filter-chip--active"));
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

function renderCategories(box: HTMLElement, categories: Category[]): void {
  box.replaceChildren();
  const allBtn = h("button", "filter-chip filter-chip--active", "همه");
  allBtn.type = "button";
  allBtn.dataset.category = "all";
  box.appendChild(allBtn);
  for (const cat of categories) {
    const btn = h("button", "filter-chip");
    btn.type = "button";
    btn.dataset.category = String(cat.id);
    btn.append(h("span", "filter-chip__emoji", cat.emoji || ""), " " + cat.name);
    box.appendChild(btn);
  }
}

function applyChipToState(chip: HTMLElement, state: FilterState): void {
  if (chip.dataset.category !== undefined) state.categoryId = chip.dataset.category;
  else if (chip.dataset.stock !== undefined) state.stock = chip.dataset.stock as FilterState["stock"];
  else if (chip.dataset.discount !== undefined) state.discount = chip.dataset.discount as FilterState["discount"];
  else if (chip.dataset.sort !== undefined) state.sort = chip.dataset.sort as FilterState["sort"];
}