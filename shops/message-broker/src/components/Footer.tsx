
import type { Shop } from '../types'

type FooterProps = {
  shop: Shop | null
}

export default function Footer({ shop }: FooterProps) {
  return (
    <footer className="footer" id="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3>درباره ما</h3>
          <p>{shop?.about}</p>
          <p>{shop?.address}</p>
          <p>{shop?.phone}</p>
        </div>

        <div className="footer-column">
          <h3>دسته‌ها</h3>
          <ul>
            {shop?.menu.map(item => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-column">
          <h3>راهنما</h3>
          <ul>
            {shop?.help.map(item => (
              <li key={item.label}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-column">
          <h3>ساعت کاری</h3>
          <ul>
            {shop?.schedule.map(item => (
              <li key={item.days}>{item.days}: {item.time}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© تمامی حقوق این فروشگاه محفوظ است</p>
        <a href="#top">بازگشت به بالا</a>
      </div>
    </footer>
  )
}
