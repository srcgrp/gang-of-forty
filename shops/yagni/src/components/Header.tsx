import SearchBox from "./SearchBox";

interface HeaderProps {
  cartCount: number;
  totalPrice: number;
  searchQuery: string;
  onOpenCart: () => void;
  onSearch: (query: string) => void;
}

export default function Header({
  cartCount,
  totalPrice,
  searchQuery,
  onOpenCart,
  onSearch,
}: HeaderProps) {
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
        <SearchBox query={searchQuery} onQuery={onSearch} />
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
