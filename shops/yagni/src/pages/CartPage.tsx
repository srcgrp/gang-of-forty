import { Link } from "@tanstack/react-router";
import { totalCartPrice } from "../cart/cart-logic";
import { useCartStore } from "../hooks/useCartStore";

export default function CartPage() {
  const items = useCartStore((state) => state.lines);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const remove = useCartStore((state) => state.remove);
  const total = totalCartPrice(items);

  return (
    <main className="route-page cart-page">
      <nav className="route-page__navigation" aria-label="مسیر صفحه">
        <Link to="/">صفحه اصلی</Link>
      </nav>
      <h1>سبد خرید شما</h1>
      {items.length === 0 ? (
        <section className="route-page__empty">
          <p>سبد خرید شما خالی است.</p>
          <Link to="/">مشاهده محصولات</Link>
        </section>
      ) : (
        <>
          <div className="cart-page__items">
            {items.map((item) => (
              <article className="cart-page__item" key={item.productId}>
                <strong>{item.name}</strong>
                <span>{item.price.toLocaleString("fa-IR")} تومان</span>
                <div className="cart-page__quantity">
                  <button type="button" onClick={() => updateQuantity(item.productId, -1)} aria-label={`کم کردن ${item.name}`}>−</button>
                  <span>{item.quantity.toLocaleString("fa-IR")}</span>
                  <button type="button" onClick={() => updateQuantity(item.productId, 1)} aria-label={`زیاد کردن ${item.name}`}>+</button>
                  <button type="button" onClick={() => remove(item.productId)}>حذف</button>
                </div>
              </article>
            ))}
          </div>
          <footer className="cart-page__footer">
            <strong>مجموع: {total.toLocaleString("fa-IR")} تومان</strong>
            <Link className="checkout-btn" to="/checkout">ادامه و تکمیل خرید</Link>
          </footer>
        </>
      )}
    </main>
  );
}
