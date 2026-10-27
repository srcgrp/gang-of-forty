import type { SearchableProduct } from "../../types/search";

export function renderSearchResults(
  container: HTMLDivElement,
  matches: SearchableProduct[],
): void {
  container.replaceChildren();

  if (matches.length === 0) {
    const message = document.createElement("p");
    message.textContent = "محصولی پیدا نشد.";
    container.append(message);
    return;
  }

  for (const item of matches) {
    const result = document.createElement("div");
    result.className = "search-result-item";
    result.textContent = item.name;

    result.addEventListener("click", () => {
      container.hidden = true;

      const productCard = document.querySelector<HTMLElement>(
        `.product-card[data-api-product="${item.id}"]`,
      );

      if (!productCard) return;

      productCard.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });

      productCard.classList.add("product-highlight");

      setTimeout(() => {
        productCard.classList.remove("product-highlight");
      }, 2500);
    });

    container.append(result);
  }
}