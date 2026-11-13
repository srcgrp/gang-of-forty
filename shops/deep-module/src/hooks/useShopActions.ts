import { useCallback } from "react";
import type { CartLine, Product, StockData } from "../types";
import { toast } from "../shared/ui/toast";

interface Args {
  effectiveStock: StockData;
  cart: CartLine[];
  addToCart: (p: Product) => void;
  increase: (id: number) => void;
  consume: (cart: CartLine[]) => void;
  checkout: () => void;
  wishlistToggle: (id: number, name: string) => void;
  onCloseCart: () => void;
}

export function useShopActions(args: Args) {
  const {
    effectiveStock,
    cart,
    addToCart,
    increase,
    consume,
    checkout,
    wishlistToggle,
    onCloseCart,
  } = args;

  const handleAddToCart = useCallback(
    (product: Product): boolean => {
      const available = effectiveStock.items[product.id] ?? Infinity;
      const existing = cart.find((i) => i.id === product.id);
      const currentInCart = existing?.quantity ?? 0;

      if (available === 0) {
        toast.error(`${product.name} موجود نیست`);
        return false;
      }
      if (currentInCart >= available) {
        toast.error(`حداکثر ${available} عدد از ${product.name} موجوده`);
        return false;
      }
      addToCart(product);
      return true;
    },
    [effectiveStock, cart, addToCart],
  );

  const handleIncrease = useCallback(
    (id: number): void => {
      const item = cart.find((i) => i.id === id);
      if (!item) return;
      const available = effectiveStock.items[id] ?? Infinity;
      if (item.quantity >= available) {
        toast.error(`حداکثر ${available} عدد از ${item.name} موجوده`);
        return;
      }
      increase(id);
    },
    [cart, effectiveStock, increase],
  );

  const handleCheckout = useCallback((): void => {
    const willBeUnavailable: string[] = [];
    for (const item of cart) {
      const s = effectiveStock.items[item.id] ?? Infinity;
      if (s !== Infinity && s - item.quantity <= 0) {
        willBeUnavailable.push(item.name);
      }
    }
    consume(cart);
    checkout();
    onCloseCart();
    if (willBeUnavailable.length > 0) {
      setTimeout(() => {
        toast.error(`📦 ${willBeUnavailable.join("، ")} به پایان موجودی رسید`);
      }, 1200);
    }
  }, [cart, effectiveStock, consume, checkout, onCloseCart]);

  const handleToggleWishlist = useCallback(
    (p: Product): void => {
      wishlistToggle(p.id, p.name);
    },
    [wishlistToggle],
  );

  return {
    handleAddToCart,
    handleIncrease,
    handleCheckout,
    handleToggleWishlist,
  };
}
