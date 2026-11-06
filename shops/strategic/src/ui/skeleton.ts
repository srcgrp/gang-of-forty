/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import { announce } from './announce';
import { $, dom } from './dom';
import { el } from './el';

const skeletonCard = (): HTMLElement =>
  el('li', { class: 'card card--skeleton' }, [
    el('div', { class: 'card__body' }, [
      el('div', { class: 'pic skeleton' }),
      el('span', { class: 'skeleton skeleton--line' }),
      el('span', { class: 'skeleton skeleton--line skeleton--short' }),
    ]),
  ]);

export function renderLoading(): void {
  dom.main.setAttribute('aria-busy', 'true');
  dom.main.replaceChildren(
    el('section', { class: 'hero hero--skeleton', 'aria-hidden': 'true' }, [
      el('div', { class: 'skeleton skeleton--hero' }),
      el('div', { class: 'skeleton skeleton--hero' }),
    ]),
    el('section', { id: 'loading', 'aria-labelledby': 'categories-t' }, [
      el('div', { class: 'sec-head' }, [el('h2', { id: 'categories-t', text: 'دسته‌بندی‌ها' })]),
      el('p', { class: 'state-text', id: 'loading-text', text: 'در حال بارگذاری…' }),
      el('ul', { class: 'cats cats--skeleton', 'aria-hidden': 'true' }, Array.from({ length: 7 }, () => el('li', { class: 'skeleton' }))),
    ]),
    el('section', { 'aria-hidden': 'true' }, [el('ul', { class: 'rail rail--skeleton' }, Array.from({ length: 6 }, skeletonCard))]),
  );
  announce('در حال بارگذاری محصولات…');
}

export function showSlowNotice(): void {
  const text = $<HTMLElement>('#loading-text');
  if (!text) return;
  text.textContent = 'اتصال کند است؛ هنوز در حال دریافت اطلاعات هستیم…';
  text.classList.add('state-text--slow');
  announce('اتصال کند است؛ هنوز در حال دریافت اطلاعات هستیم.');
}