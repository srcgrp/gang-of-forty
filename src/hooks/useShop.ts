import { useState } from "react";
import type { AppData } from "../types";
import { useCart } from "./useCart";
import { useSearch } from "./useSearch";
import { useFilters, applyFilters } from "./useFilters";
import { useConsumedStock } from "./useConsumedStock";
import { useWishlist } from "./useWishlist";
import { useEffectiveStock } from "./useEffectiveStock";
import { useShopActions } from "./useShopActions";

export function useShop(data: AppData) {
  const [query, setQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const cart = useCart();
  const { filters, update, reset } = useFilters();
  const consumed = useConsumedStock();
  const wishlist = useWishlist();

  const { products, offers, stock } = data;
  const suggestions = useSearch(products, query);
  const effectiveStock = useEffectiveStock(stock, consumed.consumed);

  const {
    handleAddToCart,
    handleIncrease,
    handleCheckout,
    handleToggleWishlist,
  } = useShopActions({
    effectiveStock,
    cart: cart.cart,
    addToCart: cart.addToCart,
    increase: cart.increase,
    consume: consumed.consume,
    checkout: cart.checkout,
    wishlistAdd: wishlist.add,
    onCloseCart: () => setCartOpen(false),
  });

  const filtered = applyFilters(products, filters, offers, effectiveStock, "");
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
    cart,
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