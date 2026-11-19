import { Link } from '@tanstack/react-router'
import type { CarouselSort } from '../shared/types'

const OPTIONS = [
  { value: 'default', label: 'پیش‌فرض' },
  { value: 'price', label: 'ارزان‌ترین' },
] as const

type PlpSortLinksProps = {
  carouselId: string
  sort: CarouselSort
}

export default function PlpSortLinks({ carouselId, sort }: PlpSortLinksProps) {
  return (
    <nav className="plp__sort" aria-label="مرتب‌سازی محصولات">
      {OPTIONS.map(({ value, label }) => (
        <Link
          key={value}
          to="/plp/$carouselId"
          params={{ carouselId }}
          search={(previous) => ({ ...previous, sort: value })}
          resetScroll={false}
          className="catalog-link"
          aria-current={sort === value ? 'page' : undefined}
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}
