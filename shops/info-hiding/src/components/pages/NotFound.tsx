import { Link } from '@tanstack/react-router';
export default function NotFound() {
    return <section className="category-section">
        <h1>صفحه پیدا نشد</h1>
        <p>آدرس واردشده در فروشگاه وجود ندارد.</p>
        <Link to="/">بازگشت به خانه</Link>
    </section>;
}
