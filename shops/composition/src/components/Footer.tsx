import SiteLink from "./SiteLink";
import type { Shop, Category } from "../shared/types";

type Props = { shop: Shop; categories: Category[] };
export default function Footer({ shop, categories }: Props) {
  return (
    <footer id="contact">
      <div className="wrap footer-grid">
        <div id="shop-info">
          <h2>بت‌شاپ</h2><p>{shop.about}</p><address>{shop.address}</address>
          <a href={"tel:" + shop.phone} dir="ltr">{shop.phone}</a>
        </div>
        <nav id="footer-categories" aria-label="دسته‌بندی‌های پایین صفحه">
          <h2>دسته‌بندی‌ها</h2>
          {categories.map(category => (
            <SiteLink key={category.id} href={"#" + category.slug}>{category.name}</SiteLink>
          ))}
        </nav>
        <div id="shop-hours">
          <h2>ساعت کاری</h2>
          {shop.schedule.map(day => <p key={day.days}>{day.days}: {day.time}</p>)}
        </div>
      </div>
      <div id="footer-bottom" className="wrap footer-bottom">
        <p>{shop.copyright.replace(shop.name, "بت‌شاپ")}</p>
        <SiteLink href="#top">بازگشت به بالا ↑</SiteLink>
      </div>
    </footer>
  );
}
