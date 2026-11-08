/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import { isRecord } from '../api/basic-guards';
import { CATEGORY_PARAM, QUERY_PARAM } from '../types';
import type { Route } from '../types';

export function readRoute(): Route {
  const params = new URLSearchParams(location.search);
  const slug = params.get(CATEGORY_PARAM) ?? params.get('cat');
  const query = (params.get(QUERY_PARAM) ?? '').trim().replace(/\s+/g, ' ');
  return slug ? { type: 'catalog', slug, query } : query ? { type: 'search', query } : { type: 'home' };
}
export function routeUrl(route: Route): string {
  const params = new URLSearchParams();
  if (route.type === 'catalog') params.set(CATEGORY_PARAM, route.slug);
  if (route.type !== 'home' && route.query) params.set(QUERY_PARAM, route.query);
  return params.size ? `${location.pathname}?${params}` : location.pathname;
}
export const homePath = (): string => location.pathname;
export function readHashId(): string {
  try { return decodeURIComponent(location.hash.slice(1)); } catch { return ''; }
}
export function catalogUrl(slug: string): string {
  const route = readRoute();
  return routeUrl({ type: 'catalog', slug, query: route.type === 'home' ? '' : route.query });
}
export function goToUrl(url: string, replace = false): void {
  const target = new URL(url, location.href);
  if (target.origin === location.origin && target.pathname === location.pathname) {
    if (replace) history.replaceState(history.state, '', target.href);
    else {
      history.replaceState({ ...(isRecord(history.state) ? history.state : {}), scrollY: window.scrollY }, '');
      history.pushState({ app: true }, '', target.href);
    }
  }
}
export function writeQuery(text: string): void {
  const query = text.trim().replace(/\s+/g, ' ');
  const route = readRoute();
  const next: Route = route.type === 'catalog' ? { ...route, query } : query ? { type: 'search', query } : { type: 'home' };
  const alreadySearching = route.type !== 'home' && route.query !== '';
  const url = routeUrl(next);
  if (url !== location.pathname + location.search + location.hash) goToUrl(url, alreadySearching);
}
export const pushHash = (href: string): void => {
  if (href.startsWith('#') && location.hash !== href) history.pushState(history.state, '', href);
};
export const savedScroll = (state: unknown): number | undefined =>
  isRecord(state) && typeof state.scrollY === 'number' && Number.isFinite(state.scrollY) ? state.scrollY : undefined;