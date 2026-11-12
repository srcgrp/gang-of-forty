import type { CartChange, CartRow, Stock } from '../shared/types'
import { stockOf } from '../shared/logic/stock'
import Price from './Price'

type CartItemProps = {
  row: CartRow
  stock: Stock | null
  onChange: (id: number, change: CartChange) => void
}

export default function CartItem({ row, stock, onChange }: CartItemProps) {
  return (
    <li className="cart-row">
      <span className="cart-row__name">{row.name}</span>
      <div className="product__qty cart-row__quantity">
        <button type="button" className="product__qty-btn" onClick={() => onChange(row.id, 'remove')} aria-label={`کم کردن ${row.name}`}>−</button>
        <span className="product__qty-val" aria-live="polite">{row.qty.toLocaleString('fa-IR')}</span>
        <button type="button" className="product__qty-btn" onClick={() => onChange(row.id, 'add')} disabled={row.qty >= stockOf(row.id, stock)} aria-label={`افزودن ${row.name}`}>+</button>
      </div>
      <span className="cart-row__total"><Price value={row.lineTotal} /></span>
      <button type="button" className="cart-row__remove" onClick={() => onChange(row.id, 'remove-line')} aria-label={`حذف ${row.name}`}>×</button>
    </li>
  )
}
