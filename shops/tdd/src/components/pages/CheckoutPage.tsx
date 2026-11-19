import { useRef, useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { useCartStore } from '../../hooks/useCartStore'
import { validateCheckout, type CheckoutValues } from '../../features/checkout/checkout'

export default function CheckoutPage() {
    const [values, setValues] = useState<CheckoutValues>({ name: '', mobile: '', address: '' })
    const [submitted, setSubmitted] = useState(false)
    const nameRef = useRef<HTMLInputElement>(null)
    const mobileRef = useRef<HTMLInputElement>(null)
    const addressRef = useRef<HTMLTextAreaElement>(null)
    const clear = useCartStore(s => s.clear)
    const navigate = useNavigate()
    const errors = validateCheckout(values)

    const handleSubmit = () => {
        setSubmitted(true)
        if (errors.name) return nameRef.current?.focus()
        if (errors.mobile) return mobileRef.current?.focus()
        if (errors.address) return addressRef.current?.focus()
        clear()
        void navigate({ to: '/', replace: true })
    }

    return (
        <section className="checkout">
            <header className="plp-heading">
                <h1>تسویه حساب</h1>
                <Link className="listing-link" to="/">بازگشت به خانه</Link>
            </header>
            <form className="checkout-form" noValidate onSubmit={event => { event.preventDefault(); handleSubmit() }}>
                <div className="checkout-field">
                    <label htmlFor="checkout-name">نام</label>
                    <input ref={nameRef} id="checkout-name" name="name" autoComplete="name" required value={values.name} onChange={event => setValues({ ...values, name: event.target.value })}
                        aria-invalid={submitted && Boolean(errors.name)} aria-describedby={submitted && errors.name ? 'name-error' : undefined} />
                    {submitted && errors.name && <p className="checkout-error" id="name-error">{errors.name}</p>}
                </div>
                <div className="checkout-field">
                    <label htmlFor="checkout-mobile">شماره موبایل</label>
                    <input ref={mobileRef} id="checkout-mobile" name="mobile" type="tel" inputMode="numeric" dir="ltr" autoComplete="tel" placeholder="09123456789" required value={values.mobile} onChange={event => setValues({ ...values, mobile: event.target.value })}
                        aria-invalid={submitted && Boolean(errors.mobile)} aria-describedby={submitted && errors.mobile ? 'mobile-error' : undefined} />
                    {submitted && errors.mobile && <p className="checkout-error" id="mobile-error">{errors.mobile}</p>}
                </div>
                <div className="checkout-field">
                    <label htmlFor="checkout-address">نشانی</label>
                    <textarea ref={addressRef} id="checkout-address" name="address" autoComplete="street-address" rows={3} required value={values.address} onChange={event => setValues({ ...values, address: event.target.value })}
                        aria-invalid={submitted && Boolean(errors.address)} aria-describedby={submitted && errors.address ? 'address-error' : undefined} />
                    {submitted && errors.address && <p className="checkout-error" id="address-error">{errors.address}</p>}
                </div>
                <button className="add-button" type="submit">ثبت سفارش</button>
            </form>
        </section>
    )
}
