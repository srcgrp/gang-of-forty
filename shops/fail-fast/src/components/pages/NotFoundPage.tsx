import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'

export default function NotFoundPage(): ReactNode {
  return (
    <section className="section">
      <h2>صفحه پیدا نشد</h2>
      <Link to="/">بازگشت به صفحه اصلی</Link>
    </section>
  )
}
