import type { Catalog, LoadState } from "../types";

export const toLoadState = (catalog: Catalog): LoadState<Catalog> =>
  catalog.items.length === 0 ? { status: "empty" } : { status: "success", data: catalog };

export const errorState = (message: string): LoadState<Catalog> => ({
  status: "error",
  message,
});
