import orangeSliceIcon from "../../png/orange-slice.png";
import phoneIcon from "../../png/phone-fill.png";
import FooterLists from "./FooterLists.tsx";
import clockIcon from "../../png/clock-fill.png";
import type { Category, Shop } from "../types.ts";

   type FooterProps = {
     shop: Shop;
     categories: Category[];
   };

export default function Footer({ shop, categories }: FooterProps){
    return (
    <footer>
    <div className="footer-columns">
      <div>
        <p className="footer-brand">پرتقال<img className="icon-inline" src={orangeSliceIcon} alt="" width="32" height="32"/>
        </p>
        <p className="about">{shop.about}</p>
      </div>
      <section id="contact">

        <h2><img className="icon-inline" src={phoneIcon} alt="" width="20" height="20"/>راه ارتباطی</h2>
        <address>
          <p className="address">{shop.address}</p>
          <p className="phone">
            <a href={`tel:${shop.phone}`} dir="ltr">{shop.phone}</a>
          </p>
        </address>
      </section>
         <FooterLists categories={categories} help={shop.help} />
      <section id="working-hours">
        <h2><img className="icon-inline" src={clockIcon} alt="" width="20" height="20"/>ساعت کاری</h2>
        {shop.schedule.map((row) => (
         <p className="schedule-row" key={row.days}>
           {row.days}: {row.time}
         </p>
         ))}
      </section>
    </div>
    <div className="footer-bottom">
      <p><small>© ۱۴۰۵ پرتقال</small></p>
      <a href="#top">بازگشت به بالا</a>
    </div>
  </footer>)
}