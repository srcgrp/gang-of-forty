import { Link } from "@tanstack/react-router";
import FormField from "../FormField.tsx";
import { useCheckoutForm } from "../../hooks/useCheckoutForm.ts";

export default function CheckoutPage() {
  const { form, shown, refs, setField, handleSubmit, showEmpty } = useCheckoutForm();

  if (showEmpty) {
    return (
      <section className="checkout">
        <p className="status" role="status">سبد خرید خالی است.</p>
        <Link to="/">بازگشت به خانه</Link>
      </section>
    );
  }

  return (
    <section className="checkout">
      <h1 className="items-header">تسویه حساب</h1>
      <form className="checkout-form" onSubmit={handleSubmit} noValidate>
        <FormField
          id="name" label="نام و نام خانوادگی" autoComplete="name"
          value={form.name} error={shown.name} inputRef={refs.name}
          onChange={(v) => setField("name", v)}
        />
        <FormField
          id="phone" label="شماره موبایل" type="tel" autoComplete="tel"
          value={form.phone} error={shown.phone} inputRef={refs.phone}
          onChange={(v) => setField("phone", v)}
        />
        <FormField
          id="address" label="نشانی" autoComplete="street-address"
          value={form.address} error={shown.address} inputRef={refs.address}
          onChange={(v) => setField("address", v)}
        />
        <button type="submit" className="checkout-button">ثبت سفارش</button>
      </form>
    </section>
  );
}