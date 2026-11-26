const FOOTER_LINKS = ["چادر مسافرتی", "کیسه خواب", "لوازم آتش", "کفش کوهنوردی"];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <section className="footer-section about">
          <h3>درباره هرمان شاپ</h3>
          <p>تأمین‌کننده تجهیزات حرفه‌ای کمپینگ و طبیعت‌گردی برای تجربه‌ای امن و لذت‌بخش در دل طبیعت.</p>
          <address>آدرس: تهران، خیابان ولیعصر، بالاتر از پارک وی، پلاک ۱۲</address>
          <p id="contact">تلفن: <span dir="ltr">۰۲۱ - ۸۸۷۷۶۶۵۵</span></p>
        </section>
        <section className="footer-section links">
          <h3>لینک دسته‌ها</h3>
          <ul>{FOOTER_LINKS.map((label) => <li key={label}><a href="#categories">{label}</a></li>)}</ul>
        </section>
        <section className="footer-section hours">
          <h3>ساعت کاری</h3>
          <p>شنبه تا چهارشنبه: ۹:۰۰ الی ۲۱:۰۰</p>
          <p>پنجشنبه و جمعه: ۱۰:۰۰ الی ۱۸:۰۰</p>
        </section>
      </div>
      <div className="footer-bottom">
        <p>© 2026 تمامی حقوق برای هرمان شاپ محفوظ است.</p>
        <a href="#" className="back-to-top">بازگشت به بالا ⬆</a>
      </div>
    </footer>
  );
}
