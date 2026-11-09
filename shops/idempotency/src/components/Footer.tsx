import FooterAbout from "./FooterAbout";
import FooterContact from "./FooterContact";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <FooterAbout />

        <section className="footer-section">
          <h2 className="footer-title">
            دسته‌بندی‌ها
          </h2>

          <nav aria-label="دسته‌بندی‌های فوتر">
            <a href="#products">محصولات فروشگاه</a>
          </nav>
        </section>

        <section className="footer-section">
          <h2 className="footer-title">
            راهنمای مشتریان
          </h2>

          <nav aria-label="راهنمای مشتریان">
            <a href="#about">درباره ما</a>
            <a href="#contact">تماس با ما</a>
          </nav>
        </section>

        <FooterContact />
      </div>

      <div className="footer-bottom">
        <p>© ۱۴۰۵ تازه‌خانه</p>
        <a href="#top">بازگشت به بالا ↑</a>
      </div>
    </footer>
  );
}