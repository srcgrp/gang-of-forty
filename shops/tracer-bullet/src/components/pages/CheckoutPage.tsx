
import { useRef, useState } from "react";
import type { FormEventHandler } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import FormField from "../FormField.tsx";
import { useCartStore } from "../../hooks/useCartStore.ts";
import { validateCheckout } from "../../cart/checkout.ts";
import type { CheckoutErrors } from "../../types.ts";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const isEmpty = useCartStore((s) => s.lines.length === 0);
  const clear = useCartStore((s) => s.clear);
  const [values, setValues] = useState({ name: "", mobile: "", address: "" });
  const [submitted, setSubmitted] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const mobileRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const errors = validateCheckout(values);
  const shown: CheckoutErrors = submitted ? errors : {};

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setSubmitted(true);
if (errors.name) {
  nameRef.current?.focus();
  return;
}
if (errors.mobile) {
  mobileRef.current?.focus();
  return;
}
if (errors.address) {
  addressRef.current?.focus();
  return;
}
    clear();
    void navigate({ to: "/", replace: true });
  };

  if (isEmpty) {
    return (
      <section>
        <p>سبد خالی است</p>
        <Link to="/">بازگشت به صفحه اصلی</Link>
      </section>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2>تسویه حساب</h2>
      <FormField id="checkout-name" label="نام" value={values.name}
        error={shown.name} inputRef={nameRef} autoComplete="name"
        onChange={(name) => setValues((v) => ({ ...v, name }))} />
      <FormField id="checkout-mobile" label="شماره موبایل" type="tel"
        value={values.mobile} error={shown.mobile} inputRef={mobileRef}
        autoComplete="tel"
        onChange={(mobile) => setValues((v) => ({ ...v, mobile }))} />
      <FormField id="checkout-address" label="آدرس" value={values.address}
        error={shown.address} inputRef={addressRef}
        autoComplete="street-address"
        onChange={(address) => setValues((v) => ({ ...v, address }))} />
      <button type="submit">ثبت سفارش</button>
    </form>
  );
}
