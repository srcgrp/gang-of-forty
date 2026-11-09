import Brand from "./Brand";
import MobileNav from "./MobileNav";
import CategoryNav from "./CategoryNav";
import CartPanel from "./CartPanel";
import HeaderSearch from "./HeaderSearch";

import type { Category, CartAction } from "../shared/types/products";
import type { CartRowView } from "../features/cart/logic/view";

type HeaderProps = {
  categories: Category[];
  onPickCategory: (id: number | null) => void;
  activeCategoryId: number | null;
  cartCount: number;
  cartRows: CartRowView[];
  cartTotal: number;
  onCartAction: (action: CartAction, id: number) => void;
  onClearCart: () => void;
};

export default function Header({
  categories,
  onPickCategory,
  activeCategoryId,
  cartCount,
  cartRows,
  cartTotal,
  onCartAction,
  onClearCart,
}: HeaderProps) {
  return (
    <header className="site-header">
      <div className="top-bar">
        <p>🚚 ارسال رایگان برای خریدهای بالای ۵۰۰ هزار تومان</p>
      </div>

      <div className="header-main">
        <div className="brand-menu">
          <Brand />
          <MobileNav />
        </div>

        <CartPanel
          count={cartCount}
          rows={cartRows}
          total={cartTotal}
          onAction={onCartAction}
          onClear={onClearCart}
        />

        <div className="theme-toggle" role="group" aria-label="انتخاب تم">
          <button className="theme-button" type="button">
            ☀
          </button>
          <button className="theme-button" type="button">
            ☾
          </button>
        </div>

        <HeaderSearch />
      </div>

      <CategoryNav
        categories={categories}
        onPick={onPickCategory}
        activeCategoryId={activeCategoryId}
      />
    </header>
  );
}
