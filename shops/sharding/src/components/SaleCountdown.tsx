import { useEffect, useState } from 'react'

const INITIAL_SECONDS = 10 * 60

export default function SaleCountdown() {
  const [seconds, setSeconds] = useState(INITIAL_SECONDS)

  useEffect(() => {
    let remaining = INITIAL_SECONDS
    const timer = setInterval(() => {
      remaining -= 1
      setSeconds(remaining)
      if (remaining === 0) clearInterval(timer)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const minutes = Math.floor(seconds / 60)
  const remaining = seconds % 60
  const format = new Intl.NumberFormat('fa-IR', { minimumIntegerDigits: 2 })

  return (
    <div className="sale-countdown__time" dir="ltr" aria-label={`${format.format(minutes)} دقیقه و ${format.format(remaining)} ثانیه`}>
      <span className="sale-countdown__unit"><strong>{format.format(minutes)}</strong><small>دقیقه</small></span>
      <span className="sale-countdown__separator" aria-hidden="true">:</span>
      <span className="sale-countdown__unit"><strong>{format.format(remaining)}</strong><small>ثانیه</small></span>
    </div>
  )
}
