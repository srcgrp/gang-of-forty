import { formatNumber, formatPrice } from "../format/formatting.ts";
import { cartTotal } from "../cart/cart-lines.ts";
import { useCartStore } from "../hooks/useCartStore.ts";

export default function CartPanel() {
  const lines = useCartStore((s) => s.lines);
  const remove = useCartStore((s) => s.remove);
  const total = cartTotal(lines);

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
              <button type="button" onClick={() => remove(line.id)}>
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
