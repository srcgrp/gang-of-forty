import { useRef } from "react";
import type { FormEvent } from "react";
import { getCheckoutErrors } from "../checkoutForm";
import type { CheckoutForm } from "../checkoutForm";

type Key = keyof CheckoutForm;
type Props = {
  form: CheckoutForm;
  submitted: boolean;
  onChange: (form: CheckoutForm) => void;
  onAttempt: () => void;
  onValid: () => void;
};

const labels: Record<Key, string> = {
  name: "نام",
  mobile: "موبایل",
  address: "نشانی",
};
const keys: Key[] = ["name", "mobile", "address"];

export default function CheckoutFormFields(props: Props) {
  const nameRef = useRef<HTMLInputElement>(null);
  const mobileRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const refs = { name: nameRef, mobile: mobileRef, address: addressRef };
  const errors = getCheckoutErrors(props.form);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    props.onAttempt();
    const next = getCheckoutErrors(props.form);
    const bad = keys.find(function (key) {
      return Boolean(next[key]);
    });
    if (bad) return refs[bad].current?.focus();
    props.onValid();
  }

  return (
    <form className="checkout-form" onSubmit={onSubmit}>
      {keys.map(function (key) {
        return (
          <label htmlFor={key} key={key}>
            {labels[key]}
            <input
              id={key}
              ref={refs[key]}
              value={props.form[key]}
              onChange={function (e) {
                props.onChange({ ...props.form, [key]: e.target.value });
              }}
            />
            {props.submitted && errors[key] ? (
              <span className="error">{errors[key]}</span>
            ) : null}
          </label>
        );
      })}
      <button type="submit">ثبت سفارش</button>
    </form>
  );
}
