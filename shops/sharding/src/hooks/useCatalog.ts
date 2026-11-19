import { createContext, useContext, useEffect, useState } from 'react'
import { catalogCarousels } from '../catalog/carousels'
import { loadAllData } from '../shared/api/load-all'
import { withCategoryImages } from '../shared/logic/content-utils'
import { initialShopData, shopLoadError } from '../shared/state/shop-data'
import type { Catalog, LoadState } from '../shared/types'
import { useCartStore } from './useCartStore'

type CatalogState = LoadState<Catalog> & {
  retry: () => void
}

export const CatalogContext = createContext<CatalogState | null>(null)

export function useCatalog(): CatalogState {
  const state = useContext(CatalogContext)
  if (!state) throw new Error('useCatalog requires a catalog provider')
  return state
}

export function useLoadCatalog(): CatalogState {
  const [state, setState] = useState<LoadState<Catalog>>({
    status: 'loading',
    data: initialShopData,
  })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let ignore = false
    loadAllData()
      .then(({ skippedProducts, ...result }) => {
        if (ignore) return
        const data: Catalog = {
          ...result,
          categories: withCategoryImages(result.categories),
          carousels: catalogCarousels(
            result.home.carousels ?? [],
            result.categories,
            result.offerMap.size > 0,
          ),
        }
        const status = data.products.length === 0 ? 'empty' : 'success'
        setState({ status, data })
        if (skippedProducts === 0) {
          useCartStore.getState().reconcile(data.products, data.stock)
        }
      })
      .catch((error: unknown) => {
        if (ignore) return
        const message = shopLoadError(error)
        setState((current) => ({ status: 'error', data: current.data, message }))
      })
    return () => { ignore = true }
  }, [attempt])

  function retry(): void {
    setState((current) => ({ status: 'loading', data: current.data }))
    setAttempt((current) => current + 1)
  }

  return { ...state, retry }
}
