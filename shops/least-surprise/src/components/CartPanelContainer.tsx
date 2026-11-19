import { useCartStore } from '../hooks/useCartStore'
import { CartPanel } from './CartPanel'

export default function CartPanelContainer() {
  const cart = useCartStore((state) => state.cart)
  const removeItem = useCartStore((state) => state.removeItem)
  const totalPrice = useCartStore((state) => state.totalPrice())

  return (
    <CartPanel
      cart={cart}
      totalPrice={totalPrice}
      onRemove={removeItem}
    />
  )
}