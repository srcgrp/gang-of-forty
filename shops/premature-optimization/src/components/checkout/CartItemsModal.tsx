import { useEffect, useRef } from "react";
import type { CartLine } from "../../scripts/types";
import Price from "../shared/Price.tsx";

const format = new Intl.NumberFormat("fa-IR");

type CartItemsModalProps = {
  open: boolean;
  lines: CartLine[];
  onClose: () => void;
};

export default function CartItemsModal({
  open,
  lines,
  onClose,
}: CartItemsModalProps) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (open && !element.open) element.showModal();
    if (!open && element.open) element.close();
  }, [open]);

  return (
    <dialog
      className="checkout-modal"
      ref={dialog}
      aria-labelledby="checkout-modal-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="checkout-modal-header">
        <h3 id="checkout-modal-title">سبد خرید</h3>
        <button
          className="checkout-modal-close"
          type="button"
          aria-label="بستن"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
      <ul className="checkout-summary-lines checkout-modal-lines">
        <div className="checkout-modal-content">
          {lines.map((line) => (
            <li className="checkout-summary-line" key={line.id}>
              <span className="checkout-summary-name">
                {line.name}
                <span className="checkout-summary-quantity">
                  {" "}
                  × {format.format(line.quantity)}
                </span>
              </span>
              <Price value={line.price * line.quantity} />
            </li>
          ))}
        </div>
      </ul>
    </dialog>
  );
}
