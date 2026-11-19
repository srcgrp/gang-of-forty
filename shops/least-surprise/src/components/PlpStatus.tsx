
import { Link } from '@tanstack/react-router'

type Props = {
  loading: boolean
  error: string | null
  empty: boolean
  notFound: boolean
  retry: () => void
}

export default function PlpStatus({
  loading,
  error,
  empty,
  notFound,
  retry,
}: Props) {
  if (loading) return <p>در حال بارگذاری فهرست محصولات...</p>

  if (error) {
    return (
      <section>
        <p>خطا: {error}</p>
        <button type="button" onClick={retry}>
          تلاش دوباره
        </button>
      </section>
    )
  }

  if (notFound) {
    return (
      <section>
        <h2>این فهرست پیدا نشد</h2>
        <Link to="/">بازگشت به صفحه اصلی</Link>
      </section>
    )
  }

  if (empty) return <p>محصولی برای نمایش وجود ندارد.</p>

  return null
}
