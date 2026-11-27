import type { CartRowView } from "../features/cart/logic/view";
import type { CartAction } from "../shared/types/products";

type Props = {
  item: CartRowView;
  onAction: (action: CartAction, id: number) => void;
};

export default function CartItemStepper({ item, onAction }: Props) {
  return (
    <div className="cart-item-stepper">
      <button
        type="button"
        className="cart-item-action"
        disabled={!item.canIncrease}
        aria-label={`افزایش تعداد ${item.name}`}
        onClick={() => onAction("increase", item.id)}
      >
        +
      </button>

      <span className="cart-item-quantity-value">
        {item.quantity.toLocaleString("fa-IR")}
      </span>

      <button
        type="button"
        className="cart-item-action"
        aria-label={`کاهش تعداد ${item.name}`}
        onClick={() => onAction("decrease", item.id)}
      >
        −
      </button>
    </div>
  );
}