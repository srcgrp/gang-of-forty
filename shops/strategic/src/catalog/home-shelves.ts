import type { Category, ProductItem, ShopModel } from '../types';
import { carouselProducts, categoryProducts } from './carousel-products';

type ShelfContent = { id: string; title: string; items: ProductItem[] };
export type ShelfModel = ShelfContent & ({ kind: 'offers' } | { kind: 'category'; category: Category });

export function homeShelves(catalog: ShopModel): ShelfModel[] {
  const shelves: ShelfModel[] = [];
  const ids = new Set(['categories', 'contact', 'top', 'main']);
  const covered = new Set<number>();
  for (const section of catalog.carousels) {
    if (ids.has(section.id)) continue;
    const items = carouselProducts(catalog, section.id);
    if (items === null) continue;
    if (section.source === 'offers') {
      shelves.push({ kind: 'offers', id: section.id, title: section.title, items });
    } else {
      const category = catalog.categoryById.get(section.categoryId);
      if (!category) continue;
      shelves.push({ kind: 'category', id: section.id, title: section.title || category.name, category, items });
      covered.add(category.id);
    }
    ids.add(section.id);
  }
  for (const category of [...catalog.categories].sort((a, b) => a.id - b.id)) {
    if (covered.has(category.id) || ids.has(category.slug)) continue;
    shelves.push({ kind: 'category', id: category.slug, title: category.name, category,
      items: categoryProducts(catalog, category.id) });
    ids.add(category.slug);
  }
  return shelves;
}
