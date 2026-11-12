import type { AppState, Product, Offer, Card } from '../../../shared/types';
import { finalPrice, hasDiscount } from '../../../shared/logic/pricing';
import { stockOf } from '../../../shared/logic/stock';
import { PRODUCT_IMAGES } from '../../../shared/content';

export function toCard(product: Product, offer: Offer | undefined, stockQty: number, cartQty: number, stockKnown = true): Card {
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
    stockKnown,
    qty: cartQty,
    stockQty,
  };
}

export function cardOf(product: Product, state: AppState): Card {
  const image = PRODUCT_IMAGES[product.id];
  const productWithImage = image === undefined ? product : { ...product, image };
  return toCard(
    productWithImage,
    state.offerMap.get(product.id),
    stockOf(product.id, state.stock),
    state.cart[product.id] ?? 0,
    state.stock !== null,
  );
}
