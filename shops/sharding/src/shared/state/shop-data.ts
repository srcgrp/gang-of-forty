import type { Catalog } from '../types'
import { HTTPError } from '../api/get-json'

export function shopLoadError(error: unknown): string {
  console.warn('دریافت اطلاعات فروشگاه ناموفق بود:', error)
  if (error instanceof HTTPError && error.status === 404) {
    return 'اطلاعات فروشگاه پیدا نشد.'
  }
  if (error instanceof SyntaxError) {
    return 'فرمت اطلاعات دریافتی نامعتبر است.'
  }
  return 'دریافت اطلاعات ناموفق بود. لطفاً دوباره تلاش کنید.'
}

export const initialShopData: Catalog = {
  shop: null,
  home: null,
  categories: [],
  products: [],
  stock: null,
  offerMap: new Map(),
  carousels: [],
}

