import type { CSSProperties } from 'react';
import type { CatalogItem, Category } from '../types';
import { toPersianDigits } from '../format/price';
import Carousel from './Carousel';
import ProductCard from './Productcard';

type CategoryCarouselProps = {
  category: Category;
  products: CatalogItem[];
};

export default function CategoryCarousel({ category, products }: CategoryCarouselProps) {
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
        <span className="category-carousel-count">{toPersianDigits(products.length)} محصول</span>
      </div>
      <Carousel>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} percent={p.percent} stock={p.stock} />
        ))}
      </Carousel>
    </section>
  );
}
