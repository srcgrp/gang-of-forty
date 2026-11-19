import { Link } from '@tanstack/react-router'

export default function NotFound() {
    return <section><h1>صفحه پیدا نشد</h1><Link className="listing-link" to="/">بازگشت به خانه</Link></section>
}
