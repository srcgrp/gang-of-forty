import Brand from "./Brand";
import MobileNav from "./MobileNav";
import CategoryNav from "./CategoryNav";
import CartPanel from "./CartPanel";
import SearchBox from "./SearchBox";

import type { StoreData } from "../features/products/api/store-data";
import ThemeToggle from "./ThemeToggle";
import type { Shop } from "../shared/types/shop";
import type { SearchableProduct } from "../shared/types/search";

type HeaderProps = {
  onPickCategory: (id: number | null) => void;
  data: StoreData | null;
  query: string;
  matches: SearchableProduct[];
  onQuery: (value: string) => void;
  shop: Shop | null;
};

export default function Header({
  shop,
  onPickCategory,
  data,
  query,
  matches,
  onQuery,
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

        <CartPanel data={data} />
        <ThemeToggle />
        <SearchBox value={query} onChange={onQuery} matches={matches} />
      </div>

      <CategoryNav onShowAll={() => onPickCategory(null)} />
    </header>
  );
}
