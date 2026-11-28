
import { useThemeStore } from '../hooks/useThemeStore'
import { useCartStore } from '../hooks/useCartStore'
import { Link } from '@tanstack/react-router'
import SearchBox from './SearchBox'
import { useSearch } from '../SearchContext'

export default function Header() {
  const theme = useThemeStore((state) => state.theme)
  const toggle = useThemeStore((state) => state.toggle)
  const totalCount = useCartStore((state) => state.totalCount())
  const { query, setQuery } = useSearch()

  return (
    <>
      <aside className="top-banner" aria-label="اطلاعیه ویژه">
        <div className="container">
          <p>
            🚚 ارسال رایگان و سریع برای سفارش‌های بالای ۵۰۰ هزار تومان
          </p>
        </div>
      </aside>

      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="brand-logo">
            <svg
              className="brand-svg"
              width="46"
              height="46"
              viewBox="0 0 48 48"
              role="img"
              aria-label="لوگوی فروشگاه"
            >
              <circle cx="24" cy="24" r="22" fill="#059669" />
              <path
                d="M14 16 h6 l4 14 h12 l3 -10 h-22"
                stroke="#ffffff"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="25" cy="34" r="2.2" fill="#ffffff" />
              <circle cx="34" cy="34" r="2.2" fill="#ffffff" />
              <path
                d="M21 23 l3 3 l6 -6"
                stroke="#fcd34d"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>

            <div className="brand-text">
              <span className="shop-name">
                سوپرمارکت Least Surprise
              </span>
              <span className="shop-slogan">
                خریدی آسان و مطمئن
              </span>
            </div>
          </Link>

          <SearchBox query={query} onQuery={setQuery} />

          <div className="header-actions">
            <button onClick={toggle} type="button" aria-label="تغییر تم">
              {theme === 'light' ? '🌙 تم تاریک' : '☀️ تم روشن'}
            </button>

            <Link to="/checkout">تسویه‌حساب</Link>

            <div className="cart-badge">
              🛒 سبد خرید: {totalCount} کالا
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
