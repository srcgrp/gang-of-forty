type HeaderProps = { cartCount: number };

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
          </div>
          <button type="button" className="cart" aria-label="سبد خرید">
            🛒 سبد خرید <span className="cart-count">{cartCount.toLocaleString("fa-IR")}</span>
          </button>
        </div>
        <nav className="main-nav" aria-label="منوی اصلی">
          {LINKS.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
        </nav>
      </header>
    </>
  );
}
