import { CAROUSEL_PREVIEW_LIMIT, carouselProducts, configuredCategoryCarousel } from "../catalog/carousel-products";
import { stateForProducts } from "../catalog/product-state";
import type { Catalog, ProductLoadState } from "../types";
import CarouselLink from "./CarouselLink";
import ProductGrid from "./ProductGrid";
import SaleCountdown from "./SaleCountdown";

type HomeCarouselsProps = {
  catalog: Catalog | null;
  state: ProductLoadState;
  variant: "offers" | "other";
};

export default function HomeCarousels({ catalog, state, variant }: HomeCarouselsProps) {
  const slugs = new Set(catalog?.categories.map((category) => category.slug));

  return (
    <div id={variant === "offers" ? "carousels" : undefined}>
      {catalog && catalog.home.carousels
        .filter((carousel) => (carousel.source === "offers") === (variant === "offers"))
        .map((carousel) => {
          const items = carouselProducts(catalog, carousel.id)?.slice(0, CAROUSEL_PREVIEW_LIMIT) ?? [];
          const category = catalog.categories.find(({ id }) => id === carousel.categoryId);
          const id = category && configuredCategoryCarousel(catalog, category.id) === carousel
            ? category.slug
            : slugs.has(carousel.id) ? `carousel-${carousel.id}` : carousel.id;
          return (
            <section key={carousel.id}>
              <h2 className="section-title carousel-title" id={id}>
                <span className="carousel-title-content">
                  <span>{carousel.emoji} {carousel.title}</span>
                  {carousel.source === "offers" && <SaleCountdown />}
                </span>
                <CarouselLink carouselId={carousel.id} title={carousel.title} />
              </h2>
              <ProductGrid state={stateForProducts(state, items)} />
            </section>
          );
        })}
    </div>
  );
}
