import type { ShopData, PageView, SectionView } from "../../../shared/types";
import { offersById, toCards } from "./cards";
import { carouselProducts } from "./carousel-products";
export function buildPage(data: ShopData): PageView {
  const offers = offersById(data.offers);
  const sections: SectionView[] = [];
  for (const carousel of data.home.carousels) {
    const products = carouselProducts(data, carousel.id);
    if (products === null) continue;
    sections.push({ id: carousel.id, title: carousel.title, carousel: true,
      cards: toCards(products, data.stock, offers) });
  }
  for (const category of data.categories) {
    if (sections.some(section => section.id === category.slug)) continue;
    const products = carouselProducts(data, category.slug);
    if (products === null) continue;
    sections.push({ id: category.slug, title: category.name,
      carousel: true, cards: toCards(products, data.stock, offers) });
  }
  return { sections };
}
