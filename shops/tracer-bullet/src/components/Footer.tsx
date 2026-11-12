import orangeSliceIcon from "../../png/orange-slice.png";
import phoneIcon from "../../png/phone-fill.png";
import foldersIcon from "../../png/folders-fill.png";
import handPointingIcon from "../../png/hand-pointing-fill.png";
import clockIcon from "../../png/clock-fill.png";

export default function Footer(){
    return (
    <footer>
    <div className="footer-columns">
      <div>
        <p className="footer-brand">پرتقال<img className="icon-inline" src={orangeSliceIcon} alt="" width="32" height="32"/>
        </p>
        <p className="about"></p>
      </div>
      <section id="contact">

        <h2><img className="icon-inline" src={phoneIcon} alt="" width="20" height="20"/>راه ارتباطی</h2>
        <address>
          <p className="address"></p>
          <p className="phone"><a href="tel:+982100000000" dir="ltr">&#8209;</a></p>
        </address>
      </section>
      <nav className="footer-nav" aria-label="پیوندهای پایین صفحه">
        <div>
          <h2><img className="icon-inline" src={foldersIcon} alt="" width="20" height="20"/>دسته‌ها</h2>
          <ul className="footer-categories">
          </ul>
        </div>
        <div>
          <h2><img className="icon-inline" src={handPointingIcon} alt="" width="20" height="20"/>راهنما</h2>
          <ul className="footer-help">
          </ul>
        </div>
      </nav>
      <section id="working-hours">
        <h2><img className="icon-inline" src={clockIcon} alt="" width="20" height="20"/>ساعت کاری</h2>
      </section>
    </div>
    <div className="footer-bottom">
      <p><small>© ۱۴۰۵ پرتقال</small></p>
      <a href="#top">بازگشت به بالا</a>
    </div>
  </footer>)
}