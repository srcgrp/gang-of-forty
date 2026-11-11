import Brand from "./Brand";
import MobileNav from "./MobileNav";
import CategoryNav from "./CategoryNav";
import CartPanel from "./CartPanel";
import HeaderSearch from "./HeaderSearch";

import type { CartAction } from "../shared/types/products";
import type { CartRowView } from "../features/cart/logic/view";
import ThemeToggle from "./ThemeToggle";
import type { Shop } from "../shared/types/shop";

type HeaderProps = {
  onPickCategory: (id: number | null) => void;
  cartCount: number;
  cartRows: CartRowView[];
  cartTotal: number;
  onCartAction: (action: CartAction, id: number) => void;
  onClearCart: () => void;
  shop: Shop | null;
};

export default function Header({
  shop,
  onPickCategory,
  cartCount,
  cartRows,
  cartTotal,
  onCartAction,
  onClearCart,
}: HeaderProps) {
  return (
    <header className="site-header">
      <div className="top-bar">
        <p>
          {shop?.notice ?? "🚚 ارسال رایگان برای خریدهای بالای ۵۰۰ هزار تومان"}
        </p>{" "}
      </div>

      <div className="header-main">
        <div className="brand-menu">
          <Brand />
          <MobileNav onShowAll={() => onPickCategory(null)} />
        </div>

        <CartPanel
          count={cartCount}
          rows={cartRows}
          total={cartTotal}
          onAction={onCartAction}
          onClear={onClearCart}
        />
        <ThemeToggle />

        <HeaderSearch />
      </div>

      <CategoryNav onShowAll={() => onPickCategory(null)} />
    </header>
  );
}
