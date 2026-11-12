export default function MainNav() {
  return (
    <nav className="main-nav" aria-label="منوی اصلی">
      <ul>
        <li className="all-cats">
          <a className="all-link" href="#categories">☰ همه دسته‌ها</a>
          <ul className="cat-menu">
            <li><a href="#categories">🍎 میوه و سبزی</a></li>
            <li><a href="#dairy">🥛 لبنیات</a></li>
            <li><a href="#categories">🥖 نان و شیرینی</a></li>
            <li><a href="#categories">🍚 خواربار</a></li>
          </ul>
        </li>
        <li><a href="#dairy">لبنیات</a></li>
        <li><a href="#contact">تماس با ما</a></li>
      </ul>
    </nav>
  )
}
