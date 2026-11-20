import type { CartItem, CartLine, Product } from '../types.ts'

export function addLine(cart: CartLine[], productId: number): CartLine[] {
  const next: CartLine[] = []
  let found = false
  for (const line of cart) {
    if (line.productId === productId) {
      next.push({ productId: line.productId, qty: line.qty + 1 })
      found = true
    } else {
      next.push(line)
    }
  }
  if (found === false) next.push({ productId, qty: 1 })
  return next
}

export function removeLine(cart: CartLine[], productId: number): CartLine[] {
  const next: CartLine[] = []
  for (const line of cart) {
    if (line.productId === productId) continue
    next.push(line)
  }
  return next
}

export function cartCount(cart: CartLine[]): number {
  let total = 0
  for (const line of cart) total += line.qty
  return total
}

export function joinCart(cart: CartLine[], products: Product[]): CartItem[] {
  const lines: CartItem[] = []
  for (const line of cart)
    for (const p of products)
      if (p.id === line.productId) lines.push({ productId: line.productId, qty: line.qty, product: p })
  return lines
}

export function cartTotal(cart: CartLine[], products: Product[]): number {
  let sum = 0
  for (const line of cart) {
    for (const p of products) {
      if (p.id === line.productId) sum += p.price * line.qty
    }
  }
  return sum
}
