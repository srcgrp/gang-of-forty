export default function Footer() {
    return (
        <footer id="contact">
            <section aria-labelledby="footer-about">
                <h2 id="footer-about">سام مارکت</h2>
                <p id="footer-about-text"></p>
                <address id="shop-address"></address>
                <div id="shop-schedule" role="group" aria-label="ساعت کاری"></div>
            </section>

            <nav id="footer-categories" aria-label="دسته‌بندی‌های پایین صفحه"></nav>

            <a className="back-to-top" href="#top">
                بازگشت به بالا <span aria-hidden="true">↑</span>
            </a>

            <p id="shop-copyright"></p>
        </footer>
    )
}
