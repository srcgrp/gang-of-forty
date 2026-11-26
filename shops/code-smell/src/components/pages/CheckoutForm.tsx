import { useRef, useState, type SubmitEvent } from "react"

type CheckoutFormProps = {
    onComplete: () => void
}

export default function CheckoutForm({ onComplete }: CheckoutFormProps) {
    const [name, setName] = useState("")
    const [mobile, setMobile] = useState("")
    const [address, setAddress] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const nameRef = useRef<HTMLInputElement>(null)
    const mobileRef = useRef<HTMLInputElement>(null)
    const addressRef = useRef<HTMLTextAreaElement>(null)

    const nameError = name.trim() === "" ? "نام و نام خانوادگی را وارد کنید." : ""
    const mobileError = /^(09|۰۹)[0-9۰-۹]{9}$/.test(mobile.trim()) ? "" : "شماره موبایل ۱۱ رقمی با شروع ۰۹ را وارد کنید."
    const addressError = address.trim() === "" ? "نشانی را وارد کنید." : ""

    function submit(event: SubmitEvent<HTMLFormElement>): void {
        event.preventDefault()
        setSubmitted(true)
        if (nameError) {
            nameRef.current?.focus()
        } else if (mobileError) {
            mobileRef.current?.focus()
        } else if (addressError) {
            addressRef.current?.focus()
        } else {
            onComplete()
        }
    }

    return (
        <form className="checkout-form info-card" noValidate onSubmit={submit}>
            <label htmlFor="checkout-name">نام و نام خانوادگی <span className="checkout-required" aria-hidden="true">*</span></label>
            <input
                id="checkout-name" ref={nameRef} autoComplete="name" placeholder="نام کامل را وارد کنید" required
                value={name} onChange={(event) => setName(event.target.value)}
                aria-invalid={submitted && nameError !== ""}
                aria-describedby={submitted && nameError ? "checkout-name-error" : undefined}
            />
            {submitted && nameError && <p className="checkout-error" id="checkout-name-error">{nameError}</p>}
            <label htmlFor="checkout-mobile">شماره موبایل <span className="checkout-required" aria-hidden="true">*</span></label>
            <input
                id="checkout-mobile" type="tel" ref={mobileRef} autoComplete="tel-national" dir="ltr" placeholder="09xxxxxxxxx" required
                value={mobile} onChange={(event) => setMobile(event.target.value)}
                aria-invalid={submitted && mobileError !== ""}
                aria-describedby={submitted && mobileError ? "checkout-mobile-error" : undefined}
            />
            {submitted && mobileError && <p className="checkout-error" id="checkout-mobile-error">{mobileError}</p>}
            <label htmlFor="checkout-address">نشانی <span className="checkout-required" aria-hidden="true">*</span></label>
            <textarea
                id="checkout-address" ref={addressRef} autoComplete="street-address" rows={3} placeholder="شهر، خیابان، کوچه و پلاک" required
                value={address} onChange={(event) => setAddress(event.target.value)}
                aria-invalid={submitted && addressError !== ""}
                aria-describedby={submitted && addressError ? "checkout-address-error" : undefined}
            />
            {submitted && addressError && <p className="checkout-error" id="checkout-address-error">{addressError}</p>}
            <button className="button button--primary button--route" type="submit">ارسال سفارش</button>
        </form>
    )
}
