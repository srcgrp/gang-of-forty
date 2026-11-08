import type { Categories, Shop } from "../types";

interface StoreFooterProps {
  shop: Shop;
  categories: Categories;
}

export default function StoreFooter({ shop, categories }: StoreFooterProps) {
  return (
    <footer className="site-footer anchor-section" id="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-col brand-col">
            <h3 className="footer-heading brand-title">{shop.name}</h3>
            <p className="brand-description">{shop.about}</p>
            <ul className="contact-list">
              <li><svg aria-hidden="true"><use href="/sprite.svg#location" /></svg><span>{shop.address}</span></li>
              <li><svg aria-hidden="true"><use href="/sprite.svg#call" /></svg><span dir="ltr">{shop.phone}</span></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="footer-heading">دسته‌ها</h4>
            <ul className="footer-links">
              {categories.map((category) => <li key={category.id}><a href={`#${category.slug}`}>{category.name}</a></li>)}
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="footer-heading">راهنما</h4>
            <ul className="footer-links">
              {shop.help.map((item) => <li key={item.href}><a href={item.href}>{item.label}</a></li>)}
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="footer-heading">ساعت کاری</h4>
            <div className="hours-info">
              {shop.schedule.map((item) => <p key={`${item.days}-${item.time}`}><strong>{item.days}</strong><span>{item.time}</span></p>)}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="copyright">{shop.copyright}</p>
          <a href="#top" className="back-to-top"><span>بازگشت به بالا</span><svg aria-hidden="true"><use href="/sprite.svg#up" /></svg></a>
        </div>
      </div>
    </footer>
  );
}
