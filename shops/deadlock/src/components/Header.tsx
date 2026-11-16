type HeaderProps = { cartCount: number };
import ThemeToggle from "./ThemeToggle";
const LINKS = [
  { label: "دسته‌بندی‌ها", href: "#categories" },
  { label: "پیشنهاد ویژه", href: "#special-offers" },
  { label: "محصولات", href: "#tents" },
  { label: "تماس با ما", href: "#contact" },
];

export default function Header({ cartCount }: HeaderProps) {
  return (
    <>
      <a href="#main-content" className="skip-link">پرش به محتوای اصلی</a>
      <header>
        <div className="info-nav">🎁 با خرید ۲ محصول یکی هدیه بگیر 🎁</div>
        <div className="logo-container">
          <a href="#" className="logo">
            <svg viewBox="0 0 100 70" className="logo-mark" aria-hidden="true">
              <circle cx="66" cy="20" r="14" className="sun" />
              <polygon points="2,66 38,14 74,66" className="mountain-back" />
              <polygon points="30,66 62,22 98,66" className="mountain-front" />
            </svg>
            <span className="logo-words">
              <strong className="logo-text">HERMAN SHOP</strong>
              <span className="logo-sub">GEAR FOR A WILDER LIFE</span>
            </span>
          </a>
          <div className="search">
            <input id="search-box" type="search" aria-label="جستجوی محصول" placeholder="جستجو محصول..." />
            <button type="button" className="search-btn" aria-label="جستجو">
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
                <line x1="16.5" y1="16.5" x2="22" y2="22" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </div>
          <ThemeToggle />
          <button type="button" className="cart" aria-label="سبد خرید">
            <span className="btn-icon" aria-hidden="true">🛒</span>
            <span className="btn-text">سبد خرید</span>
            <span className="cart-count">{cartCount.toLocaleString("fa-IR")}</span>
          </button>
        </div>
        <nav className="main-nav" aria-label="منوی اصلی">
          {LINKS.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
        </nav>
      </header>
    </>
  );
}
