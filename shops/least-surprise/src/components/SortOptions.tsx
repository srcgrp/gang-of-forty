import { Link } from '@tanstack/react-router'

interface SortOptionsProps {
  readonly carouselId: string
}

export default function SortOptions({
  carouselId,
}: SortOptionsProps) {
  return (
    <div className="sort-options">
      <Link
        to="/plp/$carouselId"
        params={{ carouselId }}
        search={{ sort: 'default' }}
      >
        پیش‌فرض
      </Link>

      <Link
        to="/plp/$carouselId"
        params={{ carouselId }}
        search={{ sort: 'price' }}
      >
        ارزان‌تر
      </Link>
    </div>
  )
}