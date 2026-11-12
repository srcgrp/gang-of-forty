import type { CartItem } from '../types';
import { formatMoney, toPersianDigits } from '../format/price';

const FREE_SHIPPING_THRESHOLD = 1_000_000;

type CartPanelProps = {
  items: CartItem[];
  open: boolean;
  onClose: () => void;
  onChangeQuantity: (productId: number, delta: number) => void;
};

export default function CartPanel({ items, open, onClose, onChangeQuantity }: CartPanelProps) {
  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const remaining = FREE_SHIPPING_THRESHOLD - total;

  return (
    <aside className={`cart-panel${open ? ' is-open' : ''}`} aria-label="سبد خرید" aria-hidden={!open}>
      <div className="cart-panel-head">
        <h2>سبد خرید</h2>
        <button type="button" className="cart-panel-close" aria-label="بستن سبد خرید" onClick={onClose}>
          ✕
        </button>
      </div>

      {items.length === 0 ? (
        <p className="cart-empty">سبد خرید شما خالی است.</p>
      ) : (
        <ul className="cart-list">
          {items.map(({ product, quantity }) => (
            <li className="cart-item" key={product.id}>
              <span className="cart-item-emoji" aria-hidden="true">{product.emoji}</span>
              <div className="cart-item-info">
                <h3>{product.name}</h3>
                <p>{formatMoney(product.price * quantity)}</p>
              </div>
              <div className="cart-item-qty">
                <button type="button" aria-label="کم کردن" onClick={() => onChangeQuantity(product.id, -1)}>−</button>
                <span>{toPersianDigits(quantity)}</span>
                <button type="button" aria-label="زیاد کردن" onClick={() => onChangeQuantity(product.id, 1)}>+</button>
              </div>
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