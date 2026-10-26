/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import { announce } from './announce';
import { matchesFor } from './app-matches';
import { navigate, render } from './app-route';
import { closeCart } from './cart-panel';
import type { Context } from './context';
import { dom } from './dom';
import { formatNumber } from './format';
import type { Route } from '../types';
import { bindSearchBox } from './search-box';

const SEARCH_DELAY_MS = 150;
let searchTimer: number | undefined;

export function showSearch(ctx: Context, query: string): void {
  const { state, ports } = ctx;
  if (!state.ready) {
    state.pendingQuery = query;
    return;
  }
  const text = query.trim().replace(/\s+/g, ' ');
  const route = ports.readRoute();
  const searching = route.type !== 'home' && route.query !== '';
  const withoutText: Route = route.type === 'catalog' ? { ...route, query: '' } : { type: 'home' };

  if (!text) {
    if (!searching) return;
    if (ports.hasAppHistory()) ports.goBackInHistory();
    else void navigate(ctx, ports.routeUrl(withoutText), { replace: true, focus: false, animate: false });
    return;
  }

  const next: Route = route.type === 'catalog' ? { ...route, query: text } : { type: 'search', query: text };
  const url = ports.routeUrl(next);
  if (searching) {
    ports.replaceSearchUrl(url);
    render(ctx);
  } else {
    closeCart();
    void navigate(ctx, url, { focus: false, animate: false });
  }
  announce(`${formatNumber(matchesFor(ctx, next).length)} نتیجه برای ${text}`);
}

export function clearSearch(ctx: Context): void {
  dom.search.value = '';
  clearTimeout(searchTimer);
  showSearch(ctx, '');
}

export function bindSearch(ctx: Context): void {
  bindSearchBox({
    typed: (text) => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => showSearch(ctx, text), SEARCH_DELAY_MS);
    },
    submitted: (text) => {
      clearTimeout(searchTimer);
      showSearch(ctx, text);
    },
    cleared: () => clearSearch(ctx),
  });
}