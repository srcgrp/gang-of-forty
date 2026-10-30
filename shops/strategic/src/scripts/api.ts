/* Amirhossein (Armin) Panahi */
/* Week 3 - Strategic Supermarket - TS & Vite */


import type {
  ApiData,
  CallToAction,
  CarouselDefinition,
  Category,
  HomeData,
  Offer,
  Product,
  Promo,
  ShopData,
  ShopHelpItem,
  ShopMenuItem,
  ShopScheduleRow,
  StockData,
} from './types';

export type ApiErrorKind = 'network' | 'http' | 'parse' | 'timeout' | 'shape';

export class ApiError extends Error {
  readonly kind: ApiErrorKind;
  readonly file: string;
  readonly status?: number;

  constructor(kind: ApiErrorKind, file: string, status?: number) {
    super(`${kind}: ${file}${status === undefined ? '' : ` (${status})`}`);
    this.name = 'ApiError';
    this.kind = kind;
    this.file = file;
    this.status = status;
  }
}

const HARD_TIMEOUT_MS = 30_000;
const API_BASE = '/api/';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isString = (value: unknown): value is string => typeof value === 'string';
const isFiniteNumber = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value);

function isCallToAction(value: unknown): value is CallToAction {
  return isRecord(value) && isString(value.label) && isString(value.href);
}

function isProduct(value: unknown): value is Product {
  if (!isRecord(value)) return false;
  return (
    isFiniteNumber(value.id) &&
    isFiniteNumber(value.categoryId) &&
    isString(value.name) &&
    isString(value.unit) &&
    isFiniteNumber(value.price) &&
    (value.emoji === undefined || isString(value.emoji)) &&
    (value.tags === undefined || (Array.isArray(value.tags) && value.tags.every(isString)))
  );
}

function isCategory(value: unknown): value is Category {
  return (
    isRecord(value) &&
    isFiniteNumber(value.id) &&
    isString(value.slug) &&
    isString(value.name) &&
    (value.color === undefined || isString(value.color))
  );
}

function isOffer(value: unknown): value is Offer {
  return isRecord(value) && isFiniteNumber(value.productId) && isFiniteNumber(value.percent);
}

function isStockData(value: unknown): value is StockData {
  if (!isRecord(value) || !isRecord(value.items)) return false;
  return Object.values(value.items).every((quantity: unknown) =>
    (typeof quantity === 'number' && Number.isFinite(quantity)) ||
    (typeof quantity === 'string' && quantity.trim() !== '' && Number.isFinite(Number(quantity)))
  );
}

function isShopMenuItem(value: unknown): value is ShopMenuItem {
  return isRecord(value) && isString(value.label) && isString(value.href);
}

function isShopHelpItem(value: unknown): value is ShopHelpItem {
  return isRecord(value) && isString(value.label) &&
    (value.href === undefined || isString(value.href));
}

function isShopScheduleRow(value: unknown): value is ShopScheduleRow {
  return isRecord(value) && isString(value.days) && isString(value.time);
}

function isShopData(value: unknown): value is ShopData {
  if (!isRecord(value)) return false;
  return (
    (value.notice === undefined || isString(value.notice)) &&
    (value.about === undefined || isString(value.about)) &&
    (value.menu === undefined || (Array.isArray(value.menu) && value.menu.every(isShopMenuItem))) &&
    (value.help === undefined || (Array.isArray(value.help) && value.help.every(isShopHelpItem))) &&
    (value.schedule === undefined || (Array.isArray(value.schedule) && value.schedule.every(isShopScheduleRow)))
  );
}

function isCarouselDefinition(value: unknown): value is CarouselDefinition {
  return (
    isRecord(value) &&
    isString(value.id) &&
    isString(value.title) &&
    (value.source === undefined || isString(value.source)) &&
    (value.categoryId === undefined || isFiniteNumber(value.categoryId))
  );
}

function isPromo(value: unknown): value is Promo {
  return isRecord(value) && isString(value.text) && isString(value.href);
}

function isHomeData(value: unknown): value is HomeData {
  if (!isRecord(value) || !isRecord(value.hero) || !isRecord(value.side)) return false;
  const isHeroSection = (section: Record<string, unknown>): boolean =>
    isString(section.title) && isString(section.text) &&
    (section.cta === undefined || section.cta === null || isCallToAction(section.cta));

  return (
    isHeroSection(value.hero) &&
    isHeroSection(value.side) &&
    (value.carousels === undefined ||
      (Array.isArray(value.carousels) && value.carousels.every(isCarouselDefinition))) &&
    (value.promos === undefined || (Array.isArray(value.promos) && value.promos.every(isPromo)))
  );
}

function isProductArray(value: unknown): value is Product[] {
  return Array.isArray(value) && value.every(isProduct);
}

function isCategoryArray(value: unknown): value is Category[] {
  return Array.isArray(value) && value.every(isCategory);
}

function isOfferArray(value: unknown): value is Offer[] {
  return Array.isArray(value) && value.every(isOffer);
}

async function fetchJson<T>(
  file: string,
  isExpectedShape: (value: unknown) => value is T,
  signal: AbortSignal,
): Promise<T> {
  const name = `${file}.json`;
  let response: Response;

  try {
    response = await fetch(`${API_BASE}${name}`, { signal });
  } catch {
    throw new ApiError(signal.aborted ? 'timeout' : 'network', name);
  }

  if (!response.ok) throw new ApiError('http', name, response.status);

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    throw new ApiError('parse', name);
  }

  if (!isExpectedShape(payload)) throw new ApiError('shape', name);
  return payload;
}

export async function loadApiData(): Promise<ApiData> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), HARD_TIMEOUT_MS);

  try {
    const [products, categories, stock, offers, shop, home] = await Promise.all([
      fetchJson('products', isProductArray, controller.signal),
      fetchJson('categories', isCategoryArray, controller.signal),
      fetchJson('stock', isStockData, controller.signal),
      fetchJson('offers', isOfferArray, controller.signal),
      fetchJson('shop', isShopData, controller.signal),
      fetchJson('home', isHomeData, controller.signal),
    ]);

    return { products, categories, stock, offers, shop, home };
  } catch (error: unknown) {
    controller.abort();
    throw error;
  } finally {
    window.clearTimeout(timeoutId);
  }
}