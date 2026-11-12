import type { CartLine, Product, StockData } from "../types";
import { toast } from "../shared/ui/toast";

interface Args {
  effectiveStock: StockData;
  cart: CartLine[];
  addToCart: (p: Product) => void;
  increase: (id: number) => void;
  consume: (cart: CartLine[]) => void;
  checkout: () => void;
  wishlistAdd: (id: number, name: string) => void;
  onCloseCart: () => void;
}

export function useShopActions(args: Args) {
  const handleAddToCart = (product: Product): boolean => {
    const available = args.effectiveStock.items[product.id] ?? Infinity;
    const existing = args.cart.find((i) => i.id === product.id);
    const currentInCart = existing?.quantity ?? 0;

    if (available === 0) {
      toast.error(`${product.name} موجود نیست`);
      return false;
    }
    if (currentInCart >= available) {
      toast.error(`حداکثر ${available} عدد از ${product.name} موجوده`);
      return false;
    }
    args.addToCart(product);
    return true;
  };

  const handleIncrease = (id: number): void => {
    const item = args.cart.find((i) => i.id === id);
    if (!item) return;
    const available = args.effectiveStock.items[id] ?? Infinity;
    if (item.quantity >= available) {
      toast.error(`حداکثر ${available} عدد از ${item.name} موجوده`);
      return;
    }
    args.increase(id);
  };

  const handleCheckout = (): void => {
    const willBeUnavailable: string[] = [];
    for (const item of args.cart) {
      const s = args.effectiveStock.items[item.id] ?? Infinity;
      if (s !== Infinity && s - item.quantity <= 0) {
        willBeUnavailable.push(item.name);
      }
    }
    args.consume(args.cart);
    args.checkout();
    args.onCloseCart();
    if (willBeUnavailable.length > 0) {
      setTimeout(() => {
        toast.error(`📦 ${willBeUnavailable.join("، ")} به پایان موجودی رسید`);
      }, 1200);
    }
  };

  const handleToggleWishlist = (p: Product): void => {
    args.wishlistAdd(p.id, p.name);
  };

  return {
    handleAddToCart,
    handleIncrease,
    handleCheckout,
    handleToggleWishlist,
  };
}
