
import type { Product, Offer } from "../types";
import type { ProductCardView } from "../types/catalog";

export function toProductCardView(
  product: Product,
  offer: Offer | undefined,
  quantity: number,
  imagePath?: string,
): ProductCardView {
  return {
    id: product.id,
    name: product.name,
    unit: product.unit,
    price: product.price,
    isAvailable: quantity > 0,
    ...(product.emoji !== undefined ? { emoji: product.emoji } : {}),
    ...(imagePath !== undefined ? { imagePath } : {}),
    ...(offer ? {
      discountedPrice: Math.round(product.price * (1 - offer.percent / 100)),
      offerPercent: offer.percent,
      offerLabel: offer.label,
    } : {}),
  };
}
