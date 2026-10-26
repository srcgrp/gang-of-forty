/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { ProductItem, QtyOf, Route, ShopModel } from '../types';
import { BRAND } from './brand';
import { initCarousel, resetCarousels } from './carousel';
import { dom } from './dom';
import { syncLocation } from './nav-sync';
import { syncSearchBox } from './search-box';
import { syncCartControls } from './sync-controls';
import { renderCatalog } from './view-catalog';
import { renderHome } from './view-home';
import { renderSearch } from './view-search';

export type RouteEnv = {
  model: ShopModel;
  route: Route;
  home: string;
  hashId: string;
  pendingQuery: string;
  matches: readonly ProductItem[];
  cartIds: readonly number[];
  qtyOf: QtyOf;
};

export function drawRoute(env: RouteEnv, { focus = false, smooth = false }: { focus?: boolean; smooth?: boolean } = {}): void {
  const { model, route } = env;
  syncSearchBox(route, env.pendingQuery);

  const view = route.type === 'catalog'
    ? renderCatalog(model, route.slug, env.home, route.query, env.matches)
    : route.type === 'search' ? renderSearch(route.query, env.matches) : renderHome(model);
  document.title = view.title ? `${view.title} | ${BRAND.name}` : BRAND.name;

  resetCarousels();
  dom.main.replaceChildren(...view.nodes);
  dom.main.removeAttribute('aria-busy');
  dom.main.querySelectorAll<HTMLElement>('.shelf').forEach((shelf) => initCarousel(shelf));
  syncCartControls(env.cartIds, model.items, env.qtyOf);
  syncLocation(env.hashId, { scroll: true, smooth });
  if (focus && !env.hashId) dom.main.focus({ preventScroll: true });
}