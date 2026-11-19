import { Link } from "@tanstack/react-router";
import Hero from "../Hero.tsx";
import Promos from "../Promos.tsx";
import ProductGrid from "../ProductGrid.tsx";
import Status from "../Status.tsx";
import { useCatalog } from "../../hooks/useCatalog.ts";
import { carouselProducts } from "../../catalog/carousel-cards.ts";
import { formatNumber } from "../../format/formatting.ts";

export default function HomePage() {
  const state = useCatalog();

  if (state.status !== "success") {
    return <Status state={state} />;
  }

  const { data } = state;

  return (
    <>
      <Hero hero={data.home.hero} side={data.home.side} />
      {data.home.carousels.map((c) => {
        const cards = carouselProducts(data, c.id) ?? [];

        return (
          <section key={c.id} aria-labelledby={`carousel-${c.id}`}>
            <div className="section-head">
              <h2 id={`carousel-${c.id}`}>
                {c.title} <span aria-hidden="true">{c.emoji}</span>
              </h2>
              <Link to="/plp/$carouselId" params={{ carouselId: c.id }} search={{ sort: "default" }}>
                مشاهده همه ({formatNumber(cards.length)})
              </Link>
            </div>
            <ProductGrid products={cards.slice(0, 4)} />
          </section>
        );
      })}
      <Promos promos={data.home.promos} />
    </>
  );
}