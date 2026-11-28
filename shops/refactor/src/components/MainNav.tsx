
import type { Category, Link } from '../types'
import { anchorClick, safeHref } from './safe-href'
import Icon from './Icon'

type MainNavProps = {
  menu: Link[]
  categories: Category[]
  phone: string
  onPickCategory: (id: number | null) => void
}

export default function MainNav({ menu, categories, phone, onPickCategory }: MainNavProps) {
  return (
    <div className="nav-bar" id="main-nav">
      <div className="nav-inner container">
        <nav aria-label="منوی اصلی">
          <ul className="nav-links" id="main-menu">
            <li className="has-sub">
              <a href="#categories" onClick={(event) => anchorClick('#categories')(event)}>
                <Icon name="grid" />همه دسته‌ها
              </a>
              <ul className="sub-menu">
                {categories.map((category) => (
                  <li key={category.id}>
                    <a
                      href="#categories"
                      onClick={(event) => {
                        event.preventDefault()
                        onPickCategory(category.id)
                      }}
                    >
                      {category.name}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            {menu.map((item) => (
              <li key={item.label}>
                <a href={safeHref(item.href)} onClick={(event) => anchorClick(item.href)(event)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <address className="contact">
          <a href={`tel:${phone.replace(/[^\d+]/g, '')}`}>
            <bdi>{phone}</bdi>
          </a>
        </address>
      </div>
    </div>
  )
}