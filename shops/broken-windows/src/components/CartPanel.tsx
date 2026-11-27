import { Link } from "@tanstack/react-router";
import CartRow from "./CartRow";
import { formatNumber, formatPrice } from "../format";
import { cartCount, cartTotal } from "../cart/totals";
import { useCartStore } from "../hooks/useCartStore";
type Props = { id?: string; onNavigate?: () => void };
export default function CartPanel({ id = "cart-panel", onNavigate }: Props) {
  const cart = useCartStore((s) => s.lines);
  const change = useCartStore((s) => s.change);
  const clear = useCartStore((s) => s.clear);

  return (
    <aside className="cart-panel" id={id}>
      <div className="cart-card">
        <div className="cart-items">
          <h2 className="items-header">
            سبد خرید
            {cart.length > 0 && (
              <>        <span className="cart-items-count">{formatNumber(cartCount(cart))} کالا</span>
          
              <button
        type="button"
        className="cart-clear"
        onClick={clear}
      >
        خالی کردن سبد
      </button>
        </>
            )}
          </h2>
          {cart.length === 0 ? (
            <p className="cart-empty">سبد خرید خالی است.</p>
          ) : (
            <ul className="cart-list">
              {cart.map((line) => (
                <CartRow key={line.id} line={line} onChange={change} />
              ))}
            </ul>
          )}
        </div>
        {cart.length > 0 && (
          <div className="cart-summary">
            <p className="cart-total">
              <span>قابل پرداخت</span>
              <strong>{formatPrice(cartTotal(cart))}</strong>
            </p>
            <Link to="/checkout" className="cart-checkout" onClick={onNavigate}>ثبت سفارش</Link>
            <p className="cart-note">ارسال رایگان برای خرید بالای ۲۰۰ هزار تومان</p>
          </div>
        )}
      </div>
    </aside>
  );
}