import type { Product } from "../types";
import { useCartStore } from "../hooks/useCartStore";
import { useWishlistStore } from "../hooks/useWishlistStore";
import { useUiStore } from "../hooks/useUiStore";
import { faNum } from "../shared/ui/format";
import { Modal } from "./Modal";
import { WishlistItemRow } from "./WishlistItemRow";

export function WishlistPanel({ products }: { products: Product[] }) {
  const isOpen = useUiStore((s) => s.wishlistOpen);
  const setWishlistOpen = useUiStore((s) => s.setWishlistOpen);
  const ids = useWishlistStore((s) => s.ids);
  const remove = useWishlistStore((s) => s.remove);
  const clear = useWishlistStore((s) => s.clear);
  const cartItems = useCartStore((s) => s.items);
  const addToCart = useCartStore((s) => s.addToCart);

  const items = products.filter((p) => ids.includes(p.id));
  const cartIds = new Set(cartItems.map((i) => i.id));

  return (
    <Modal isOpen={isOpen} onClose={() => setWishlistOpen(false)} labelledBy="wishlist-title" contentClassName="modal__content--sheet">
      <header className="modal__header">
        <h2 className="modal__title" id="wishlist-title">
          <span aria-hidden="true">❤️</span> علاقه‌مندی‌ها
          {items.length > 0 && <span className="wishlist-count">{faNum(items.length)}</span>}
        </h2>
        <button type="button" className="modal__close" onClick={() => setWishlistOpen(false)} aria-label="بستن">✕</button>
      </header>
      <div className="modal__body">
        {items.length === 0 ? (
          <div className="wishlist-empty">
            <span className="wishlist-empty__icon" aria-hidden="true">💔</span>
            <p className="wishlist-empty__title">هنوز محصولی به علاقه‌مندی‌ها اضافه نکردی</p>
          </div>
        ) : (
          <ul className="wishlist-list">
            {items.map((p) => (
              <WishlistItemRow key={p.id} product={p} inCart={cartIds.has(p.id)} onAdd={addToCart} onRemove={remove} />
            ))}
          </ul>
        )}
      </div>
      {items.length > 0 && (
        <footer className="modal__footer">
          <button type="button" className="btn btn--ghost" onClick={clear}>پاک کردن همه</button>
        </footer>
      )}
    </Modal>
  );
}
