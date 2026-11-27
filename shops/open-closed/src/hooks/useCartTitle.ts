import { useEffect } from 'react'
import { totalQuantity } from '../cart/cart.ts'
import { formatCount } from '../lib/format.ts'
import { useCartStore } from './useCartStore.ts'

const SHOP_NAME = 'سوپرمارکت باز-بسته'

export function useCartTitle(): void {
  const count = useCartStore((s) => totalQuantity(s.cart))

  useEffect(() => {
    document.title = count > 0 ? `${SHOP_NAME} · ${formatCount(count)} 🛒` : SHOP_NAME
  }, [count])
}