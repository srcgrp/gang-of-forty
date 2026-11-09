import type { CartLine } from "../scripts/types";
import Price from "./Price.tsx";

const format = new Intl.NumberFormat("fa-IR");

type CartPanelProps = {
  lines: CartLine[];
  count: number;
  total: number;
  onRemove: (id: number) => void;
};

export default function CartPanel({
  lines,
  count,
  total,
  onRemove,
}: CartPanelProps) {
  return (
    <div className="cart-dropdown-wrap">
      <button className="cart-button" id="cart-button" type="button">
        <span className="cart-icon">🛒</span>
        <span className="cart-text">سبد خرید </span>
        <span className="cart-notification" id="cart-count">
          {format.format(count)}
        </span>
      </button>
      <div className="cart-dropdown" id="cart-dropdown">
        <div className="cart-dropdown-items" id="cart-dropdown-items">
          {lines.length === 0 ? (
            <p className="cart-empty">سبد خرید شما خالی است</p>
          ) : (
            <>
              {lines.map((line) => (
                <div key={line.id} className="cart-dropdown-item">
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
              ))}
              <div className="cart-dropdown-total">
                <span>جمع:</span>
                <Price value={total} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
