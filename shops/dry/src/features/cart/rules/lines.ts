import type { CartLine } from '../../../shared/types.ts'

export function addToCart(lines: CartLine[], id: number): CartLine[] {
  if (!lines.some((l: CartLine): boolean => l.id === id)) return [...lines, { id, qty: 1 }]
  return lines.map((l: CartLine): CartLine => (l.id === id ? { ...l, qty: l.qty + 1 } : l))
}

export function removeFromCart(lines: CartLine[], id: number): CartLine[] {
  return lines.filter((l: CartLine): boolean => l.id !== id)
}

export function cartCount(lines: CartLine[]): number {
  return lines.reduce((sum: number, l: CartLine): number => sum + l.qty, 0)
}