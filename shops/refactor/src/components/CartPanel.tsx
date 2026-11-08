import type { CartLine } from '../types'
import { formatNumber, money } from './format'

type CartPanelProps = { lines: CartLine[]; total: number }

export default function CartPanel({ lines, total }: CartPanelProps) {
  return (
    <section className="cart-panel container" id="cart" aria-labelledby="cart-title">
      <h2 className="section-title" id="cart-title">سبد خرید</h2>
      {lines.length === 0 ? (
        <p className="empty-message">سبد خرید خالی است.</p>
      ) : (
        <ul className="cart-rows">
          {lines.map((line) => (
            <li className="cart-row" key={line.id}>
              <span aria-hidden="true">{line.emoji}</span>
              <span className="cart-row-name">{line.name}</span>
              <span>{formatNumber(line.quantity)} ×</span>
              <strong>{money(line.subtotal)}</strong>
            </li>
          ))}
        </ul>
      )}
      <p className="cart-total">جمع کل: <strong>{money(total)}</strong></p>
    </section>
  )
}
