import type { CartLine } from "../types";
import { formatPrice } from "../shared/ui/format";

interface Props {
  item: CartLine;
  available?: number | undefined;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
}

export function CartItemRow({
  item,
  available,
  onIncrease,
  onDecrease,
  onRemove,
}: Props) {
  const maxed = available !== undefined && item.quantity >= available;

  return (
    <li className="cart-item">
      <div className="cart-item__media" aria-hidden="true">
        {item.emoji || "📦"}
      </div>
      <div className="cart-item__info">
        <h4 className="cart-item__name">{item.name}</h4>
        {available !== undefined && (
          <p className="cart-item__stock cart-item__stock--ok">
            موجودی: {available.toLocaleString("fa-IR")}
          </p>
        )}
      </div>
      <div className="cart-item__controls">
        <button
          type="button"
          className="cart-item__btn"
          onClick={() => onDecrease(item.id)}
          aria-label="کم کردن"
        >
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M5 12h14" />
          </svg>
        </button>
        <span className="cart-item__qty">
          {item.quantity.toLocaleString("fa-IR")}
        </span>
        <button
          type="button"
          className="cart-item__btn"
          onClick={() => onIncrease(item.id)}
          disabled={maxed}
          aria-label={maxed ? "به سقف موجودی رسیدید" : "زیاد کردن"}
        >
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>
      <div className="cart-item__price">
        {formatPrice(item.price * item.quantity)}
      </div>
      <button
        type="button"
        className="cart-item__remove"
        onClick={() => onRemove(item.id)}
        aria-label="حذف"
      >
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </li>
  );
}
