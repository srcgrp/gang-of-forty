import { useEffect } from 'react'
import { cartCount } from '../features/cart/logic/cart'
import { useCartStore } from '../hooks/useCartStore'
import { Icon } from './Icon'

type CartButtonProps = {
  shopName: string
  open: boolean
  onToggle: () => void
}

export default function CartButton({ shopName, open, onToggle }: CartButtonProps) {
  const count = useCartStore((state) => cartCount(state.lines))
  const formattedCount = count.toLocaleString('fa-IR')

  useEffect(() => {
    document.title = count > 0 ? `${shopName} · ${formattedCount} 🛒` : shopName
  }, [shopName, count, formattedCount])

  return (
    <button type="button" className="action action--cart" onClick={onToggle} aria-label="سبد خرید" aria-expanded={open} aria-controls="cart-panel">
      <Icon name="cart" className="action__icon" />
      <span className="action__label">سبد خرید</span>
      {count > 0 && <span className="badge">{formattedCount}</span>}
    </button>
  )
}
