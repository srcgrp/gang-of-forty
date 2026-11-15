import { formatNumber } from '../features/products/catalog/format.ts'
import SearchBox from './SearchBox.tsx'
import ThemeToggle from './ThemeToggle.tsx'
import Toaster from './Toaster.tsx'
import FavoritesMenu from './FavoritesMenu.tsx'
import type { LoadState } from '../shared/types.ts'
import { cartCount } from '../features/cart/rules/lines.ts'
import { useCartStore } from '../hooks/useCartStore.ts'

type HeaderProps = {
  query: string
  onQuery: (value: string) => void
  onCartClick: () => void
  state: LoadState
}
export default function Header({ query, onQuery, onCartClick, state }: HeaderProps) {
  const count = useCartStore((s) => cartCount(s.lines))
  return (
    <>
      <a className="skip-link" href="#main">پرش به محتوای اصلی</a>
      <input
        type="checkbox"
        id="menu-toggle"
        className="menu-toggle"
        aria-label="باز و بسته کردن منوی دسته‌ها"
      />
      <header className="header">
        <label htmlFor="menu-toggle" className="menu-btn">☰</label>

        <a href="#top" className="brand" aria-label="مارتو، بازگشت به بالای صفحه">
          <svg className="logo" viewBox="0 0 270 64" role="img" aria-labelledby="logo-title">
            <title id="logo-title">لوگوی مارتو</title>
            <use href="#logo-shapes" />
          </svg>
        </a>

        <div className="header-actions">
            <SearchBox query={query} onQuery={onQuery} />
            <ThemeToggle />
            <FavoritesMenu state={state} />
            <button type="button" onClick={onCartClick}>
            <span aria-hidden="true">🛒</span> سبد خرید{' '}
            <span className="cart-count" id="cart-count" aria-live="polite">{formatNumber(count)}</span>
          </button>
        </div>
      </header>
      <Toaster />
    </>
  )
}
