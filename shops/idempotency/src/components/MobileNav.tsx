type Props = {
  onShowAll: () => void;
};

export default function MobileNav({ onShowAll }: Props) {
  return (
    <details className="mobile-nav">
      <summary>☰ منو</summary>

      <nav className="mobile-nav-menu" aria-label="منوی موبایل">
        <a href="#categories" onClick={onShowAll}>
          همه دسته‌ها
        </a>

        <a href="#offers" onClick={onShowAll}>
          پیشنهاد ویژه
        </a>

        <a href="#contact">تماس با ما</a>
      </nav>
    </details>
  );
}
