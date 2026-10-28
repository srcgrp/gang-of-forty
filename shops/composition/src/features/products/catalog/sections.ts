import type { ShopData, PageView, SectionView } from "../../../shared/types";
import { offersById, toCards } from "./cards";
export function buildPage(data: ShopData): PageView {
  const offers = offersById(data.offers);
  const sections: SectionView[] = [];
  for (const carousel of data.home.carousels) {
    const products = data.products.filter(product =>
      carousel.source === "offers" ? offers.has(product.id) :
        product.categoryId === carousel.categoryId);
    sections.push({ id: carousel.id, title: carousel.title, carousel: true,
      cards: toCards(products, data.stock, offers) });
  }
  for (const category of data.categories) {
    if (sections.some(section => section.id === category.slug)) continue;
    const products = data.products.filter(product => product.categoryId === category.id);
    sections.push({ id: category.slug, title: category.name,
      carousel: category.slug === "fruits", cards: toCards(products, data.stock, offers) });
  }
  return { sections };
}
