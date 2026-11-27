import { useEffect, useState } from "react"
import { loadShopState } from "../api/loadState"
import type { Catalog, LoadState } from "../types"

type CatalogResult = {
  state: LoadState<Catalog>
  retry: () => void
}

export function useCatalog(): CatalogResult {
  const [state, setState] = useState<LoadState<Catalog>>({ status: "loading" })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let ignore = false
    loadShopState().then((next) => { if (!ignore) setState(next) })
    return () => { ignore = true }
  }, [attempt])

  function retry() {
    setState({ status: "loading" })
    setAttempt((n) => n + 1)
  }

  return { state, retry }
}