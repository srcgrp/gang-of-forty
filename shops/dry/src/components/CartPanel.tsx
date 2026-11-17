import { useEffect } from 'react'
import { cartSummary } from '../features/products/catalog/cartView.ts'
import { formatNumber } from '../features/products/catalog/format.ts'
import { useCartStore } from '../hooks/useCartStore.ts'
import type { LoadState } from '../shared/types.ts'

type CartPanelProps = {
  state: LoadState
  open: boolean
  onClose: () => void
}

function CartContent({ state }: { state: LoadState }) {
  const lines = useCartStore((s) => s.lines)
  const remove = useCartStore((s) => s.remove)
  const { rows, total } = cartSummary(state, lines)

  if (rows.length === 0) return <p className="cart-empty">سبد خرید شما خالی است.</p>
  return (
    <>
      <ul>
        {rows.map((row) => (
          <li key={row.id}>
            <span>{row.title}</span>
            <span>{formatNumber(row.qty)}</span>
            <button type="button" aria-label={`حذف ${row.title} از سبد`} onClick={() => remove(row.id)}>حذف</button>
          </li>
        ))}
      </ul>
      <p className="cart-total">جمع کل: {formatNumber(total)} تومان</p>
    </>
  )
}

export default function CartPanel({ state, open, onClose }: CartPanelProps) {
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
        {open && <CartContent state={state} />}
      </aside>
    </>
  )
}