import { useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useCartStore } from "../../hooks/useCartStore";
import { cartTotal } from "../../features/cart/logic/items";
import { formatPrice } from "../../shared/format";

type Field = "name" | "mobile" | "address";
type Values = Record<Field, string>;
const initial: Values = { name: "", mobile: "", address: "" };

function errorsFor(values: Values): Values {
  return {
    name: values.name.trim() ? "" : "نام را وارد کنید.",
    mobile: /^09\d{9}$/.test(values.mobile.trim()) ? "" : "شمارهٔ موبایل ۱۱ رقمی معتبر وارد کنید.",
    address: values.address.trim() ? "" : "نشانی را وارد کنید.",
  };
}

export default function CheckoutPage() {
  const [values, setValues] = useState<Values>(initial);
  const [submitted, setSubmitted] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const mobileRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLTextAreaElement>(null);
  const lines = useCartStore(state => state.lines);
  const clear = useCartStore(state => state.clear);
  const navigate = useNavigate();
  const errors = errorsFor(values);
  function change(field: Field, value: string): void {
    setValues(previous => ({ ...previous, [field]: value }));
  }
  function submit(event: React.SubmitEvent<HTMLFormElement>): void {
    event.preventDefault();
    setSubmitted(true);
    if (errors.name) { nameRef.current?.focus(); return; }
    if (errors.mobile) { mobileRef.current?.focus(); return; }
    if (errors.address) { addressRef.current?.focus(); return; }
    if (lines.length === 0) return;
    clear();
    void navigate({ to: "/", replace: true });
  }
  return <main id="main" className="wrap checkout-page" tabIndex={-1}>
    <h1>تسویه‌حساب</h1>
    {lines.length === 0 ? <p>سبد خرید شما خالی است. <Link to="/">بازگشت به فروشگاه</Link></p> : <>
      <p>مجموع سبد: <strong>{formatPrice(cartTotal(lines))}</strong></p>
      <form onSubmit={submit} noValidate>
        <div><label htmlFor="checkout-name">نام</label>
          <input id="checkout-name" ref={nameRef} value={values.name}
            onChange={event => change("name", event.target.value)} aria-invalid={submitted && !!errors.name}
            aria-describedby={submitted && errors.name ? "name-error" : undefined} />
          {submitted && errors.name && <p id="name-error" role="alert">{errors.name}</p>}</div>
        <div><label htmlFor="checkout-mobile">موبایل</label>
          <input id="checkout-mobile" ref={mobileRef} type="tel" inputMode="numeric" value={values.mobile}
            onChange={event => change("mobile", event.target.value)} aria-invalid={submitted && !!errors.mobile}
            aria-describedby={submitted && errors.mobile ? "mobile-error" : undefined} />
          {submitted && errors.mobile && <p id="mobile-error" role="alert">{errors.mobile}</p>}</div>
        <div><label htmlFor="checkout-address">نشانی</label>
          <textarea id="checkout-address" ref={addressRef} value={values.address}
            onChange={event => change("address", event.target.value)} aria-invalid={submitted && !!errors.address}
            aria-describedby={submitted && errors.address ? "address-error" : undefined} />
          {submitted && errors.address && <p id="address-error" role="alert">{errors.address}</p>}</div>
        <button type="submit">ثبت سفارش</button>
      </form>
    </>}
  </main>;
}
