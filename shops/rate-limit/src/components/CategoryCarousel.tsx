import type { CSSProperties } from 'react';
import { Link } from '@tanstack/react-router';
import type { CatalogItem, Category } from '../types';
import { toPersianDigits } from '../format/price';
import Carousel from './Carousel';
import ProductCard from './Productcard';

type CategoryCarouselProps = {
  category: Category;
  products: CatalogItem[];
  total: number;
};

export default function CategoryCarousel({ category, products, total }: CategoryCarouselProps) {
  if (products.length === 0) return null;
  const titleId = `${category.slug}-title`;

  return (
    <section className="category-carousel" id={category.slug} aria-labelledby={titleId}>
      <div className="category-carousel-head">
        <span
          className="category-carousel-icon"
          style={{ '--category-color': category.color } as CSSProperties}
          aria-hidden="true"
        >
          {category.emoji}
        </span>
        <h2 className="category-carousel-title" id={titleId}>{category.name}</h2>
        <Link to="/plp/$carouselId" params={{ carouselId: category.slug }} className="category-carousel-count">
          مشاهده همه ({toPersianDigits(total)})
        </Link>
      </div>
      <Carousel>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} percent={p.percent} stock={p.stock} />
        ))}
      </Carousel>
    </section>
  );
}
