import { carouselProducts } from "../catalog/carousel-products";
import { stateForProducts } from "../catalog/product-state";
import type { Catalog, ProductLoadState } from "../types";
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
        const items = carouselProducts(catalog, carousel.id) ?? [];
        const id = slugs.has(carousel.id) ? `carousel-${carousel.id}` : carousel.id;
        return (
          <section key={carousel.id}>
            <h2 className="section-title" id={id}>
              {carousel.emoji} {carousel.title}
              {carousel.source === "offers" && <SaleCountdown />}
            </h2>
            <ProductGrid state={stateForProducts(state, items)} />
          </section>
        );
      })}
    </div>
  );
}
