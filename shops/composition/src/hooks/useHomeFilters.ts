import { createContext, useContext } from "react";

type Filters = {
  query: string;
  categoryId: number | null;
  onPick: (id: number | null) => void;
};
export const HomeFiltersContext = createContext<Filters | null>(null);
export function useHomeFilters(): Filters {
  const filters = useContext(HomeFiltersContext);
  if (!filters) throw new Error("HomeFiltersContext is missing");
  return filters;
}
