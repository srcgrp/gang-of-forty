import { createContext, useContext } from "react";
import type { LoadState, ShopData } from "../shared/types";

export type CatalogState = LoadState<ShopData> & { retry: () => void };
export const CatalogContext = createContext<CatalogState | null>(null);

export function useCatalog(): CatalogState {
  const state = useContext(CatalogContext);
  if (!state) throw new Error("CatalogProvider is missing");
  return state;
}
