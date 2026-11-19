import type { Catalog, LoadState } from "../types"
import { getData } from "./getData"

// Load the shop data and turn the result into a LoadState
// output: a promise that always resolves (errors become an error state)
export function loadShopState(): Promise<LoadState<Catalog>> {
  return getData()
    .then((data): LoadState<Catalog> =>
      data.products.length === 0
        ? { status: "empty" }
        : { status: "success", data }
    )
    .catch((error: unknown): LoadState<Catalog> => ({
      status: "error",
      message: error instanceof Error ? error.message : "خطای ناشناخته",
    }))
}