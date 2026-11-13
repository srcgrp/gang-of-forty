import { useEffect, useState } from 'react'

export default function SaleCountdown() {
  const [seconds, setSeconds] = useState(3600)

  useEffect(() => {
  const interval = setInterval(() => {
    setSeconds((previous) => {
      if (previous <= 0) {
        clearInterval(interval)
        return 0
      }

      return previous - 1
    })
  }, 1000)

  return () => {
    clearInterval(interval)
  }
}, [])

const hours = Math.floor(seconds / 3600)

const minutes = Math.floor((seconds % 3600) / 60)

const remainingSeconds = seconds % 60

  return (
  <div className="sale-countdown">
    <h3>زمان باقی‌مانده تخفیف</h3>

    <p>
      {String(hours).padStart(2, '0')}:
      {String(minutes).padStart(2, '0')}:
      {String(remainingSeconds).padStart(2, '0')}
    </p>
  </div>
)
}