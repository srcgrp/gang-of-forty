export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="box">
        <div className="footer-cols">
          <div>
            <h2>سوپرمارکت کد تمیز</h2>
            <p id="about">
              از سال ۱۴۰۵ کنار شما هستیم؛ کالای تازه با قیمت منصفانه.
            </p>
            <p className="foot-line" id="address">
              تهران، خیابان نمونه، پلاک ۴۰
            </p>
            <p className="foot-line">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="#d5dfd2"
                  d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1z"
                ></path>
              </svg>
              <a id="phone" href="tel:">
                ۰۲۱-۱۲۳۴۵۶۷۸
              </a>
            </p>
          </div>
          <nav aria-label="دسته‌ها در پابرگ">
            <h2>دسته‌ها</h2>
            <ul id="footer-cats"></ul>
          </nav>
          <nav aria-label="راهنما">
            <h2>راهنما</h2>
            <ul id="footer-help"></ul>
          </nav>
          <div>
            <h2>ساعت کاری</h2>
            <p id="hours-week"></p>
            <p id="hours-fri"></p>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="copy-right" id="copyright"></p>
          <a className="go-up" href="#top">
            بازگشت به بالا ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
