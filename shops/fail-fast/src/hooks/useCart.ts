import { useState, useEffect } from 'react'
import type { CartLine } from '../types'
import { addToCart, removeFromCart, getCartItemCount } from '../cart'
import { loadCart, saveCart } from '../storage/cartStorage'

export function useCart() {
  const [cart, setCart] = useState<CartLine[]>(() => loadCart())
  const cartItemCount = getCartItemCount(cart)

  useEffect(() => {
    saveCart(cart)
  }, [cart])

  useEffect(() => {
    document.title =
      cartItemCount > 0
        ? `(${cartItemCount}) اسپیس مارکت | سوپرمارکت شما`
        : 'اسپیس مارکت | سوپرمارکت شما'
  }, [cartItemCount])

  const handleAddToCart = (productId: number) =>
    setCart((prev) => addToCart(prev, productId))

  const handleRemoveFromCart = (productId: number) =>
    setCart((prev) => removeFromCart(prev, productId))

  return {
    cart,
    cartItemCount,
    handleAddToCart,
    handleRemoveFromCart,
  }
}
