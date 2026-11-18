import { Link, useParams } from "@tanstack/react-router";
import { carouselProducts } from "../../catalog/carouselProducts";
import { useCart } from "../../hooks/useCart";
import { useCatalog } from "../../hooks/useCatalog";
import ProductGrid from "../ProductGrid";
import Status from "../Status";

export default function PlpPage() {
  const { carouselId } = useParams({ from: "/plp/$carouselId" });
  const { load, retry } = useCatalog();
  const { dispatch } = useCart();

  if (load.status !== "success") {
    return <Status state={load} onRetry={retry} />;
  }

  const catalog = {
    products: load.products,
    offers: load.offers,
    home: load.home,
  };
  const list = carouselProducts(catalog, carouselId);
  const stock = load.stock.items;

  if (!list) {
    return (
      <main className="box">
        <h1>این فهرست پیدا نشد</h1>
        <p>
          <Link to="/">بازگشت به خانه</Link>
        </p>
      </main>
    );
  }

  const item = load.home.carousels.find(function (c) {
    return c.id === carouselId;
  });
  const title = item ? item.emoji + " " + item.title : carouselId;

  return (
    <main className="box">
      <p>
        <Link to="/">بازگشت به خانه</Link>
      </p>
      <h1>{title}</h1>
      <p>{list.length.toLocaleString("fa-IR")} محصول</p>
      <ProductGrid
        products={list}
        stock={stock}
        offers={load.offers}
        onAdd={function (id) {
          dispatch({ type: "add", id, stock: stock[id] ?? 0 });
        }}
      />
    </main>
  );
}
