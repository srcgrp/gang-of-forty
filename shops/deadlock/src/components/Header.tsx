export default function Header() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        پرش به محتوای اصلی
      </a>

      <header>
        <div className="info-nav">
          <svg className="gift-icon" viewBox="0 0 32 32" fill="none">
            <rect x="5" y="13" width="22" height="14" rx="2.2" fill="#C0392B" />
            <rect x="4" y="9" width="24" height="6" rx="2" fill="#D6B44C" />
            <rect x="14.2" y="9" width="3.6" height="18" fill="#F5E9C2" />
            <path
              d="M16 9c-4.7-5.2-8.3-2.7-7.1.2C9.7 11.1 12.6 10.3 16 9zM16 9c4.7-5.2 8.3-2.7 7.1.2-.8 1.9-3.7 1.1-7.1-.2z"
              fill="#D6B44C"
            />
          </svg>
          <span>با خرید ۲ محصول یکی هدیه بگیر</span>
          <svg className="gift-icon" viewBox="0 0 32 32" fill="none">
            <rect x="5" y="13" width="22" height="14" rx="2.2" fill="#C0392B" />
            <rect x="4" y="9" width="24" height="6" rx="2" fill="#D6B44C" />
            <rect x="14.2" y="9" width="3.6" height="18" fill="#F5E9C2" />
            <path
              d="M16 9c-4.7-5.2-8.3-2.7-7.1.2C9.7 11.1 12.6 10.3 16 9zM16 9c4.7-5.2 8.3-2.7 7.1.2-.8 1.9-3.7 1.1-7.1-.2z"
              fill="#D6B44C"
            />
          </svg>
        </div>

        <div className="logo-container">
          <a href="#" className="logo">
            <svg
              viewBox="0 0 100 70"
              className="logo-mark"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="66" cy="20" r="14" className="sun" />
              <polygon points="2,66 38,14 74,66" className="mountain-back" />
              <polygon points="30,66 62,22 98,66" className="mountain-front" />
            </svg>
            <div className="logo-words">
              <h1 className="logo-text">HERMAN SHOP</h1>
              <span className="logo-sub">GEAR FOR A WILDER LIFE</span>
            </div>
          </a>

          <div className="search">
            <input type="text" placeholder="جستجو محصول..." id="search-box" />
            <button type="button" className="search-btn" aria-label="جستجو">
              <svg width="16" height="16" viewBox="0 0 24 24">
                <circle
                  cx="11"
                  cy="11"
                  r="7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="16.5"
                  y1="16.5"
                  x2="22"
                  y2="22"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>

          <div className="header-actions">
            <div className="cart-wrap">
              <button type="button" className="cart">
                <svg className="btn-icon" viewBox="0 0 32 32" fill="none">
                  <path
                    d="M4 6h3l2.2 12.2a2 2 0 0 0 2 1.65h9.95a2 2 0 0 0 1.93-1.48L25.5 10H8.2"
                    stroke="currentColor"
                    strokeWidth="2.1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12.2" cy="25" r="1.7" fill="currentColor" />
                  <circle cx="22" cy="25" r="1.7" fill="currentColor" />
                </svg>
                <span className="btn-text">سبد خرید</span>
                <span className="cart-count">0</span>
              </button>
            </div>

            <details className="mobile-menu">
              <summary className="hamburger-btn" aria-label="باز کردن منو">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                </svg>
              </summary>
              <nav className="mobile-nav-links" aria-label="منوی موبایل">
                <a href="#categories">همه دسته ها</a>
                <a href="#special-offers">پیشنهاد ویژه</a>
                <a href="#sleeping-bags">کیسه خواب</a>
                <a href="#fire-gear">لوازم آتش</a>
                <a href="#tents">چادر</a>
                <a href="#contact">تماس با ما</a>
              </nav>
            </details>
          </div>
        </div>

        <nav className="main-nav" aria-label="منوی اصلی">
          <div className="dropdown-container">
            <a href="#" className="dropdown-trigger">
              <svg viewBox="0 0 32 32" fill="none">
                <rect x="5" y="5" width="8" height="8" rx="1.8" stroke="currentColor" strokeWidth="2" />
                <rect x="19" y="5" width="8" height="8" rx="1.8" stroke="currentColor" strokeWidth="2" />
                <rect x="5" y="19" width="8" height="8" rx="1.8" stroke="currentColor" strokeWidth="2" />
                <rect x="19" y="19" width="8" height="8" rx="1.8" stroke="currentColor" strokeWidth="2" />
              </svg>
              همه دسته ها
            </a>
            <ul className="dropdown-menu">
              <li><a href="#tents">چادر</a></li>
              <li><a href="#sleeping-bags">کیسه خواب</a></li>
              <li><a href="#fire-gear">لوازم آتش</a></li>
              <li><a href="#climbing-shoes">کفش کوهنوردی</a></li>
            </ul>
          </div>

          <a href="#special-offers">پیشنهاد ویژه</a>
          <a href="#sleeping-bags">کیسه خواب</a>
          <a href="#fire-gear">لوازم آتش</a>
          <a href="#tents">چادر</a>
          <a href="#contact">تماس با ما</a>
        </nav>
      </header>
    </>
  );
}
