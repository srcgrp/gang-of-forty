import type { CartLine } from '../types'

export const addLine = (cart: readonly CartLine[], id: number, max: number): CartLine[] => {
  const line: CartLine | undefined = cart.find((l) => l.id === id)
  if (line === undefined) return max > 0 ? [...cart, { id, qty: 1 }] : [...cart]
  if (line.qty >= max) return [...cart]
  return cart.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l))
}

export const removeLine = (cart: readonly CartLine[], id: number): CartLine[] =>
  cart.filter((l) => l.id !== id)

export const countItems = (cart: readonly CartLine[]): number =>
  cart.reduce((sum, line) => sum + line.qty, 0)
