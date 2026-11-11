import { useState } from "react";
import type { CartAction, CartItem } from "./shared/types/products";
import { useStoreData } from "./features/products/hooks/useStoreData";
import { addStoreProduct, changeStoreCart } from "./store-cart";
import StorePage from "./components/StorePage";
import {
  showCartToast,
  showCartStockLimitToast,
} from "./features/cart/ui/toast";

import { loadCart } from "./features/cart/storage/items";
import { useCartEffects } from "./features/cart/hooks/useCartEffects";
export default function App() {
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [cart, setCart] = useState<CartItem[]>(loadCart);
  useCartEffects(cart);
  const { loadState, storeData } = useStoreData();

  function handleAdd(id: number): void {
    if (!storeData) return;

    const product = storeData.products.find((item) => item.id === id);
    if (!product) return;

    const nextCart = addStoreProduct(
      cart,
      id,
      storeData.products,
      storeData.stock,
    );

    if (nextCart === cart) {
      showCartStockLimitToast();
      return;
    }

    setCart(nextCart);
    showCartToast();
  }

  function handleCartAction(action: CartAction, id: number): void {
    if (!storeData) return;

    const nextCart = changeStoreCart(cart, action, id, storeData.stock);

    if (action === "increase" && nextCart === cart) {
      showCartStockLimitToast();
      return;
    }

    setCart(nextCart);
  }

  return (
    <StorePage
      data={storeData}
      loadState={loadState}
      cart={cart}
      categoryId={categoryId}
      onPickCategory={setCategoryId}
      onAdd={handleAdd}
      onCartAction={handleCartAction}
      onClearCart={() => setCart([])}
    />
  );
}
