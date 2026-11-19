import { useLocation } from '@tanstack/react-router'
import { useEffect } from 'react'

export function useScrollToHash(isReady: boolean) {
  const hash = useLocation({ select: (location) => location.hash })

  useEffect(() => {
    if (!isReady || !hash) return

    const frame = requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
    return () => cancelAnimationFrame(frame)
  }, [isReady, hash])
}
