import type { Category, LoadState } from "../types";

const normalize = (value: string): string =>
  value
    .toLocaleLowerCase("fa-IR")
    .replace(/[يى]/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/[\u064b-\u065f\u0670\u200c]/g, "");

export function filterProductsByQuery(
  state: LoadState,
  query: string,
  categories: Category[],
): LoadState {
  const term = normalize(query.trim());
  if (state.status !== "success" || !term) return state;

  const categoryNames = new Map(categories.map(({ id, name }) => [id, name]));
  const products = state.products.filter(({ product }) => {
    const searchable = [
      product.name,
      product.unit ?? "",
      categoryNames.get(product.categoryId) ?? "",
      ...(product.tags ?? []),
    ];
    return normalize(searchable.join(" ")).includes(term);
  });

  return products.length ? { status: "success", products } : { status: "empty" };
}
