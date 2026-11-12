import type { CartLine } from '../types';

interface CartPanelProps {
  cart: CartLine[];
  total: number;
}

export function CartPanel({ cart, total }: CartPanelProps) {
  if (cart.length === 0) return null;

  return (
    <div className="cart-panel" style={{ padding: '20px', background: '#fff', borderTop: '2px solid #ccc' }}>
      <h3>سبد خرید</h3>
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            {item.name} - {item.quantity} عدد - {new Intl.NumberFormat('fa-IR').format(item.price * item.quantity)} تومان
          </li>
        ))}
      </ul>
      <strong>جمع کل: {new Intl.NumberFormat('fa-IR').format(total)} تومان</strong>
    </div>
  );
}