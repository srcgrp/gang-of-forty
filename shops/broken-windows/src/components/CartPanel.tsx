import type { CartLine } from "../types"; // import only the type
import { formatNumber, formatPrice } from "../ui/format"; // existing formatters

type Props = { // the props this component receives
  cart: CartLine[]; // lines to show
  total: number; // total computed in App
  onRemove: (id: number) => void; // tells App which line to remove
};

export default function CartPanel({ cart, total, onRemove }: Props) { // destructure props
  return (
    <aside className="cart-panel" id="cart-panel">
      {/* Panel title */}
      <h2 className="items-header">سبد خرید</h2>

      {/* Show a message if the cart is empty, otherwise show the list */}
      {cart.length === 0 ? (
        <p>سبد خرید خالی است.</p>
      ) : (
        <ul className="cart-list">
          {/* One row per cart line */}
          {cart.map((line) => (
            // key is the product id, unique inside the cart
            <li className="cart-row" key={line.id}>
              {/* Emoji and name */}
              <span>{line.emoji} {line.name}</span>
              {/* Unit like "1 kg" */}
              <span>{line.unit}</span>
              {/* Quantity */}
              <span>× {formatNumber(line.qty)}</span>
              {/* Line price = unit price * quantity */}
              <span>{formatPrice(line.price * line.qty)}</span>
              {/* Remove button */}
              <button
                type="button" // never submits a form
                aria-label={`حذف ${line.name} از سبد خرید`} // accessible name
                onClick={() => onRemove(line.id)} // report the click to App
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Total price */}
      <p className="cart-total">جمع: {formatPrice(total)}</p>
    </aside>
  );
}