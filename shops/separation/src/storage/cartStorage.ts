import type { CartLine } from '../types.ts'

const KEY = 'separation-cart'

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isCartLine(x: unknown): x is CartLine {
  if (isObject(x) === false) return false
  return typeof x.productId === 'number' && typeof x.qty === 'number'
}

export function loadCart(): CartLine[] {
  const text = localStorage.getItem(KEY)
  if (text === null) return []
  const raw: unknown = JSON.parse(text)
  if (Array.isArray(raw) === false) return []
  const good: CartLine[] = []
  for (const item of raw) {
    if (isCartLine(item)) good.push({ productId: item.productId, qty: item.qty })
  }
  return good
}

export function saveCart(cart: CartLine[]): void {
  localStorage.setItem(KEY, JSON.stringify(cart))
}
