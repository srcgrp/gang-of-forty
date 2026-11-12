import { useEffect, useRef } from 'react'
import type { AppState, CartChange } from '../shared/types'
import Price from './Price'
import CartItem from './CartItem'
import { cartRows, cartTotal } from '../features/cart/cart-rows'
import { usePanelFocus } from '../hooks/usePanelFocus'

type CartPanelProps = {
  open: boolean
  data: AppState
  onClose: () => void
  onCartChange: (id: number, change: CartChange) => void
}

export default function CartPanel({ open, data, onClose, onCartChange }: CartPanelProps) {
  const panelRef = useRef<HTMLElement>(null)
  usePanelFocus(open, panelRef)

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    function onClick(e: MouseEvent) {
      if (e.target instanceof Element && e.target.closest('[aria-controls="cart-panel"]')) return
      if (e.target instanceof Node && panelRef.current && !panelRef.current.contains(e.target)) onClose()
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [open, onClose])

  const rows = cartRows(data.cart, data.products, data.offerMap)
  const total = cartTotal(rows)

  return (
    <aside ref={panelRef} id="cart-panel" className="cart-panel" hidden={!open} aria-label="سبد خرید">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="cart-panel__title">سبد خرید</h2>
        <button type="button" onClick={onClose} aria-label="بستن سبد" data-initial-focus="">×</button>
      </div>

      <ul className="cart-panel__list">
        {rows.length === 0 ? (
          <li className="cart-row cart-row--empty">سبد خرید خالی است</li>
        ) : (
          rows.map((row) => <CartItem key={row.id} row={row} stock={data.stock} onChange={onCartChange} />)
        )}
      </ul>

      <div className="cart-panel__total">
        <span>جمع تقریبی:</span>
        <strong><Price value={total} /></strong>
      </div>
    </aside>
  )
}
