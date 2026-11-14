import type { Product } from "../types.ts";

export function filterByCategory(products: Product[], categoryId: number | null): Product[] {
    return categoryId === null ? products : products.filter((p) => p.categoryId === categoryId);
}