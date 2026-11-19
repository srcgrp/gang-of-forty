import { countItems } from '../cart/rules';
import { toPersianDigits } from '../format/price';
import { useCartStore } from '../hooks/useCartStore';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import SearchBox from './SearchBox';

type HeaderProps = {
  onCartClick: () => void;
  query: string;
  onQuery: (query: string) => void;
};

export default function Header({ onCartClick, query, onQuery }: HeaderProps) {
  const cartCount = useCartStore((s) => countItems(s.cart));

  return (
    <header>
      <a href="#top" className="logo-link" aria-label="بازگشت به صفحه اصلی">
        <Logo />
      </a>
      <h1>محدودیت نرخ</h1>
      <p>مقصد بعدی: تازگی</p>

      <SearchBox value={query} onQuery={onQuery} />

      <div className="header-actions">
        <div className="cart" onClick={onCartClick}>
          <img className="cart-icon" alt="" src="/images/cart.png" />
          <span className="cart-text">سبد خرید</span>
          <span className="cart-count">{toPersianDigits(cartCount)}</span>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}