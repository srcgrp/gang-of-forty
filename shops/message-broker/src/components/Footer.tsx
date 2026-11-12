
export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer-container">

        <div className="footer-column">
          <h3>درباره ما</h3>
          <p id="about"></p>
          <p id="address"></p>
          <p id="phone"></p>
        </div>

        <div className="footer-column">
          <h3>دسته‌ها</h3>
          <ul id="footer-categories"></ul>
        </div>

        <div className="footer-column">
          <h3>راهنما</h3>
          <ul id="footer-help"></ul>
        </div>

        <div className="footer-column">
          <h3>ساعت کاری</h3>
          <ul id="schedule"></ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; تمامی حقوق این فروشگاه محفوظ است</p>
        <a href="#top">بازگشت به بالا</a>
      </div>
    </footer>
  )
}
