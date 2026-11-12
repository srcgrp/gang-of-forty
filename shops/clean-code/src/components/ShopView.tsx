import { addToCart, cartCount } from "../features/cart/count.ts";
import { cartRows, cartTotal } from "../features/cart/rows.ts";
import type { LoadState } from "../types/load.ts";
import type { CartLine } from "../types/product.ts";
import Banner from "./Banner.tsx";
import CartPanel from "./CartPanel.tsx";
import CategoryNav from "./CategoryNav.tsx";
import Footer from "./Footer.tsx";
import Header from "./Header.tsx";
import Hero from "./Hero.tsx";
import HomeRows from "./HomeRows.tsx";
import PromoStrips from "./PromoStrips.tsx";

type Success = Extract<LoadState, { status: "success" }>;
type ShopViewProps = {
  load: Success;
  categoryId: number | null;
  cart: CartLine[];
  onPick: (id: number | null) => void;
  onClear: () => void;
  setCart: (next: CartLine[]) => void;
};
export default function ShopView({
  load,
  categoryId,
  cart,
  onPick,
  onClear,
  setCart,
}: ShopViewProps) {
  const products = load.products;
  const stock = load.stock.items;
  const offers = load.offers;
  const categories = load.categories;
  const rows = cartRows(cart, products);
  const total = cartTotal(rows, offers);

  function handleAdd(id: number): void {
    setCart(addToCart(cart, id, stock[id] ?? 0));
  }

  return (
    <>
      <Banner />
      <Header cartCount={cartCount(cart)} menu={load.shop.menu} />
      <main id="content">
        <div className="box">
          <CategoryNav
            categories={categories}
            selectedId={categoryId}
            onPick={onPick}
          />
          <Hero home={load.home} />
          <PromoStrips home={load.home} />
          <HomeRows
            home={load.home}
            categories={categories}
            products={products}
            offers={offers}
            stock={stock}
            onAdd={handleAdd}
          />
          <CartPanel rows={rows} total={total} onClear={onClear} />
        </div>
      </main>
      <Footer categories={categories} help={load.shop.help} />
    </>
  );
}
