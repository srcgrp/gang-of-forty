import { formatCount } from '../lib/format.ts'

type HeaderProps = { cartCount: number }

export default function Header({ cartCount }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="topbar">🚚 ارسال رایگان برای خریدهای بالای ۵۰۰ هزار تومان</div>
      <div className="wrap header-grid">
        <a className="logo" href="#top" aria-label="سوپرمارکت باز-بسته، صفحه اصلی">
          <svg viewBox="0 0 40 40" aria-hidden="true" focusable="false">
            <circle cx="20" cy="20" r="20" fill="#E67188" />
            <text x="20" y="27" textAnchor="middle" fontSize="20">🚪</text>
          </svg>
          <span className="logo-text">
            <span className="logo-name">سوپرمارکت باز-بسته</span>
            <span className="logo-tag">باز برای توسعه، بسته برای تغییر</span>
          </span>
        </a>

        <a className="cart" href="#cart" aria-label="سبد خرید">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            <circle cx="9" cy="20" r="1.5" />
            <circle cx="18" cy="20" r="1.5" />
            <path d="M2 3h3l2.7 11.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 1.9-1.5L21 7H6" />
          </svg>
          <span className="cart-label">سبد خرید</span>
          <span className="count">{formatCount(cartCount)}</span>
        </a>

        <input
          className="menu-toggle"
          type="checkbox"
          id="menu-toggle"
          aria-label="باز و بسته کردن منو"
        />
        <div className="menu-btn" aria-hidden="true">
          <span></span>
        </div>

        <div className="header-menu">
          <form className="search" role="search" action="#" onSubmit={(e) => e.preventDefault()}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
              focusable="false"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <label className="sr-only" htmlFor="search">جستجو در محصولات</label>
            <input id="search" type="search" placeholder="جستجوی محصول…" />
            <button className="sr-only" type="submit">جستجو</button>
          </form>

          <nav className="main-nav" aria-label="منوی اصلی">
            <ul>
              <li className="all-cats">
                <a className="all-link" href="#categories">☰ همه دسته‌ها</a>
                <ul className="cat-menu">
                  <li><a href="#categories">🍎 میوه و سبزی</a></li>
                  <li><a href="#dairy">🥛 لبنیات</a></li>
                  <li><a href="#categories">🥖 نان و شیرینی</a></li>
                  <li><a href="#categories">🍚 خواربار</a></li>
                </ul>
              </li>
              <li><a href="#dairy">لبنیات</a></li>
              <li><a href="#contact">تماس با ما</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
