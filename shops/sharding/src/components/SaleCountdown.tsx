import { useEffect, useState } from 'react'

const INITIAL_SECONDS = 10 * 60

export default function SaleCountdown() {
  const [seconds, setSeconds] = useState(INITIAL_SECONDS)

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((current) => Math.max(0, current - 1))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const minutes = Math.floor(seconds / 60)
  const remaining = seconds % 60
  const format = new Intl.NumberFormat('fa-IR', { minimumIntegerDigits: 2 })

  return (
    <div className="sale-countdown__time" aria-label={`${minutes} دقیقه و ${remaining} ثانیه`}>
      <span className="sale-countdown__unit"><strong>{format.format(minutes)}</strong><small>دقیقه</small></span>
      <span className="sale-countdown__separator" aria-hidden="true">:</span>
      <span className="sale-countdown__unit"><strong>{format.format(remaining)}</strong><small>ثانیه</small></span>
    </div>
  )
}
