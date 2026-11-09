import type { CartRowView } from "../features/cart/logic/view";
import type { CartAction } from "../shared/types/products";
import CartPanelItems from "./CartPanelItems";

type Props = {
  count: number;
  rows: CartRowView[];
  total: number;
  onAction: (action: CartAction, id: number) => void;
  onClear: () => void;
};

export default function CartPanel({
  count,
  rows,
  total,
  onAction,
  onClear,
}: Props) {
  return (
    <div className="cart-summary" id="cart-widget">
      <button
        type="button"
        className="cart-trigger"
        id="cart-trigger"
        aria-controls="cart-popover"
      >
        <img className="cart-icon" src="./asset/icons/cart.svg" alt="" />
        <span>سبد خرید</span>
        <span className="cart-count">
          {count.toLocaleString("fa-IR")}
        </span>
      </button>

      <section
        className="cart-popover"
        id="cart-popover"
        aria-label="جزئیات سبد خرید"
      >
        <div className="cart-popover-header">
          <h2>سبد خرید شما</h2>
          <button
            type="button"
            className="cart-clear"
            onClick={onClear}
            disabled={rows.length === 0}
          >
            خالی کردن
          </button>
        </div>

        <CartPanelItems rows={rows} onAction={onAction} />

        <div className="cart-popover-footer">
          <span>جمع کل:</span>
          <strong>{total.toLocaleString("fa-IR")} تومان</strong>
        </div>
      </section>
    </div>
  );
}