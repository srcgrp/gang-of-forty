import { Fragment, type ReactNode } from "react";
import { CAROUSEL_PREVIEW_LIMIT, carouselProducts, configuredCategoryCarousel } from "../catalog/carousel-products";
import { stateForProducts } from "../catalog/product-state";
import type { CarouselConfig, Catalog, ProductLoadState } from "../types";
import CarouselLink from "./CarouselLink";
import ProductGrid from "./ProductGrid";
import SaleCountdown from "./SaleCountdown";

type HomeCarouselsProps = {
  catalog: Catalog | null;
  carousels: CarouselConfig[];
  state: ProductLoadState;
  id?: string;
  afterSection?: (index: number) => ReactNode;
};

export default function HomeCarousels({ catalog, carousels, state, id, afterSection }: HomeCarouselsProps) {
  const slugs = new Set(catalog?.categories.map((category) => category.slug));

  return (
    <div id={id}>
      {catalog && carousels.map((carousel, index) => {
        const items = carouselProducts(catalog, carousel.id)?.slice(0, CAROUSEL_PREVIEW_LIMIT) ?? [];
        const category = catalog.categories.find(({ id }) => id === carousel.categoryId);
        const sectionId = category && configuredCategoryCarousel(catalog, category.id) === carousel
          ? category.slug
          : slugs.has(carousel.id) ? `carousel-${carousel.id}` : carousel.id;
        return (
          <Fragment key={carousel.id}>
            <section>
              <h2 className="section-title carousel-title" id={sectionId}>
                <span className="carousel-title-content">
                  <span>{carousel.emoji} {carousel.title}</span>
                  {carousel.source === "offers" && <SaleCountdown />}
                </span>
                <CarouselLink carouselId={carousel.id} title={carousel.title} />
              </h2>
              <ProductGrid state={stateForProducts(state, items)} />
            </section>
            {afterSection?.(index)}
          </Fragment>
        );
      })}
    </div>
  );
}
