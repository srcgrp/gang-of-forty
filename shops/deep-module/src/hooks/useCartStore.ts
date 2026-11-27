import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartLine, Product } from "../types";
import { addLine, decLine, incLine, removeLine } from "../cart/cart";
import { loadCart, saveCart } from "../storage/cart";
import { toast } from "../shared/ui/toast";

interface CartState {
  items: CartLine[];
  consumed: Record<number, number>;
  addToCart: (product: Product, maxStock?: number) => void;
  increase: (id: number, maxStock?: number) => void;
  decrease: (id: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  consumeAndClear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: loadCart(),
      consumed: {},
      addToCart: (product, maxStock = Infinity) => {
        const current = get().items.find((i) => i.id === product.id)?.quantity ?? 0;
        if (maxStock === 0) return void toast.error(`${product.name} موجود نیست`);
        if (current >= maxStock) return void toast.error(`حداکثر ${maxStock} عدد موجوده`);
        const next = addLine(get().items, product);
        saveCart(next);
        set({ items: next });
        toast.success(`${product.name} به سبد اضافه شد ✅`);
      },
      increase: (id, maxStock = Infinity) => {
        const item = get().items.find((i) => i.id === id);
        if (!item) return;
        if (item.quantity >= maxStock) return void toast.error(`حداکثر ${maxStock} عدد موجوده`);
        const next = incLine(get().items, id);
        saveCart(next);
        set({ items: next });
      },
      decrease: (id) => {
        const next = decLine(get().items, id);
        saveCart(next);
        set({ items: next });
      },
      removeItem: (id) => {
        const next = removeLine(get().items, id);
        saveCart(next);
        set({ items: next });
        toast.success("محصول از سبد حذف شد");
      },
      clearCart: () => {
        saveCart([]);
        set({ items: [] });
      },
      consumeAndClear: () => {
        const consumed = { ...get().consumed };
        for (const item of get().items) consumed[item.id] = (consumed[item.id] ?? 0) + item.quantity;
        saveCart([]);
        set({ items: [], consumed });
      },
    }),
    { name: "sabzkaleh-cart" },
  ),
);
