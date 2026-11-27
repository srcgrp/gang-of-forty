
import type { CartItem } from '../types';

interface CartPanelProps {
  readonly cart: CartItem[];
  readonly totalPrice: number;
  readonly onRemove: (productId: string) => void;
}

export function CartPanel({
  cart,
  totalPrice,
  onRemove,
}: CartPanelProps) {
  return (
    <aside className="cart-panel" aria-label="سبد خرید">
      <h2>سبد خرید</h2>

      {cart.length === 0 ? (
        <p className="empty-cart-message">
          سبد خرید شما خالی است.
        </p>
      ) : (
        <ul className="cart-items-list">
          {cart.map((item) => (
            <li
              key={item.product.id}
              className="cart-item"
            >
              <span className="cart-item-name">
                {item.product.title}
              </span>

              <span className="cart-item-qty">
                {item.quantity.toLocaleString('fa-IR')} عدد
              </span>

              <span className="cart-item-price">
                {(item.product.finalPrice * item.quantity)
                  .toLocaleString('fa-IR')} تومان
              </span>

              <button
                type="button"
                className="btn-remove"
                onClick={() =>
                  onRemove(String(item.product.id))
                }
                aria-label={`حذف ${item.product.title} از سبد`}
              >
                حذف
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="cart-summary">
        <strong>جمع کل: </strong>
        <span>
          {totalPrice.toLocaleString('fa-IR')} تومان
        </span>
      </div>
    </aside>
  );
}
