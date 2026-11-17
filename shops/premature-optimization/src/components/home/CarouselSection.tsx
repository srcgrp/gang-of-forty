import type { CarouselConfig, Product } from "../../scripts/types";
import Carousel from "../catalog/Carousel.tsx";
import ProductList from "../catalog/ProductList.tsx";
import type { SharedCardProps } from "../catalog/ProductList.tsx";
import PlpLink from "../shared/PlpLink.tsx";

const PREVIEW_COUNT = 8;
const format = new Intl.NumberFormat("fa-IR");

type CarouselSectionProps = SharedCardProps & {
  carousel: CarouselConfig;
  products: Product[];
};

export default function CarouselSection({
  carousel,
  products,
  ...shared
}: CarouselSectionProps) {
  return (
    <section className="recommendation" id={carousel.id}>
      <div className="recommendation-heading">
        <h2 className="recommendation-title">
          {carousel.emoji} {carousel.title}
        </h2>
        <PlpLink carouselId={carousel.id} className="view-all-link">
          مشاهده هر <span>{format.format(products.length)}</span> محصول
        </PlpLink>
      </div>
      {products.length === 0 ? (
        <p className="empty-message">محصولی برای نمایش وجود ندارد.</p>
      ) : (
        <Carousel>
          <ProductList
            products={products.slice(0, PREVIEW_COUNT)}
            {...shared}
          />
        </Carousel>
      )}
    </section>
  );
}
