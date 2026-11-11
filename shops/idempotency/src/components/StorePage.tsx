import Header from "./Header";
import StoreBody from "./StoreBody";

import type { StoreData } from "../features/products/api/store-data";
import type { CartAction, CartItem, LoadState } from "../shared/types/products";
import { useEffect } from "react";
import { setupOffersConfetti } from "../shared/ui/effects";

import { getStoreCartSummary } from "../store-cart";

type Props = {
  data: StoreData | null;
  loadState: LoadState;
  cart: CartItem[];
  categoryId: number | null;
  onPickCategory: (id: number | null) => void;
  onAdd: (id: number) => void;
  onCartAction: (action: CartAction, id: number) => void;
  onClearCart: () => void;
};

export default function StorePage({
  data,
  loadState,
  cart,
  categoryId,
  onPickCategory,
  onAdd,
  onCartAction,
  onClearCart,
}: Props) {
  useEffect(() => {
    return setupOffersConfetti();
  }, []);
  const { rows, count, total } = data
    ? getStoreCartSummary(cart, data.products, data.offers, data.stock)
    : { rows: [], count: 0, total: 0 };

  return (
    <>
      <Header
        shop={data?.shop ?? null}
        onPickCategory={onPickCategory}
        cartCount={count}
        cartRows={rows}
        cartTotal={total}
        onCartAction={onCartAction}
        onClearCart={onClearCart}
      />
      <StoreBody
        data={data}
        loadState={loadState}
        categoryId={categoryId}
        onPickCategory={onPickCategory}
        onAdd={onAdd}
      />
    </>
  );
}
