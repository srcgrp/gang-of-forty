import { useEffect } from 'react'
import { useCartStore } from '../hooks/useCartStore'
import { cartCount } from '../cart/cart'

export function useDocumentTitle() {
  const itemCount = useCartStore((s) => cartCount(s.lines))

  useEffect(() => {
    document.title = `میوه فروشی من · ${itemCount} کالا`
  }, [itemCount])
}

