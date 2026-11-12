import SearchBox from './SearchBox.tsx'

type HeaderProps = {
  cartCount: number
  query: string
  onQuery: (q: string) => void
}

export default function Header({ cartCount, query, onQuery }: HeaderProps) {
  return (
    <header>
      <div className="top-bar">🚚 ارسال رایگان برای خریدهای بالای ۵۰۰ هزار تومان</div>
      <div className="header-main">
        <a href="#top" className="logo">
          <span className="logo-text">
            yaldastore<small>سوپرمارکت محله</small>
          </span>
        </a>
        <form
          className="search"
          role="search"
          action="#"
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor="q" className="visually-hidden">
            جستجو
          </label>
          <SearchBox query={query} onQuery={onQuery} />
          <button type="submit" aria-label="جستجو">
            🔍
          </button>
        </form>
        <a href="#cart" className="cart">
          🛒 سبد خرید
          <span>{cartCount.toLocaleString('fa-IR')}</span>
        </a>
      </div>
      <nav className="main-nav" aria-label="منوی اصلی">
        <ul>
          <li>
            <a href="#categories">همه دسته‌ها</a>
          </li>
          <li>
            <a href="#offers">پیشنهاد ویژه</a>
          </li>
          <li>
            <a href="#dairy">لبنیات</a>
          </li>
          <li>
            <a href="#about">تماس با ما</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
