import { h } from "./dom";

export function renderSkeletonProducts(
  container: HTMLElement | null,
  count = 4,
): void {
  if (!container) return;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const li = h("li", "skeleton-card");
    li.setAttribute("aria-hidden", "true");
    li.append(
      h("div", "skeleton skeleton-card__media"),
      h("div", "skeleton skeleton-card__title"),
      h("div", "skeleton skeleton-card__meta"),
      h("div", "skeleton skeleton-card__price"),
    );
    frag.appendChild(li);
  }
  container.replaceChildren(frag);
}

export function renderSkeletonCategories(
  container: HTMLElement | null,
  count = 7,
): void {
  if (!container) return;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const li = h("li", "skeleton-category");
    li.setAttribute("aria-hidden", "true");
    li.append(
      h("div", "skeleton skeleton-category__icon"),
      h("div", "skeleton skeleton-category__title"),
    );
    frag.appendChild(li);
  }
  container.replaceChildren(frag);
}