import type { CartLine } from "../types";
import { formatPrice } from "../shared/ui/format";
import { useAutoAnimate } from "../hooks/useAutoAnimate";

interface CartPanelProps {
  cart: CartLine[];
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
}

export function CartPanel({
  cart,
  onIncrease,
  onDecrease,
  onRemove,
  onCheckout,
}: CartPanelProps) {
  const ulRef = useAutoAnimate<HTMLUListElement>();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <span className="cart-empty__icon" aria-hidden="true">
          🛒
        </span>
        <p className="cart-empty__text">سبد خرید شما خالی است</p>
        <p className="cart-empty__hint">محصولی به سبد اضافه کنید</p>
      </div>
    );
  }

  return (
    <>
      <ul ref={ulRef} className="cart-list">
        {cart.map((item) => (
          <li key={item.id} className="cart-item">
            <div className="cart-item__media" aria-hidden="true">
              📦
            </div>
            <div className="cart-item__info">
              <h4 className="cart-item__name">{item.name}</h4>
            </div>
            <div className="cart-item__controls">
              <button
                type="button"
                className="cart-item__btn"
                onClick={() => onDecrease(item.id)}
                aria-label="کم کردن"
              >
                −
              </button>
              <span className="cart-item__qty">
                {item.quantity.toLocaleString("fa-IR")}
              </span>
              <button
                type="button"
                className="cart-item__btn"
                onClick={() => onIncrease(item.id)}
                aria-label="زیاد کردن"
              >
                +
              </button>
            </div>
            <div className="cart-item__price">
              {formatPrice(item.price * item.quantity)}
            </div>
            <button
              type="button"
              className="cart-item__remove"
              onClick={() => onRemove(item.id)}
              aria-label="حذف"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
      <div className="cart-total">
        <span className="cart-total__label">جمع کل:</span>
        <span className="cart-total__value">{formatPrice(total)}</span>
      </div>
      <button type="button" className="btn btn--primary" onClick={onCheckout}>
        تسویه حساب
      </button>
    </>
  );
}
