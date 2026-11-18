import { Link, useParams } from "@tanstack/react-router";
import ProductGrid from "../ProductGrid.tsx";
import Status from "../Status.tsx";
import { useCatalog } from "../../hooks/useCatalog.ts";
import { plpList } from "../../catalog/carousel-cards.ts";
import { formatNumber } from "../../format/formatting.ts";

export default function PlpPage() {
  const { carouselId } = useParams({ from: "/plp/$carouselId" });
  const state = useCatalog();

  if (state.status !== "success") {
    return <Status state={state} />;
  }

  const list = plpList(state.data, carouselId);

  if (list === null) {
    return (
      <section>
        <p>این فهرست پیدا نشد</p>
        <Link to="/">بازگشت به صفحه اصلی</Link>
      </section>
    );
  }

  return (
    <section>
      <Link to="/">بازگشت به صفحه اصلی</Link>
      <h2>
        {list.title} ({formatNumber(list.cards.length)})
      </h2>
      <ProductGrid products={list.cards} />
    </section>
  );
}