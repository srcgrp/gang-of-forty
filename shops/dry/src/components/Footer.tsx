import { Link } from '@tanstack/react-router'

export default function Footer() {
    return (
        <footer className="footer" id="contact">
  <div className="footer-brand">
    <svg className="logo" viewBox="0 0 270 64" aria-hidden="true"><use href="#logo-shapes" /></svg>
    <p>مارتو، همراه شما برای خریدهای روزانه</p>
    <address>
      تهران، خیابان نمونه، پلاک ۴۰<br />
      تلفن: <bdi dir="ltr">۰۲۱-۱۲۳۴۵۶۷۸</bdi>
    </address>
  </div>

  <div className="footer-column">
    <h3>دسته‌ها</h3>
    <Link to="/plp/$carouselId" params={{ carouselId: 'fruits' }}>میوه و سبزی</Link>
    <Link to="/plp/$carouselId" params={{ carouselId: 'dairy' }}>لبنیات</Link>
    <Link to="/plp/$carouselId" params={{ carouselId: 'offers' }}>پیشنهادهای ویژه</Link>
    <Link to="/">مجله</Link>
  </div>

  <div className="footer-column">
    <h3>ساعت کاری</h3>
    <p>شنبه تا پنجشنبه: ۸ تا ۲۲</p>
    <p>جمعه: ۹ تا ۱۴</p>
  </div>

  <div className="footer-bottom">
    <span>© ۱۴۰۵ مارتو · عضو دار و دسته چهل‌نفره</span>
    <a href="#/" onClick={(e) => {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }}>↑ بازگشت به بالا</a>
  </div>

</footer>

    )
}