export default function MobileNav() {
  return (
    <details className="mobile-nav">
      <summary>☰ منو</summary>

      <nav className="mobile-nav-menu" aria-label="منوی موبایل">
        <a href="#categories">همه دسته‌ها</a>
        <a href="#offers">پیشنهاد ویژه</a>
        <a href="#contact">تماس با ما</a>
      </nav>
    </details>
  );
}
