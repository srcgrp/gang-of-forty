import type {
  CarouselConfig,
  Category,
  Home,
  HomeBanner,
  HomeCta,
  HomePromo,
  Offer,
  Product,
  Shop,
  ShopHours,
  ShopLink,
  ShopSchedule,
  StockData,
} from '../types';

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

/* ----------------------------- فروشگاه ----------------------------- */

const isShopLink = (x: unknown): x is ShopLink =>
  isObject(x) && typeof x.label === 'string' && typeof x.href === 'string';

const isShopSchedule = (x: unknown): x is ShopSchedule =>
  isObject(x) && typeof x.days === 'string' && typeof x.time === 'string';

const isShopHours = (x: unknown): x is ShopHours =>
  isObject(x) && typeof x.open === 'string' && typeof x.close === 'string';

export const isShop = (x: unknown): x is Shop =>
  isObject(x) &&
  typeof x.name === 'string' &&
  typeof x.slogan === 'string' &&
  typeof x.owner === 'string' &&
  typeof x.city === 'string' &&
  typeof x.phone === 'string' &&
  typeof x.deliveryFee === 'number' &&
  typeof x.freeDeliveryOver === 'number' &&
  typeof x.currency === 'string' &&
  typeof x.notice === 'string' &&
  typeof x.about === 'string' &&
  typeof x.address === 'string' &&
  typeof x.copyright === 'string' &&
  isShopHours(x.hours) &&
  Array.isArray(x.schedule) &&
  x.schedule.every(isShopSchedule) &&
  Array.isArray(x.menu) &&
  x.menu.every(isShopLink) &&
  Array.isArray(x.help) &&
  x.help.every(isShopLink);

/* ------------------------------- خانه ------------------------------- */

export const isHomeCta = (x: unknown): x is HomeCta =>
  isObject(x) && typeof x.label === 'string' && typeof x.href === 'string';

export const isHomeBanner = (x: unknown): x is HomeBanner =>
  isObject(x) &&
  typeof x.title === 'string' &&
  typeof x.text === 'string' &&
  typeof x.emoji === 'string' &&
  isHomeCta(x.cta);

export const isHomePromo = (x: unknown): x is HomePromo =>
  isObject(x) &&
  typeof x.text === 'string' &&
  typeof x.emoji === 'string' &&
  typeof x.color === 'string' &&
  typeof x.href === 'string';

export const isCarouselConfig = (x: unknown): x is CarouselConfig =>
  isObject(x) &&
  typeof x.id === 'string' &&
  typeof x.title === 'string' &&
  typeof x.emoji === 'string' &&
  (x.source === undefined || typeof x.source === 'string') &&
  (x.categoryId === undefined || typeof x.categoryId === 'number');

export const isHome = (x: unknown): x is Home =>
  isObject(x) &&
  isHomeBanner(x.hero) &&
  isHomeBanner(x.side) &&
  Array.isArray(x.promos) &&
  x.promos.every(isHomePromo) &&
  Array.isArray(x.carousels) &&
  x.carousels.every(isCarouselConfig);
