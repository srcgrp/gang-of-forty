import type { CardInfo, Product } from '../types';
import { getHtmlElement } from './getHtmlElement';
import { createProductCard } from './productCard';

// Renders product cards inside the carousel with the given id.
// The first and last cards get ids (first-<id>, last-<id>) so the arrows can jump to them.
export function renderProducts(
  queryId: string,
  products: Product[],
  getInfo: (product: Product) => CardInfo,
  onAdd: (product: Product) => void,
): void {
  const productList: HTMLLIElement[] = products.map((product: Product, index: number) => {
    const productCard: HTMLLIElement = createProductCard(product, getInfo(product), onAdd);

    if (index === 0) {
      productCard.id = `first-${queryId}`;
    } else if (index === products.length - 1) {
      productCard.id = `last-${queryId}`;
    }
    return productCard;
  });

  getHtmlElement<HTMLUListElement>(`#${queryId} ul`).append(...productList);
}