export default function CategoryNav() {
  return (
    <nav className="nav" aria-label="منوی اصلی">
      <ul className="menu" id="main-menu">
        <li className="has-sub">
          <a href="#categories">همه دسته‌ها</a>
          <ul className="submenu" id="submenu"></ul>
        </li>
      </ul>
    </nav>
  )
}
