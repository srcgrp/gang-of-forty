import type { CartItem } from "../types/product.ts";

type CartPanelProps = {
  rows: CartItem[];
  total: number;
  onClear: () => void;
};

export default function CartPanel({ rows, total, onClear }: CartPanelProps) {
  return (
    <aside className="cart-panel">
      <section id="cart">
        <h2>سبد خرید</h2>
        {rows.length === 0 ? (
          <p id="cart-text">سبد خالی است.</p>
        ) : (
          <ul id="cart-list">
            {rows.map(function (row) {
              return (
                <li key={row.id}>
                  {row.name} × {row.qty.toLocaleString("fa-IR")}
                </li>
              );
            })}
          </ul>
        )}
        <p>{total.toLocaleString("fa-IR")}</p>
        <button type="button" id="clear-cart" onClick={onClear}>
          خالی کردن سبد
        </button>
      </section>
    </aside>
  );
}
