import type { AppState, LoadState } from '../types'
import { HTTPError } from '../api/get-json'

type ShopData = Omit<AppState, 'cart'>

export function shopLoadError(error: unknown): LoadState {
  console.warn('دریافت اطلاعات فروشگاه ناموفق بود:', error)
  if (error instanceof HTTPError && error.status === 404) {
    return { status: 'error', message: 'اطلاعات فروشگاه پیدا نشد.' }
  }
  if (error instanceof SyntaxError) {
    return { status: 'error', message: 'فرمت اطلاعات دریافتی نامعتبر است.' }
  }
  return { status: 'error', message: 'دریافت اطلاعات ناموفق بود. لطفاً دوباره تلاش کنید.' }
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

