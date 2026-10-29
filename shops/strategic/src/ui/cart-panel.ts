/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import { dom } from './dom';

let pinned = false;
let closeTimer: number | undefined;

export const cartIsOpen = (): boolean => dom.cartWrap.classList.contains('is-open');
export const isCartPinned = (): boolean => pinned;

export function openCart(draw: () => void, { pin = false }: { pin?: boolean } = {}): void {
  clearTimeout(closeTimer);
  if (pin) pinned = true;
  if (cartIsOpen()) return;
  draw();
  dom.cartWrap.style.setProperty('--cart-top', `${Math.round(dom.cartButton.getBoundingClientRect().bottom + 8)}px`);
  dom.cartWrap.classList.add('is-open');
  dom.cartButton.setAttribute('aria-expanded', 'true');
}

export function closeCart({ returnFocus = false }: { returnFocus?: boolean } = {}): void {
  clearTimeout(closeTimer);
  pinned = false;
  if (!cartIsOpen()) return;
  dom.cartWrap.classList.remove('is-open');
  dom.cartButton.setAttribute('aria-expanded', 'false');
  if (returnFocus) dom.cartButton.focus();
}

export const closeCartSoon = (): void => {
  closeTimer = setTimeout(() => closeCart(), 220);
};