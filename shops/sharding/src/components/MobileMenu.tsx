import { useMobileMenu } from '../hooks/useMobileMenu'
import type { Link } from '../shared/types'
import ThemeToggle from './ThemeToggle'

type MobileMenuProps = {
  open: boolean
  onClose: () => void
  menu: Link[]
}

export default function MobileMenu({ open, onClose, menu }: MobileMenuProps) {
  // Keep focus and scrolling inside the open menu.
  const menuRef = useMobileMenu(open, onClose)

  return (
    <div className="mobile-menu" id="mobile-menu" role="dialog" aria-modal="true" aria-label="منوی موبایل" data-state={open ? 'open' : 'closed'}>
      <div className="mobile-menu__overlay" onClick={onClose} />
      <div className="mobile-menu__panel" ref={menuRef}>
        <div className="mobile-menu__head">
          <button type="button" className="icon-btn" onClick={onClose} aria-label="بستن منو" data-initial-focus="">
            <svg className="icon-btn__icon" aria-hidden="true"><use href="./icons.svg#close" /></svg>
          </button>
          <span className="mobile-menu__title">منو</span>
          <ThemeToggle />
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
