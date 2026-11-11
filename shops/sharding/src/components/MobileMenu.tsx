import { useEffect, useRef } from 'react'
import type { Link } from '../shared/types'

type MobileMenuProps = {
  open: boolean
  onClose: () => void
  menu: Link[]
}

export default function MobileMenu({ open, onClose, menu }: MobileMenuProps) {
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
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <div
      className="mobile-menu"
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="منوی موبایل"
      data-state={open ? 'open' : 'closed'}
    >
      <div className="mobile-menu__overlay" onClick={onClose} />
      <div className="mobile-menu__panel" ref={panelRef}>
        <div className="mobile-menu__head">
          <button type="button" className="icon-btn" onClick={onClose} aria-label="بستن منو">
            <svg className="icon-btn__icon" aria-hidden="true">
              <use href="./icons.svg#close" />
            </svg>
          </button>
          <span className="mobile-menu__title">منو</span>
        </div>
        <div className="mobile-menu__body">
          <ul className="mobile-menu__list">
            {menu.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={onClose}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}