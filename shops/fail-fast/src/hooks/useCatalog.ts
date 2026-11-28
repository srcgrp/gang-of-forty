import type { Category, LoadState } from '../types'
import type { Catalog } from '../catalog/carousel'
import { useAppData } from './useAppData'
import { useHomeData } from './useHomeData'
import { useOffers } from './useOffers'

export type CatalogState = LoadState<Catalog> & {
  dataReady: boolean
  categories: Category[]
}

export function useCatalog(): CatalogState {
  const dataState = useAppData()
  const homeState = useHomeData()
  const offersState = useOffers()

  const dataReady = dataState.status === 'success'
  const categories = dataReady ? dataState.data.categories : []
  const failed = [dataState, homeState, offersState].find(
    (state) => state.status === 'error'
  )
  if (failed?.status === 'error') {
    return { status: 'error', message: failed.message, dataReady, categories }
  }
  if (dataState.status === 'empty') {
    return { status: 'empty', dataReady, categories }
  }
  if (
    !dataReady ||
    homeState.status !== 'success' ||
    offersState.status !== 'success'
  ) {
    return { status: 'loading', dataReady, categories }
  }

  return {
    status: 'success',
    data: {
      products: dataState.data.products,
      categories,
      offers: offersState.data,
      carousels: homeState.data.carousels,
    },
    dataReady,
    categories,
  }
}
