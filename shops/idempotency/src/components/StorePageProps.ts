import type { StoreData } from "../features/products/api/store-data";
import type { CartAction, CartItem, LoadState } from "../shared/types/products";

export type StorePageProps = {
  data: StoreData | null;
  loadState: LoadState;
  cart: CartItem[];
  categoryId: number | null;
  query: string;
  onQuery: (value: string) => void;
  onRetry: () => void;
  onPickCategory: (id: number | null) => void;
  onAdd: (id: number) => void;
  onCartAction: (action: CartAction, id: number) => void;
  onClearCart: () => void;
};
