import { addToCart, cartCount } from "../features/cart/count.ts";
import { cartRows, cartTotal } from "../features/cart/rows.ts";
import type { LoadState } from "../types/load.ts";
import type { CartLine } from "../types/product.ts";
import Banner from "./Banner.tsx";
import CartPanel from "./CartPanel.tsx";
import CategoryNav from "./CategoryNav.tsx";
import Footer from "./Footer.tsx";
import Header from "./Header.tsx";
import ProductGrid from "./ProductGrid.tsx";

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
  const visible =
    categoryId === null
      ? products
      : products.filter(function (p) {
          return p.categoryId === categoryId;
        });
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
          <ProductGrid
            products={visible}
            stock={stock}
            offers={offers}
            onAdd={handleAdd}
          />
          <CartPanel rows={rows} total={total} onClear={onClear} />
        </div>
      </main>
      <Footer categories={categories} help={load.shop.help} />
    </>
  );
}
