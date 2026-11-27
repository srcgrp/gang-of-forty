import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import type { Sort } from "../scripts/types";
import { sortSearch } from "../scripts/logic/catalog/sort-products.ts";

const PLP_ROUTE = "/plp/$carouselId";

export function usePlpSort() {
  const { carouselId } = useParams({ from: PLP_ROUTE });
  const { sort = "default" } = useSearch({ from: PLP_ROUTE });
  const navigate = useNavigate();

  function setSort(next: Sort) {
    void navigate({
      to: PLP_ROUTE,
      params: { carouselId },
      search: sortSearch(next),
    });
  }

  return [sort, setSort] as const;
}
