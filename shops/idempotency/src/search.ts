
import Fuse from "fuse.js";
import type { Product } from "./types";
type SearchableProduct = Pick<Product, "id" | "name">;

let productSearch: Fuse<SearchableProduct> | null = null;

const priceFormatter = new Intl.NumberFormat("fa-IR");

export function initializeProductSearch(products: SearchableProduct[]) {
  productSearch = new Fuse(products, {
    keys: ["name"],
    threshold: 0.35,
    ignoreLocation: true,
  });

  updateSearchPlaceholder(products.length);
}

function updateSearchPlaceholder(productCount: number) {
  const searchInput =
    document.querySelector<HTMLInputElement>("#site-search");

  if (!searchInput) {
    throw new Error("Search input is missing from the DOM.");
  }

  searchInput.placeholder = `جستجو در میان ${priceFormatter.format(productCount)} کالا...`;
}

export function setupProductsSearch() {
  const searchInput =
    document.querySelector<HTMLInputElement>("#site-search");

  const resultContainer =
    document.querySelector<HTMLDivElement>("#search-result");

 if (!searchInput || !resultContainer) {
  throw new Error("Required search elements are missing from the DOM.");
}

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim();

    if (!query || !productSearch) {
      resultContainer.replaceChildren();
      resultContainer.hidden = true;
      return;
    }

    const matches = productSearch.search(query, {
      limit: 4,
    });

    resultContainer.replaceChildren();

    if (matches.length === 0) {
      const message = document.createElement("p");
      message.textContent = "محصولی پیدا نشد.";
      resultContainer.append(message);
    } else {
      matches.forEach(({ item }) => {
        const result = document.createElement("div");
        result.className = "search-result-item";
        result.textContent = item.name;

        result.addEventListener("click", () => {
          resultContainer.hidden = true;

          const productCard = document.querySelector<HTMLElement>(
            `.product-card[data-api-product="${item.id}"]`
          );

       if (productCard) {
  productCard.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "nearest",
  });

          productCard.classList.add("product-highlight");

        setTimeout(() => {
  productCard.classList.remove("product-highlight");
}, 2500);
}
});

        resultContainer.append(result);
      });
    }

    resultContainer.hidden = false;
  });

  searchInput.addEventListener("click", () => {
    if (searchInput.value.trim() && resultContainer.hasChildNodes()) {
      resultContainer.hidden = false;
    }
  });

  const searchForm = searchInput.closest(".search");

document.addEventListener("click", (event) => {
  const target = event.target;

  if (target instanceof Node && searchForm && !searchForm.contains(target)) {
    resultContainer.hidden = true;
  }
});
}

export function setupSearchForm() {
  document.querySelector(".search")?.addEventListener("submit", (event) => {
    event.preventDefault();
  });
}
