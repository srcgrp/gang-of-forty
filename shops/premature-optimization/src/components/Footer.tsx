import type { Category, Shop } from '../scripts/types'

const FA_DIGITS = '۰۱۲۳۴۵۶۷۸۹'

export function toFaDigits(text: string): string {
  return text.replace(/\d/g, (d) => FA_DIGITS[Number(d)])
}

type FooterProps = {
  shop: Shop
  categories: Category[]
}

export default function Footer({ shop, categories }: FooterProps) {
  return (
    <footer id="contact">
      <div className="upper">
        <section className="about-us">
          <h2 className="upper-titles" id="footer-shop-name">{shop.name}</h2>
          <div className="about-details">
            <p id="shop-about">{shop.about}</p>
            <p className="address">
              <span>⚲</span>
              <span id="shop-address">{shop.address}</span>
            </p>
            <p className="phone-number">
              <span>&#9743;</span>
              <span className="number" id="shop-phone">{toFaDigits(shop.phone)}</span>
            </p>
          </div>
        </section>
        <section className="links-categories">
          <h2 className="upper-titles">دسته‌ها</h2>
          <div className="links-link" id="footer-category-links">
            {categories.map((c) => (
              <a key={c.id} href={`#${c.slug}`}>{c.name}</a>
            ))}
          </div>
        </section>
        <section className="hours">
          <h2 className="upper-titles">ساعت کاری</h2>
          <div className="hours-details" id="shop-hours">
            {shop.schedule.map((item) => (
              <p key={item.days}>{item.days}: {item.time}</p>
            ))}
          </div>
        </section>
      </div>
      <div className="down">
        <div className="copyright">
          <p><span id="shop-copyright">{shop.copyright}</span></p>
        </div>
        <div className="back-tp-up">
          <a className="up" href="#top">
            <span>↑</span>
            <span>بازگشت به بالا</span>
          </a>
        </div>
      </div>
    </footer>
  )
}