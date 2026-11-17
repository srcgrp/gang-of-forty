import type { StoreData } from "../features/products/api/store-data";
import type { LoadState } from "../shared/types/products";

export type StorePageProps = {
  data: StoreData | null;
  loadState: LoadState;
  categoryId: number | null;
  query: string;
  onQuery: (value: string) => void;
  onRetry: () => void;
  onPickCategory: (id: number | null) => void;
};
