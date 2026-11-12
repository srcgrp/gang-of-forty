export default function CategoryNav() {
  return (
    <nav className="category-nav">
      <section id="categories">
        <h2>دسته‌بندی‌ها</h2>
        <ul className="cat-list" id="cat-list">
          <li>
            <a href="#category-1">لبنیات</a>
          </li>
          <li>
            <a href="#category-2">خشکبار</a>
          </li>
          <li>
            <a href="#category-3">سبزیجات</a>
          </li>
          <li>
            <a href="#category-4">میوه</a>
          </li>
          <li>
            <a href="#category-5">سایر</a>
          </li>
        </ul>
      </section>
    </nav>
  );
}
