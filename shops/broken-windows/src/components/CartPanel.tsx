import { Link } from "@tanstack/react-router";
import CartRow from "./CartRow";
import { formatNumber, formatPrice } from "../format";
import { cartCount, cartTotal } from "../cart/totals";
import { useCartStore } from "../hooks/useCartStore";

export default function CartPanel() {
  const cart = useCartStore((s) => s.lines);
  const change = useCartStore((s) => s.change);

  return (
    <aside className="cart-panel" id="cart-panel">
      <div className="cart-card">
        <div className="cart-items">
          <h2 className="items-header">
            سبد خرید
            {cart.length > 0 && (
              <span className="cart-items-count">{formatNumber(cartCount(cart))} کالا</span>
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
            <Link to="/checkout" className="cart-checkout">ثبت سفارش</Link>
            <p className="cart-note">ارسال رایگان برای خرید بالای ۲۰۰ هزار تومان</p>
          </div>
        )}
      </div>
    </aside>
  );
}