import { Link } from '@tanstack/react-router';
import { countItems } from '../cart/rules';
import { toPersianDigits } from '../format/price';
import { useCartStore } from '../hooks/useCartStore';
import { useSearchStore } from '../hooks/useSearchStore';
import Logo from './Logo';
import SearchBox from './SearchBox';
import ThemeToggle from './ThemeToggle';

type HeaderProps = {
  onCartClick: () => void;
};

export default function Header({ onCartClick }: HeaderProps) {
  const cartCount = useCartStore((s) => countItems(s.cart));
  const query = useSearchStore((s) => s.query);
  const setQuery = useSearchStore((s) => s.setQuery);

  return (
    <header>
      <Link to="/" className="logo-link" aria-label="بازگشت به صفحه اصلی">
        <Logo />
      </Link>
      <h1>محدودیت نرخ</h1>
      <p>مقصد بعدی: تازگی</p>

      <SearchBox value={query} onQuery={setQuery} />

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
