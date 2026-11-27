import { useEffect, useState } from 'react'

type SaleCountdownProps = {
  onClose: () => void
}

export default function SaleCountdown({ onClose }: SaleCountdownProps) {
  const [timeLeft, setTimeLeft] = useState(5 * 3600)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const hours = Math.floor(timeLeft / 3600)
  const minutes = Math.floor((timeLeft % 3600) / 60)
  const seconds = timeLeft % 60

  const format = (value: number) => value.toString().padStart(2, '0')

  return (
    <div className="sale-countdown container" role="region" aria-label="تخفیف ویژه">
      <div className="sale-content">
        <span className="sale-badge">پیشنهاد شگفت‌انگیز</span>
        <span className="sale-timer" dir="ltr">
          {format(hours)} : {format(minutes)} : {format(seconds)}
        </span>
      </div>
      <button className="sale-close" type="button" onClick={onClose} aria-label="بستن پیشنهاد">
        ✕
      </button>
    </div>
  )
}
