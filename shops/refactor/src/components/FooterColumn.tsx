import type { Link } from '../types'
import { anchorClick, safeHref } from './safe-href'

type FooterColumnProps = { title: string; links: Link[] }

export default function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <nav aria-label={title}>
      <h2 className="footer-col-title">{title}</h2>
      <ul className="footer-col-list">
        {links.map((item) => (
          <li key={item.label}><a href={safeHref(item.href)} onClick={(event) => anchorClick(item.href)(event)}>{item.label}</a></li>        ))}
      </ul>
    </nav>
  )
}
