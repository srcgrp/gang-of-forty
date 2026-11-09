import type { SectionView } from "../shared/types";
import ProductCard from "./ProductCard";

type Props = { section: SectionView; onAdd: (id: number) => void };
export default function ProductGrid({ section, onAdd }: Props) {
  const title = <h2 id={section.id + "-title"}>{section.title}</h2>;
  return (
    <section id={section.id} className="product-section" aria-labelledby={section.id + "-title"}>
      {section.carousel ? (
        <div className="section-heading">
          {title}
          <div className="carousel-controls" role="group" aria-label={"کنترل " + section.title}
            hidden={section.cards.length === 0}>
            <a href={"#" + section.id + "-first"} aria-label={"ابتدای " + section.title}>ابتدا</a>
            <a href={"#" + section.id + (section.cards.length === 1 ? "-first" : "-last")}
              aria-label={"انتهای " + section.title}>انتها</a>
          </div>
        </div>
      ) : title}
      {section.cards.length === 0 && <p className="products-status">محصولی برای نمایش وجود ندارد.</p>}
      <div className={section.carousel ? "products" : "sample-products"}
        id={section.id + "-products"} tabIndex={section.carousel ? 0 : undefined}
        role={section.carousel ? "group" : undefined}
        aria-label={section.carousel ? section.title + "؛ برای پیمایش از کلیدهای جهت استفاده کنید" : undefined}>
        {section.cards.map((card, index) => (
          <ProductCard key={card.id} card={card} onAdd={onAdd}
            id={section.id + (index === 0 ? "-first" : index === section.cards.length - 1 ? "-last" : "-" + card.id)} />
        ))}
      </div>
    </section>
  );
}
