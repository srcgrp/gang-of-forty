import type { CartLine, StockData } from "../types";
import { formatPrice } from "../shared/ui/format";
import { useAutoAnimate } from "../hooks/useAutoAnimate";
import { CartItemRow } from "./CartItemRow";

interface CartPanelProps {
  cart: CartLine[];
  stock?: StockData | undefined;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
}

export function CartPanel({
  cart,
  stock,
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
          <CartItemRow
            key={item.id}
            item={item}
            available={stock?.items[item.id]}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            onRemove={onRemove}
          />
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
