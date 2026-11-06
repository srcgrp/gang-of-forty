import { formatNumber } from '../features/products/catalog/format.ts'

type HeaderProps = {
  count: number
}
export default function Header({ count }: HeaderProps) {
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
          <input
            type="search"
            id="search"
            placeholder="جستجوی محصولات..."
            aria-label="جستجوی محصولات"
          />
          <button type="button">
            <span aria-hidden="true">🛒</span> سبد خرید{' '}
            <span className="cart-count" id="cart-count" aria-live="polite">{formatNumber(count)}</span>
          </button>
        </div>
      </header>
    </>
  )
}