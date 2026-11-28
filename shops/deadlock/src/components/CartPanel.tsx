import type { Product } from "../types";
import { useCartStore } from "../hooks/useCartStore";
import { cartTotal } from "../features/cart/cartState";

type CartPanelProps = {
  products: Product[];
};

export default function CartPanel({ products }: CartPanelProps) {
  const cart = useCartStore((state) => state.lines);
  const removeFromCart = useCartStore((state) => state.remove);
  const total = cartTotal(cart, products);
  return (
    <aside className="cart-panel">
      <h2>سبد خرید</h2>
      {cart.length === 0 ? (
        <p>سبد خرید شما خالی است.</p>
      ) : (
        cart.map((line) => {
          const product = products.find((item) => item.id === line.productId);
          if (!product) return null;

          return (
            <div className="cart-row" key={line.productId}>
              <span>{product.name} <strong className="cart-multiply">×</strong> {line.quantity}</span>
              <button type="button" onClick={() => removeFromCart(line.productId)}>
                حذف
              </button>
            </div>
          );
        })
      )}
      <p>جمع: {total.toLocaleString("fa-IR")} تومان</p>
    </aside>
  );
}
