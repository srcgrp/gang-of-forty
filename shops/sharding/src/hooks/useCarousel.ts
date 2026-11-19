import { useEffect, useRef, useState } from 'react'

export function useCarousel(itemCount = 0) {
  const trackRef = useRef<HTMLUListElement>(null)
  const [isAtStart, setIsAtStart] = useState(true)
  const [isAtEnd, setIsAtEnd] = useState(false)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    function updateState(): void {
      if (!el) return
      const maxScroll = el.scrollWidth - el.clientWidth
      const pos = Math.abs(el.scrollLeft)
      setIsAtStart(pos <= 2)
      setIsAtEnd(pos >= maxScroll - 2)
    }

    updateState()

    el.addEventListener('scroll', updateState, { passive: true })
    window.addEventListener('resize', updateState, { passive: true })

    return () => {
      el.removeEventListener('scroll', updateState)
      window.removeEventListener('resize', updateState)
    }
  }, [itemCount])

  function scrollPrev(): void {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: el.clientWidth * 0.8, behavior: 'smooth' })
  }

  function scrollNext(): void {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: -(el.clientWidth * 0.8), behavior: 'smooth' })
  }

  return { trackRef, isAtStart, isAtEnd, scrollPrev, scrollNext }
}
