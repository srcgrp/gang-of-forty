import type { CartItem } from '../types'
import { isId, isNatural, isRecord } from '../data/validation'

export const CART_KEY = 'refactor-cart-v1'

const isCartItem = (value: unknown): value is CartItem =>
  isRecord(value) && isId(value.id) && isNatural(value.quantity) && value.quantity > 0

export const readCart = (): CartItem[] => {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(CART_KEY) ?? '[]')
    return Array.isArray(value) ? value.filter(isCartItem) : []
  } catch {
    return []
  }
}

export const writeCart = (items: CartItem[]): boolean => {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items))
    return true
  } catch {
    return false
  }
}
