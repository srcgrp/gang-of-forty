import { formatNumber, formatPrice } from "../format";
import type { CartLine } from "../types";

type Props = {
  line: CartLine;
  onChange: (id: number, delta: number) => void;
};

export default function CartRow({ line, onChange }: Props) {
  const last = line.qty === 1;
  return (
    <li className="cart-row">
      <span className="cart-thumb" aria-hidden="true">{line.emoji}</span>
      <div className="cart-info">
        <span className="cart-name">{line.name}</span>
        <span className="cart-meta">{line.unit} · {formatPrice(line.price)}</span>
      </div>
      <div className="cart-stepper">
        <button
          type="button"
          aria-label={last ? `حذف ${line.name} از سبد خرید` : `کم کردن تعداد ${line.name}`}
          onClick={() => onChange(line.id, -1)}
        >
          {last ? (
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12" /><path d="M9 7V4h6v3" /></svg>
          ) : "−"}
        </button>
        <span aria-live="polite">{formatNumber(line.qty)}</span>
        <button type="button" aria-label={`زیاد کردن تعداد ${line.name}`} onClick={() => onChange(line.id, 1)}>+</button>
      </div>
      <span className="cart-line-total">{formatPrice(line.price * line.qty)}</span>
    </li>
  );
}