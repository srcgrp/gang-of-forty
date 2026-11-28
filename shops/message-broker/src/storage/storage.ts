import type { CartLine } from '../types'

const STORAGE_KEY = 'cart_v1'

export function loadCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []

    const data: unknown = JSON.parse(raw)

    if (Array.isArray(data)) {
      return data.filter(
        (item): item is CartLine =>
          typeof item.productId === 'number' &&
          typeof item.quantity === 'number'
      )
    }

    if (typeof data === 'object' && data !== null) {
      return Object.entries(data).map(([id, quantity]) => ({
        productId: Number(id),
        quantity: Number(quantity),
      }))
    }

    return []
  } catch {
    return []
  }
}

export function saveCart(cart: CartLine[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
  } catch (e) {
    console.warn('خطا در ذخیره سبد خرید:', e)
  }
}
