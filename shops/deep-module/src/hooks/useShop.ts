import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import type { AppData, CartLine, Product } from "../types";
import { useCart } from "./useCart";
import { useSearch } from "./useSearch";
import { useFilters, applyFilters } from "./useFilters";
import { useWishlist } from "./useWishlist";
import { toast } from "../shared/ui/toast";

const CONSUMED_KEY = "consumed_stock";

function readConsumed(): Record<number, number> {
  try {
    const raw = localStorage.getItem(CONSUMED_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return {};
    return parsed as Record<number, number>;
  } catch {
    return {};
  }
}

export function useShop(data: AppData) {
  const [query, setQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const cart = useCart();
  const { filters, update, reset } = useFilters();
  const wishlist = useWishlist();
  const [consumed, setConsumed] =
    useState<Record<number, number>>(readConsumed);

  const { products, offers, stock } = data;
  const suggestions = useSearch(products, query);

  // persist consumed to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CONSUMED_KEY, JSON.stringify(consumed));
    } catch {
      /* ignore */
    }
  }, [consumed]);

  // effectiveStock = stock - consumed
  const effectiveStock = useMemo(() => {
    const items: Record<number, number> = {};
    for (const [k, v] of Object.entries(stock.items)) {
      const id = Number(k);
      items[id] = Math.max(0, v - (consumed[id] ?? 0));
    }
    return { items };
  }, [stock, consumed]);

  // refs → callback identities stay stable
  const cartRef = useRef<CartLine[]>(cart.cart);
  const effectiveStockRef = useRef(effectiveStock);
  useEffect(() => {
    cartRef.current = cart.cart;
  }, [cart.cart]);
  useEffect(() => {
    effectiveStockRef.current = effectiveStock;
  }, [effectiveStock]);

  // ---- actions (previously useShopActions) ----
  const handleAddToCart = useCallback(
    (product: Product): boolean => {
      const available = effectiveStockRef.current.items[product.id] ?? Infinity;
      const existing = cartRef.current.find((i) => i.id === product.id);
      const currentInCart = existing?.quantity ?? 0;

      if (available === 0) {
        toast.error(`${product.name} موجود نیست`);
        return false;
      }
      if (currentInCart >= available) {
        toast.error(`حداکثر ${available} عدد از ${product.name} موجوده`);
        return false;
      }
      cart.addToCart(product);
      return true;
    },
    [cart.addToCart],
  );

  const handleIncrease = useCallback(
    (id: number): void => {
      const item = cartRef.current.find((i) => i.id === id);
      if (!item) return;
      const available = effectiveStockRef.current.items[id] ?? Infinity;
      if (item.quantity >= available) {
        toast.error(`حداکثر ${available} عدد از ${item.name} موجوده`);
        return;
      }
      cart.increase(id);
    },
    [cart.increase],
  );

  const handleCheckout = useCallback((): void => {
    const currentCart = cartRef.current;
    const currentStock = effectiveStockRef.current;
    const willBeUnavailable: string[] = [];
    for (const item of currentCart) {
      const s = currentStock.items[item.id] ?? Infinity;
      if (s !== Infinity && s - item.quantity <= 0) {
        willBeUnavailable.push(item.name);
      }
    }

    setConsumed((prev) => {
      const next = { ...prev };
      for (const item of currentCart) {
        next[item.id] = (next[item.id] ?? 0) + item.quantity;
      }
      return next;
    });

    cart.checkout();
    setCartOpen(false);

    if (willBeUnavailable.length > 0) {
      setTimeout(() => {
        toast.error(`📦 ${willBeUnavailable.join("، ")} به پایان موجودی رسید`);
      }, 1200);
    }
  }, [cart.checkout]);

  const handleToggleWishlist = useCallback(
    (p: Product): void => {
      wishlist.toggle(p.id, p.name);
    },
    [wishlist.toggle],
  );

  // ---- filtered catalog ----
  const filtered = useMemo(
    () => applyFilters(products, filters, offers, effectiveStock, query),
    [products, filters, offers, effectiveStock, query],
  );

  const hasRealFilters =
    filters.categoryId !== null ||
    filters.stock !== "all" ||
    filters.discount !== "all";
  const realActiveCount =
    (filters.categoryId !== null ? 1 : 0) +
    (filters.stock !== "all" ? 1 : 0) +
    (filters.discount !== "all" ? 1 : 0);

  return {
    query,
    setQuery,
    cart: {
      cart: cart.cart,
      decrease: cart.decrease,
      removeItem: cart.removeItem,
    },
    filters,
    update,
    reset,
    wishlist,
    suggestions,
    effectiveStock,
    filtered,
    hasRealFilters,
    realActiveCount,
    handleAddToCart,
    handleIncrease,
    handleCheckout,
    handleToggleWishlist,
    cartOpen,
    setCartOpen,
    filterOpen,
    setFilterOpen,
    wishlistOpen,
    setWishlistOpen,
    userOpen,
    setUserOpen,
  };
}

export type ShopState = ReturnType<typeof useShop>;
