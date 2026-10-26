/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import { announce } from './announce';
import { changeQuantity, drawCart } from './app-cart';
import { cartIsOpen, closeCart, isCartPinned, openCart } from './cart-panel';
import type { ClickRule } from './click-rule';
import type { Context } from './context';
import { dom, required } from './dom';

function onAdd(ctx: Context, button: HTMLElement): void {
  if (!(button instanceof HTMLButtonElement) || button.disabled) return;
  const id = Number(button.dataset.id);
  if (!Number.isSafeInteger(id)) return;
  changeQuantity(ctx, id, 'add', 'add-button');
}

function onStep(ctx: Context, button: HTMLElement): void {
  const box = button.closest<HTMLElement>('.stepper');
  if (!box) return;
  const id = Number(box.dataset.id);
  if (!Number.isSafeInteger(id)) return;
  changeQuantity(ctx, id, button.dataset.step === 'inc' ? 'add' : 'remove');
}

function onCheckout(): void {
  announce('ثبت سفارش در این مرحله از پروژه فعال نیست.');
  const note = required<HTMLElement>('#mini-note', dom.cartPanel);
  note.classList.remove('is-flash');
  void note.offsetWidth;
  note.classList.add('is-flash');
}

function onCartButton(ctx: Context): void {
  if (!cartIsOpen() || !isCartPinned()) openCart(() => drawCart(ctx), { pin: true });
  else closeCart();
}

export const cartRules = (ctx: Context): ClickRule[] => [
  ['.add', (button) => onAdd(ctx, button)],
  ['[data-step]', (button) => onStep(ctx, button)],
  ['[data-action="checkout"]', onCheckout],
  ['#cart-btn', () => onCartButton(ctx)],
];