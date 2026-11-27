import type { ReactNode } from "react";
import { CatalogContext } from "../hooks/useCatalog";
import { useCatalogRequest } from "../hooks/useCatalogRequest";

export default function CatalogProvider({ children }: { children: ReactNode }) {
  const state = useCatalogRequest();
  return <CatalogContext.Provider value={state}>{children}</CatalogContext.Provider>;
}
