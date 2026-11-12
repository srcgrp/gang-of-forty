import { useEffect } from 'react';
import type { Cart } from '../types';
import { cartTotal } from '../cart/cartLines';
import { DEFAULT_CURRENCY, formatMoney, toPersianDigits } from '../format/price';

type CartPanelProps = {
  cart: Cart;
  open: boolean;
  onClose: () => void;
  onRemove: (id: number) => void;
};

export default function CartPanel({ cart, open, onClose, onRemove }: CartPanelProps) {
  const lines = Object.values(cart);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <>
      <div className={`cart-overlay${open ? ' is-open' : ''}`} onClick={onClose} aria-hidden="true" />
      <aside
        className={`cart-panel${open ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="سبد خرید"
        aria-hidden={!open}
      >
        <div className="cart-panel-head">
          <h2 className="cart-panel-title">سبد خرید</h2>
          <button type="button" className="cart-panel-close" aria-label="بستن سبد خرید" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>

        {lines.length === 0 ? (
          <p className="cart-panel-empty">سبد خرید شما خالی است.</p>
        ) : (
          <>
            <ul className="cart-lines">
              {lines.map((line) => (
                <li key={line.id} className="cart-line">
                  <div className="cart-line-info">
                    <span className="cart-line-name">{line.name}</span>
                    <span className="cart-line-meta">
                      {toPersianDigits(line.quantity)} × {formatMoney(line.price, DEFAULT_CURRENCY)}
                    </span>
                  </div>
                  <span className="cart-line-total">{formatMoney(line.price * line.quantity, DEFAULT_CURRENCY)}</span>
                  <button type="button" className="cart-line-remove" aria-label={`حذف ${line.name}`}
                    onClick={() => onRemove(line.id)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12h10l1-12M9 7V4h6v3" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
            <div className="cart-panel-foot">
              <span>جمع کل</span>
              <strong>{formatMoney(cartTotal(cart), DEFAULT_CURRENCY)}</strong>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
