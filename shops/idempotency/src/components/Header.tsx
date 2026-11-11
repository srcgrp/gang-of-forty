import Brand from "./Brand";
import MobileNav from "./MobileNav";
import CategoryNav from "./CategoryNav";
import CartPanel from "./CartPanel";
import SearchBox from "./SearchBox";

import type { CartAction } from "../shared/types/products";
import type { CartRowView } from "../features/cart/logic/view";
import ThemeToggle from "./ThemeToggle";
import type { Shop } from "../shared/types/shop";
import type { SearchableProduct } from "../shared/types/search";

type HeaderProps = {
  onPickCategory: (id: number | null) => void;
  cartCount: number;
  cartRows: CartRowView[];
  cartTotal: number;
  query: string;
  matches: SearchableProduct[];
  onQuery: (value: string) => void;
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
  query,
  matches,
  onQuery,
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
        <SearchBox value={query} onChange={onQuery} matches={matches} />
      </div>

      <CategoryNav onShowAll={() => onPickCategory(null)} />
    </header>
  );
}
