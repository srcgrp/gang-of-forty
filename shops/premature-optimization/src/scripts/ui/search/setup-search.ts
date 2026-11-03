import type { Product, ProductCardOptions } from "../../types";
import { makeElement } from "../shared/make-element";
import { makeProductCard } from "../catalog/product-card";
type SearchProducts = (query: string) => Product[];
export function setupSearch(
  total: number,
  search: SearchProducts,
  options: (product: Product) => ProductCardOptions,
): void {
  const input = document.querySelector<HTMLInputElement>(".search-entry"),
    results = document.querySelector<HTMLElement>("#search-results");
  if (!input || !results) return;
  input.placeholder = `جستجو در میان ${new Intl.NumberFormat("fa-IR").format(total)} کالا...`;
  const run = () => {
    const query = input.value.trim(),
      searching = query !== "";
    [
      "#home-banners",
      "#categories",
      "#home-carousels",
      "#home-promos",
      "#category-product-sections",
    ].forEach((s) => {
      const el = document.querySelector<HTMLElement>(s);
      if (el) el.hidden = searching;
    });
    results.hidden = !searching;
    const url = new URL(location.href);
    if (searching) url.searchParams.set("q", query);
    else url.searchParams.delete("q");
    history.replaceState(null, "", url);
    if (!searching) {
      results.replaceChildren();
      return;
    }
    const matches = search(query),
      heading = makeElement(
        "h2",
        "recommendation-title",
        `🔍 نتایج جستجو برای «${query}»`,
      );
    const list = makeElement("ul", "products");
    matches.forEach((product) =>
      list.append(makeProductCard(product, options(product))),
    );
    results.replaceChildren(
      heading,
      ...(matches.length
        ? [list]
        : [makeElement("p", "empty-message", "چیزی پیدا نشد.")]),
    );
  };
  input.addEventListener("input", run);
  const initial = new URLSearchParams(location.search).get("q");
  if (initial) {
    input.value = initial;
    run();
  }
}
