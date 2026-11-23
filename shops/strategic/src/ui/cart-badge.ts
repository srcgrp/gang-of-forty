/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import { dom } from './dom';
import { formatNumber } from './format';

export function renderCartBadge(count: number, bump = false): void {
  dom.cartCount.textContent = formatNumber(count);
  dom.cartButton.setAttribute('aria-label', `سبد خرید، ${formatNumber(count)} کالا`);
  if (bump) {
    dom.cartCount.classList.remove('is-bump');
    void dom.cartCount.offsetWidth;
    dom.cartCount.classList.add('is-bump');
  }
}