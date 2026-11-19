import { Link } from '@tanstack/react-router';
import { toPersianDigits } from '../format/price';
import type { CatalogItem } from '../types';
import Carousel from './Carousel';
import ProductCard from './Productcard';

type ProductGridProps = {
  id?: string;
  carouselId: string;
  title: string;
  subtitle?: string;
  products: CatalogItem[];
  total: number;
};

export default function ProductGrid({ id, carouselId, title, subtitle, products, total }: ProductGridProps) {
  const titleId = id ? `${id}-title` : undefined;

  return (
    <section className="special-offer" id={id} aria-labelledby={titleId}>
      <div className="special-offer-head">
        <h2 className="carousel-title" id={titleId}>{title}</h2>
        {subtitle && <span className="special-offer-sub">{subtitle}</span>}
        <Link to="/plp/$carouselId" params={{ carouselId }} className="special-offer-sub">
          مشاهده همه ({toPersianDigits(total)})
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="product-grid-empty">محصولی پیدا نشد.</p>
      ) : (
        <Carousel>
          {products.map((p) => (
            <ProductCard key={p.id} product={p} percent={p.percent} stock={p.stock} />
          ))}
        </Carousel>
      )}
    </section>
  );
}
