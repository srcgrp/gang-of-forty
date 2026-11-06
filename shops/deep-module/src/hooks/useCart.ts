import { useState, useEffect } from "react";
import type { CartLine, Product } from "../types";
import { toast } from "../shared/ui/toast";
import confetti from "canvas-confetti";

export function useCart() {
  const [cart, setCart] = useState<CartLine[]>([]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    document.title = cart.length > 0 ? `(${cart.length}) سبزکاله` : "سبزکاله";
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        },
      ];
    });
    toast.success(`${product.name} به سبد اضافه شد ✅`);
  };

  const increase = (id: number) => {
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)),
    );
  };

  const decrease = (id: number) => {
    setCart((prev) => {
      const item = prev.find((i) => i.id === id);
      if (!item) return prev;
      if (item.quantity <= 1) return prev.filter((i) => i.id !== id);
      return prev.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity - 1 } : i,
      );
    });
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
    toast.success("محصول از سبد حذف شد");
  };

  const checkout = () => {
    if (cart.length === 0) return;
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#d7ff00", "#b8dc00", "#111318", "#4da3ff"],
    });
    toast.success("سفارش شما با موفقیت ثبت شد! 🎉");
    setCart([]);
  };

  return { cart, addToCart, increase, decrease, removeItem, checkout };
}
