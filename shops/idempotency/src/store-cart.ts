import type {
  CartItem,
  Offer,
  Product,
  Stock,
} from "./shared/types/products";
import { productImages } from "./features/products/data";
import { getCartCount, getCartSubtotal } from "./features/cart/logic/items";
import { toCartRows } from "./features/cart/logic/view";

export function getStoreCartSummary(
  cart: CartItem[],
  products: Product[],
  offers: Offer[],
  stock: Stock,
) {
  const productsById = new Map(products.map((p) => [p.id, p]));
  const offersById = new Map(offers.map((o) => [o.productId, o]));

  const rows = toCartRows(
    cart,
    productsById,
    offersById,
    productImages,
    stock.items,
  );

  return {
    rows,
    count: getCartCount(cart),
    total: getCartSubtotal(rows),
  };
}
