import type { CartLine } from '../types'

const KEY = 'kiss-cart-v4'

const isLine = (x: unknown): x is CartLine =>
  typeof x === 'object' &&
  x !== null &&
  'id' in x &&
  'qty' in x &&
  typeof x.id === 'number' &&
  typeof x.qty === 'number' &&
  Number.isInteger(x.qty) &&
  x.qty > 0

export const loadCart = (): CartLine[] => {
  try {
    const data: unknown = JSON.parse(localStorage.getItem(KEY) ?? '[]')
    return Array.isArray(data) ? data.filter(isLine) : []
  } catch {
    return []
  }
}

export const saveCart = (cart: readonly CartLine[]): void => {
  try {
    localStorage.setItem(KEY, JSON.stringify(cart))
  } catch (err: unknown) {
    console.warn('Could not save the cart:', err)
  }
}
