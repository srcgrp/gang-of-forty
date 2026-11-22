import { useEffect, useState } from "react"

export type CountdownControls = {
    open: boolean
    onToggle: () => void
}

export default function SaleCountdown() {
    const [left, setLeft] = useState(120)

    useEffect(function () {
        const timer = window.setInterval(function () {
            console.log("شمارش معکوس حراج")
            setLeft((seconds) => Math.max(0, seconds - 1))
        }, 1000)

        return function () {
            window.clearInterval(timer)
        }
    }, [])
    const minutesLeft = Math.floor(left / 60)
    const secondsLeft = left % 60
    return (
        <p className="section__subtitle" role="timer">
            زمــــان باقی‌مانده تا شــروع حـــــراج: {" "}
            {minutesLeft.toLocaleString("fa-IR")}{" "}دقیقه و{" "}
            {secondsLeft.toLocaleString("fa-IR")}{" "}ثانیه دیگر
        </p>
    )
}

export function SaleCountdownPanel({ open, onToggle }: CountdownControls) {
    return (
        <section className="section sale-countdown" aria-labelledby="sale-countdown-title">
            <div className="container">
                <header className="section__header">
                    <h2 className="section__title" id="sale-countdown-title">
                        شمارش معکوس حراج
                    </h2>
                    <button
                        className="button button--primary"
                        type="button"
                        aria-expanded={open}
                        onClick={onToggle}
                    >
                        {open ? "بستن شمارش معکوس" : "نمایش شمارش معکوس"}
                    </button>
                </header>
                {open && <SaleCountdown />}
            </div>
        </section>
    )
}