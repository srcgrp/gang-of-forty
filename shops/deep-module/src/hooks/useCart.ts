import { useState, useEffect, useCallback, useRef } from "react";
import type { CartLine, Product } from "../types";
import { loadCart, saveCart } from "../storage/cart";
import { toast } from "../shared/ui/toast";
import confetti from "canvas-confetti";

const SHOP_NAME = "سبزکاله";

export function useCart() {
  const [cart, setCart] = useState<CartLine[]>(loadCart);

  // ✅ cartRef همیشه مقدار به‌روز cart رو داره، برای callbackهای stable
  const cartRef = useRef(cart);
  useEffect(() => {
    cartRef.current = cart;
  }, [cart]);

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  useEffect(() => {
    const total = cart.reduce((s, i) => s + i.quantity, 0);
    document.title = total > 0 ? `(${total}) ${SHOP_NAME}` : SHOP_NAME;
  }, [cart]);

  const addToCart = useCallback((product: Product) => {
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
          emoji: product.emoji,
        },
      ];
    });
    toast.success(`${product.name} به سبد اضافه شد ✅`);
  }, []);

  const increase = useCallback((id: number) => {
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)),
    );
  }, []);

  const decrease = useCallback((id: number) => {
    setCart((prev) => {
      const item = prev.find((i) => i.id === id);
      if (!item) return prev;
      if (item.quantity <= 1) return prev.filter((i) => i.id !== id);
      return prev.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity - 1 } : i,
      );
    });
  }, []);

  const removeItem = useCallback((id: number) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
    toast.success("محصول از سبد حذف شد");
  }, []);

  const checkout = useCallback(() => {
    if (cartRef.current.length === 0) return;
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#d7ff00", "#b8dc00", "#111318", "#4da3ff"],
    });
    toast.success("سفارش شما با موفقیت ثبت شد! 🎉");
    setCart([]);
  }, []);

  return { cart, addToCart, increase, decrease, removeItem, checkout };
}
