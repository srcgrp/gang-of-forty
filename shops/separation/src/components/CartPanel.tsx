import type { CartItem } from '../types.ts'

export type CartPanelProps = {
  lines: CartItem[]
  total: number
  count: number
  onRemove: (id: number) => void
  onClear: () => void
}

export default function CartPanel({ lines, total, count, onRemove, onClear }: CartPanelProps) {
  return (
    <section id="cart" className="section">
      <h2>{`سبد خرید (${count.toLocaleString('fa-IR')})`}</h2>
      {lines.length === 0 ? (
        <p>سبد خالی است.</p>
      ) : (
        <>
          <ul>
            {lines.map((line) => (
              <li key={line.productId}>
                {`${line.product.emoji} ${line.product.name} × ${line.qty.toLocaleString('fa-IR')}`}
                <button type="button" onClick={() => onRemove(line.productId)}>
                  حذف
                </button>
              </li>
            ))}
          </ul>
          <p>{`جمع: ${total.toLocaleString('fa-IR')} تومان (تسویه نهایی با سرور)`}</p>
          <button type="button" onClick={onClear}>
            خالی کردن سبد
          </button>
        </>
      )}
    </section>
  )
}
