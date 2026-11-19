import { useLayoutEffect, useRef, useState } from 'react'
import type { SubmitEvent } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useCartStore } from '../../hooks/useCartStore'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const clearCart = useCartStore((state) => state.clear)
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [address, setAddress] = useState('')
  const [submitAttempts, setSubmitAttempts] = useState(0)
  const nameRef = useRef<HTMLInputElement>(null)
  const mobileRef = useRef<HTMLInputElement>(null)
  const addressRef = useRef<HTMLTextAreaElement>(null)
  const pendingFocus = useRef<HTMLElement | null>(null)

  const mobileDigits = mobile.trim()
    .replace(/[۰-۹]/g, (digit) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit)))
  const nameError = name.trim() ? '' : 'نام و نام خانوادگی را وارد کنید.'
  const mobileError = /^09[0-9]{9}$/.test(mobileDigits) ? '' : 'شمارهٔ موبایل ۱۱ رقمی را با ۰۹ وارد کنید.'
  const addressError = address.trim() ? '' : 'نشانی را وارد کنید.'
  const showErrors = submitAttempts > 0

  useLayoutEffect(() => {
    pendingFocus.current?.focus()
    pendingFocus.current = null
  }, [submitAttempts])

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    if (nameError || mobileError || addressError) {
      pendingFocus.current = nameError ? nameRef.current : mobileError ? mobileRef.current : addressRef.current
      setSubmitAttempts((attempts) => attempts + 1)
      return
    }

    clearCart()
    void navigate({ to: '/', replace: true })
  }

  return (
    <section className="container checkout" aria-labelledby="checkout-title">
      <div className="checkout__card">
        <h1 id="checkout-title">تسویه‌حساب</h1>
        <form className="checkout__form" noValidate onSubmit={handleSubmit}>
          <div className="checkout__field">
            <label htmlFor="checkout-name">نام و نام خانوادگی</label>
            <input
              ref={nameRef}
              id="checkout-name"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              aria-invalid={showErrors && !!nameError}
              aria-describedby={showErrors && nameError ? 'checkout-name-error' : undefined}
            />
            {showErrors && nameError && <p id="checkout-name-error" className="checkout__error">{nameError}</p>}
          </div>

          <div className="checkout__field">
            <label htmlFor="checkout-mobile">شمارهٔ موبایل</label>
            <input
              ref={mobileRef}
              id="checkout-mobile"
              name="mobile"
              type="tel"
              dir="ltr"
              autoComplete="tel-national"
              value={mobile}
              onChange={(event) => setMobile(event.target.value)}
              required
              aria-invalid={showErrors && !!mobileError}
              aria-describedby={showErrors && mobileError ? 'checkout-mobile-error' : undefined}
            />
            {showErrors && mobileError && <p id="checkout-mobile-error" className="checkout__error">{mobileError}</p>}
          </div>

          <div className="checkout__field">
            <label htmlFor="checkout-address">نشانی</label>
            <textarea
              ref={addressRef}
              id="checkout-address"
              name="address"
              autoComplete="street-address"
              rows={3}
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              required
              aria-invalid={showErrors && !!addressError}
              aria-describedby={showErrors && addressError ? 'checkout-address-error' : undefined}
            />
            {showErrors && addressError && <p id="checkout-address-error" className="checkout__error">{addressError}</p>}
          </div>

          <button type="submit" className="checkout__submit">ثبت سفارش</button>
        </form>
      </div>
    </section>
  )
}
