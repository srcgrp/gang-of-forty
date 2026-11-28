import { Link, useParams, useSearch } from "@tanstack/react-router";
import { carouselProducts } from "../../catalog/carouselProducts";
import { sortProducts } from "../../catalog/sortProducts";
import { filterProducts } from "../../features/products/filter";
import { useCartDispatch } from "../../hooks/useCart";
import { useCatalog } from "../../hooks/useCatalog";
import { useQueryStore } from "../../hooks/useQueryStore";
import ProductGrid from "../ProductGrid";
import Status from "../Status";

export default function PlpPage() {
  const { carouselId } = useParams({ from: "/plp/$carouselId" });
  const { sort } = useSearch({ from: "/plp/$carouselId" });
  const { load, retry } = useCatalog();
  const dispatch = useCartDispatch();
  const query = useQueryStore((s) => s.query);

  if (load.status !== "success") {
    return <Status state={load} onRetry={retry} />;
  }

  const catalog = { products: load.products, offers: load.offers, home: load.home };
  const list = carouselProducts(catalog, carouselId);
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

  const stock = load.stock.items;
  const found = filterProducts(list, null, query);
  const sorted = sortProducts(found, sort, load.offers, stock);
  const item = load.home.carousels.find(function (c) {
    return c.id === carouselId;
  });
  const title = item ? item.emoji + " " + item.title : carouselId;

  return (
    <main className="box">
      <p>
        <Link to="/">بازگشت به خانه</Link>
      </p>
      <p className="sort-links">
        <Link to="/plp/$carouselId" params={{ carouselId }} search={{ sort: "default" }}>
          پیش‌فرض
        </Link>
        {" · "}
        <Link to="/plp/$carouselId" params={{ carouselId }} search={{ sort: "price" }}>
          ارزان‌ترین
        </Link>
      </p>
      <h1>{title}</h1>
      <p>{found.length.toLocaleString("fa-IR")} محصول</p>
      <ProductGrid
        className="product-grid"
        products={sorted}
        stock={stock}
        offers={load.offers}
        onAdd={function (id) {
          dispatch({ type: "add", id, stock: stock[id] ?? 0 });
        }}
      />
    </main>
  );
}
