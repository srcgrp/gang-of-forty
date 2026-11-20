/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { Product } from '../types';
import { el } from './el';

export function buyControl(product: Product, soldOut: boolean): HTMLDivElement {
  return el('div', { class: 'buy__control', 'data-id': product.id }, [
    el('button', {
      class: 'add',
      type: 'button',
      'data-id': product.id,
      'aria-label': soldOut ? `${product.name} ناموجود است` : `افزودن ${product.name} به سبد خرید`,
      disabled: soldOut,
      text: '+',
    }),
  ]);
}