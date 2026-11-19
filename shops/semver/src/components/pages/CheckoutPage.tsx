import { Link, useNavigate } from "@tanstack/react-router";
import { useRef, useState, type SyntheticEvent } from "react";
import { checkoutErrors, checkoutFields, type CheckoutField, type CheckoutValues } from "../../cart/checkout";
import { useCartStore } from "../../hooks/useCartStore";
import { notyf } from "../../utils/notify";

export default function CheckoutPage() {
  const [values, setValues] = useState<CheckoutValues>({ name: "", mobile: "", address: "" });
  const [submitted, setSubmitted] = useState(false);
  const fields = useRef<Partial<Record<CheckoutField, HTMLInputElement | null>>>({});
  const clear = useCartStore((state) => state.clear);
  const navigate = useNavigate();
  const errors = checkoutErrors(values);

  function submit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    const firstInvalid = checkoutFields.find(({ key }) => errors[key]);
    if (firstInvalid) {
      fields.current[firstInvalid.key]?.focus();
      return;
    }

    clear();
    notyf.success("تسویه‌حساب آزمایشی انجام شد.");
    void navigate({ to: "/", replace: true });
  }

  return (
    <section className="catalog-page">
      <Link className="catalog-link" to="/">بازگشت به خانه</Link>
      <h1 className="section-title">تسویه‌حساب</h1>
      <p>این فرم آزمایشی است و سفارش واقعی ارسال نمی‌کند.</p>
      <form className="checkout-form" noValidate onSubmit={submit}>
        {checkoutFields.map(({ key, label, type, autoComplete }) => {
          const id = `checkout-${key}`;
          const error = submitted ? errors[key] : "";
          return (
            <div className="checkout-field" key={key}>
              <label htmlFor={id}>{label}</label>
              <input
                id={id}
                name={key}
                type={type}
                autoComplete={autoComplete}
                required
                value={values[key]}
                ref={(element) => { fields.current[key] = element; }}
                onChange={(event) => setValues({ ...values, [key]: event.currentTarget.value })}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${id}-error` : undefined}
              />
              {error && <p className="checkout-error" id={`${id}-error`}>{error}</p>}
            </div>
          );
        })}
        <button className="buynow-btn" type="submit">ثبت سفارش آزمایشی</button>
      </form>
    </section>
  );
}
