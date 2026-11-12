
import { useEffect } from 'react'
import { cartCount } from '../cart/cart'
import type { CartLine } from '../types'

export function useDocumentTitle(cart: CartLine[]) {
  useEffect(() => {
    const itemCount = cartCount(cart)
    document.title = `میوه فروشی من · ${itemCount} کالا`
  }, [cart])
}
