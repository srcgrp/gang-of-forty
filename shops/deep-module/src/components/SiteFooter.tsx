import type { Category, Shop } from "../types";

export function SiteFooter({
  shop,
  categories,
}: {
  shop: Shop;
  categories: Category[];
}) {
  return (
    <footer className="site-footer">
      <div className="footer__wrapper">
        <div className="footer__grid">
          <div className="footer__col">
            <h2 className="footer__title">{shop.name || "سبزکاله"}</h2>
            <p className="footer__text">
              {shop.about || "از سال ۱۴۰۰، کنار شما هستیم."}
            </p>
          </div>
          <nav className="footer__col">
            <h2 className="footer__title">دسترسی‌ها</h2>
            <ul className="footer__list">
              {categories.slice(0, 5).map((c) => (
                <li key={c.id}>
                  <a href={`#cat-${c.id}`}>{c.name}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="footer__bottom">
          <p className="footer__copy">{shop.copyright || "© ۱۴۰۴ سبزکاله"}</p>
        </div>
      </div>
    </footer>
  );
}
