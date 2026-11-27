import type { CartRowView } from "../features/cart/logic/view";
import type { CartAction } from "../shared/types/products";
import CartItemRow from "./CartItemRow";

type Props = {
  rows: CartRowView[];
  onAction: (action: CartAction, id: number) => void;
};

export default function CartPanelItems({ rows, onAction }: Props) {
  return (
    <div className="cart-popover-items">
      {rows.length === 0 ? (
        <p className="cart-empty">سبد خرید شما خالی است.</p>
      ) : (
        rows.map((item) => (
          <CartItemRow
            key={item.id}
            item={item}
            onAction={onAction}
          />
        ))
      )}
    </div>
  );
}