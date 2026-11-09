/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { CartItem } from '../types';
import { el } from './el';
import { IMG, image, placeholderPic } from './media';
import { discountLine, priceText } from './mini-parts';
import { stepper, updateStepper } from './stepper';

export function miniItem(row: CartItem): HTMLLIElement {
  const { product, art } = row;
  const box = stepper(product);
  updateStepper(box, row, row.quantity);

  return el('li', { class: 'mini-item', 'data-id': product.id }, [
    el('div', { class: 'mini-item__pic' }, [art ? image(`${IMG}products/${art}.webp`, { width: 600, height: 600 }) : placeholderPic()]),
    el('div', { class: 'mini-item__body' }, [
      el('h3', { class: 'mini-item__name', text: product.name }),
      el('div', { class: 'mini-item__row' }, [
        box,
        el('div', { class: 'mini-item__price' }, [
          discountLine(row.oldSubtotal, row.subtotal, row.percent),
          priceText(row.subtotal),
        ]),
      ]),
    ]),
  ]);
}