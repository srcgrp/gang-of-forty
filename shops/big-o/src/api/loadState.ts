import type { LoadState } from "../types"
import { getData } from "./getData"

// Load the shop data and turn the result into a LoadState
// output: a promise that always resolves (errors become an error state)
export function loadShopState(): Promise<LoadState> {
  return getData()
    .then((data): LoadState =>
      data.products.length === 0
        ? { status: "empty" }
        : { status: "success", ...data }
    )
    .catch((error: unknown): LoadState => ({
      status: "error",
      message: error instanceof Error ? error.message : "خطای ناشناخته",
    }))
}