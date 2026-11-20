import type { Product, Offer, Card } from '../../../shared/types';
import type { AppState } from '../../../shared/state/app-state';
import { finalPrice, hasDiscount } from '../../../shared/logic/pricing';
import { stockOf } from '../../../shared/logic/stock';
import { PRODUCT_IMAGES } from '../../../shared/content';

export function toCard(product: Product, offer: Offer | undefined, stockQty: number, cartQty: number): Card {
  const discounted = hasDiscount(offer) && stockQty > 0;
  return {
    id: product.id,
    name: product.name,
    ...(product.image === undefined ? {} : { image: product.image }),
    emoji: product.emoji,
    unit: product.unit,
    price: finalPrice(product.price, offer),
    ...(discounted && offer ? { oldPrice: product.price, discountPercent: offer.percent } : {}),
    inStock: stockQty > 0,
    qty: cartQty,
    stockQty,
  };
}

export function cardOf(p: Product, s: AppState): Card {
  const image = PRODUCT_IMAGES[p.id];
  const product = image === undefined ? p : { ...p, image };
  return toCard(product, s.offerMap.get(p.id), stockOf(p.id, s.stock), s.cart[p.id] ?? 0);
}