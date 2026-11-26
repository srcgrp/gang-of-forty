import { Link } from "@tanstack/react-router"

export default function NotFound() {
    return (
        <main id="main-content" className="container page-status" tabIndex={-1}>
            <h1 className="not-found-title">این صفحه پیدا نشد</h1>
            <Link className="button button--secondary button--route" to="/">
               بازگشت به صفحه‌ی اصلی
            </Link>
        </main>
    )
}