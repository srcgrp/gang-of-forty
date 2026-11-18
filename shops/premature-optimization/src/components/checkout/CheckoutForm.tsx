import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import type {
  CheckoutErrors,
  CheckoutField,
  CheckoutFormValues,
} from "../../scripts/types.ts";
import { useCartStore } from "../../hooks/useCartStore.ts";
import {
  firstInvalidField,
  validateCheckout,
} from "../../scripts/logic/checkout/validate-checkout.ts";
import { notify } from "../../lib/animations/notify.ts";
import FormField from "./FormField.tsx";
import type { FieldElement, FormFieldProps } from "./FormField.tsx";

type FieldConfig = Pick<
  FormFieldProps,
  "label" | "autoComplete" | "type" | "multiline"
> & { field: CheckoutField };

const FIELDS: readonly FieldConfig[] = [
  { field: "name", label: "نام و نام خانوادگی", autoComplete: "name" },
  { field: "mobile", label: "شماره موبایل", autoComplete: "tel", type: "tel" },
  {
    field: "address",
    label: "آدرس",
    autoComplete: "street-address",
    multiline: true,
  },
];

const EMPTY_FORM: CheckoutFormValues = { name: "", mobile: "", address: "" };

export default function CheckoutForm() {
  const [form, setForm] = useState<CheckoutFormValues>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const fieldRefs = useRef<Partial<Record<CheckoutField, FieldElement | null>>>(
    {},
  );
  const clearCart = useCartStore((s) => s.clear);
  const navigate = useNavigate();

  const errors = validateCheckout(form);
  const shownErrors: CheckoutErrors = submitted ? errors : {};

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);

    const invalidField = firstInvalidField(errors);
    if (invalidField) {
      fieldRefs.current[invalidField]?.focus();
      return;
    }

    notify.success("سفارش شما ثبت شد");
    void navigate({ to: "/", replace: true }).then(() => clearCart());
  }

  return (
    <form className="checkout-form" noValidate onSubmit={handleSubmit}>
      <div className="checkout-fields">
        {FIELDS.map(({ field, ...config }) => (
          <FormField
            key={field}
            id={`checkout-${field}`}
            value={form[field]}
            error={shownErrors[field]}
            inputRef={(element) => {
              fieldRefs.current[field] = element;
            }}
            onChange={(value) =>
              setForm((prev) => ({ ...prev, [field]: value }))
            }
            {...config}
          />
        ))}
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
