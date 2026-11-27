import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import type { SectionView } from "../shared/types";
import { formatNumber } from "../shared/format";
import ProductCard from "./ProductCard";

type Props = { section: SectionView; preview?: boolean };
export default function ProductGrid({ section, preview = false }: Props) {
  const list = useRef<HTMLDivElement>(null);
  const cards = preview ? section.cards.slice(0, 6) : section.cards;
  function scrollToEdge(last: boolean): void {
    const target = last ? list.current?.lastElementChild : list.current?.firstElementChild;
    target?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: last ? "end" : "start" });
  }
  return (
    <section id={section.id} className="product-section" aria-labelledby={section.id + "-title"}>
      <div className="section-heading">
        <h2 id={section.id + "-title"}>{section.title}</h2>
        {preview && <Link className="view-all" to="/plp/$carouselId" params={{ carouselId: section.id }} search={{ sort: "default" }}>
          مشاهده همه ({formatNumber(section.cards.length)})
        </Link>}
        {section.carousel && <div className="carousel-controls" role="group" aria-label={"کنترل " + section.title}
          hidden={cards.length === 0}>
          <button type="button" onClick={() => scrollToEdge(false)} aria-label={"ابتدای " + section.title}>ابتدا</button>
          <button type="button" onClick={() => scrollToEdge(true)} aria-label={"انتهای " + section.title}>انتها</button>
        </div>}
      </div>
      {cards.length === 0 && <p className="products-status">محصولی برای نمایش وجود ندارد.</p>}
      <div ref={list} className={section.carousel ? "products" : "sample-products"}
        id={section.id + "-products"} tabIndex={section.carousel ? 0 : undefined}
        role={section.carousel ? "group" : undefined}
        aria-label={section.carousel ? section.title + "؛ برای پیمایش از کلیدهای جهت استفاده کنید" : undefined}>
        {cards.map((card, index) => (
          <ProductCard key={card.id} card={card}
            id={section.id + (index === 0 ? "-first" : index === cards.length - 1 ? "-last" : "-" + card.id)} />
        ))}
      </div>
    </section>
  );
}
