import { useEffect, useState } from 'react'

const INITIAL_SECONDS = 10 * 60
const format = new Intl.NumberFormat('fa-IR', { minimumIntegerDigits: 2 })

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

  const minutes = format.format(Math.floor(seconds / 60))
  const remaining = format.format(seconds % 60)

  return (
    <span className="sale-countdown__time" role="timer">
      <bdi dir="ltr" aria-hidden="true">{minutes}:{remaining}</bdi>
      <span className="visually-hidden">{minutes} دقیقه و {remaining} ثانیه</span>
    </span>
  )
}
