import { useEffect, useState } from 'react'

type SaleCountdownProps = {
    endsAt: number
}

export default function SaleCountdown({ endsAt }: SaleCountdownProps) {
    const [remaining, setRemaining] = useState(() => Math.max(0, endsAt - Date.now()))

    useEffect(() => {
        const interval = window.setInterval(() => {
            const timeLeft = Math.max(0, endsAt - Date.now())
            setRemaining(timeLeft)
            if (timeLeft === 0) window.clearInterval(interval)
        }, 1000)

        return () => window.clearInterval(interval)
    }, [endsAt])

    const seconds = Math.floor(remaining / 1000)
    const values = [
        { label: 'ساعت', value: Math.floor(seconds / 3600) },
        { label: 'دقیقه', value: Math.floor((seconds % 3600) / 60) },
        { label: 'ثانیه', value: seconds % 60 }
    ]

    return (
        <section className="sale-countdown" aria-label="زمان باقی‌مانده تا پایان امروز">
            <div className="sale-countdown-content">
                <div className="sale-countdown-copy">
                    <span className="sale-countdown-eyebrow">فرصت امروز</span>
                    <h2>برای استفاده از حراج هنوز وقت باقی است</h2>
                    <p>این فرصت با پایان امروز به اتمام می‌رسد</p>
                </div>
                <div className="sale-countdown-timer" role="timer" aria-live="off">
                    {values.map(({ label, value }) => (
                        <div className="sale-countdown-unit" key={label}>
                            <strong>{value.toString().padStart(2, '0')}</strong>
                            <span>{label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
