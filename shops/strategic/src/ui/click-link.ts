/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { Actions } from '../types';
import { dom } from './dom';
import { closeCart } from './cart-panel';

export function onLinkClick(actions: Actions, node: HTMLElement, event: MouseEvent): void {
  if (node instanceof HTMLAnchorElement) {
    if (node.closest('.main-nav')) dom.menuToggle.checked = false;
    const plain = event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
    const href = node.getAttribute('href');
    if (plain && node.target !== '_blank' && href) {
      if (node.hasAttribute('data-route')) {
        event.preventDefault();
        actions.navigate(href);
      } else if (href.startsWith('#') && href.length > 1 && !node.classList.contains('skip')) {
        let id = '';
        try { id = decodeURIComponent(href.slice(1)); } catch { /* Ignore a malformed fragment. */ }
        event.preventDefault();
        closeCart();
        if (id) actions.section(href);
      }
    }
  }
}