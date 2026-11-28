import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import type { CheckoutForm } from "../../checkoutForm";
import { useCartDispatch } from "../../hooks/useCart";
import CheckoutFormFields from "../CheckoutFormFields";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const dispatch = useCartDispatch();
  const [form, setForm] = useState<CheckoutForm>({
    name: "",
    mobile: "",
    address: "",
  });
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="box">
      <p>
        <Link to="/">بازگشت به خانه</Link>
      </p>
      <h1>تکمیل سفارش</h1>
      <CheckoutFormFields
        form={form}
        submitted={submitted}
        onChange={setForm}
        onAttempt={function () {
          setSubmitted(true);
        }}
        onValid={function () {
          dispatch({ type: "clear" });
          void navigate({ to: "/", replace: true });
        }}
      />
    </main>
  );
}
