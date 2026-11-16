import type { CartLine } from "../../scripts/types";
import { useCartStore } from "../../hooks/useCartStore.ts";
import { removedFeedback } from "../../lib/animations/feedback.ts";

const format = new Intl.NumberFormat("fa-IR");

export default function CartLineItem({ line }: { line: CartLine }) {
  const remove = useCartStore((s) => s.remove);

  return (
    <div className="cart-dropdown-item">
      <div className="cart-dropdown-details">
        <span className="cart-dropdown-name">{line.name}</span>
        <span className="cart-dropdown-quantity">
          تعداد: {format.format(line.quantity)}
        </span>
      </div>
      <button
        className="cart-remove-button"
        type="button"
        aria-label={`حذف ${line.name} از سبد خرید`}
        onClick={() => {
          remove(line.id);
          removedFeedback();
        }}
      >
        ❌
      </button>
    </div>
  );
}
