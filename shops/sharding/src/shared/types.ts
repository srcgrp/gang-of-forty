export type { Cart, CartChange, CartLine, CartRow } from './types/cart';
export type { Card, Category, Offer, Product, Shelf, ShelfView, Stock } from './types/catalog';
export type { AppState, Home, Link, LoadState, Shop } from './types/shop';

export const THEMES = ['auto', 'light', 'dark'] as const;
export type Theme = (typeof THEMES)[number];

export function isTheme(v: unknown): v is Theme {
  return THEMES.some((t) => t === v);
}

export const FILTER_FIELDS = ['category', 'query'] as const;
export type UrlFilters = Record<(typeof FILTER_FIELDS)[number], string>;
