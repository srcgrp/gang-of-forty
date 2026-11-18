import { useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'

type FormState = { name: string; mobile: string; address: string }
type FieldKey = keyof FormState
type Errors = Partial<Record<FieldKey, string>>

export type CheckoutFormProps = { onSuccess: () => void }

const FIELDS: { key: FieldKey; id: string; label: string; placeholder: string }[] = [
  { key: 'name', id: 'checkout-name', label: 'نام و نام خانوادگی', placeholder: 'مثلاً سارا محمدی' },
  { key: 'mobile', id: 'checkout-mobile', label: 'شمارهٔ موبایل', placeholder: 'مثل ۰۹۱۲۳۴۵۶۷۸۹' },
  { key: 'address', id: 'checkout-address', label: 'نشانی', placeholder: 'شهر، خیابان، پلاک' },
]

const validate = (form: FormState): Errors => {
  const errors: Errors = {}
  if (form.name.trim().length < 3) errors.name = 'نام را کامل بنویس (حداقل ۳ حرف).'
  if (!/^09\d{9}$/.test(form.mobile.trim())) errors.mobile = 'موبایل باید با ۰۹ شروع شود و ۱۱ رقم باشد.'
  if (form.address.trim().length < 10) errors.address = 'نشانی را کامل بنویس (حداقل ۱۰ حرف).'
  return errors
}

export default function CheckoutForm({ onSuccess }: CheckoutFormProps) {
  const [form, setForm] = useState<FormState>({ name: '', mobile: '', address: '' })
  const [submitted, setSubmitted] = useState(false)
  const nameRef = useRef<HTMLInputElement>(null)
  const mobileRef = useRef<HTMLInputElement>(null)
  const addressRef = useRef<HTMLInputElement>(null)
  const refs = { name: nameRef, mobile: mobileRef, address: addressRef }

  const errors = validate(form)

  const onField = (key: FieldKey) => (event: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }))
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
    const next = validate(form)
    const firstError = FIELDS.find((field) => next[field.key] !== undefined)
    if (firstError !== undefined) {
      refs[firstError.key].current?.focus()
      return
    }
    onSuccess()
  }

  return (
    <form className="checkout-form" noValidate onSubmit={onSubmit}>
      {FIELDS.map((field) => {
        const error = submitted ? errors[field.key] : undefined
        return (
          <div className="checkout-field" key={field.key}>
            <label className="checkout-label" htmlFor={field.id}>{field.label}</label>
            <input id={field.id} name={field.key}
              type={field.key === 'mobile' ? 'tel' : 'text'}
              value={form[field.key]} onChange={onField(field.key)}
              ref={refs[field.key]} placeholder={field.placeholder}
              aria-invalid={error !== undefined ? true : undefined} />
            {error !== undefined && <p className="field-error" role="alert">{error}</p>}
          </div>
        )
      })}
      <button type="submit" className="btn">ثبت سفارش</button>
    </form>
  )
}
