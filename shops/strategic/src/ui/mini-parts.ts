/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import { el } from './el';
import { formatNumber } from './format';

export const priceText = (value: number): HTMLElement =>
  el('span', { class: 'mini-price' }, [el('strong', { text: formatNumber(value) }), el('small', { text: 'تومان' })]);

export function discountLine(oldValue: number, newValue: number, percent: number): HTMLElement | null {
  if (oldValue <= newValue) return null;
  return el('div', { class: 'mini-old' }, [
    percent > 0 && el('span', { class: 'badge badge--sm' }, [`${formatNumber(percent)}٪`, el('span', { class: 'sr-only', text: ' تخفیف' })]),
    el('del', {}, [el('span', { class: 'sr-only', text: 'قیمت قبلی: ' }), formatNumber(oldValue)]),
  ]);
}