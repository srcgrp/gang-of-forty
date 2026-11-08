import type { CartItem } from "../types";

interface CartPanelProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: number, delta: number) => void;
}

export default function CartPanel({ isOpen, onClose, items, onUpdateQuantity }: CartPanelProps) {
  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-overlay" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className="cart-panel" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <div className="cart-header">
          <h2 id="cart-title">سبد خرید شما</h2>
          <button type="button" onClick={onClose} className="close-btn" aria-label="بستن">&times;</button>
        </div>
        <div className="cart-items">
          {items.length === 0 ? <p className="empty-cart">سبد خرید خالی است.</p> : items.map((item) => (
            <div key={item.productId} className="cart-item">
              <span>{item.name}</span>
              <div className="quantity-controls">
                <button type="button" onClick={() => onUpdateQuantity(item.productId, -1)} aria-label={`کم کردن ${item.name}`}>-</button>
                <span>{item.quantity.toLocaleString("fa-IR")}</span>
                <button type="button" onClick={() => onUpdateQuantity(item.productId, 1)} aria-label={`زیاد کردن ${item.name}`}>+</button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-footer">
          <div className="total-price">مجموع: <strong>{total.toLocaleString("fa-IR")} تومان</strong></div>
          <button className="checkout-btn" type="button" disabled={items.length === 0}>تکمیل خرید</button>
        </div>
      </section>
    </div>
  );
}
