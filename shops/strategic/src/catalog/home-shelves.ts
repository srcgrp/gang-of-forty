import type { CarouselDefinition, Category, ProductItem, ShopModel } from '../types';
import { carouselProducts } from './carousel-products';

type ShelfContent = { id: string; title: string; items: ProductItem[] };
export type ShelfModel = ShelfContent & (
  | { kind: 'offers' }
  | { kind: 'category'; category: Category | undefined; emoji: string }
);

export function configuredCarousels(catalog: ShopModel): CarouselDefinition[] {
  const ids = new Set<string>();
  return catalog.carousels.filter(({ id }) => {
    if (ids.has(id)) return false;
    ids.add(id);
    return true;
  });
}

export function homeShelves(catalog: ShopModel): ShelfModel[] {
  const shelves: ShelfModel[] = [];
  for (const section of configuredCarousels(catalog)) {
    const items = carouselProducts(catalog, section.id);
    if (items === null) continue;
    const content = { id: section.id, title: section.title, items };
    if (section.source === 'offers') {
      shelves.push({ ...content, kind: 'offers' });
    } else {
      const category = catalog.categoryById.get(section.categoryId);
      shelves.push({ ...content, kind: 'category', category, emoji: section.emoji || category?.emoji || '' });
    }
  }
  return shelves;
}

export function shelfElementId(id: string): string {
  return `carousel:${id}`;
}
