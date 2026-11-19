import { Link } from '@tanstack/react-router'
import { apiHashLink } from '../shared/storage/url'
import type { Shop } from '../shared/types'

type FooterProps = { shop: Shop | null }

export default function Footer({ shop }: FooterProps) {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer__main">
          <div className="footer__identity">
            <Link to="/" search={true} className="identity" aria-label="بازگشت به بالای صفحه">
              <span className="identity__logo" aria-hidden="true">
                <img className="logo-img" src="./assets/images/logo/kiwi-fruit.svg" alt="" width="48" height="48" />
              </span>
              <span className="identity__text">
                <span className="identity__name">{shop?.name}</span>
                <span className="identity__tagline">{shop?.slogan}</span>
              </span>
            </Link>
            <p className="footer__about">{shop?.about}</p>
          </div>
          <div className="footer__col">
            <h3 className="footer__title">خدمات مشتریان</h3>
            <ul className="footer__list">
              {shop?.help.map(({ label, href }) => {
                const route = apiHashLink(href)
                return <li key={label}>{route ? <Link {...route}>{label}</Link> : <a href={href}>{label}</a>}</li>
              })}
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
          <Link to="." hash="main-content" search={true} resetScroll={false} className="footer__top">بازگشت به بالا</Link>
        </div>
      </div>
    </footer>
  )
}
