import { toPersianDigits } from '../format/price';

type HeaderProps = {
  cartCount: number;
  darkMode: boolean;
  onToggleTheme: (checked: boolean) => void;
  onCartClick: () => void;
};

export default function Header({ cartCount, darkMode, onToggleTheme, onCartClick }: HeaderProps) {
  return (
    <header>
      <a href="#top" className="logo-link" aria-label="بازگشت به صفحه اصلی">
        <svg
          id="logo"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 160 160"
          width="160"
          height="160"
          role="img"
          aria-label="rate-limit logo"
        >
          <rect width="160" height="160" rx="32" fill="#1E2749" />

          <circle cx="30" cy="32" r="2" fill="#E4D9FF" />
          <circle cx="126" cy="28" r="1.5" fill="#FAFAFF" />
          <circle cx="26" cy="124" r="1.5" fill="#FAFAFF" />
          <circle cx="132" cy="130" r="2" fill="#E4D9FF" />

          <g transform="translate(80 80) rotate(-20)">
            <path d="M -56 0 A 56 16 0 0 1 56 0" fill="none" stroke="#FAFAFF" strokeWidth="4" strokeLinecap="round" />
            <circle r="30" fill="#E4D9FF" />
            <path d="M -56 0 A 56 16 0 0 0 56 0" fill="none" stroke="#1E2749" strokeWidth="10" strokeLinecap="round" />
            <path d="M -56 0 A 56 16 0 0 0 56 0" fill="none" stroke="#FAFAFF" strokeWidth="4" strokeLinecap="round" />
          </g>
        </svg>
      </a>
      <h1>محدودیت نرخ</h1>
      <p>مقصد بعدی: تازگی</p>

      <div className="search">
        <div className="search-bar">
          <img className="search-icon" alt="" src="/images/magnify.png" />
          <input type="text" aria-label="جستجو در میان محصولات" placeholder="جستجو در میان محصولات..." />
        </div>
      </div>

      <div className="header-actions">
        <div className="cart" onClick={onCartClick}>
          <img className="cart-icon" alt="" src="/images/cart.png" />
          <span className="cart-text">سبد خرید</span>
          <span className="cart-count">{toPersianDigits(cartCount)}</span>
        </div>

        <input
          type="checkbox"
          role="switch"
          className="theme-checkbox"
          id="theme-checkbox"
          aria-label="حالت تاریک"
          checked={darkMode}
          onChange={(e) => onToggleTheme(e.target.checked)}
        />
        <label className="theme-toggle" htmlFor="theme-checkbox" aria-hidden="true">
          <svg
            className="icon-moon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
          </svg>
          <svg
            className="icon-sun"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
        </label>
      </div>
    </header>
  );
}