import CartIcon from "./CartIcon";
import Logo from "./Logo";
import MenuToggle from "./MenuToggle";
import SearchBox from "./SearchBox";

type HeaderProps = {
  cartCount: number;
  query: string;
  menu: { label: string; href: string }[];
  onQuery: (value: string) => void;
};

export default function Header({
  cartCount,
  menu,
  query,
  onQuery,
}: HeaderProps) {
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
        <SearchBox query={query} onQuery={onQuery} />
        <a className="cart" href="#cart">
          <span className="cart-label">سبد خرید</span>
          <CartIcon />
          <span className="cart-count">
            {cartCount.toLocaleString("fa-IR")}
          </span>
        </a>
        <MenuToggle />
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
