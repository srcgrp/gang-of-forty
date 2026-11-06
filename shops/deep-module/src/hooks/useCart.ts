import { useState, useEffect } from "react";
import type { CartLine, Product } from "../types";
import { toast } from "../shared/ui/toast";

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

  return { cart, addToCart };
}
