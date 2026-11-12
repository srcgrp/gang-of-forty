import type { ReactNode } from 'react'
import footerImg from '../images/footer.webp'

export default function Footer(): ReactNode {
  return (
    <footer id="footer">
      <img
        src={footerImg}
        className="footer-bg"
        alt=""
        role="presentation"
      />
      <div className="footer-inner">
        <div>
          <a href="#top" className="footer-logo">اسپیس مارکت</a>
          <p>یک سوپرمارکت محلی برای خریدهای کوچک و بزرگ روزمره.</p>
          <p>تهران، خیابان ولیعصر، کوچه ۲۴</p>
        </div>
        <div>
          <h3>دسترسی سریع</h3>
          <a href="#categories">دسته\u200cبندی\u200cها</a>
          <a href="#sales">پیشنهادهای امروز</a>
          <a href="#categories">لبنیات</a>
          <a href="#categories">میوه و سبزی</a>
        </div>
        <div>
          <h3>راهنما</h3>
          <a href="#footer">شیوه ارسال</a>
          <a href="#footer">پیگیری سفارش</a>
          <a href="#footer">پرسشهای متداول</a>
          <a href="#footer">تماس با ما</a>
        </div>
        <div>
          <h3>ساعت کاری</h3>
          <p>شنبه تا پنجشنبه</p>
          <b>۸:۰۰ تا ۲۳:۰۰</b>
          <p>جمعه</p>
          <b>۹:۰۰ تا ۲۰:۰۰</b>
        </div>
      </div>
      <div className="footer-bottom">
        <span>اسپیس مارکت - تنها سوپر مارکت ۲۴/۷</span>
        <a className="go-top" href="#top">بریم فضا- بالا</a>
      </div>
    </footer>
  )
}
