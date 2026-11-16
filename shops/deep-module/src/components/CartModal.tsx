import type { CartLine, StockData } from "../types";
import { CartPanel } from "./CartPanel";
import { Modal } from "./Modal";

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
  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      labelledBy="cart-modal-title"
      contentClassName="modal__content--cart"
    >
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
    </Modal>
  );
}
