import { useEffect, useState } from 'react'

const clockPart = new Intl.NumberFormat('fa-IR', { minimumIntegerDigits: 2 })

export default function SaleCountdown() {
  const [seconds, setSeconds] = useState(3600)

  useEffect(() => {
    const end = Date.now() + 3600_000
    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((end - Date.now()) / 1000))
      setSeconds(remaining)
      if (remaining === 0) clearInterval(interval)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const parts = [Math.floor(seconds / 3600), Math.floor(seconds / 60) % 60, seconds % 60]
  return <div className="sale-countdown">
    <h2>زمان باقی‌مانده تخفیف</h2>
    <p dir="ltr">{parts.map((value) => clockPart.format(value)).join(':')}</p>
  </div>
}
