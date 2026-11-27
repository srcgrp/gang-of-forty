import { Link } from "@tanstack/react-router"
import type { SortOption } from "../types"

type SortLinksProps = {
  carouselId: string
  sort: SortOption
}

const OPTIONS: { value: SortOption; label: string }[] = [
  { value: "default", label: "پیش‌فرض" },
  { value: "price", label: "ارزان‌ترین" },
]

// Links that change only ?sort and keep the same list. The selected one gets aria-current.
export default function SortLinks({ carouselId, sort }: SortLinksProps) {
  return (
    <nav className="sort-links" aria-label="مرتب‌سازی">
      <span>مرتب‌سازی:</span>
      {OPTIONS.map((option) => (
        <Link
          key={option.value}
          className="sort-link"
          to="/plp/$carouselId"
          params={{ carouselId }}
          search={{ sort: option.value }}
          aria-current={sort === option.value ? "true" : undefined}
        >
          {option.label}
        </Link>
      ))}
    </nav>
  )
}
