import type { Category, Shop } from "../types";
import { Logo } from "./Logo";

export function SiteFooter({
  shop,
  categories,
}: {
  shop: Shop;
  categories: Category[];
}) {
  return (
    <footer id="contact" className="site-footer">
      <div className="footer__wrapper">
        <div className="footer__grid">
          <div className="footer__col">
            <h2 className="footer__title">
              <span className="footer__brand-icon" aria-hidden="true">
                <Logo size={34} />
              </span>
              <span>{shop.name || "سبزکاله"}</span>
            </h2>
            <p className="footer__text">
              {shop.about || "از سال ۱۴۰۰، کنار شما هستیم."}
            </p>
            {shop.phone && (
              <p className="footer__contact">
                <span aria-hidden="true">📞</span>
                <a href={`tel:${shop.phone.replace(/[^\d+]/g, "")}`} dir="ltr">
                  {shop.phone}
                </a>
              </p>
            )}
          </div>
          <nav className="footer__col" aria-label="دسترسی‌ها">
            <h2 className="footer__title">دسترسی‌ها</h2>
            <ul className="footer__list">
              {categories.slice(0, 5).map((c) => (
                <li key={c.id}>
                  <a href={`#cat-${c.id}`}>{c.name}</a>
                </li>
              ))}
            </ul>
          </nav>
          <nav className="footer__col" aria-label="راهنما">
            <h2 className="footer__title">راهنما</h2>
            <ul className="footer__list">
              {(shop.help || []).slice(0, 5).map((item, i) => (
                <li key={i}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="footer__bottom">
          <p className="footer__copy">{shop.copyright || "© ۱۴۰۴ سبزکاله"}</p>
          <a href="#" className="footer__top" aria-label="بازگشت به بالای صفحه">
            بازگشت به بالا <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
