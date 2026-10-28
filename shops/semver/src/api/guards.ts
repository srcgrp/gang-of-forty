import type { Product, Offer, StockData, Category } from '../types';

const isObject = (x: unknown): x is Record<string, unknown> =>
  typeof x === 'object' && x !== null;

export const isProduct = (x: unknown): x is Product =>
  isObject(x) &&
  typeof x.id === 'number' &&
  typeof x.name === 'string' &&
  typeof x.price === 'number' &&
  typeof x.categoryId === 'number' &&
  (x.unit === undefined || typeof x.unit === 'string') &&
  (x.emoji === undefined || typeof x.emoji === 'string') &&
  (x.tags === undefined ||
    (Array.isArray(x.tags) && x.tags.every((t) => typeof t === 'string')));

export const isOffer = (x: unknown): x is Offer =>
  isObject(x) &&
  typeof x.productId === 'number' &&
  typeof x.percent === 'number' &&
  typeof x.label === 'string';

export const isCategory = (x: unknown): x is Category =>
  isObject(x) &&
  typeof x.id === 'number' &&
  typeof x.slug === 'string' &&
  typeof x.name === 'string' &&
  typeof x.emoji === 'string' &&
  typeof x.color === 'string';

export const isStock = (x: unknown): x is StockData =>
  isObject(x) &&
  isObject(x.items) &&
  Object.values(x.items).every((v) => typeof v === 'number');
