export default function FooterContact() {
  return (
    <section id="contact" className="footer-section">
      <h2 className="footer-title">
        <img
          src="./asset/icons/phone.png"
          alt=""
          aria-hidden="true"
          className="footer-title-icon"
        />
        تماس با ما
      </h2>

      <div className="footer-info">
        <img
          src="./asset/icons/clock.png"
          alt=""
          aria-hidden="true"
          className="footer-info-icon"
        />

        <div>
          <p>ساعات پاسخگویی:</p>
          <p>شنبه تا پنجشنبه، ۹ تا ۲۰</p>
        </div>
      </div>

      <p className="footer-phone">
        ۰۲۱-۱۲۳۴۵۶۷۸
      </p>

      <address className="footer-address">
        تهران، خیابان ولیعصر، پلاک ۱۲۳
      </address>
    </section>
  );
}