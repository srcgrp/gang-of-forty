import type { Category } from '../types';
import { toPersianDigits } from '../format/price';
import FooterBottom from './FooterBottom';

type FooterProps = {
  categories: Category[];
};

export default function Footer({ categories }: FooterProps) {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-col footer-brand-col" id="about">
            <h2 className="footer-title footer-brand">
              <span aria-hidden="true">🪐</span> سوپر مارکت محدودیت نرخ
            </h2>
            <p className="footer-text">از سال {toPersianDigits(1405)} در کنار شما هستیم؛ کالای تازه با قیمت منصفانه</p>
            <address className="footer-address">
              <p><span aria-hidden="true">📍</span> تهران، ونک</p>
              <p>
                <span aria-hidden="true">📞</span>{' '}
                <a href="tel:+982112345678" className="footer-phone">{toPersianDigits('123456789')}</a>
              </p>
            </address>
          </div>

          <section className="footer-col footer-categories" aria-labelledby="footer-categories-title">
            <h2 className="footer-title" id="footer-categories-title">دسته‌ها</h2>
            <ul className="footer-list">
              {categories.map((c) => (
                <li key={c.id}><a href={`#${c.slug}`}>{c.name}</a></li>
              ))}
            </ul>
          </section>

          <section className="footer-col" aria-labelledby="footer-help-title">
            <h2 className="footer-title" id="footer-help-title">راهنما</h2>
            <ul className="footer-list">
              <li><a href="#delivery">شیوه ارسال</a></li>
              <li><a href="#returns">بازگشت کالا</a></li>
              <li><a href="#faq">پرسش‌های پرتکرار</a></li>
            </ul>
          </section>

          <section className="footer-col" aria-labelledby="footer-hours-title">
            <h2 className="footer-title" id="footer-hours-title">ساعت کاری</h2>
            <dl className="footer-hours">
              <div>
                <dt>شنبه تا پنجشنبه</dt>
                <dd>{toPersianDigits('8 تا 22')}</dd>
              </div>
              <div>
                <dt>جمعه</dt>
                <dd>{toPersianDigits('9 تا 14')}</dd>
              </div>
            </dl>
          </section>
        </div>
        <FooterBottom />
      </div>
    </footer>
  );
}