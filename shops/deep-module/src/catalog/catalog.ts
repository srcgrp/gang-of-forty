import type { AppData, HomeCarousel, Product } from "../types";

export type PlpSort = "default" | "price";

export interface CarouselMatch {
  carousel: HomeCarousel;
  products: Product[];
}

export function getCarouselProducts(
  data: AppData,
  carouselId: string,
): CarouselMatch | null {
  const carousels = data.home.carousels ?? [];
  const carousel = carousels.find((c) => c.id === carouselId);

  if (carousel) {
    if (carousel.source === "offers") {
      const offerIds = new Set(data.offers.map((o) => o.productId));
      return {
        carousel,
        products: data.products.filter((p) => offerIds.has(p.id)),
      };
    }
    if (typeof carousel.categoryId === "number") {
      return {
        carousel,
        products: data.products.filter(
          (p) => p.categoryId === carousel.categoryId,
        ),
      };
    }
    return { carousel, products: data.products };
  }

  const category = data.categories.find((c) => c.slug === carouselId);
  if (!category) return null;

  return {
    carousel: {
      id: category.slug || String(category.id),
      title: category.name,
      ...(category.emoji ? { emoji: category.emoji } : {}),
      categoryId: category.id,
    },
    products: data.products.filter((p) => p.categoryId === category.id),
  };
}

export function sortProducts(products: Product[], sort: PlpSort): Product[] {
  if (sort === "price") {
    return [...products].sort((a, b) => a.price - b.price);
  }
  return products;
}
