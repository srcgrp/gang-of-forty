import type { CartLine, Product } from "../types";
import { formatPrice } from "../shared/ui/format";
import { Modal } from "./Modal";

interface Props {
  isOpen: boolean;
  products: Product[];
  wishlistIds: number[];
  cart: CartLine[];
  onRemove: (id: number) => void;
  onAdd: (p: Product) => void;
  onClose: () => void;
  onClear: () => void;
}

export function WishlistPanel({
  isOpen,
  products,
  wishlistIds,
  cart,
  onRemove,
  onAdd,
  onClose,
  onClear,
}: Props) {
  const items = products.filter((p) => wishlistIds.includes(p.id));
  const cartMap = new Map(cart.map((i) => [i.id, i.quantity]));

  return (
    <Modal isOpen={isOpen} onClose={onClose} labelledBy="wishlist-title">
      <header className="modal__header">
        <h2 className="modal__title" id="wishlist-title">
          <span aria-hidden="true">❤️</span> علاقه‌مندی‌ها
          {items.length > 0 && (
            <span className="wishlist-count">
              {items.length.toLocaleString("fa-IR")}
            </span>
          )}
        </h2>
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="بستن"
        >
          ✕
        </button>
      </header>

      <div className="modal__body">
        {items.length === 0 ? (
          <div className="wishlist-empty">
            <span className="wishlist-empty__icon" aria-hidden="true">
              💔
            </span>
            <p className="wishlist-empty__title">
              هنوز محصولی به علاقه‌مندی‌ها اضافه نکردی
            </p>
            <p className="wishlist-empty__hint">
              روی قلب روی هر محصول بزن تا اینجا ذخیره شود
            </p>
          </div>
        ) : (
          <ul className="wishlist-list">
            {items.map((p) => {
              const inCart = (cartMap.get(p.id) ?? 0) > 0;
              return (
                <li key={p.id} className="wishlist-item">
                  <span className="wishlist-item__emoji" aria-hidden="true">
                    {p.emoji || "📦"}
                  </span>
                  <div className="wishlist-item__info">
                    <strong className="wishlist-item__name">{p.name}</strong>
                    <small className="wishlist-item__price">
                      {formatPrice(p.price)}
                    </small>
                  </div>
                  <button
                    type="button"
                    className={`wishlist-item__add ${inCart ? "is-added" : ""}`}
                    onClick={() => {
                      if (!inCart) onAdd(p);
                    }}
                    disabled={inCart}
                    aria-label={inCart ? "به سبد اضافه شد" : "افزودن به سبد"}
                  >
                    {inCart ? (
                      <svg
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        aria-hidden="true"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    )}
                  </button>
                  <button
                    type="button"
                    className="wishlist-item__remove"
                    onClick={() => onRemove(p.id)}
                    aria-label="حذف از علاقه‌مندی"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {items.length > 0 && (
        <footer className="modal__footer">
          <button type="button" className="btn btn--ghost" onClick={onClear}>
            پاک کردن همه
          </button>
        </footer>
      )}
    </Modal>
  );
}
