/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { Actions } from '../types';
import { announce } from './announce';
import { cartIsOpen, closeCart, isCartPinned, openCart } from './cart-panel';
import type { ClickRule } from './click-rule';
import { currentBasket } from './basket-view';
import { dom, required } from './dom';
import { renderCart } from './cart-summary';

function onAdd(actions: Actions, button: HTMLElement): void {
  if (button instanceof HTMLButtonElement && !button.disabled) {
    const id = Number(button.dataset.id);
    if (Number.isSafeInteger(id)) actions.change(id, 'add', true);
  }
}
function onStep(actions: Actions, button: HTMLElement): void {
  const id = Number(button.closest<HTMLElement>('.stepper')?.dataset.id);
  if (Number.isSafeInteger(id)) actions.change(id, button.dataset.step === 'inc' ? 'add' : 'remove', false);
}
function onCheckout(): void {
  announce('ثبت سفارش در این مرحله از پروژه فعال نیست.');
  const note = required<HTMLElement>('#mini-note', dom.cartPanel);
  note.classList.remove('is-flash');
  void note.offsetWidth;
  note.classList.add('is-flash');
}
function onCartButton(): void {
  if (!cartIsOpen() || !isCartPinned()) openCart(() => renderCart(currentBasket()), { pin: true });
  else closeCart();
}
export const cartRules = (actions: Actions): ClickRule[] => [
  ['.add', (button) => onAdd(actions, button)],
  ['[data-step]', (button) => onStep(actions, button)],
  ['[data-action="checkout"]', onCheckout],
  ['#cart-btn', onCartButton],
];
