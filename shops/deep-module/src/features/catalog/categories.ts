import type { Category } from "../../shared/types";
import { h } from "../../shared/ui/dom";
import { renderEmpty } from "../../shared/ui/empty-state";

function createArrowSvg(): SVGElement {
  const NS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("width", "14");
  svg.setAttribute("height", "14");
  const path = document.createElementNS(NS, "path");
  path.setAttribute("d", "M5 12h14M13 6l6 6-6 6");
  path.setAttribute("fill", "none");
  path.setAttribute("stroke", "currentColor");
  path.setAttribute("stroke-width", "2.5");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");
  svg.appendChild(path);
  return svg;
}

export function renderCategories(categories: Category[]): void {
  const grid = document.getElementById("categories-grid");
  if (!grid) return;
  if (categories.length === 0) {
    renderEmpty(grid, { icon: "📂", title: "دسته‌بندی‌ای موجود نیست", text: "به‌زودی اضافه می‌شود." });
    return;
  }
  grid.replaceChildren();
  const frag = document.createDocumentFragment();
  categories.forEach((cat, index) => {
    const li = h("li");
    li.style.setProperty("--i", String(index));
    const a = h("a", "category-card");
    a.href = `#cat-${cat.id}`;
    const validColor = /^#[0-9a-fA-F]{3,8}$/.test(cat.color ?? "") ? cat.color! : "#f0f9f1";
    const glow = h("span", "category-card__glow");
    glow.style.setProperty("--c", validColor);
    const icon = h("span", "category-card__icon", cat.emoji ?? "");
    icon.style.background = validColor;
    const arrow = h("span", "category-card__arrow");
    arrow.setAttribute("aria-hidden", "true");
    arrow.appendChild(createArrowSvg());
    a.append(glow, icon, h("span", "category-card__title", cat.name), arrow);
    li.appendChild(a);
    frag.appendChild(li);
  });
  grid.appendChild(frag);
}