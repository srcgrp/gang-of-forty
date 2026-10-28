import type { LoadState } from "../types";
import { createProductSkeletons } from "./products/skeleton";
import { updateSearchPlaceholder } from "./search/placeholder";

function showError(selector: string, message: string): void {
  const container = document.querySelector(selector);
  if (!container) return;

  const paragraph = document.createElement("p");
  paragraph.className = "error-message";
  paragraph.setAttribute("role", "alert");
  paragraph.textContent = message;

  container.replaceChildren(paragraph);
  container.setAttribute("aria-busy", "false");
}

export function renderLoadState(state: LoadState): void {
  switch (state.status) {
    case "loading":
      for (const selector of [
        "#home-featured-carousels",
        "#home-category-carousels",
      ]) {
        const container = document.querySelector(selector);
        if (!container) continue;

        container.setAttribute("aria-busy", "true");
        container.replaceChildren(createProductSkeletons(4));
      }
      return;

    case "success":
      updateSearchPlaceholder(state.products.length);
      return;

    case "empty":
      showError("#home-featured-carousels", "محصولی برای نمایش وجود ندارد.");
      showError("#home-category-carousels", "محصولی برای نمایش وجود ندارد.");
      return;

    case "error":
      showError("#category-grid", "دریافت دسته‌بندی‌ها با مشکل مواجه شد.");
      showError("#home-featured-carousels", state.message);
      showError("#home-category-carousels", state.message);
      return;

    default: {
      const exhaustiveCheck: never = state;
      return exhaustiveCheck;
    }
  }
}
export function finishLoading(): void {
  document.querySelectorAll("[aria-busy='true']").forEach((element) => {
    element.setAttribute("aria-busy", "false");
  });
}
