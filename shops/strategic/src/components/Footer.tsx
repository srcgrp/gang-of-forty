import type { ShopData } from '../types';
import { safeHref, stripEmoji } from './shop-content';
import CategoryLink, { type CategoryListProps } from './CategoryLink';
import FooterAbout from './FooterAbout';
export default function Footer({ categories, categoryId, onPick, shop }: CategoryListProps & { shop: ShopData }) {
  return (
    <footer className="site-footer" id="contact">
      <div className="wrap">
        <div className="foot-grid">
          <FooterAbout about={stripEmoji(shop.about)} />
          <nav aria-label="دسته‌ها در پاورقی">
            <h2>دسته‌ها</h2>
            <ul id="foot-cats">
              {categories.map(category => (
                <li key={category.id}>
                  <CategoryLink active={category.id === categoryId} category={category} onPick={onPick}>
                    {category.name}
                  </CategoryLink>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2>راهنما</h2>
            <ul id="foot-help">
              {shop.help.map(item => <li key={item.label}>
                {item.href && item.href !== '#' ? <a href={safeHref(item.href)}>{stripEmoji(item.label)}</a> : stripEmoji(item.label)}
              </li>)}
            </ul>
          </div>
          <div>
            <h2>ساعت کاری</h2>
            <ul id="foot-hours">
              {shop.schedule.map(row => <li key={row.days}>{row.days}: {row.time}</li>)}
            </ul>
          </div>
        </div>
        <div className="foot-bar">
          <p id="foot-copy">© ۱۴۰۵ تمامی حقوق برای سوپرمارکت آرمین محفوظ است.</p>
          <a href="#top">
            <svg className="icon" aria-hidden="true" focusable="false"><use href="#i-arrow-up" /></svg>
            {" بازگشت به بالا"}
          </a>
        </div>
      </div>
    </footer>
  );
}