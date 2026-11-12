import type { Category, Shop } from "../types";

type FooterProps = {
  shop: Shop | null;
  categories: Category[];
};

export default function Footer({ shop, categories }: FooterProps) {
  return (
    <footer id="contact">
      <article id="main-footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-col footer-about">
              <h3>درباره ما</h3>
              <p className="about-text" id="footer-about-text">
                {shop?.about}
              </p>
              <p className="footer-info" id="footer-address">
                {shop?.address}
              </p>
              <p className="footer-phone" dir="ltr" id="footer-phone">
                {shop?.phone}
              </p>
            </div>

            <div className="footer-col">
              <h4>دسته‌ها</h4>
              <ul className="footer-links" id="footer-category-links">
                {categories.map((category) => (
                  <li key={category.id}>
                    <a href={`#${category.slug}`}>{category.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-col">
              <h4>راهنما</h4>
              <ul className="footer-links" id="footer-help-links">
                {shop?.help.map((link) => (
                  <li key={`${link.href}-${link.label}`}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-col">
              <h4>ساعت کاری</h4>
              <div className="working-hours" id="footer-hours">
                {shop?.schedule.map((slot) => (
                  <p key={`${slot.days}-${slot.time}`}>
                    {slot.days}: {slot.time}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="copyright" id="footer-copyright">
              {shop?.copyright}
            </p>
            <a href="#news" className="back-to-top">
              بازگشت به بالا ↑
            </a>
          </div>
        </div>
      </article>
    </footer>
  );
}
