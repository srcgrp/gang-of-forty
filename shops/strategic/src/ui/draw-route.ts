/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { DrawOptions, PageView } from '../types';
import { BRAND } from './brand';
import { initCarousel, resetCarousels } from './carousel';
import { dom } from './dom';
import { syncLocation } from './nav-sync';
import { syncSearchBox } from './search-box';
import { syncCartControls } from './sync-controls';
import { renderCatalog } from './view-catalog';
import { renderHome } from './view-home';
import { renderSearch } from './view-search';

export function drawRoute(env: PageView, { focus = false, smooth = false, top }: DrawOptions = {}): void {
  const { model, products: { route, catalog, matches, tag } } = env;
  syncSearchBox(route);
  const view = route.type === 'catalog' ? renderCatalog(model, catalog, env.home)
    : route.type === 'search' ? renderSearch(route.query, matches) : renderHome(model, env.linkOf, tag);
  document.title = view.title ? `${view.title} | ${BRAND.name}` : BRAND.name;
  resetCarousels();
  dom.main.replaceChildren(...view.nodes);
  dom.main.removeAttribute('aria-busy');
  dom.main.querySelectorAll<HTMLElement>('.shelf').forEach((shelf) => initCarousel(shelf));
  syncCartControls(env.cartIds, model.items, env.qtyOf);
  syncLocation(env.hashId, { scroll: true, smooth });
  if (top !== undefined && !env.hashId) window.scrollTo({ top, behavior: 'instant' });
  if (focus && !env.hashId) dom.main.focus({ preventScroll: true });
}