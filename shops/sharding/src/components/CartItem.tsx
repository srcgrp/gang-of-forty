import { memo } from 'react'
import type { CartRow } from '../shared/types'
import { useCartStore } from '../hooks/useCartStore'
import Price from './Price'

type CartItemProps = Pick<CartRow, 'id' | 'name' | 'qty' | 'lineTotal'> & {
  max: number
}

export default memo(function CartItem({ id, name, qty, lineTotal, max }: CartItemProps) {
  const add = useCartStore((state) => state.add)
  const remove = useCartStore((state) => state.remove)
  const removeLine = useCartStore((state) => state.removeLine)

  return (
    <li className="cart-row">
      <span className="cart-row__name">{name}</span>
      <div className="product__qty cart-row__quantity">
        <button type="button" className="product__qty-btn" onClick={() => remove(id, name)} aria-label={`کم کردن ${name}`}>−</button>
        <span className="product__qty-val" aria-live="polite">{qty.toLocaleString('fa-IR')}</span>
        <button type="button" className="product__qty-btn" onClick={() => add(id, max)} disabled={qty >= max} aria-label={`افزودن ${name}`}>+</button>
      </div>
      <span className="cart-row__total"><Price value={lineTotal} /></span>
      <button type="button" className="cart-row__remove" onClick={() => removeLine(id, name)} aria-label={`حذف ${name}`}>×</button>
    </li>
  )
})
