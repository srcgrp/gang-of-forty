import { useMemo } from "react";
import Fuse from "fuse.js";
import type { Product } from "../types";

export function useSearch(products: Product[], query: string) {
  const fuse = useMemo(
    () =>
      new Fuse(products, {
        keys: ["name", "desc"],
        threshold: 0.35,
        includeScore: true,
        minMatchCharLength: 2,
      }),
    [products],
  );

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return fuse
      .search(query.trim())
      .slice(0, 5)
      .map((r) => r.item);
  }, [fuse, query]);

  return results;
}
