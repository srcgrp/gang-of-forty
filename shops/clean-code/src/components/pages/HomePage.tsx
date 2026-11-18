import { useState } from "react";
import { cartRows, cartTotal } from "../../features/cart/rows";
import { useCart } from "../../hooks/useCart";
import { useCatalog } from "../../hooks/useCatalog";
import CartPanel from "../CartPanel";
import Footer from "../Footer";
import HomeIntro from "../HomeIntro";
import HomeRows from "../HomeRows";
import SalePanel from "../SalePanel";
import Status from "../Status";

export default function HomePage() {
  const { load, retry } = useCatalog();
  const { lines, dispatch } = useCart();
  const [categoryId, setCategoryId] = useState<number | null>(null);

  if (load.status !== "success") {
    return <Status state={load} onRetry={retry} />;
  }

  const products = load.products;
  const stock = load.stock.items;
  const offers = load.offers;
  const rows = cartRows(lines, products);
  const total = cartTotal(rows, offers);

  return (
    <>
      <SalePanel />
      <main id="content">
        <div className="box">
          <HomeIntro
            home={load.home}
            categories={load.categories}
            categoryId={categoryId}
            onPick={setCategoryId}
          />
          <HomeRows
            home={load.home}
            categories={load.categories}
            products={
              categoryId === null
                ? products
                : products.filter(function (p) {
                    return p.categoryId === categoryId;
                  })
            }
            offers={offers}
            stock={stock}
            onAdd={function (id) {
              dispatch({ type: "add", id, stock: stock[id] ?? 0 });
            }}
          />
          <CartPanel
            rows={rows}
            total={total}
            onClear={function () {
              dispatch({ type: "clear" });
            }}
          />
        </div>
      </main>
      <Footer categories={load.categories} help={load.shop.help} />
    </>
  );
}
