import { Link, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { totalCartPrice } from "../cart/cart-logic";
import { useCartStore } from "../hooks/useCartStore";

interface CheckoutFormValues {
  name: string;
  mobile: string;
  address: string;
}

interface CheckoutFormErrors {
  name: string;
  mobile: string;
  address: string;
}

function validateCheckoutForm(values: CheckoutFormValues): CheckoutFormErrors {
  return {
    name: values.name.trim() ? "" : "وارد کردن نام و نام خانوادگی الزامی است.",
    mobile: !values.mobile.trim()
      ? "وارد کردن شماره موبایل الزامی است."
      : /^09\d{9}$/.test(values.mobile.trim())
        ? ""
        : "شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود.",
    address: values.address.trim() ? "" : "وارد کردن آدرس تحویل الزامی است.",
  };
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.lines);
  const clearCart = useCartStore((state) => state.clear);
  const total = totalCartPrice(items);

  const [values, setValues] = useState<CheckoutFormValues>({
    name: "",
    mobile: "",
    address: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const mobileRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLTextAreaElement>(null);

  const errors = validateCheckoutForm(values);
  const hasErrors = Boolean(errors.name || errors.mobile || errors.address);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);

    if (hasErrors) {
      if (errors.name) {
        nameRef.current?.focus();
      } else if (errors.mobile) {
        mobileRef.current?.focus();
      } else if (errors.address) {
        addressRef.current?.focus();
      }
      return;
    }

    clearCart();
    void navigate({ to: "/", replace: true });
  };

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
        <div className="checkout-page__layout">
          <form className="checkout-form" onSubmit={handleSubmit} noValidate>
            <h2>اطلاعات تحویل سفارش</h2>

            <div className="checkout-form__field">
              <label htmlFor="checkout-name">نام و نام خانوادگی</label>
              <input
                id="checkout-name"
                ref={nameRef}
                type="text"
                value={values.name}
                aria-invalid={submitted && Boolean(errors.name)}
                aria-describedby={submitted && errors.name ? "checkout-name-error" : undefined}
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, name: event.target.value }))
                }
              />
              {submitted && errors.name && (
                <span className="checkout-form__error" id="checkout-name-error" role="alert">
                  {errors.name}
                </span>
              )}
            </div>

            <div className="checkout-form__field">
              <label htmlFor="checkout-mobile">شماره موبایل</label>
              <input
                id="checkout-mobile"
                ref={mobileRef}
                type="tel"
                dir="ltr"
                placeholder="09123456789"
                value={values.mobile}
                aria-invalid={submitted && Boolean(errors.mobile)}
                aria-describedby={submitted && errors.mobile ? "checkout-mobile-error" : undefined}
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, mobile: event.target.value }))
                }
              />
              {submitted && errors.mobile && (
                <span className="checkout-form__error" id="checkout-mobile-error" role="alert">
                  {errors.mobile}
                </span>
              )}
            </div>

            <div className="checkout-form__field">
              <label htmlFor="checkout-address">آدرس تحویل</label>
              <textarea
                id="checkout-address"
                ref={addressRef}
                rows={3}
                value={values.address}
                aria-invalid={submitted && Boolean(errors.address)}
                aria-describedby={submitted && errors.address ? "checkout-address-error" : undefined}
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, address: event.target.value }))
                }
              />
              {submitted && errors.address && (
                <span className="checkout-form__error" id="checkout-address-error" role="alert">
                  {errors.address}
                </span>
              )}
            </div>

            <button className="checkout-btn checkout-form__submit" type="submit">
              ثبت نهایی سفارش
            </button>
          </form>

          <section className="checkout-page__summary">
            <h2>خلاصه سفارش</h2>
            {items.map((item) => (
              <div className="checkout-page__line" key={item.productId}>
                <span>
                  {item.name} × {item.quantity.toLocaleString("fa-IR")}
                </span>
                <strong>{(item.price * item.quantity).toLocaleString("fa-IR")} تومان</strong>
              </div>
            ))}
            <div className="checkout-page__total">
              <strong>مجموع سفارش</strong>
              <strong>{total.toLocaleString("fa-IR")} تومان</strong>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
