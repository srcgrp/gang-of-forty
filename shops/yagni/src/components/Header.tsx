interface HeaderProps {
  cartCount: number;
  totalPrice: number;
  onOpenCart: () => void;
  onSearch: (query: string) => void;
}

export default function Header({
  cartCount,
  totalPrice,
  onOpenCart,
  onSearch,
}: HeaderProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onSearch(String(formData.get("search") ?? ""));
  }

  return (
    <header className="header" id="top">
      <div className="header__container">
        <a href="#top" className="header__logo" aria-label="مینا-فروشگاه همیشه سبز">
          <span className="header__logo-mark">
            <svg aria-hidden="true"><use href="/sprite.svg#logo" /></svg>
          </span>
          <div className="header__brand">
            <strong>مینا</strong>
            <small>فروشگاه همیشه سبز</small>
          </div>
        </a>

        <form className="header__search" onSubmit={handleSubmit}>
          <span className="header__search-label">جستجو</span>
          <input
            type="search"
            name="search"
            placeholder="می‌تونی بین محصولات جستجو کنی"
            aria-label="جستجوی محصولات"
          />
          <button type="submit" className="header__search-button" aria-label="جستجو">
            <svg className="header__search-icon" aria-hidden="true"><use href="/sprite.svg#search" /></svg>
          </button>
        </form>

        <button type="button" className="header__cart" onClick={onOpenCart} aria-label="باز کردن سبد خرید">
          <span className="header__cart-icon">
            <svg aria-hidden="true"><use href="/sprite.svg#basket" /></svg>
            <span className="header__cart-count">{cartCount.toLocaleString("fa-IR")}</span>
          </span>
          <span className="header__cart-content">
            <small>سبد خرید</small>
            <strong>{totalPrice.toLocaleString("fa-IR")} تومان</strong>
          </span>
        </button>
      </div>
    </header>
  );
}
