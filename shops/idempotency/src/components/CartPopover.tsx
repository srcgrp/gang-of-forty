
import type { CartRowView } from "../features/cart/logic/view";
import type { CartAction } from "../shared/types/products";
import { useCartStore } from "../hooks/useCartStore";
import CartPanelItems from "./CartPanelItems";

type Props = {
  rows: CartRowView[];
  total: number;
  onAction: (action: CartAction, id: number) => void;
};

export default function CartPopover({
  rows,
  total,
  onAction,
}: Props) {
  const clear = useCartStore((state) => state.clear);
  return (
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
          onClick={clear}
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
  );
}
