import Brand from "./Brand";
import CategoryNav from "./CategoryNav";
import CartPanel from "./CartPanel";
import type { Category } from "../shared/types/products";

type HeaderProps = {
  categories: Category[];
  onPickCategory: (id: number | null) => void;
};

export default function Header({ categories,onPickCategory,} :HeaderProps) {
  return (
    <header className="site-header">
      <div className="top-bar">
        <p>🚚 ارسال رایگان برای خریدهای بالای ۵۰۰ هزار تومان</p>
      </div>

      <div className="header-main">
        <div className="brand-menu">
          <Brand />

          <details className="mobile-nav">
            <summary>☰ منو</summary>
            <nav className="mobile-nav-menu" aria-label="منوی موبایل">
              <a href="#categories">همه دسته‌ها</a>
              <a href="#offers">پیشنهاد ویژه</a>
              <a href="#contact">تماس با ما</a>
            </nav>
          </details>
        </div>
        <CartPanel/>

        <div className="theme-toggle" role="group" aria-label="انتخاب تم">
          <button className="theme-button" type="button">
            ☀
          </button>
          <button className="theme-button" type="button">
            ☾
          </button>
        </div>

        <form
          className="search"
          role="search"
          onSubmit={(event) => event.preventDefault()}
        >
          <label htmlFor="site-search">جستجو در تازه‌خانه</label>
          <div className="search-box">
            <input
              id="site-search"
              type="search"
              placeholder="جستجوی محصولات..."
            />
          </div>
        </form>
      </div>
      <CategoryNav
      categories={categories}
      onPick={onPickCategory}/>
    </header>
  );
}