import type { Product } from "../types";
import { formatPrice } from "../shared/ui/format";

interface Props {
  products: Product[];
  wishlistIds: number[];
  onRemove: (id: number) => void;
  onAdd: (p: Product) => void;
  onClose: () => void;
  onClear: () => void;
}

export function WishlistPanel({
  products,
  wishlistIds,
  onRemove,
  onAdd,
  onClose,
  onClear,
}: Props) {
  const items = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div
      className="modal modal--open"
      role="dialog"
      aria-modal="true"
      aria-labelledby="wishlist-title"
    >
      <div className="modal__overlay" onClick={onClose} />
      <div className="modal__content">
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
              {items.map((p) => (
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
                    className="wishlist-item__add"
                    onClick={() => onAdd(p)}
                    aria-label="افزودن به سبد"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
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
                    >
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </button>
                </li>
              ))}
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
      </div>
    </div>
  );
}
