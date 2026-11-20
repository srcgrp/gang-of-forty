import type {
  Product,
  Offer,
  Stock,
  HomeCarousel,
  Category,
} from "../../../shared/types";
import type { CarouselView } from "../../../shared/types/catalog";
import { groupHomeCarousels } from "./carousel-selection";
import { toProductCardView } from "./product-view";

export function prepareHomeCarousels(
  carousels: HomeCarousel[],
  categories: Category[],
  products: Product[],
  offersMap: Map<number, Offer>,
  stock: Stock,
  imagePaths: Partial<Record<number, string>>,
): { featured: CarouselView[]; category: CarouselView[] } {
  const groups = groupHomeCarousels(carousels, categories);

  const toCarouselView = (carousel: HomeCarousel): CarouselView => {
    const selected = products.filter((product) => {
      if (carousel.source === "offers") {
        return offersMap.has(product.id);
      }

      return (
        carousel.categoryId != null &&
        product.categoryId === carousel.categoryId
      );
    });

    return {
      id: carousel.id,
      title: carousel.title,
      cards: selected.map((product) =>
        toProductCardView(
          product,
          offersMap.get(product.id),
          stock.items[product.id] ?? 0,
          imagePaths[product.id],
        ),
      ),
    };
  };

  return {
    featured: groups.featured.map(toCarouselView),
    category: groups.category.map(toCarouselView),
  };
}