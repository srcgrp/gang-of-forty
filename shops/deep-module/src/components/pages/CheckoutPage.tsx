import { useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import confetti from "canvas-confetti";
import { useCartStore } from "../../hooks/useCartStore";
import { validateCheckout } from "../../catalog/checkout";
import { cartTotal } from "../../cart/cart";
import { formatPrice } from "../../shared/ui/format";
import { toast } from "../../shared/ui/toast";

export function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const consumeAndClear = useCartStore((s) => s.consumeAndClear);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const mobileRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLTextAreaElement>(null);
  const errors = validateCheckout({ name, mobile, address });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (errors.name) return nameRef.current?.focus();
    if (errors.mobile) return mobileRef.current?.focus();
    if (errors.address) return addressRef.current?.focus();

    consumeAndClear();
    confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
    toast.success("سفارش شما با موفقیت ثبت شد! 🎉");
    void navigate({ to: "/", replace: true });
  };

  return (
    <section className="page-card checkout-page">
      <h1>تکمیل سفارش</h1>
      <p className="checkout-page__total">مبلغ قابل پرداخت: {formatPrice(cartTotal(items))}</p>
      <form className="checkout-form" onSubmit={handleSubmit} noValidate>
        <div className="checkout-field">
          <label htmlFor="checkout-name">نام و نام خانوادگی</label>
          <input id="checkout-name" ref={nameRef} value={name} onChange={(e) => setName(e.target.value)} />
          {submitted && errors.name && <span className="field-error" role="alert">{errors.name}</span>}
        </div>
        <div className="checkout-field">
          <label htmlFor="checkout-mobile">شماره موبایل</label>
          <input id="checkout-mobile" ref={mobileRef} type="tel" dir="ltr" value={mobile} onChange={(e) => setMobile(e.target.value)} />
          {submitted && errors.mobile && <span className="field-error" role="alert">{errors.mobile}</span>}
        </div>
        <div className="checkout-field">
          <label htmlFor="checkout-address">آدرس تحویل</label>
          <textarea id="checkout-address" ref={addressRef} rows={3} value={address} onChange={(e) => setAddress(e.target.value)} />
          {submitted && errors.address && <span className="field-error" role="alert">{errors.address}</span>}
        </div>
        <button type="submit" className="btn btn--primary">ثبت نهایی سفارش</button>
      </form>
    </section>
  );
}
