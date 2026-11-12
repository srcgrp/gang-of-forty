interface HeaderProps {
    cartCount: number;
  }
  
  export function Header({ cartCount }: HeaderProps) {
    return (
      <header className="site-header">
        <div className="header-inner">
          <a href="#top" className="logo">
            <span className="logo-text">
              <strong>سوپرمارکت اسید</strong>
            </span>
          </a>
          <div className="cart">
            <span>🛒</span>
            <span className="cart-badge">{cartCount}</span>
          </div>
        </div>
      </header>
    );
  }