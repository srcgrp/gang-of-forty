import { useEffect, useState } from "react"

export type CountdownControls = {
    open: boolean
    onToggle: () => void
}

const startSeconds = 120

export default function SaleCountdown() {
    const [left, setLeft] = useState(startSeconds)

    useEffect(function () {
        let seconds = startSeconds
        const timer = window.setInterval(function () {
            seconds -= 1
            setLeft(seconds)
            if (seconds === 0) {
                window.clearInterval(timer)
            }
        }, 1000)

        return function () {
            window.clearInterval(timer)
        }
    }, [])
    if (left === 0) {
        return <p className="section__subtitle" role="status">حراج شـــــــروع شـــد!</p>
    }

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
                        بــلک فــرایدی نزدیکــه!
                    </h2>
                    <button
                        className="button button--primary"
                        type="button"
                        aria-expanded={open}
                        aria-label={open ? "بستن شمارش معکوس حراج" : undefined}
                        onClick={onToggle}
                    >
                        {open ? (
                            <img src="svg/x.svg" alt="" width={18} height={18} />
                        ) : (
                            "چقدر مونده؟"
                        )}
                    </button>
                </header>
                {open && <SaleCountdown />}
            </div>
        </section>
    )
}