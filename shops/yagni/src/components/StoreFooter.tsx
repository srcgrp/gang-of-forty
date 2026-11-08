export default function StoreFooter() {
  return (
    <footer className="site-footer anchor-section" id="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-col brand-col">
            <h3 className="footer-heading brand-title">مینا</h3>
            <p className="brand-description">مینا، سوپرمارکتی به وسعت قلبتان؛ خرید تازه، زندگی بهتر.</p>
            <ul className="contact-list">
              <li><svg aria-hidden="true"><use href="/sprite.svg#location" /></svg><span>فروشگاه همیشه سبز</span></li>
              <li><svg aria-hidden="true"><use href="/sprite.svg#call" /></svg><span dir="ltr">۰۲۱-۱۲۳۴۵۶۷۸</span></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="footer-heading">دسته‌ها</h4>
            <ul className="footer-links"><li><a href="#fruits">میوه و سبزی</a></li><li><a href="#dairy">لبنیات</a></li><li><a href="#bakery">نان و شیرینی</a></li></ul>
          </div>
          <div className="footer-col">
            <h4 className="footer-heading">راهنما</h4>
            <ul className="footer-links"><li><a href="#support">خدمات فروشگاه</a></li><li><a href="#top">صفحه اصلی</a></li></ul>
          </div>
          <div className="footer-col">
            <h4 className="footer-heading">ساعت کاری</h4>
            <div className="hours-info"><p><strong>همه روزه</strong><span>۸ صبح تا ۱۰ شب</span></p></div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="copyright">© تمامی حقوق برای فروشگاه مینا محفوظ است.</p>
          <a href="#top" className="back-to-top"><span>بازگشت به بالا</span><svg aria-hidden="true"><use href="/sprite.svg#up" /></svg></a>
        </div>
      </div>
    </footer>
  );
}
