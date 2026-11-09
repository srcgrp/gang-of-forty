import type { Product } from "./products";

export type SearchableProduct = Pick<Product, "id" | "name">;

export type SearchHandler = (
  query: string,
) => SearchableProduct[] | null;