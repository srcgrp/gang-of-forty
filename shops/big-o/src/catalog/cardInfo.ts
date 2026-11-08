import type { CardInfo, Offer, Product, Stock } from '../types';

export function finalPrice(price: number, percent: number): number {
  return Math.round(price - (percent * price) / 100);
}

export function getCardInfo(product: Product, offers: Offer[], stock: Stock): CardInfo {
  const offer = offers.find(offered => offered.productId === product.id);
  const remaining = stock.items[product.id] ?? 0;
  const info: CardInfo = { inStock: remaining > 0 };

  if (offer) {
    info.label = offer.label;
    info.percent = offer.percent;
    info.finalPrice = finalPrice(product.price, offer.percent);
  }

  return info;
}