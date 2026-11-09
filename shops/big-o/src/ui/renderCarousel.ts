import type { CardInfo, Product } from '../types';
import { renderProducts } from './renderProducts';
import { renderStatus } from './status';

// Shows the "empty" message or the product cards of one carousel.
export function renderCarousel(
  id: string,
  products: Product[],
  getInfo: (product: Product) => CardInfo,
  onAdd: (product: Product) => void,
): void {
  const selector = `#${id}`;
  if (products.length === 0) {
    renderStatus({ status: 'empty' }, selector);
    return;
  }
  renderStatus({ status: 'success', products }, selector);
  renderProducts(id, products, getInfo, onAdd);
}