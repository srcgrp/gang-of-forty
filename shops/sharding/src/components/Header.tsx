import Topbar from './Topbar'
import SearchBox from './SearchBox'
import ThemeSwitch from './ThemeSwitch'

export default function Header() {
  return (
    <>
      <Topbar />
      <header className="header">
        <div className="container header__inner">
          <button
            type="button"
            className="icon-btn header__menu-btn"
            aria-expanded="false"
            aria-controls="mobile-menu"
            aria-label="باز کردن منو"
          >
            <svg className="icon-btn__icon" aria-hidden="true">
              <use href="./icons.svg#menu" />
            </svg>
          </button>

          <a href="#" className="identity" aria-label="بازگشت به بالای صفحه">
            <span className="identity__logo" aria-hidden="true">
              <img className="logo-img" src="./assets/images/logo/kiwi-fruit.svg" alt="" width="48" height="48" />
            </span>
            <span className="identity__text">
              <span className="identity__name">کیوی</span>
              <span className="identity__tagline">تازه، سریع، ارزان</span>
            </span>
          </a>

          <SearchBox />

          <div className="header__actions">
            <a href="#" className="action action--location" aria-label="موقعیت مکانی">
              <svg className="action__icon" aria-hidden="true">
                <use href="./icons.svg#location" />
              </svg>
              <span className="action__label">موقعیت</span>
            </a>
            <a href="#" className="action action--account" aria-label="حساب کاربری">
              <svg className="action__icon" aria-hidden="true">
                <use href="./icons.svg#account" />
              </svg>
              <span className="action__label">حساب من</span>
            </a>
            <a href="#" className="action action--cart" aria-label="سبد خرید">
              <svg className="action__icon" aria-hidden="true">
                <use href="./icons.svg#cart" />
              </svg>
              <span className="action__label">سبد خرید</span>
              <span className="badge" hidden>۰</span>
            </a>
          </div>

          <ThemeSwitch />
        </div>

        <nav className="header-nav" aria-label="ناوبری اصلی">
          <div className="container header-nav__inner">
            <div className="mega-menu">
              <button
                type="button"
                className="mega-menu__trigger"
                aria-expanded="false"
                aria-haspopup="true"
                aria-controls="mega-menu-panel"
              >
                <svg className="mega-menu__trigger-icon" aria-hidden="true">
                  <use href="./icons.svg#grid" />
                </svg>
                <span>همه دسته‌بندی‌ها</span>
              </button>
            </div>

            <ul className="nav" id="nav-list">
              <li><a href="#">خانه</a></li>
              <li><a href="#">پیشنهاد ویژه</a></li>
              <li><a href="#">تازه‌ها</a></li>
              <li><a href="#">تماس با ما</a></li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  )
}