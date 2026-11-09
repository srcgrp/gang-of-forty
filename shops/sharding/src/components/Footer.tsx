export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__main">
          <div className="footer__identity">
            <a href="#" className="identity" aria-label="بازگشت به بالای صفحه">
              <span className="identity__logo" aria-hidden="true">
                <img className="logo-img" src="./assets/images/logo/kiwi-fruit.svg" alt="" width="48" height="48" />
              </span>
              <span className="identity__text">
                <span className="identity__name">کیوی</span>
                <span className="identity__tagline">تازه، سریع، ارزان</span>
              </span>
            </a>
            <p className="footer__about">
              فروشگاه آنلاین کیوی، عرضه‌کننده مواد غذایی تازه و باکیفیت.
            </p>
          </div>

          <div className="footer__col">
            <h3 className="footer__title">خدمات مشتریان</h3>
            <ul className="footer__list">
              <li><a href="#">پیگیری سفارش</a></li>
              <li><a href="#">سؤالات متداول</a></li>
              <li><a href="#">تماس با پشتیبانی</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <h3 className="footer__title">تماس با ما</h3>
            <ul className="footer__list">
              <li><a href="tel:02112345678" dir="ltr">021-12345678</a></li>
              <li>تهران، خیابان ولیعصر</li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">© ۱۴۰۴ — تمام حقوق محفوظ است</p>
          <a href="#main-content" className="footer__top">
            <span>بازگشت به بالا</span>
            <svg className="footer__top-icon" aria-hidden="true">
              <use href="./icons.svg#arrowUp" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}