/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import { isRecord } from '../api/basic-guards';
import { CATEGORY_PARAM, QUERY_PARAM } from '../types';
import type { Route } from '../types';
const OLD_CATEGORY_PARAM = 'cat';

export function readRoute(): Route {
  const params = new URLSearchParams(location.search);
  const slug = params.get(CATEGORY_PARAM) ?? params.get(OLD_CATEGORY_PARAM);
  const query = (params.get(QUERY_PARAM) ?? '').trim();
  if (slug) return { type: 'catalog', slug, query };
  return query ? { type: 'search', query } : { type: 'home' };
}

export function routeUrl(route: Route): string {
  const parts: string[] = [];
  if (route.type === 'catalog') parts.push(`${CATEGORY_PARAM}=${encodeURIComponent(route.slug)}`);
  if (route.type !== 'home' && route.query) parts.push(`${QUERY_PARAM}=${encodeURIComponent(route.query)}`);
  return parts.length ? `${location.pathname}?${parts.join('&')}` : location.pathname;
}

export const readSearch = (): string => location.search;
export const homePath = (): string => location.pathname;
export const hasHash = (): boolean => location.hash !== '';

export function readHashId(): string {
  try {
    return decodeURIComponent(location.hash.slice(1));
  } catch {
    return '';
  }
}

export const hasAppHistory = (): boolean => isRecord(history.state) && history.state.app === true;

export function savedScroll(state: unknown): number | undefined {
  const saved = isRecord(state) ? state.scrollY : undefined;
  return typeof saved === 'number' ? saved : undefined;
}

function rememberScroll(): void {
  const previous: unknown = history.state;
  const state = isRecord(previous) ? previous : {};
  history.replaceState({ ...state, scrollY: window.scrollY }, '');
}

export function goToUrl(url: string, replace: boolean): void {
  if (replace) {
    history.replaceState({ app: true }, '', url);
    return;
  }
  rememberScroll();
  history.pushState({ app: true }, '', url);
}

export const replaceSearchUrl = (url: string): void => history.replaceState(history.state, '', url);

export function pushHash(href: string): void {
  if (location.hash !== href) history.pushState(null, '', href);
}

export const goBackInHistory = (): void => history.back();