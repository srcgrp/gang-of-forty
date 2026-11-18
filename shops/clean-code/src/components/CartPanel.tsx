import { cartRows, cartTotal } from "../features/cart/rows.ts";
import { useCartDispatch, useCartLines } from "../hooks/useCart.ts";
import type { Offer, Product } from "../types/product.ts";

type CartPanelProps = {
  products: Product[];
  offers: Offer[];
};

export default function CartPanel({ products, offers }: CartPanelProps) {
  const lines = useCartLines();
  const dispatch = useCartDispatch();
  const rows = cartRows(lines, products);
  const total = cartTotal(rows, offers);

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
        <button
          type="button"
          id="clear-cart"
          onClick={function () {
            dispatch({ type: "clear" });
          }}
        >
          خالی کردن سبد
        </button>
      </section>
    </aside>
  );
}
