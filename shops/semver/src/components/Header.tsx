import CategoryNav from './CategoryNav';

export default function Header() {
  return (
    <header>
      <article>
        <section id="news-section">
          <p id="news">
            <span id="highlight">ارسال رایگان </span>با خرید بالای 500 هزارتومان
          </p>
          <i className="ph ph-package"></i>
        </section>
      </article>
      <nav>
        <section id="nav-section">
          <div id="site-brand">
            <img
              id="logo"
              src="./image/pomegranate-logo-02.svg"
              alt="لوگوی فروشگاه مترون"
            />
            <section id="site-name">
              <p id="title">سوپرمارکت ناردونه</p>
              <p id="tagline">دقیـق مثـل مترونـوم</p>
            </section>
          </div>
          <input
            id="search-input"
            type="search"
            aria-label="جستجوی محصولات"
            placeholder="جستجـو کنیـد ..."
          />
          <div id="user-actions">
            <i className="ph ph-bell"></i>
            <button
              id="shopping-cart-button"
              type="button"
              aria-label="مشاهده سبد خرید"
            >
              سبد خرید
              <span id="cart-count" className="cart-count" hidden>
                ۰
              </span>
              <i className="ph ph-shopping-cart-simple"></i>
            </button>
          </div>
        </section>
      </nav>
      <CategoryNav />
      <section className="hero-container">
        <div id="hero-right">
          <div id="hero-title1">
            <h1 id="hero-h1"></h1>
            <p id="hero-p"></p>
            <a href="#" id="cta">
              <span id="cta-label"></span>
              <i className="ph ph-arrow-left ph-lg"></i>
            </a>
          </div>
        </div>
      </section>
    </header>
  );
}
