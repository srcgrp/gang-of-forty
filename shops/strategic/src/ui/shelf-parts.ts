/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import { el } from './el';
import { icon } from './media';
import { catalogUrl } from './links';

export const seeAllCard = (slug: string, title: string): HTMLLIElement =>
  el('li', { class: 'card card--all' }, [
    el('a', { class: 'offer-all', href: catalogUrl(slug), 'data-route': true }, [
      el('span', { class: 'offer-all__circle' }, [icon('arrow-right', 'icon--mirror')]),
      el('span', { class: 'offer-all__text' }, ['مشاهده همه', el('span', { class: 'sr-only', text: ` ${title}` })]),
    ]),
  ]);

export const arrowButton = (direction: number, label: string, extraClass: string): HTMLButtonElement =>
  el('button', {
    class: `${extraClass} ${direction < 0 ? 'arr--start' : 'arr--end'}`,
    type: 'button',
    'data-dir': direction,
    'aria-label': label,
  }, [icon('arrow-right')]);