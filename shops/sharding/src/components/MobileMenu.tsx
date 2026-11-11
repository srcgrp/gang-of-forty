import { useEffect, useRef } from 'react'
import type { Link, Theme } from '../shared/types'
import ThemeSwitch from './ThemeSwitch'

type MobileMenuProps = {
  open: boolean
  onClose: () => void
  menu: Link[]
  theme: Theme
  onTheme: (next: Theme) => void
}

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'

export default function MobileMenu({ open, onClose, menu, theme, onTheme }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null)

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

  return (
    <div className="mobile-menu" id="mobile-menu" role="dialog" aria-modal="true" aria-label="منوی موبایل" data-state={open ? 'open' : 'closed'}>
      <div className="mobile-menu__overlay" onClick={onClose} />
      <div className="mobile-menu__panel" ref={panelRef}>
        <div className="mobile-menu__head">
          <button type="button" className="icon-btn" onClick={onClose} aria-label="بستن منو">
            <svg className="icon-btn__icon" aria-hidden="true"><use href="./icons.svg#close" /></svg>
          </button>
          <span className="mobile-menu__title">منو</span>
          <ThemeSwitch value={theme} onChange={onTheme} />
        </div>
        <div className="mobile-menu__body">
          <ul className="mobile-menu__list">
            {menu.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={onClose}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}