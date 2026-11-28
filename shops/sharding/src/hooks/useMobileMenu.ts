import { useEffect, useRef } from 'react'
import { usePanelFocus } from './usePanelFocus'

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function useMobileMenu(open: boolean, onClose: () => void) {
  const panelRef = useRef<HTMLDivElement>(null)
  usePanelFocus(open, panelRef)

  useEffect(() => {
    function onKey(e: KeyboardEvent): void {
      if (e.key === 'Escape' && open) onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    function handleChange(e: MediaQueryListEvent) {
      if (e.matches && open) onClose()
    }
    mq.addEventListener('change', handleChange)
    return () => mq.removeEventListener('change', handleChange)
  }, [open, onClose])

  useEffect(() => {
    if (!open || !panelRef.current) return
    const menuEl = panelRef.current
    
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Tab') return
      const focusables = Array.from(menuEl.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(el => el.offsetParent !== null)
      if (focusables.length === 0) return
      
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last?.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first?.focus()
      }
    }
    
    menuEl.addEventListener('keydown', onKeyDown)
    return () => menuEl.removeEventListener('keydown', onKeyDown)
  }, [open])

  return panelRef
}
