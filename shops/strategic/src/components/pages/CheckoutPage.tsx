import { useRef, useState, type FormEvent } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useCartStore } from '../../hooks/useCartStore';

const fields = [
  { id: 'name', label: 'نام', autoComplete: 'name' },
  { id: 'mobile', label: 'شماره موبایل', autoComplete: 'tel-national' },
  { id: 'address', label: 'آدرس', autoComplete: 'street-address' },
] as const;

function mobileDigits(value: string) {
  return value.trim().replace(/[۰-۹]/g, digit => String(digit.charCodeAt(0) - 1776))
    .replace(/[٠-٩]/g, digit => String(digit.charCodeAt(0) - 1632));
}

export default function CheckoutPage() {
  const [values, setValues] = useState({ name: '', mobile: '', address: '' });
  const [submitted, setSubmitted] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const clear = useCartStore((s) => s.clear);
  const errors = {
    name: values.name.trim() ? '' : 'نام خود را وارد کنید.',
    mobile: /^09[0-9]{9}$/.test(mobileDigits(values.mobile)) ? '' : 'شماره موبایل ۱۱ رقمی را با ۰۹ وارد کنید.',
    address: values.address.trim() ? '' : 'آدرس تحویل را وارد کنید.',
  };

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    const invalid = fields.find(({ id }) => errors[id]);
    if (invalid) {
      const input = form.current?.elements.namedItem(invalid.id);
      if (input instanceof HTMLInputElement) input.focus();
      return;
    }
    clear();
    void navigate({ to: '/', search: {}, replace: true });
  }

  return (
    <section className="bonus-page">
      <h1>تسویه حساب</h1>
      <form ref={form} onSubmit={submit} noValidate>
        {fields.map(({ id, label, autoComplete }) => (
          <div className="checkout-field" key={id}>
            <label htmlFor={id}>{label}</label>
            <input id={id} name={id} type={id === 'mobile' ? 'tel' : 'text'} autoComplete={autoComplete}
              required value={values[id]} aria-invalid={submitted && Boolean(errors[id])}
              aria-describedby={submitted && errors[id] ? id + '-error' : undefined}
              onChange={(event) => setValues({ ...values, [id]: event.currentTarget.value })} />
            {submitted && errors[id] && <span id={id + '-error'} role="alert">{errors[id]}</span>}
          </div>
        ))}
        <button className="btn btn--green" type="submit">ثبت سفارش</button>
      </form>
    </section>
  );
}
