/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { Actions } from '../types';
import { cartIsOpen, closeCart } from './cart-panel';
import { scrollCarousel } from './carousel';
import { cartRules } from './click-cart';
import { onLinkClick } from './click-link';
import { matchRule } from './click-rule';
import type { ClickRule } from './click-rule';
import { dom } from './dom';
import { clearSearch } from './search-box';

export function bindClicks(actions: Actions): void {
  const forCart = cartRules(actions);
  const forPage: ClickRule[] = [
    ['button[data-dir]', (arrow) => scrollCarousel(arrow.closest<HTMLElement>('.shelf'), Number(arrow.dataset.dir))],
    ['[data-clear-search]', () => { clearSearch(actions); dom.search.focus(); }],
    ['[data-action="retry"]', actions.retry],
    ['a[href]', (link, event) => onLinkClick(actions, link, event)],
  ];
  document.addEventListener('click', (event: MouseEvent) => {
    const { target } = event;
    if (target instanceof Element && !matchRule(forCart, target, event)) {
      if (cartIsOpen() && !target.closest('#cart-wrap')) closeCart();
      matchRule(forPage, target, event);
    }
  });
}