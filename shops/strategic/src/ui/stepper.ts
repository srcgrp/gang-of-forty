/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { Product, ProductItem } from '../types';
import { required } from './dom';
import { el } from './el';
import { formatNumber } from './format';
import { icon } from './media';

export function stepper(product: Product): HTMLDivElement {
  return el('div', { class: 'stepper', role: 'group', 'aria-label': `تعداد ${product.name} در سبد خرید`, 'data-id': product.id }, [
    el('button', { class: 'stepper__btn', type: 'button', 'data-step': 'inc', 'aria-label': `افزودن یک عدد ${product.name}` }, [icon('plus')]),
    el('span', { class: 'stepper__qty' }),
    el('button', { class: 'stepper__btn', type: 'button', 'data-step': 'dec' }, [icon('minus')]),
  ]);
}

export function updateStepper(box: HTMLElement, item: ProductItem, quantity: number): void {
  const { product } = item;
  const dec = required<HTMLButtonElement>('[data-step="dec"]', box);
  const inc = required<HTMLButtonElement>('[data-step="inc"]', box);
  const quantityLabel = required<HTMLElement>('.stepper__qty', box);
  const trash = quantity === 1;
  quantityLabel.textContent = formatNumber(quantity);
  dec.setAttribute('aria-label', trash ? `حذف ${product.name} از سبد خرید` : `کم کردن یک عدد ${product.name}`);
  dec.classList.toggle('is-trash', trash);
  required<SVGUseElement>('use', dec).setAttribute('href', trash ? '#i-trash' : '#i-minus');
  if (quantity >= item.stock) inc.setAttribute('aria-disabled', 'true');
  else inc.removeAttribute('aria-disabled');
}