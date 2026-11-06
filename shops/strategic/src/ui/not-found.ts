/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import { el } from './el';

export const notFound = (home: string): HTMLElement =>
  el('section', { class: 'state', 'aria-labelledby': 'nf-t' }, [
    el('h1', { id: 'nf-t', class: 'state__title', text: 'این دسته را پیدا نکردیم' }),
    el('p', { text: 'آدرسی که باز کردید دسته‌ای با این نام ندارد.' }),
    el('a', { class: 'btn btn--green', href: home, 'data-route': true, text: 'بازگشت به صفحه اصلی' }),
  ]);