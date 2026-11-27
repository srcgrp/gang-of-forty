import type { Category, HomeCarousel, Product, Shop } from "../types";
import { useScrollDirection } from "../hooks/useScrollDirection";
import { TopBar } from "./TopBar";
import { HeaderTop } from "./HeaderTop";
import { MainNav } from "./MainNav";

interface SiteHeaderProps {
  shop: Shop;
  categories: Category[];
  products: Product[];
  carousels: HomeCarousel[];
}

export function SiteHeader({ shop, categories, products, carousels }: SiteHeaderProps) {
  const isHidden = useScrollDirection();

  return (
    <>
      <TopBar notice={shop.notice} />
      <header className="site-header">
        <HeaderTop shop={shop} products={products} isHidden={isHidden} />
        <MainNav shop={shop} categories={categories} carousels={carousels} isHidden={isHidden} />
      </header>
    </>
  );
}
