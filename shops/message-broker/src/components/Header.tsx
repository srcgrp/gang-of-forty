import CategoryNav from './CategoryNav'

export default function Header() {
  return (
    <header className="header" id="top">
      <a className="skip" href="#main">
        پرش به محتوای اصلی
      </a>

      <div className="top-bar">
        <p id="notice"></p>
      </div>

      <input
        type="checkbox"
        id="menu-toggle"
        aria-label="باز و بسته کردن منو"
      />

      <div className="bar">
        <a
          href="#top"
          className="logo"
          aria-label="سوپرمارکت نمونه، بازگشت به ابتدای صفحه"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 60 60"
            aria-hidden="true"
            focusable="false"
          >
            <circle cx="30" cy="30" r="29" fill="#dff0e0" />
            <path
              d="M19 29 C19 16 41 16 41 29"
              fill="none"
              stroke="#2f7d4a"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            <path
              d="M14 29 H46 L42 45 H18 Z"
              fill="#2f7d4a"
            />
            <path
              d="M23 33 V41 M30 33 V41 M37 33 V41"
              fill="none"
              stroke="#dff0e0"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M32 18 C34 11 42 10 45 13 C43 19 36 21 32 18 Z"
              fill="#58a468"
            />
          </svg>

          <span className="logo-text">
            <strong>سوپرمارکت نمونه</strong>
            <small>تازه، نزدیک، به‌صرفه</small>
          </span>
        </a>

        <form className="search" role="search" action="#">
          <input
            type="search"
            placeholder="جستجو در میان هزاران کالا"
            aria-label="جستجوی محصولات"
          />
          <button type="submit" aria-label="جستجو">
            <span aria-hidden="true">🔍</span>
          </button>
        </form>

        <button className="cart" type="button" aria-label="سبد خرید">
          <span aria-hidden="true">🛍️</span> سبد خرید{' '}
          <b id="cart-count" aria-hidden="true">۰</b>
        </button>

        <label
          htmlFor="menu-toggle"
          className="burger"
          aria-hidden="true"
        >
          ☰
        </label>
      </div>

      <nav className="nav" aria-label="منوی اصلی">
        <ul className="menu" id="main-menu">
          <li className="has-sub">
            <a href="#categories">همه دسته‌ها</a>
            <ul className="submenu" id="submenu"></ul>
          </li>
        </ul>
      </nav>
    </header>
  )
}
