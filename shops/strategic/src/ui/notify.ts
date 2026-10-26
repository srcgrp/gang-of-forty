/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import confetti from 'canvas-confetti';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { announce } from './announce';
import { reducedMotion } from './dom';
import { formatNumber } from './format';

const notyf = new Notyf({ duration: 2200, position: { x: 'left', y: 'bottom' }, dismissible: true, ripple: false });

export function notifyAdded(name: string, withConfetti: boolean): void {
  notyf.success(`${name} به سبد اضافه شد`);
  if (withConfetti && !reducedMotion.matches) {
    confetti({ particleCount: 44, spread: 66, startVelocity: 26, origin: { y: 0.72 }, disableForReducedMotion: true });
  }
}

export const announceLimit = (name: string): void =>
  announce(`موجودی ${name} بیشتر از این نیست؛ همه‌ی موجودی در سبد شما است.`);

export const announceQuantity = (name: string, quantity: number, count: number): void =>
  announce(quantity === 0
    ? `${name} از سبد خرید حذف شد.`
    : `تعداد ${name} در سبد: ${formatNumber(quantity)}. کل کالاهای سبد: ${formatNumber(count)}`);