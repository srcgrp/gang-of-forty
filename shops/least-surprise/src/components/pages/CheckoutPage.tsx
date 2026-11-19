import { useRef, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useCartStore } from '../../hooks/useCartStore'
import { validateCheckout } from '../../checkout/validateCheckout'
import type { FormEvent } from 'react'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const clearCart = useCartStore((state) => state.clearCart)
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [address, setAddress] = useState('')
  const [attempted, setAttempted] = useState(false)
  const nameRef = useRef<HTMLInputElement>(null)
  const mobileRef = useRef<HTMLInputElement>(null)
  const addressRef = useRef<HTMLTextAreaElement>(null)

  const errors = attempted
  ? validateCheckout({ name, mobile, address })
  : { name: undefined, mobile: undefined, address: undefined }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setAttempted(true)
    const result = validateCheckout({ name, mobile, address })

    if (result.name) return nameRef.current?.focus()
    if (result.mobile) return mobileRef.current?.focus()
    if (result.address) return addressRef.current?.focus()

    clearCart()
    void navigate({ to: '/', replace: true })
  }

  return (
    <section className="checkout-page">
      <h2>تسویه‌حساب</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="customer-name">نام و نام خانوادگی</label>
        <input id="customer-name" ref={nameRef} value={name}
          onChange={(event) => setName(event.target.value)} />
        {errors.name && <p role="alert">{errors.name}</p>}

        <label htmlFor="customer-mobile">شماره موبایل</label>
        <input id="customer-mobile" ref={mobileRef} value={mobile}
          onChange={(event) => setMobile(event.target.value)} />
        {errors.mobile && <p role="alert">{errors.mobile}</p>}

        <label htmlFor="customer-address">آدرس</label>
        <textarea id="customer-address" ref={addressRef} value={address}
          onChange={(event) => setAddress(event.target.value)} />
        {errors.address && <p role="alert">{errors.address}</p>}

        <button type="submit">ثبت سفارش</button>
      </form>
    </section>
  )
}