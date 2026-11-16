import { Link } from "@tanstack/react-router";
import { totalCartPrice } from "../cart/cart-logic";
import { useCartStore } from "../hooks/useCartStore";

export default function CheckoutPage() {
  const items = useCartStore((state) => state.lines);
  const total = totalCartPrice(items);

  return (
    <main className="route-page checkout-page">
      <nav className="route-page__navigation" aria-label="مسیر صفحه">
        <Link to="/">صفحه اصلی</Link>
        <Link to="/cart">بازگشت به سبد خرید</Link>
      </nav>
      <h1>تکمیل خرید</h1>
      {items.length === 0 ? (
        <section className="route-page__empty">
          <p>برای ادامه، ابتدا محصولی به سبد خرید اضافه کنید.</p>
          <Link to="/">مشاهده محصولات</Link>
        </section>
      ) : (
        <section className="checkout-page__summary">
          <h2>خلاصه سفارش</h2>
          {items.map((item) => (
            <div className="checkout-page__line" key={item.productId}>
              <span>{item.name} × {item.quantity.toLocaleString("fa-IR")}</span>
              <strong>{(item.price * item.quantity).toLocaleString("fa-IR")} تومان</strong>
            </div>
          ))}
          <div className="checkout-page__total">
            <strong>مجموع سفارش</strong>
            <strong>{total.toLocaleString("fa-IR")} تومان</strong>
          </div>
          <p className="checkout-page__notice">مرحله ثبت اطلاعات و پرداخت در ادامه پروژه پیاده‌سازی می‌شود.</p>
        </section>
      )}
    </main>
  );
}
