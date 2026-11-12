export default function Footer() {
    return (<>
<footer id="about">
        <div className="footer-content">
            <div>
                <h2>دربارهٔ سوپرمارکت یاسمن</h2><span className="target-note">اینجا هستید</span>
                <p>فروشگاه کوچک محلهٔ ما؛ همراه خریدهای روزانهٔ شما.</p>
                <address>آدرس نمونه: تهران، خیابان بهار، پلاک ۱۲<br />تلفن نمونه: <a href="tel:+982112345678"><bdi
                            dir="ltr">۰۲۱‑۱۲۳۴۵۶۷۸</bdi></a></address>
            </div>
            <div>
                <h2>دسته‌بندی‌ها</h2>
                <div className="footer-links">
                    <a href="#offers">پیشنهاد ویژه امروز</a>
                    <a href="#dairy">لبنیات</a>
                    <a href="#fruit">میوه و سبزی</a>
                    <a href="#bakery">نان و صبحانه</a>
                    <a href="#drinks">نوشیدنی</a>
                    <a href="#pantry">مواد غذایی</a>
                </div>
            </div>
            <div>
                <h2>ساعت کاری</h2>
                <p>هر روز از ۸ صبح تا ۱۰ شب</p>
                <a href="#top">بازگشت به بالا ↑</a>
            </div>
        </div>
        <p className="copyright">© ۱۴۰۵ سوپرمارکت یاسمن؛ همهٔ حقوق محفوظ است.</p>
    </footer>
    </>);
}
