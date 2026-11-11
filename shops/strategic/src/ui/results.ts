/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { ProductItem } from '../types';
import { el } from './el';
import { formatNumber } from './format';
import { icon } from './media';

export const backBar = (home: string): HTMLElement =>
  el('div', { class: 'back-bar' }, [
    el('a', { class: 'back-btn', href: home, 'data-route': true }, [icon('arrow-right'), 'بازگشت به صفحه اصلی']),
  ]);

export const emptySearch = (text: string): HTMLElement =>
  el('div', { class: 'state state--empty', role: 'status' }, [
    el('p', { class: 'state__text', text }),
    el('button', { class: 'btn btn--outline', type: 'button', 'data-clear-search': true, text: 'پاک کردن جستجو' }),
  ]);

export const resultsSection = (title: HTMLElement, items: readonly ProductItem[], content: HTMLElement[]): HTMLElement =>
  el('section', { class: 'catalog', 'aria-labelledby': 'catalog-t' }, [
    el('div', { class: 'sec-head' }, [title, el('p', { class: 'catalog__count', text: `${formatNumber(items.length)} کالا` })]),
    ...content,
  ]);