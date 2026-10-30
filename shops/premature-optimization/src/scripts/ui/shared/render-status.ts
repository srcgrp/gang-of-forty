import { makeElement } from "./make-element";

const LOADING_TARGETS = [
  "#home-banners",
  "#category-cards",
  "#home-carousels",
  "#home-promos",
];

function clearLoading(): void {
  LOADING_TARGETS.forEach((selector) => {
    document.querySelector<HTMLElement>(selector)?.replaceChildren();
  });

  document.querySelectorAll<HTMLElement>(".skeleton-text").forEach((item) => {
    item.dataset.wasSkeleton = "true";
    item.classList.remove("skeleton-text");
  });
}

export function renderLoading(): void {
  document.querySelectorAll(".api-status").forEach((item) => item.remove());

  document
    .querySelectorAll<HTMLElement>("[data-was-skeleton]")
    .forEach((item) => {
      item.classList.add("skeleton-text");
      delete item.dataset.wasSkeleton;
    });

  LOADING_TARGETS.forEach((selector) => {
    const element = document.querySelector<HTMLElement>(selector);
    if (!element) return;
    const count = selector === "#category-cards" ? 7 : 2;
    element.replaceChildren(
      ...Array.from({ length: count }, () =>
        makeElement(
          "div",
          `skeleton ${selector === "#category-cards" ? "skeleton-category" : "skeleton-banner"}`,
        ),
      ),
    );
  });
}

export function renderStatus(message: string, retry: () => void): void {
  clearLoading();
  document.querySelectorAll(".api-status").forEach((item) => item.remove());

  const main = document.querySelector<HTMLElement>("#main-content");
  if (!main) return;

  const box = makeElement("div", "api-status api-status--error");
  box.setAttribute("role", "alert");
  box.append(makeElement("p", "", message));

  const button = makeElement("button", "api-retry-button", "تلاش دوباره");
  button.type = "button";
  button.addEventListener("click", retry);
  box.append(button);

  main.prepend(box);
}
