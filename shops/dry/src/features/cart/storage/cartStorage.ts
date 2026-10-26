import type { CartLine } from '../../../shared/types.ts'
import { isNumber, isRecord } from '../../../shared/checks.ts'

const CART_KEY: string = 'dry-cart'

function isCartLine(x: unknown): x is CartLine {
  return isRecord(x) && isNumber(x.id) && isNumber(x.qty) && x.qty > 0
}

export function loadCart(): CartLine[] {
  const raw: string | null = localStorage.getItem(CART_KEY)
  if (raw === null) return []
  try {
    const data: unknown = JSON.parse(raw)
    if (!Array.isArray(data)) return []
    const items: unknown[] = data
    return items.filter(isCartLine)
  } catch {
    return []
  }
}

export function saveCart(lines: CartLine[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(lines))
}