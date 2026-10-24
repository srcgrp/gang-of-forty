import type { CartLine } from '../types.ts'
import { isCartLine } from '../api/guards.ts'

const CART_KEY: string = 'dry-cart'

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