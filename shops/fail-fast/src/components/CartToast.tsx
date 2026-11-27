import { useEffect, useState, type ReactNode } from 'react'

interface ToastMessage {
  id: number
  text: string
  leaving: boolean
}

export const CART_TOAST_EVENT = 'space-market:cart-toast'

export default function CartToast(): ReactNode {
  const [toast, setToast] = useState<ToastMessage | null>(null)

  useEffect(() => {
    let leaveTimer = 0
    let removeTimer = 0

    const showToast = (event: Event) => {
      if (!(event instanceof CustomEvent) || typeof event.detail !== 'string' || !event.detail) return
      const text = event.detail
      window.clearTimeout(leaveTimer)
      window.clearTimeout(removeTimer)
      const id = Date.now()
      setToast({ id, text, leaving: false })
      leaveTimer = window.setTimeout(() => {
        setToast((current) => current?.id === id ? { ...current, leaving: true } : current)
      }, 1900)
      removeTimer = window.setTimeout(() => {
        setToast((current) => current?.id === id ? null : current)
      }, 2200)
    }

    window.addEventListener(CART_TOAST_EVENT, showToast)
    return () => {
      window.removeEventListener(CART_TOAST_EVENT, showToast)
      window.clearTimeout(leaveTimer)
      window.clearTimeout(removeTimer)
    }
  }, [])

  if (!toast) return null

  return (
    <div className={`cart-toast${toast.leaving ? ' is-leaving' : ''}`} role="status" aria-live="polite">
      <span aria-hidden="true">✓</span>
      {toast.text}
    </div>
  )
}
