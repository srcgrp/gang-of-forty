import type { CartLine } from "../../scripts/types";

const format = new Intl.NumberFormat("fa-IR");

type CartLineItemProps = { line: CartLine; onRemove: (id: number) => void };

export default function CartLineItem({ line, onRemove }: CartLineItemProps) {
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
        onClick={() => onRemove(line.id)}
      >
        ❌
      </button>
    </div>
  );
}
