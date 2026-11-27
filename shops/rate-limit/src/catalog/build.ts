import type { Catalog, CatalogItem, Category, Offer, Product, Stock } from "../types";
import { sortItems } from "./sort";

const discounted = (price: number, percent: number): number =>
  Math.round((price * (100 - percent)) / 100);

function toItem(p: Product, offer: Offer | undefined, stock: Stock, color?: string): CatalogItem {
  return {
    ...p, 
    price: offer ? discounted(p.price, offer.percent) : p.price,
    oldPrice: offer ? p.price : undefined,
    percent: offer?.percent,
    label: offer?.label,
    stock: stock.items[p.id] ?? 0,
    color,
  };
}

export function buildCatalog(
  products: Product[],
  offers: Offer[],
  stock: Stock,
  categories: Category[]
): Catalog {
  const offerByProduct = new Map(offers.map((o) => [o.productId, o]));
  const colorByCategory = new Map(categories.map((c) => [c.id, c.color]));

  const items = sortItems(
    products.map((p) =>
      toItem(p, offerByProduct.get(p.id), stock, colorByCategory.get(p.categoryId))
    )
  );

  const itemById = new Map(items.map((i) => [i.id, i]));
  const specials = offers
    .map((o) => itemById.get(o.productId))
    .filter((i): i is CatalogItem => i !== undefined);

  return { items, specials: sortItems(specials), categories };
}
