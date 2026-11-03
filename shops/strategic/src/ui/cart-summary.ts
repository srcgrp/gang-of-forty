/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { CartView } from '../types';
import { cartIsOpen } from './cart-panel';
import { $, dom } from './dom';
import { el } from './el';
import { formatNumber } from './format';
import { icon } from './media';
import { miniItem } from './mini-item';
import { discountLine, priceText } from './mini-parts';

export const renderTotal = (total: number, oldTotal: number, discount: number): HTMLElement =>
  el('div', { class: 'mini__total' }, [discountLine(oldTotal, total, discount), priceText(total)]);

export function renderCart({ ready, count, rows, total, oldTotal, discount }: CartView): void {
  const title = el('h2', { class: 'mini__title', text: 'خلاصه سبد خرید شما' });

  if (!ready || count === 0) {
    dom.cartPanel.replaceChildren(el('div', { class: 'mini mini--empty' }, [
      title,
      icon('cart', 'mini__empty-icon'),
      el('p', { text: ready ? 'سبد خرید شما خالی است.' : 'تا بارگذاری محصولات، جزئیات سبد را نمی‌توان نشان داد.' }),
    ]));
    return;
  }

  dom.cartPanel.replaceChildren(el('div', { class: 'mini' }, [
    el('div', { class: 'mini__head' }, [title, el('span', { class: 'mini__count', text: `${formatNumber(count)} کالا` })]),
    el('ul', { class: 'mini__list' }, rows.map((row) => miniItem(row))),
    el('p', { class: 'mini__note', id: 'mini-note', text: 'ثبت سفارش در این مرحله از پروژه فعال نیست.' }),
    el('div', { class: 'mini__foot' }, [
      renderTotal(total, oldTotal, discount),
      el('button', { class: 'checkout', type: 'button', 'data-action': 'checkout', 'aria-disabled': 'true', 'aria-describedby': 'mini-note', text: 'ثبت سفارش' }),
    ]),
  ]));
}

export function refreshCart(draw: () => void): void {
  if (!cartIsOpen()) return;
  const { cartPanel } = dom;
  const active = document.activeElement;
  const inPanel = active instanceof HTMLElement && cartPanel.contains(active);
  const row = inPanel && active instanceof HTMLElement ? active.closest<HTMLElement>('.mini-item') : null;
  const id = row?.dataset.id ?? null;
  const step = inPanel && active instanceof HTMLElement ? active.dataset.step ?? null : null;
  const scrollTop = $<HTMLUListElement>('.mini__list', cartPanel)?.scrollTop ?? 0;

  draw();

  const list = $<HTMLUListElement>('ul.mini__list', cartPanel);
  if (list) list.scrollTop = scrollTop;
  if (!inPanel) return;
  const same = id && $<HTMLElement>(`.mini-item[data-id="${id}"] [data-step="${step}"]`, cartPanel);
  (same || $<HTMLElement>('.mini-item [data-step="dec"]', cartPanel) || cartPanel).focus({ preventScroll: true });
}