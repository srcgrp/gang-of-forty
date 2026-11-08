import type { Category, ShopInfo } from '../types'
import Icon from './Icon'
import FooterColumn from './FooterColumn'
import { money } from './format'

type FooterProps = {
  shop: Pick<ShopInfo, 'name' | 'menu' | 'help' | 'schedule' | 'phone' | 'address' | 'about'
    | 'copyright' | 'deliveryFee' | 'freeDeliveryOver'>
  categories: Category[]
}

export default function Footer({ shop, categories }: FooterProps) {
  const categoryLinks = categories.map((c) => ({ label: c.name, href: `#${c.slug}` }))
  return (
    <footer className="site-footer">
      <div className="footer-inner container">
        <div className="footer-top">
          <div className="footer-cols">
            <FooterColumn title="دسترسی سریع" links={shop.menu} />
            <FooterColumn title="دسته‌بندی‌ها" links={categoryLinks} />
            <FooterColumn title="راهنمای مشتریان" links={shop.help} />
            <section>
              <h2 className="footer-col-title">ساعت کاری</h2>
              <ul className="footer-col-list">
                {shop.schedule.map((entry) => (
                  <li key={entry.days}>{entry.days}: <bdi>{entry.time}</bdi></li>
                ))}
              </ul>
            </section>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-contact" id="contact">
            <h2 className="footer-col-title">تماس با ما</h2>
            <a href={`tel:${shop.phone.replace(/[^\d+]/g, '')}`}><span>تلفن: </span><bdi>{shop.phone}</bdi></a>
            <address>{shop.address}</address>
          </div>
          <div className="footer-about" id="about">
            <h2 className="footer-col-title">دربارهٔ ریفکتور</h2>
            <p className="footer-about-desc">
              {`${shop.about} هزینهٔ ارسال ${money(shop.deliveryFee)}؛ خرید بالای ${money(shop.freeDeliveryOver)} با ارسال رایگان.`}
            </p>
          </div>
        </div>
        <div className="footer-copy">
          <p className="footer-copy-right">{shop.copyright.replaceAll(shop.name, 'سوپرمارکت ریفکتور')}</p>
        </div>
        <div className="footer-to-top-wrap">
          <a className="footer-to-top" href="#top" aria-label="بازگشت به بالای صفحه"><Icon name="arrow-up" /></a>
        </div>
      </div>
    </footer>
  )
}
