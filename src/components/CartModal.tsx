import type { CartLine, StockData } from "../types";
import { CartPanel } from "./CartPanel";

interface Props {
  isOpen: boolean;
  cart: CartLine[];
  stock: StockData;
  onClose: () => void;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
}

export function CartModal(props: Props) {
  if (!props.isOpen) return null;
  return (
    <div
      className="modal modal--open"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-modal-title"
    >
      <div className="modal__overlay" onClick={props.onClose} />
      <div className="modal__content modal__content--cart">
        <header className="modal__header">
          <h2 className="modal__title" id="cart-modal-title">
            <span aria-hidden="true">🛒</span> سبد خرید
          </h2>
          <button
            type="button"
            className="modal__close"
            onClick={props.onClose}
            aria-label="بستن"
          >
            ✕
          </button>
        </header>
        <div className="modal__body">
          <CartPanel
            cart={props.cart}
            stock={props.stock}
            onIncrease={props.onIncrease}
            onDecrease={props.onDecrease}
            onRemove={props.onRemove}
            onCheckout={props.onCheckout}
          />
        </div>
      </div>
    </div>
  );
}
