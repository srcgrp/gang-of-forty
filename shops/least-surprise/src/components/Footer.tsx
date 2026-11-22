export default function Footer() {
  return (
    <footer id="contact" className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h3 className="footer-title">درباره سوپرمارکت کمترین شگفتی</h3>
            <p className="footer-text">
              هدف ما ایجاد خریدی آسوده، شفاف و بدون تغییر ناگهانی قیمت در فاکتور نهایی است.
              کلیه محصولات سوپرمارکتی، لبنیات روز و تره‌بار مستقیماً از تأمین‌کنندگان معتبر آماده و در کمترین زمان ارسال می‌گردند.
            </p>
          </div>

          <div className="footer-col">
            <h3 className="footer-title">دسترسی و بخش‌ها</h3>
            <ul className="footer-links">
              <li><a href="#discounts">تخفیف‌های شگفت‌انگیز</a></li>
              <li><a href="#dairy">لبنیات و پروتئین</a></li>
              <li><a href="#fruits">میوه و سبزیجات روز</a></li>
              <li><a href="#bakery">نان و شیرینی تازه</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3 className="footer-title">ارتباط و پشتیبانی</h3>
            <address className="footer-contact">
              <p>📍 نشانی: تهران، خیابان ولیعصر، جنب پارک ملت</p>
              <p>📞 پشتیبانی: <span dir="ltr">021 - 8877 6655</span></p>
              <p>✉️ ایمیل: info@least-surprise.local</p>
              <p>⏰ ساعات کاری: همه‌روزه از ۸ صبح الی ۲۴</p>
            </address>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© ۱۴۰۵ کلیه حقوق برای سوپرمارکت آنلاین کمترین شگفتی محفوظ است.</p>
          <a href="#main-content" className="back-to-top">↑ بازگشت به بالای صفحه</a>
        </div>
      </div>
    </footer>
  )
}
