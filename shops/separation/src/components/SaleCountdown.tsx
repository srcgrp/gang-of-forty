import { useEffect, useState } from 'react'

export default function SaleCountdown({ start }: { start: number }) {
  const [left, setLeft] = useState(start)
  useEffect(() => {
    const id = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000)
    return () => {
      clearInterval(id)
      console.log('SaleCountdown: interval cleared')
    }
  }, [])
  return <p>{`⏳ پایان حراج تا ${left.toLocaleString('fa-IR')} ثانیه دیگر`}</p>
}
