import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import type {
  CheckoutErrors,
  CheckoutField,
  CheckoutForm as CheckoutFormValues,
} from "../../scripts/types";
import { useCartStore } from "../../hooks/useCartStore.ts";
import {
  firstInvalidField,
  validateCheckout,
} from "../../scripts/logic/checkout/validate-checkout.ts";
import { notify } from "../../lib/animations/notify.ts";
import FormField from "./FormField.tsx";

const EMPTY_FORM: CheckoutFormValues = { name: "", mobile: "", address: "" };

export default function CheckoutForm() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const fieldRefs = useRef<Partial<Record<CheckoutField, HTMLElement | null>>>(
    {},
  );
  const clearCart = useCartStore((s) => s.clear);
  const navigate = useNavigate();

  const errors = validateCheckout(form);
  const shownErrors: CheckoutErrors = submitted ? errors : {};

  function bind(field: CheckoutField) {
    return {
      value: form[field],
      error: shownErrors[field],
      inputRef: (element: HTMLElement | null) => {
        fieldRefs.current[field] = element;
      },
      onChange: (value: string) =>
        setForm((prev) => ({ ...prev, [field]: value })),
    };
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);

    const invalidField = firstInvalidField(errors);
    if (invalidField) {
      fieldRefs.current[invalidField]?.focus();
      return;
    }
    notify.success("سفارش شما ثبت شد");
    void navigate({ to: "/", replace: true }).then(clearCart);
  }

  return (
    <form className="checkout-form" noValidate onSubmit={handleSubmit}>
      <div className="checkout-fields">
        <FormField
          id="checkout-name"
          label="نام و نام خانوادگی"
          autoComplete="name"
          {...bind("name")}
        />
        <FormField
          id="checkout-mobile"
          label="شماره موبایل"
          type="tel"
          autoComplete="tel"
          {...bind("mobile")}
        />
        <FormField
          id="checkout-address"
          label="آدرس"
          autoComplete="street-address"
          multiline
          {...bind("address")}
        />
      </div>
      <button
        className="buy-button product-page-buy checkout-submit"
        type="submit"
      >
        ثبت سفارش
      </button>
    </form>
  );
}
