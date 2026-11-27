import { addToCart, cartCount } from "../features/cart/count.ts";
import { cartRows, cartTotal } from "../features/cart/rows.ts";
import { filterProducts } from "../features/products/filter.ts";
import type { LoadState } from "../types/load.ts";
import type { CartLine } from "../types/product.ts";
import Banner from "./Banner.tsx";
import CartPanel from "./CartPanel.tsx";
import Footer from "./Footer.tsx";
import Header from "./Header.tsx";
import HomeIntro from "./HomeIntro.tsx";
import HomeRows from "./HomeRows.tsx";
import SalePanel from "./SalePanel.tsx";
type Success = Extract<LoadState, { status: "success" }>;
type ShopViewProps = {
  load: Success;
  categoryId: number | null;
  cart: CartLine[];
  onPick: (id: number | null) => void;
  onClear: () => void;
  setCart: (next: CartLine[]) => void;
  query: string;
  onQuery: (value: string) => void;
};
export default function ShopView(p: ShopViewProps) {
  const products = p.load.products;
  const stock = p.load.stock.items;
  const offers = p.load.offers;
  const cats = p.load.categories;
  const home = p.load.home;
  const visible = filterProducts(products, p.categoryId, p.query);
  const rows = cartRows(p.cart, products);
  const total = cartTotal(rows, offers);
  return (
    <>
      <Banner />
      <SalePanel />
      <Header
        cartCount={cartCount(p.cart)}
        menu={p.load.shop.menu}
        query={p.query}
        onQuery={p.onQuery}
      />
      <main id="content">
        <div className="box">
          {p.query === "" ? (
            <HomeIntro
              home={home}
              categories={cats}
              categoryId={p.categoryId}
              onPick={p.onPick}
            />
          ) : null}
          <HomeRows
            home={home}
            categories={cats}
            products={visible}
            offers={offers}
            stock={stock}
            onAdd={function (id) {
              p.setCart(addToCart(p.cart, id, stock[id] ?? 0));
            }}
          />
          <CartPanel rows={rows} total={total} onClear={p.onClear} />
        </div>
      </main>
      <Footer categories={cats} help={p.load.shop.help} />
    </>
  );
}
