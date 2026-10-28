/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { Actions, Route } from '../types';
import { coarsePointer, dom } from './dom';
let searchTimer: ReturnType<typeof setTimeout> | undefined;
export function syncSearchBox(route: Route): void {
  const query = route.type === 'home' ? '' : route.query;
  if (dom.search.value.trim().replace(/\s+/g, ' ') !== query) dom.search.value = query;
}
export function cancelSearch(): void { clearTimeout(searchTimer); }
export function clearSearch(actions: Actions): void {
  cancelSearch();
  dom.search.value = '';
  actions.edit('');
  actions.search('');
}
export function bindSearchBox(actions: Actions): void {
  dom.search.addEventListener('input', () => {
    actions.edit(dom.search.value);
    cancelSearch();
    searchTimer = setTimeout(() => actions.search(dom.search.value), 150);
  });
  dom.search.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      cancelSearch();
      actions.edit(dom.search.value);
      actions.search(dom.search.value);
      if (coarsePointer.matches) dom.search.blur();
    } else if (event.key === 'Escape' && dom.search.value) {
      event.stopPropagation();
      clearSearch(actions);
    }
  });
}