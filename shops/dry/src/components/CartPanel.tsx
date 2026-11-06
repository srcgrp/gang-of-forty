import { formatNumber } from '../features/products/catalog/format.ts'
import type { Card, CartLine } from '../shared/types.ts'

type CartPanelProps = {
  lines: CartLine[]
  cards: Card[]
  onRemove: (id: number) => void
}

export default function CartPanel({ lines, cards, onRemove }: CartPanelProps) {
  if (lines.length === 0) {
    return (
      <section className="cart-panel" id="cart">
        <h2>سبد خرید</h2>
        <p>سبد خرید شما خالی است.</p>
      </section>
    )
  }

  return (
    <section className="cart-panel" id="cart">
      <h2>سبد خرید</h2>
      <ul>
        {lines.map((line) => {
          const card = cards.find((c) => c.id === line.id)
          if (!card) return null
          return (
            <li key={line.id}>
              <span>{card.title}</span>
              <span>{formatNumber(line.qty)}</span>
              <button
                type="button"
                aria-label={`حذف ${card.title} از سبد`}
                onClick={() => onRemove(line.id)}
              >
                حذف
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}