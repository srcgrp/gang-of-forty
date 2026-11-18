import type { CartRow, Stock } from '../shared/types'
import { useCartStore } from '../hooks/useCartStore'
import { stockOf } from '../shared/logic/stock'
import Price from './Price'

type CartItemProps = {
  row: CartRow
  stock: Stock | null
}

export default function CartItem({ row, stock }: CartItemProps) {
  const add = useCartStore((state) => state.add)
  const remove = useCartStore((state) => state.remove)
  const removeLine = useCartStore((state) => state.removeLine)
  const max = stockOf(row.id, stock)

  return (
    <li className="cart-row">
      <span className="cart-row__name">{row.name}</span>
      <div className="product__qty cart-row__quantity">
        <button type="button" className="product__qty-btn" onClick={() => remove(row.id, row.name)} aria-label={`کم کردن ${row.name}`}>−</button>
        <span className="product__qty-val" aria-live="polite">{row.qty.toLocaleString('fa-IR')}</span>
        <button type="button" className="product__qty-btn" onClick={() => add(row.id, max)} disabled={row.qty >= max} aria-label={`افزودن ${row.name}`}>+</button>
      </div>
      <span className="cart-row__total"><Price value={row.lineTotal} /></span>
      <button type="button" className="cart-row__remove" onClick={() => removeLine(row.id, row.name)} aria-label={`حذف ${row.name}`}>×</button>
    </li>
  )
}
