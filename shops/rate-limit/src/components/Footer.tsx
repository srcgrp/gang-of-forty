import type { Category } from '../types';
import { toPersianDigits } from '../format/price';

interface FooterProps {
  categories: Category[];
}

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

        <div className="footer-bottom">
          <p className="footer-bottom-text">© {toPersianDigits(1405)} سوپر مارکت محدودیت نرخ. عضو دار و دسته چهل نفره</p>
          <a href="#top" className="jump-to-up">
            پرش به بالا
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}