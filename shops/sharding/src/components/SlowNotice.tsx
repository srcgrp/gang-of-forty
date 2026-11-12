import { useEffect, useState } from 'react'

export default function SlowNotice({ loading }: { loading: boolean }) {
  const [slow, setSlow] = useState(false)

  useEffect(() => {
    if (!loading) return
    const timer = setTimeout(() => setSlow(true), 3000)
    return () => clearTimeout(timer)
  }, [loading])

  if (!loading || !slow) return null
  return <div className="slow-connection" role="status">اتصال کند است؛ لطفاً کمی صبر کنید…</div>
}
