import type { CarouselConfig, Product } from "../../scripts/types.ts";
import { formatNumber } from "../../lib/formatNumber.ts";
import Carousel from "../catalog/Carousel.tsx";
import ProductList, {
  type SharedCardProps,
} from "../catalog/products/ProductList.tsx";
import PlpLink from "../shared/PlpLink.tsx";

const PREVIEW_COUNT = 8;

type CarouselSectionProps = SharedCardProps & {
  carousel: CarouselConfig;
  products: Product[];
};

export default function CarouselSection({
  carousel,
  products,
  ...shared
}: CarouselSectionProps) {
  const previewProducts = products.slice(0, PREVIEW_COUNT);

  return (
    <section className="recommendation" id={carousel.id}>
      <div className="recommendation-heading">
        <h2 className="recommendation-title">
          {carousel.emoji} {carousel.title}
        </h2>
        <PlpLink carouselId={carousel.id} className="view-all-link">
          مشاهده هر <span>{formatNumber(products.length)}</span> محصول
        </PlpLink>
      </div>
      {previewProducts.length === 0 ? (
        <p className="empty-message">محصولی برای نمایش وجود ندارد.</p>
      ) : (
        <Carousel>
          <ProductList products={previewProducts} {...shared} />
        </Carousel>
      )}
    </section>
  );
}
