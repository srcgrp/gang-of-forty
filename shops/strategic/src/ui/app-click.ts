/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import { start } from './app-start';
import { clearSearch } from './app-search';
import { cartIsOpen, closeCart } from './cart-panel';
import { scrollCarousel } from './carousel';
import { cartRules } from './click-cart';
import { onLinkClick } from './click-link';
import { matchRule } from './click-rule';
import type { ClickRule } from './click-rule';
import type { Context } from './context';
import { dom } from './dom';

const pageRules = (ctx: Context): ClickRule[] => [
  ['button[data-dir]', (arrow) => scrollCarousel(arrow.closest<HTMLElement>('.shelf'), Number(arrow.dataset.dir))],
  ['[data-clear-search]', () => { clearSearch(ctx); dom.search.focus(); }],
  ['[data-action="retry"]', () => { void start(ctx); }],
  ['a[href]', (link, event) => onLinkClick(ctx, link, event)],
];

export function bindClicks(ctx: Context): void {
  const forCart = cartRules(ctx);
  const forPage = pageRules(ctx);
  document.addEventListener('click', (event: MouseEvent) => {
    const { target } = event;
    if (!(target instanceof Element) || matchRule(forCart, target, event)) return;
    if (cartIsOpen() && !target.closest('#cart-wrap')) closeCart();
    matchRule(forPage, target, event);
  });
}