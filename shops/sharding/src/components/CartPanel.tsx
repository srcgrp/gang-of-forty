import { useEffect, useRef } from 'react'
import type { Product, Cart, Offer } from '../shared/types'
import Price from './Price'
import { finalPrice } from '../shared/logic/pricing'

type CartPanelProps = {
  open: boolean
  cart: Cart
  products: Product[]
  offerMap: Map<number, Offer>
  onClose: () => void
  onRemoveLine: (id: number) => void
}

export default function CartPanel({ open, cart, products, offerMap, onClose, onRemoveLine }: CartPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    function onClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [open, onClose])

  const rows = Object.entries(cart)
    .map(([id, qty]) => {
      const product = products.find((p) => p.id === Number(id))
      if (!product) return null
      const unitPrice = finalPrice(product.price, offerMap.get(product.id))
      return { product, qty, linePrice: unitPrice * qty }
    })
    .filter((r): r is { product: Product; qty: number; linePrice: number } => r !== null)

  const total = rows.reduce((sum, r) => sum + r.linePrice, 0)

  return (
    <aside ref={panelRef} id="cart-panel" className="cart-panel" hidden={!open} aria-label="سبد خرید">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="cart-panel__title">سبد خرید</h2>
        <button type="button" onClick={onClose} aria-label="بستن سبد">×</button>
      </div>

      <ul className="cart-panel__list">
        {rows.length === 0 ? (
          <li className="cart-row cart-row--empty">سبد خرید خالی است</li>
        ) : (
          rows.map((r) => (
            <li key={r.product.id} className="cart-row">
              <span className="cart-row__name">{r.product.name}</span>
              <span className="cart-row__qty">{r.qty} ×</span>
              <span className="cart-row__total"><Price value={r.linePrice} /></span>
              <button type="button" className="cart-row__remove" onClick={() => onRemoveLine(r.product.id)} aria-label={`حذف ${r.product.name}`}>×</button>
            </li>
          ))
        )}
      </ul>

      <div className="cart-panel__total">
        <span>جمع تقریبی:</span>
        <strong><Price value={total} /></strong>
      </div>
    </aside>
  )
}