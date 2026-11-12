import type { CartLine } from '../types';
import { formatMoney, toPersianDigits } from '../format/price';

const FREE_SHIPPING_THRESHOLD = 1_000_000;

type CartPanelProps = {
  lines: CartLine[];
  total: number;
  open: boolean;
  onClose: () => void;
  onRemove: (id: number) => void;
};

export default function CartPanel({ lines, total, open, onClose, onRemove }: CartPanelProps) {
  const remaining = FREE_SHIPPING_THRESHOLD - total;

  return (
    <aside className={`cart-panel${open ? ' is-open' : ''}`} aria-label="سبد خرید" aria-hidden={!open}>
      <div className="cart-panel-head">
        <h2>سبد خرید</h2>
        <button type="button" className="cart-panel-close" aria-label="بستن سبد خرید" onClick={onClose}>
          ✕
        </button>
      </div>

      {lines.length === 0 ? (
        <p className="cart-empty">سبد خرید شما خالی است.</p>
      ) : (
        <ul className="cart-list">
          {lines.map((line) => (
            <li className="cart-item" key={line.id}>
              <div className="cart-item-info">
                <h3>{line.name}</h3>
                <p>
                  {toPersianDigits(line.quantity)} × {formatMoney(line.price)}
                </p>
              </div>
              <strong className="cart-item-total">{formatMoney(line.price * line.quantity)}</strong>
              <button
                type="button"
                className="cart-item-remove"
                aria-label={`حذف ${line.name}`}
                onClick={() => onRemove(line.id)}
              >
                حذف
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="cart-summary">
        <p className="cart-shipping">
          {remaining > 0
            ? `${formatMoney(remaining)} دیگر تا ارسال رایگان`
            : 'ارسال سفارش شما رایگان است 🚚'}
        </p>
        <p className="cart-total">
          <span>جمع کل:</span> <strong>{formatMoney(total)}</strong>
        </p>
      </div>
    </aside>
  );
}