
import type {
  CartItem,
  Product,
  Offer,
} from "../../../shared/types/products";
import { canIncreaseCartItem } from "./items";

export type CartRowView = CartItem & {
  name: string;
  unit: string;
  imagePath?: string;
  emoji?: string;
  originalPrice?: number;
  canIncrease:boolean;
};

export function toCartRows(
  cart: CartItem[],
  products: ReadonlyMap<number, Product>,
  offers: ReadonlyMap<number, Offer>,
  images: Partial<Record<number, string>>,
  stockItems: Readonly<Record<number, number>>,
): CartRowView[] {
  return cart.map((item) => {
    const product = products.get(item.id);
    const offer = offers.get(item.id);

    const originalPrice = product?.price ?? item.price;

    const price = offer
      ? Math.round(originalPrice * (1 - offer.percent / 100))
      : originalPrice;

    const imagePath = images[item.id];

    return {
      id: item.id,
      name: product?.name ?? `محصول شماره ${item.id}`,
      unit: product?.unit ?? "",
      quantity: item.quantity,
      price,

      canIncrease: canIncreaseCartItem(
        cart,
        item.id,
        stockItems[item.id] ?? 0,
      ),

      ...(price < originalPrice ? { originalPrice } : {}),

      ...(imagePath !== undefined ? { imagePath } : {}),

      ...(product?.emoji !== undefined
        ? { emoji: product.emoji }
        : {}),
    };
  });
}