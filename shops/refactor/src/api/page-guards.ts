import type { Banner, Carousel, Home, Link, Promo, Shop } from '../types';
import { isColor, isSlug } from './guards';
import { isId, isNatural, isRecord, isText } from '../data/validation';

const isLink = (value: unknown): value is Link =>
  isRecord(value) && isText(value.label) && isText(value.href);
const isBanner = (value: unknown): value is Banner =>
  isRecord(value) && isText(value.title) && isText(value.text)
  && isText(value.emoji) && isLink(value.cta);
const isPromo = (value: unknown): value is Promo =>
  isRecord(value) && isText(value.text) && isText(value.emoji)
  && isColor(value.color) && isText(value.href);
const isCarousel = (value: unknown): value is Carousel =>
  isRecord(value) && isSlug(value.id) && isText(value.title) && isText(value.emoji)
  && ((value.source === 'offers' && value.categoryId === undefined)
    || (isId(value.categoryId) && value.source === undefined));

export const isHome = (value: unknown): value is Home =>
  isRecord(value) && isBanner(value.hero) && isBanner(value.side)
  && Array.isArray(value.promos) && value.promos.every(isPromo)
  && Array.isArray(value.carousels) && value.carousels.every(isCarousel)
  && new Set(value.carousels.map((item: Carousel) => item.id)).size === value.carousels.length;

export const isShop = (value: unknown): value is Shop =>
  isRecord(value) && typeof value.owner === 'string' && isText(value.city)
  && isRecord(value.hours) && isText(value.hours.open) && isText(value.hours.close)
  && isText(value.name) && isText(value.slogan) && isText(value.notice)
  && isText(value.about) && isText(value.address) && isText(value.phone)
  && isText(value.currency) && isText(value.copyright)
  && isNatural(value.deliveryFee) && isNatural(value.freeDeliveryOver)
  && Array.isArray(value.menu) && value.menu.every(isLink)
  && Array.isArray(value.help) && value.help.every(isLink)
  && Array.isArray(value.schedule) && value.schedule.every((entry: unknown): boolean =>
    isRecord(entry) && isText(entry.days) && isText(entry.time));
