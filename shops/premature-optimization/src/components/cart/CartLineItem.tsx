import type { CartLine } from "../../scripts/types";
import { useCartStore } from "../../hooks/useCartStore.ts";
import { formatNumber } from "../../lib/formatNumber.ts";
import { removedFeedback } from "../../lib/animations/feedback.ts";

type CartLineItemProps = { line: CartLine };

export default function CartLineItem({ line }: CartLineItemProps) {
  const remove = useCartStore((state) => state.remove);

  function handleRemoveClick() {
    remove(line.id);
    removedFeedback();
  }

  return (
    <div className="cart-dropdown-item">
      <div className="cart-dropdown-details">
        <span className="cart-dropdown-name">{line.name}</span>
        <span className="cart-dropdown-quantity">
          تعداد: {formatNumber(line.quantity)}
        </span>
      </div>
      <button
        className="cart-remove-button"
        type="button"
        aria-label={`حذف ${line.name} از سبد خرید`}
        onClick={handleRemoveClick}
      >
        ❌
      </button>
    </div>
  );
}
