import type { AppState, LoadState } from '../types'

type ShopData = Omit<AppState, 'cart'>

export const shopLoadError: LoadState = {
  status: 'error',
  message: 'دریافت اطلاعات ناموفق بود.',
}

export const initialShopData: ShopData = {
  shop: null,
  home: null,
  categories: [],
  products: [],
  stock: null,
  offerMap: new Map(),
  res: { status: 'loading' },
}

