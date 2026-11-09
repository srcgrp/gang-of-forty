import type { CartItem, CartLine, ProductView } from '../../types'

export const addToCart = (cart: CartItem[], id: number): CartItem[] => {
  const inCart = cart.some((item) => item.id === id)
  if (!inCart) {
    return [...cart, { id, quantity: 1 }]
  }
  return cart.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
}

export const removeFromCart = (cart: CartItem[], id: number): CartItem[] =>
  cart.filter((item) => item.id !== id)

export const cartLines = (cart: CartItem[], products: ProductView[]): CartLine[] =>
  cart.flatMap((item): CartLine[] => {
    const product = products.find((entry) => entry.id === item.id)
    if (!product || product.stock === 0) {
      return []
    }
    const quantity = Math.min(item.quantity, product.stock)
    const { id, name, emoji, price, stock } = product
    return [{ id, name, emoji, price, stock, quantity, subtotal: price * quantity }]
  })

export const cartCount = (lines: CartLine[]): number =>
  lines.reduce((sum, line) => sum + line.quantity, 0)

export const cartTotal = (lines: CartLine[]): number =>
  lines.reduce((sum, line) => sum + line.subtotal, 0)
