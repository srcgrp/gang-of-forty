import JumpLink from './JumpLink.tsx'
export default function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="wrap">
        <div className="footer-grid">
          <section>
            <h2>سوپرمارکت باز-بسته</h2>
            <p>اصل باز-بسته: کد باید برای توسعه باز و برای تغییر بسته باشد.</p>
          </section>
          <section>
            <h2>تماس با ما</h2>
            <address>
              تهران، خیابان نمونه، پلاک ۴۰
              <br />
              <a href="tel:02112345678" dir="ltr">021&#8209;12345678</a>
            </address>
          </section>
          <section>
            <h2>ساعت کاری</h2>
            <p>
              شنبه تا پنجشنبه: ۸ تا ۲۲
              <br />
              جمعه: ۹ تا ۱۴
            </p>
          </section>
          <section>
            <h2>راهنما</h2>
            <ul>
              <li><JumpLink to="top">شیوه ارسال</JumpLink></li>
              <li><JumpLink to="top">بازگشت کالا</JumpLink></li>
            </ul>
          </section>
        </div>
        <div className="footer-bottom">
          <p>© ۱۴۰۵ سوپرمارکت باز-بسته · عضو دار و دسته چهل‌نفره</p>
          <JumpLink className="to-top" to="top">↑ بازگشت به بالا</JumpLink>
        </div>
      </div>
    </footer>
  )
}
