import type { CartLine, Product } from "../types";

type CartPanelProps = {
  cart: CartLine[];
  products: Product[];
  total: number;
  onRemove: (productId: number) => void;
};

export default function CartPanel({
  cart,
  products,
  total,
  onRemove,
}: CartPanelProps) {
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
              <span>{product.name} × {line.quantity}</span>
              <button type="button" onClick={() => onRemove(line.productId)}>
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
