import { createContext, useContext } from "react";

export const SearchContext = createContext<{
  query: string;
  setQuery: (query: string) => void;
} | null>(null);

export function useProductSearch() {
  const context = useContext(SearchContext);
  if (!context) throw new Error("useProductSearch must be used inside SearchContext.Provider");
  return context;
}
