import closeIcon from "../../icons/x.svg";
import type { CartItem } from "../shared/types";
import { formatNumber, formatPrice } from "../shared/format";

type Props = { cart: CartItem[]; total: number; onRemove: (id: number) => void;
  open: boolean; onClose: () => void;
};
export default function CartPanel({ cart, total, onRemove, open, onClose }: Props) {
  return (
    <section id="cart" className="cart-panel" hidden={!open} aria-labelledby="cart-title">
      <div className="cart-heading">
        <h2 id="cart-title">سبد خرید</h2>
        <button type="button" className="cart-close" onClick={onClose} aria-label="بستن سبد خرید">
          <img src={closeIcon} alt="" width="20" height="20" />
        </button>
      </div>
      {cart.length === 0 ? <p className="cart-empty">سبد خرید شما خالی است.</p> : (
        <ul className="cart-items">
          {cart.map(item => (
            <li key={item.id} className="cart-row">
              <div className="cart-item-info"><strong>{item.name}</strong>
                <p>{formatNumber(item.quantity)} عدد × {formatPrice(item.price)}</p>
              </div>
              <strong className="cart-line-price">{formatPrice(item.price * item.quantity)}</strong>
              <button type="button" className="cart-remove" onClick={() => onRemove(item.id)}
                aria-label={"حذف " + item.name + " از سبد"}>حذف</button>
            </li>
          ))}
        </ul>
      )}
      <div className="cart-total" aria-live="polite"><span>مجموع سبد</span><strong>{formatPrice(total)}</strong></div>
    </section>
  );
}
