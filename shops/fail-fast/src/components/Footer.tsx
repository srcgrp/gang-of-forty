import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
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
          <Link to="." hash="top" className="footer-logo">اسپیس مارکت</Link>
          <p>یک سوپرمارکت محلی برای خریدهای کوچک و بزرگ روزمره.</p>
          <p>تهران، خیابان ولیعصر، کوچه ۲۴</p>
        </div>
        <div>
          <h3>دسترسی سریع</h3>
          <Link to="/" hash="categories">دسته‌بندی‌ها</Link>
          <Link to="/" hash="sales">پیشنهادهای امروز</Link>
          <Link to="/" hash="categories">لبنیات</Link>
          <Link to="/" hash="categories">میوه و سبزی</Link>
        </div>
        <div>
          <h3>راهنما</h3>
          <Link to="." hash="footer">شیوه ارسال</Link>
          <Link to="." hash="footer">پیگیری سفارش</Link>
          <Link to="." hash="footer">پرسشهای متداول</Link>
          <Link to="." hash="footer">تماس با ما</Link>
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
        <Link className="go-top" to="." hash="top">بریم فضا- بالا</Link>
      </div>
    </footer>
  )
}
