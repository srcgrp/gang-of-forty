import { useRef, useState, type FormEvent } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { FIELDS, LABELS, validateCheckout, type CheckoutValues, type Field } from '../../features/checkout/rules/validate.ts'
import { showToast } from '../../features/toast/toastStore.ts'
import { useCartStore } from '../../hooks/useCartStore.ts'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const hasItems = useCartStore((s) => s.lines.length > 0)
  const clear = useCartStore((s) => s.clear)
  const [values, setValues] = useState<CheckoutValues>({ name: '', mobile: '', address: '' })
  const [submitted, setSubmitted] = useState(false)
  const refs = useRef<Record<Field, HTMLInputElement | null>>({ name: null, mobile: null, address: null })
  const errors = validateCheckout(values)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    const first = FIELDS.find((f) => errors[f])
    if (first) {
      refs.current[first]?.focus()
      return
    }
    clear()
    showToast('سفارش شما ثبت شد')
    navigate({ to: '/', replace: true })
  }

  if (!hasItems) {
    return (
      <section className="plp">
        <p className="status">سبد خرید شما خالی است.</p>
        <Link className="back-link" to="/">بازگشت به صفحه اصلی</Link>
      </section>
    )
  }

  return (
    <section className="plp">
      <h1>تسویه حساب</h1>
      <form className="checkout-form" onSubmit={handleSubmit} noValidate>
        {FIELDS.map((field) => (
          <div key={field} className="field">
            <label htmlFor={field}>{LABELS[field]}</label>
            <input
              id={field}
              type={field === 'mobile' ? 'tel' : 'text'}
              ref={(el) => { refs.current[field] = el }}
              value={values[field]}
              onChange={(e) => setValues({ ...values, [field]: e.target.value })}
              aria-invalid={submitted && Boolean(errors[field])}
            />
            {submitted && errors[field] && <p className="field-error" role="alert">{errors[field]}</p>}
          </div>
        ))}
        <button type="submit" className="detail-add">ثبت سفارش</button>
      </form>
    </section>
  )
}