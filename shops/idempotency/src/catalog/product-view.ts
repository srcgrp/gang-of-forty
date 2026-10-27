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
    emoji: product.emoji,
    imagePath,
    price: product.price,
    discountedPrice: offer
      ? Math.round(product.price * (1 - offer.percent / 100))
      : undefined,
    offerPercent: offer?.percent,
    offerLabel: offer?.label,
    isAvailable: quantity > 0,
  };
}