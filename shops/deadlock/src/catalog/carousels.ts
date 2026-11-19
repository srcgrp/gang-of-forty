import type { Catalog, Product } from "../types";

export const CAROUSELS = [
  { id: "all", title: "همه محصولات", emoji: "🛒" },
  { id: "offers", title: "پیشنهاد ویژه", emoji: "🏷️" },
  { id: "produce", title: "میوه و سبزی", emoji: "🍎", categoryId: 1 },
  { id: "dairy", title: "لبنیات", emoji: "🥛", categoryId: 2 },
  { id: "bakery", title: "نان و شیرینی", emoji: "🥖", categoryId: 3 },
  { id: "pantry", title: "خواربار", emoji: "🍚", categoryId: 4 },
  { id: "drinks", title: "نوشیدنی", emoji: "🧃", categoryId: 5 },
  { id: "protein", title: "پروتئین", emoji: "🍗", categoryId: 6 },
  { id: "snacks", title: "تنقلات", emoji: "🍪", categoryId: 7 },
] as const;

export function carouselProducts(catalog: Catalog, carouselId: string): Product[] | null {
  const carousel = CAROUSELS.find((item) => item.id === carouselId);
  if (!carousel) return null;
  if (carousel.id === "all") return catalog.products;
  if (carousel.id === "offers") {
    return catalog.products.filter((product) =>
      catalog.offers.some((offer) => offer.productId === product.id),
    );
  }
  return catalog.products.filter((product) => product.categoryId === carousel.categoryId);
}
