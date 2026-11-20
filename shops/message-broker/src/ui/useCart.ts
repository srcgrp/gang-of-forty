import { useEffect, useState } from 'react'
import { addToCart, removeFromCart } from '../cart/cart'
import type { CartLine } from '../types'
import { loadCart, saveCart } from '../storage/storage'

export function useCart() {
  const [cart, setCart] = useState<CartLine[]>(() => loadCart())

  useEffect(() => {
    saveCart(cart)
  }, [cart])

  function handleAdd(id: number) {
    setCart((current) => addToCart(current, id))
  }

  function handleRemove(id: number) {
    setCart((current) => removeFromCart(current, id))
  }

  return { cart, handleAdd, handleRemove }
}