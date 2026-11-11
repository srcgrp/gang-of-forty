type Props = {
  onShowAll: () => void;
};

export default function CategoryNav({ onShowAll }: Props) {
  return (
    <nav className="main-nav desktop-nav" aria-label="منوی اصلی">
      <a href="#categories" onClick={onShowAll}>
        دسته‌بندی‌ها
      </a>

      <a href="#offers" onClick={onShowAll}>
        پیشنهاد ویژه
      </a>

      <a href="#contact">تماس با ما</a>
    </nav>
  );
}
