import { useEffect } from 'react'
import { formatNumber } from '../features/products/catalog/format.ts'

type CartRow = { id: number; title: string; qty: number }

type CartPanelProps = {
  rows: CartRow[]
  total: number
  open: boolean
  onClose: () => void
  onRemove: (id: number) => void
}

export default function CartPanel({ rows, total, open, onClose, onRemove }: CartPanelProps) {
  useEffect(() => {
    if (!open) return undefined
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <>
      <div className={open ? 'cart-backdrop open' : 'cart-backdrop'} onClick={onClose} />
      <aside className={open ? 'cart-panel open' : 'cart-panel'} id="cart" aria-label="سبد خرید">
        <div className="cart-head">
          <h2>سبد خرید</h2>
          <button type="button" className="cart-close" aria-label="بستن سبد خرید" onClick={onClose}>✕</button>
        </div>
        {rows.length === 0 ? (
          <p className="cart-empty">سبد خرید شما خالی است.</p>
        ) : (
          <>
            <ul>
              {rows.map((row) => (
                <li key={row.id}>
                  <span>{row.title}</span>
                  <span>{formatNumber(row.qty)}</span>
                  <button type="button" aria-label={`حذف ${row.title} از سبد`} onClick={() => onRemove(row.id)}>حذف</button>
                </li>
              ))}
            </ul>
            <p className="cart-total">جمع کل: {formatNumber(total)} تومان</p>
          </>
        )}
      </aside>
    </>
  )
}