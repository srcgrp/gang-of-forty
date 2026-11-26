import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useCartStore } from "./useCartStore.ts";
import { firstErrorField, validateCheckout } from "../cart/checkout.ts";
import type { CheckoutErrors, CheckoutField, CheckoutForm } from "../types.ts";

const EMPTY_FORM: CheckoutForm = { name: "", phone: "", address: "" };

export function useCheckoutForm() {
  const navigate = useNavigate();
  const clear = useCartStore((s) => s.clear);
  const cartIsEmpty = useCartStore((s) => s.lines.length === 0);
  const [form, setForm] = useState<CheckoutForm>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const refs = { name: nameRef, phone: phoneRef, address: addressRef };
  useEffect(() => {
  nameRef.current?.focus();
}, []);

  const errors = validateCheckout(form);
  const shown: CheckoutErrors = submitted ? errors : {};

  function setField(field: CheckoutField, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    const invalid = firstErrorField(errors);
    if (invalid !== null) {
      refs[invalid].current?.focus();
      return;
    }
    clear();
    navigate({ to: "/", replace: true });
  }

  return { form, shown, refs, setField, handleSubmit, showEmpty: cartIsEmpty && !submitted };
}