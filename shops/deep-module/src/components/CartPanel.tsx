import { Link } from "@tanstack/react-router";
import type { StockData } from "../types";
import { formatPrice } from "../shared/ui/format";
import { useAutoAnimate } from "../hooks/useAutoAnimate";
import { useCartStore } from "../hooks/useCartStore";
import { cartTotal } from "../cart/cart";
import { getEffectiveStock } from "../catalog/stock";
import { CartItemRow } from "./CartItemRow";

interface CartPanelProps {
  stock: StockData;
  onClose: () => void;
}

export function CartPanel({ stock, onClose }: CartPanelProps) {
  const items = useCartStore((s) => s.items);
  const consumed = useCartStore((s) => s.consumed);
  const increase = useCartStore((s) => s.increase);
  const decrease = useCartStore((s) => s.decrease);
  const removeItem = useCartStore((s) => s.removeItem);
  const ulRef = useAutoAnimate<HTMLUListElement>();
  const effective = getEffectiveStock(stock, consumed);
  const total = cartTotal(items);

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <span className="cart-empty__icon" aria-hidden="true">🛒</span>
        <p className="cart-empty__text">سبد خرید شما هنوز خالی است</p>
        <p className="cart-empty__hint">از تخفیف‌های امروز و محصولات تازه دیدن کنید و سبدتان را پر کنید.</p>
        <Link to="/plp/$carouselId" params={{ carouselId: "offers" }} search={{ sort: "default" }} className="btn btn--primary" onClick={onClose}>
          🔥 مشاهده پیشنهادهای ویژه
        </Link>
      </div>
    );
  }

  return (
    <>
      <ul ref={ulRef} className="cart-list">
        {items.map((item) => (
          <CartItemRow
            key={item.id}
            item={item}
            available={effective.items[item.id]}
            onIncrease={(id) => increase(id, effective.items[id] ?? Infinity)}
            onDecrease={decrease}
            onRemove={removeItem}
          />
        ))}
      </ul>
      <div className="cart-total">
        <span className="cart-total__label">جمع کل:</span>
        <span className="cart-total__value">{formatPrice(total)}</span>
      </div>
      <Link to="/checkout" className="btn btn--primary" onClick={onClose}>تکمیل سفارش و تسویه حساب</Link>
    </>
  );
}
