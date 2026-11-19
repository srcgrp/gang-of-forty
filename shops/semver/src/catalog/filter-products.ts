import type { Category, ProductLoadState } from "../types";
import { stateForProducts } from "./product-state";

const normalize = (value: string): string =>
  value
    .toLocaleLowerCase("fa-IR")
    .replace(/[يى]/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/[\u064b-\u065f\u0670\u200c]/g, "");

export function filterProductsByQuery(
  state: ProductLoadState,
  query: string,
  categories: Category[],
): ProductLoadState {
  const term = normalize(query.trim());
  if (state.status !== "success" || !term) return state;

  const categoryNames = new Map(categories.map(({ id, name }) => [id, name]));
  const products = state.data.filter(({ product }) => {
    const searchable = [
      product.name,
      product.unit ?? "",
      categoryNames.get(product.categoryId) ?? "",
      ...(product.tags ?? []),
    ];
    return normalize(searchable.join(" ")).includes(term);
  });

  return stateForProducts(state, products);
}
