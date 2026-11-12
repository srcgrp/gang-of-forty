import type { CartLine, Product } from '../types';
import { formatCount, formatPrice } from '../utils/format';

type CartPanelProps = {
  open: boolean;
  cart: CartLine[];
  products: Product[];
  total: number;
  onRemove: (productId: number) => void;
};

export default function CartPanel({
  open,
  cart,
  products,
  total,
  onRemove,
}: CartPanelProps) {
  return (
    <aside id="cart-panel" hidden={!open}>
      <h2>سبد خرید</h2>
      {cart.length === 0 ? (
        <p>سبد خرید خالی است.</p>
      ) : (
        <ul>
          {cart.map((line) => {
            const product = products.find((item) => item.id === line.productId);
            if (!product) return null;

            return (
              <li key={line.productId}>
                <span>
                  {product.name} × {formatCount(line.qty)} —{' '}
                  {formatPrice(product.price * line.qty)}
                </span>
                <button
                  type="button"
                  aria-label={`حذف ${product.name} از سبد خرید`}
                  onClick={() => onRemove(line.productId)}
                >
                  حذف
                </button>
              </li>
            );
          })}
        </ul>
      )}
      <p>جمع کل: {formatPrice(total)}</p>
    </aside>
  );
}
