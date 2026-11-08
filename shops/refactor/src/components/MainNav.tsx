import type { Category, Link } from '../types'
import Icon from './Icon'
import { safeHref } from './safe-href'

type MainNavProps = { menu: Link[]; categories: Category[]; phone: string }

export default function MainNav({ menu, categories, phone }: MainNavProps) {
  return (
    <div className="nav-bar" id="main-nav">
      <div className="nav-inner container">
        <nav aria-label="منوی اصلی">
          <ul className="nav-links" id="main-menu">
            <li className="has-sub">
              <a href="#categories"><Icon name="grid" />همه دسته‌ها</a>
              <ul className="sub-menu">
                {categories.map((category) => (
                  <li key={category.id}><a href={`#${category.slug}`}>{category.name}</a></li>
                ))}
              </ul>
            </li>
            {menu.map((item) => (
              <li key={item.label}><a href={safeHref(item.href)}>{item.label}</a></li>
            ))}
          </ul>
        </nav>
        <address className="contact">
          <a href={`tel:${phone.replace(/[^\d+]/g, '')}`}><bdi>{phone}</bdi></a>
        </address>
      </div>
    </div>
  )
}
