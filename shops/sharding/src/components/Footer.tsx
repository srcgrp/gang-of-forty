import type { Shop } from '../shared/types'

type FooterProps = { shop: Shop | null }

export default function Footer({ shop }: FooterProps) {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer__main">
          <div className="footer__identity">
            <a href="#" className="identity" aria-label="بازگشت به بالای صفحه">
              <span className="identity__logo" aria-hidden="true">
                <img className="logo-img" src="./assets/images/logo/kiwi-fruit.svg" alt="" width="48" height="48" />
              </span>
              <span className="identity__text">
                <span className="identity__name">{shop?.name}</span>
                <span className="identity__tagline">{shop?.slogan}</span>
              </span>
            </a>
            <p className="footer__about">{shop?.about}</p>
          </div>
          <div className="footer__col">
            <h3 className="footer__title">خدمات مشتریان</h3>
            <ul className="footer__list">
              {shop?.help.map((link) => <li key={link.label}><a href={link.href}>{link.label}</a></li>)}
            </ul>
          </div>
          <div className="footer__col" id="contact">
            <h3 className="footer__title">تماس با ما</h3>
            <ul className="footer__list">
              {shop && <li><a href={`tel:${shop.phone}`} dir="ltr">{shop.phone}</a></li>}
              <li>{shop?.address}</li>
              {shop?.schedule.map((row) => <li key={row.days}>{row.days}: {row.time}</li>)}
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <p className="footer__copy">{shop?.copyright}</p>
          <a href="#main-content" className="footer__top">بازگشت به بالا</a>
        </div>
      </div>
    </footer>
  )
}
