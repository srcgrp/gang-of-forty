import type { CartLine } from "../../types";
import { formatPrice } from "../shared/ui/format";

export function CartPanel({ cart }: { cart: CartLine[] }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-panel">
      <h3>سبد خرید ({cart.length})</h3>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} x{item.quantity}
          </li>
        ))}
      </ul>
      <div className="cart-total">
        <span>جمع کل:</span>
        <span>{formatPrice(total)}</span>
      </div>
    </div>
  );
}
