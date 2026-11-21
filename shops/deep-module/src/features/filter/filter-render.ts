import type { Category, FilterState } from "../../shared/types";
import { h } from "../../shared/ui/dom";

export function renderFilterCategories(
  box: HTMLElement,
  categories: Category[],
): void {
  box.replaceChildren();
  const allBtn = h("button", "filter-chip filter-chip--active", "همه");
  allBtn.type = "button";
  allBtn.dataset.category = "all";
  box.appendChild(allBtn);
  for (const cat of categories) {
    const btn = h("button", "filter-chip");
    btn.type = "button";
    btn.dataset.category = String(cat.id);
    btn.append(
      h("span", "filter-chip__emoji", cat.emoji || ""),
      " " + cat.name,
    );
    box.appendChild(btn);
  }
}

export function applyChipToState(chip: HTMLElement, state: FilterState): void {
  if (chip.dataset.category !== undefined)
    state.categoryId = chip.dataset.category;
  else if (chip.dataset.stock !== undefined)
    state.stock = chip.dataset.stock as FilterState["stock"];
  else if (chip.dataset.discount !== undefined)
    state.discount = chip.dataset.discount as FilterState["discount"];
  else if (chip.dataset.sort !== undefined)
    state.sort = chip.dataset.sort as FilterState["sort"];
}
