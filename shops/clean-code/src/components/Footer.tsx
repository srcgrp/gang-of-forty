import type { Category } from "../types/product.ts";

type FooterLink = { label: string; href: string };
type FooterProps = {
  categories: Category[];
  help: FooterLink[];
};

export default function Footer({ categories, help }: FooterProps) {
  return (
    <footer className="footer" id="contact">
      <div className="box">
        <div className="footer-cols">
          <div>
            <h2>سوپرمارکت کد تمیز</h2>
            <p id="about">
              از سال ۱۴۰۵ کنار شما هستیم؛ کالای تازه با قیمت منصفانه.
            </p>
            <p className="foot-line" id="address">
              تهران، خیابان نمونه، پلاک ۴۰
            </p>
            <p className="foot-line">
              <a id="phone" href="tel:02112345678">
                ۰۲۱-۱۲۳۴۵۶۷۸
              </a>
            </p>
          </div>
          <nav aria-label="دسته‌ها در پابرگ">
            <h2>دسته‌ها</h2>
            <ul id="footer-cats">
              {categories.map(function (cat) {
                return (
                  <li key={cat.id}>
                    <a href={"#category-" + cat.id}>{cat.name}</a>
                  </li>
                );
              })}
            </ul>
          </nav>
          <nav aria-label="راهنما">
            <h2>راهنما</h2>
            <ul id="footer-help">
              {help.map(function (item) {
                return (
                  <li key={item.label}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div>
            <h2>ساعت کاری</h2>
            <p id="hours-week">شنبه تا پنجشنبه: ۹ تا ۲۱</p>
            <p id="hours-fri">جمعه: ۱۰ تا ۱۶</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="copy-right" id="copyright">
            © سوپرمارکت تمیز
          </p>
          <a className="go-up" href="#top">
            بازگشت به بالا ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
