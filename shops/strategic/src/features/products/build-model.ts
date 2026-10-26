/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { ApiData, Category, Offer, ProductItem, SearchIndexEntry, ShopModel } from '../../types';
import { findCategoryArt } from './art-category';
import { searchKey } from './search-key';
import { toCard } from './to-card';

const pairs = <K, V>(list: readonly V[], key: (value: V) => K): Map<K, V> =>
  new Map(list.map((value): [K, V] => [key(value), value]));

export function buildModel(raw: ApiData): ShopModel {
  const { products, categories, offers, shop, home } = raw;
  const offerByProductId = pairs<number, Offer>(offers, (offer) => offer.productId);
  const categoryById = pairs<number, Category>(categories, (category) => category.id);
  const stockOf = (id: number): number => {
    const value = Number(raw.stock.items[id]);
    return Number.isFinite(value) && value > 0 ? value : 0;
  };

  const items = new Map<number, ProductItem>();
  const itemsByCategory = new Map<number, ProductItem[]>(categories.map((category): [number, ProductItem[]] => [category.id, []]));
  const searchIndex: SearchIndexEntry[] = [];

  for (const product of products) {
    const item = toCard(product, offerByProductId.get(product.id), stockOf(product.id));
    items.set(product.id, item);
    itemsByCategory.get(product.categoryId)?.push(item);
    searchIndex.push({
      item,
      name: searchKey(product.name),
      text: searchKey([product.name, product.unit, ...(product.tags ?? [])].join(' ')),
      categoryWords: searchKey(categoryById.get(product.categoryId)?.name).split(' '),
    });
  }

  return {
    products, categories, offers, shop, home, stockOf, items, itemsByCategory, searchIndex, categoryById,
    categoryBySlug: pairs<string, Category>(categories, (category) => category.slug),
    categoryArt: new Map(categories.map((category): [number, string | null] => [category.id, findCategoryArt(category)])),
    offerItems: offers.map((offer) => items.get(offer.productId)).filter((item): item is ProductItem => item !== undefined),
    carousels: Array.isArray(home.carousels) ? home.carousels : [],
  };
}