import { useRef, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import type { FormEvent } from 'react'
import { checkoutErrors } from '../checkout/validation'
import { useCartStore } from '../hooks/useCartStore'

export default function CheckoutForm() {
  const [values, setValues] = useState({ name: '', phone: '', address: '' })
  const [submitted, setSubmitted] = useState(false)
  const nameRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const addressRef = useRef<HTMLTextAreaElement>(null)
  const clear = useCartStore((state) => state.clear)
  const navigate = useNavigate()
  const errors = checkoutErrors(values)
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
    if (errors.name) return nameRef.current?.focus()
    if (errors.phone) return phoneRef.current?.focus()
    if (errors.address) return addressRef.current?.focus()
    clear()
    void navigate({ to: '/', replace: true })
  }
  return <form className="checkout-form" onSubmit={submit} noValidate>
    <label htmlFor="checkout-name">نام و نام خانوادگی</label>
    <input id="checkout-name" ref={nameRef} autoComplete="name" value={values.name}
      aria-invalid={submitted && Boolean(errors.name)} aria-describedby={submitted && errors.name ? 'name-error' : undefined}
      onChange={(event) => setValues({ ...values, name: event.target.value })} />
    {submitted && errors.name && <p id="name-error" className="field-error">{errors.name}</p>}
    <label htmlFor="checkout-phone">شماره موبایل</label>
    <input id="checkout-phone" ref={phoneRef} type="tel" inputMode="tel" autoComplete="tel" value={values.phone}
      aria-invalid={submitted && Boolean(errors.phone)} aria-describedby={submitted && errors.phone ? 'phone-error' : undefined}
      onChange={(event) => setValues({ ...values, phone: event.target.value })} />
    {submitted && errors.phone && <p id="phone-error" className="field-error">{errors.phone}</p>}
    <label htmlFor="checkout-address">نشانی پستی</label>
    <textarea id="checkout-address" ref={addressRef} autoComplete="street-address" value={values.address}
      aria-invalid={submitted && Boolean(errors.address)} aria-describedby={submitted && errors.address ? 'address-error' : undefined}
      onChange={(event) => setValues({ ...values, address: event.target.value })} />
    {submitted && errors.address && <p id="address-error" className="field-error">{errors.address}</p>}
    <p>این فرم تمرینی است و پرداخت یا ارسال واقعی انجام نمی‌شود.</p>
    <button type="submit">ثبت سفارش تمرینی</button>
  </form>
}
