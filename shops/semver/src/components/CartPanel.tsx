import { Link } from '@tanstack/react-router';
import type { Product } from '../types';
import { totalPrice } from '../cart/cart';
import { useCartStore } from '../hooks/useCartStore';
import { formatCount, formatPrice } from '../utils/format';

type CartPanelProps = {
  open: boolean;
  products: Product[];
  onCheckout: () => void;
};

export default function CartPanel({ open, products, onCheckout }: CartPanelProps) {
  const cart = useCartStore((state) => state.lines);
  const remove = useCartStore((state) => state.remove);
  const total = totalPrice(cart, products);

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
                  onClick={() => remove(line.productId)}
                >
                  حذف
                </button>
              </li>
            );
          })}
        </ul>
      )}
      <p className="cart-panel-total">جمع کل: {formatPrice(total)}</p>
      <Link className="catalog-link cart-panel-checkout" to="/checkout" onClick={onCheckout}>تسویه‌حساب</Link>
    </aside>
  );
}
