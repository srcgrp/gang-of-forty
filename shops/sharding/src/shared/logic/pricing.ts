import type { Offer } from '../types';

const _priceFmt = new Intl.NumberFormat('fa-IR');

export function hasDiscount(offer: Offer | undefined): offer is Offer {
  return offer != null && offer.percent > 0;
}

export function finalPrice(price: number, offer: Offer | undefined): number {
  return hasDiscount(offer) ? Math.round(price * (1 - offer.percent / 100)) : price;
}

export function formatPrice(n: number): string {
  return _priceFmt.format(n);
}