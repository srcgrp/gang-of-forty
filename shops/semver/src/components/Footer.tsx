export default function Footer() {
  return (
    <footer id="contact">
      <article id="main-footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-col footer-about">
              <h3>درباره ما</h3>
              <p className="about-text" id="footer-about-text"></p>
              <p className="footer-info" id="footer-address"></p>
              <p className="footer-phone" dir="ltr" id="footer-phone"></p>
            </div>

            <div className="footer-col">
              <h4>دسته‌ها</h4>
              <ul className="footer-links" id="footer-category-links"></ul>
            </div>

            <div className="footer-col">
              <h4>راهنما</h4>
              <ul className="footer-links" id="footer-help-links"></ul>
            </div>

            <div className="footer-col">
              <h4>ساعت کاری</h4>
              <div className="working-hours" id="footer-hours"></div>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="copyright" id="footer-copyright"></p>
            <a href="#news" className="back-to-top">
              بازگشت به بالا ↑
            </a>
          </div>
        </div>
      </article>
    </footer>
  );
}
