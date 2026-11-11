import type { CartLine } from "../types.ts";
import { formatNumber, formatPrice } from "../ui/formatting.ts";

type CartPanelProps = {
  lines: CartLine[];
  total: number;
  onRemove: (id: number) => void;
};

export default function CartPanel({ lines, total, onRemove }: CartPanelProps) {
  return (
    <section id="cart-panel" aria-labelledby="cart-panel-title">
      <h2 id="cart-panel-title">سبد خرید</h2>
      {lines.length === 0 ? (
        <p>سبد خالی است</p>
      ) : (
        <ul>
          {lines.map((line) => (
            <li key={line.id}>
              {line.name} × {formatNumber(line.quantity)} —{" "}
              {formatPrice(line.price * line.quantity)}
              <button type="button" onClick={() => onRemove(line.id)}>
                حذف {line.name} از سبد
              </button>
            </li>
          ))}
        </ul>
      )}
      <p>مجموع: {formatPrice(total)}</p>
    </section>
  );
}
