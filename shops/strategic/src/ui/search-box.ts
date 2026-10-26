/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { Route } from '../types';
import { coarsePointer, dom } from './dom';

export function syncSearchBox(route: Route, pendingQuery: string): void {
  const query = route.type === 'home' ? '' : route.query;
  const shown = query || (pendingQuery ? dom.search.value.trim() : '');
  if (dom.search.value.trim().replace(/\s+/g, ' ') !== shown) dom.search.value = shown;
}

export type SearchHandlers = { typed: (text: string) => void; submitted: (text: string) => void; cleared: () => void };

export function bindSearchBox({ typed, submitted, cleared }: SearchHandlers): void {
  dom.search.addEventListener('input', () => typed(dom.search.value));
  dom.search.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      submitted(dom.search.value);
      if (coarsePointer.matches) dom.search.blur();
    } else if (event.key === 'Escape' && dom.search.value) {
      event.stopPropagation();
      cleared();
    }
  });
}