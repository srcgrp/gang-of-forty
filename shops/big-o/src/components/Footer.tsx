import type { Category } from "../types"
import { Link } from "@tanstack/react-router"

type FooterProps = {
  categories: Category[]
}

export default function Footer({ categories }: FooterProps) {
    return (
        <footer>
            <section className="address-section">
            <h2>سوپر مارکت نمونه</h2>
            <p>از سال ۱۴۰۵ کنار شما هستیم؛ کالای تازه با قیمت منصفانه.</p>
            <address>
                <p>تهران، خیابان نمونه، پلاک ۴۰</p>
                <a href="#"><bdi>...</bdi></a>
            </address>
            </section>

            <nav aria-labelledby="quick-links">
                <h2 id="quick-links">دسته ها</h2>
                <ul>
                    {categories.map((category) => 
                        <li key={category.id}>
                            <Link to="/plp/$carouselId" params={{ carouselId: category.slug }}>{category.name}</Link>
                        </li>
                    )}
                </ul>
            </nav>
            <section className="guide">
            <h2>راهنما</h2>
            <ul>
                <li><a href="#">شیوه ارسال</a></li>
                <li><a href="#">بازگشت کالا</a></li>
                <li><a href="#">پرسش های پرتکرار</a></li>
            </ul>
            </section>
            <section className="info">
            <h2>ساعت کاری</h2>
            </section>
            <div className="footer-bottom">
            <p><small>© ۱۴۰۵ سوپرمارکت نمونه · عضو دار و دسته چهل‌نفره</small></p>
            <a
            href="#"
            onClick={(event) => {
                event.preventDefault()
                window.scrollTo({ top: 0 })
            }}
            >
                بازگشت به بالا <span aria-hidden="true">&#8593;</span>
            </a>
            </div>

        </footer>
    )
}