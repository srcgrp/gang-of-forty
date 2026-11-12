export default function Header({ cartCount }: { cartCount: number }) {
  return (
    <header>
      <div className="top-bar">🚚 ارسال رایگان برای خریدهای بالای ۵۰۰ هزار تومان</div>
      <div className="header-main">
        <a href="#top" className="logo">
          <span className="logo-text">
            yaldastore<small>سوپرمارکت محله</small>
          </span>
        </a>
        <form className="search" role="search" action="#">
          <label htmlFor="q" className="visually-hidden">
            جستجو
          </label>
          <input id="q" name="q" type="search" placeholder="جستجو در میان کالاها..." />
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
