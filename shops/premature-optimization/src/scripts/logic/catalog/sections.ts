import type { Category, Offer, Product } from "../../types";

export type Section = { category: Category; items: Product[] };

export function specialOffers(products: Product[], offers: Offer[]): Product[] {
  return products.filter((p) =>
    offers.some((o) => o.productId === p.id && o.label === "پیشنهاد ویژه"),
  );
}

export function categorySections(
  products: Product[],
  categories: Category[],
): Section[] {
  return categories
    .map((category) => ({
      category,
      items: products.filter((p) => p.categoryId === category.id),
    }))
    .filter((section) => section.items.length > 0);
}
