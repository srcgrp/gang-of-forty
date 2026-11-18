import { useEffect, useState } from "react"

const SALE_SECONDS = 10 * 60

// Two digits in Persian, e.g. 5 → ۰۵
function twoDigits(n: number): string {
  return n.toLocaleString("fa-IR", { minimumIntegerDigits: 2 })
}

// Counts down from 10 minutes. The interval starts on mount and is cleared on unmount.
export default function SaleCountdown() {
  const [left, setLeft] = useState(SALE_SECONDS)

  useEffect(() => {
    const id = setInterval(() => {
      console.log("SaleCountdown: tick")
      setLeft((s) => (s > 0 ? s - 1 : 0))
    }, 1000)
    return () => {
      clearInterval(id)
      console.log("SaleCountdown: interval cleared")
    }
  }, [])

  if (left === 0) return <span className="sale-countdown">حراج تمام شد</span>

  return (
    <span className="sale-countdown">
      <span aria-hidden="true">⏱</span>
      پایان حراج
      <span className="sale-time">{twoDigits(Math.floor(left / 60))}:{twoDigits(left % 60)}</span>
    </span>
  )
}
