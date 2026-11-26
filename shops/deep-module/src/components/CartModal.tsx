import type { StockData } from "../types";
import { useUiStore } from "../hooks/useUiStore";
import { CartPanel } from "./CartPanel";
import { Modal } from "./Modal";

export function CartModal({ stock }: { stock: StockData }) {
  const isOpen = useUiStore((s) => s.cartOpen);
  const setCartOpen = useUiStore((s) => s.setCartOpen);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setCartOpen(false)}
      labelledBy="cart-modal-title"
      contentClassName="modal__content--cart modal__content--sheet"
    >
      <header className="modal__header">
        <h2 className="modal__title" id="cart-modal-title">
          <span aria-hidden="true">🛒</span> سبد خرید
        </h2>
        <button
          type="button"
          className="modal__close"
          onClick={() => setCartOpen(false)}
          aria-label="بستن"
        >
          ✕
        </button>
      </header>
      <div className="modal__body">
        <CartPanel stock={stock} onClose={() => setCartOpen(false)} />
      </div>
    </Modal>
  );
}
