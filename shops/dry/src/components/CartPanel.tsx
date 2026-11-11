import { formatNumber } from '../features/products/catalog/format.ts'

type CartRow = { id: number; title: string; qty: number }

type CartPanelProps = {
  rows: CartRow[]
  total: number
  onRemove: (id: number) => void
}

export default function CartPanel({ rows, total, onRemove }: CartPanelProps) {
  return (
    <section className="cart-panel" id="cart">
      <h2>سبد خرید</h2>
      {rows.length === 0 ? (
        <p>سبد خرید شما خالی است.</p>
      ) : (
        <>
          <ul>
            {rows.map((row) => (
              <li key={row.id}>
                <span>{row.title}</span>
                <span>{formatNumber(row.qty)}</span>
                <button
                  type="button"
                  aria-label={`حذف ${row.title} از سبد`}
                  onClick={() => onRemove(row.id)}
                >
                  حذف
                </button>
              </li>
            ))}
          </ul>
          <p className="cart-total">جمع کل: {formatNumber(total)} تومان</p>
        </>
      )}
    </section>
  )
}