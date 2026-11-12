import CartIcon from "./CartIcon";
import Logo from "./Logo";
import SearchBox from "./SearchBox";

type HeaderProps = {
  cartCount: number;
  menu: { label: string; href: string }[];
};

export default function Header({ cartCount, menu }: HeaderProps) {
  return (
    <header className="header">
      <div className="box header-top">
        <div className="brand">
          <a href="#top">
            <Logo />
          </a>
          <div>
            <h1>سوپرمارکت تمیز</h1>
            <p className="slogan">تازه، نزدیک، به‌صرفه</p>
          </div>
        </div>
        <SearchBox />
        <a className="cart" href="#cart">
          <span className="cart-label">سبد خرید</span>
          <CartIcon />
          <span className="cart-count">
            {cartCount.toLocaleString("fa-IR")}
          </span>
        </a>
        <input className="nav-toggle" id="nav-toggle" type="checkbox" />
        <label className="menu-btn" htmlFor="nav-toggle">
          <span className="sr-only">منو</span>
          <svg className="icon-open" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M4 7h16M4 12h16M4 17h16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            ></path>
          </svg>
          <svg className="icon-close" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M6 6 18 18M18 6 6 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            ></path>
          </svg>
        </label>
      </div>
      <nav className="main-nav" id="menu" aria-label="منوی اصلی">
        <ul className="box" id="menu-list">
          {menu.map(function (item) {
            return (
              <li key={item.href + item.label}>
                <a href={item.href}>{item.label}</a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
