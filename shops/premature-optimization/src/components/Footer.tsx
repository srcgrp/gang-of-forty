import { CATEGORIES, SHOP } from "./sampleData.ts";

export default function Footer() {
  return (
    <footer id="contact">
      <div className="upper">
        <section className="about-us">
          <h2 className="upper-titles" id="footer-shop-name">
            {SHOP.name}
          </h2>
          <div className="about-details">
            <p id="shop-about">{SHOP.about}</p>
            <p className="address">
              <span>📍</span>
              <span id="shop-address">{SHOP.address}</span>
            </p>
            <p className="phone-number">
              <span>☎️</span>
              <span className="number" id="shop-phone">
                {SHOP.phone}
              </span>
            </p>
          </div>
        </section>
        <section className="links-categories">
          <h2 className="upper-titles">دسته‌ها</h2>
          <div className="links-link" id="footer-category-links">
            {CATEGORIES.map((c) => (
              <a key={c.id} href={`#${c.slug}`}>
                {c.name}
              </a>
            ))}
          </div>
        </section>
        <section className="hours">
          <h2 className="upper-titles">ساعت کاری</h2>
          <div className="hours-details" id="shop-hours">
            {SHOP.schedule.map((item) => (
              <p key={item.days}>
                {item.days}: {item.time}
              </p>
            ))}
          </div>
        </section>
      </div>
      <div className="down">
        <div className="copyright">
          <p>
            <span id="shop-copyright">{SHOP.copyright}</span>
          </p>
        </div>
        <div className="back-tp-up">
          <a className="up" href="#top">
            <span>↑</span>
            <span>بازگشت به بالا</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
